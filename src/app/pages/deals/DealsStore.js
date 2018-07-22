import { action, observable, computed, decorate } from 'mobx';
import api from 'utils/api';
import SortableStore from 'utils/SortableStore';
import BaseTableStore from 'utils/BaseTable/BaseTableStore';
import moment from 'moment';

const prepareScheduleFromResponse = (deal) => ({
    ...deal,
});

class DealsStore extends BaseTableStore {
    listSorter = new SortableStore();
    nameFilter = '';
    list = [];
    filter = null;

    constructor(filter = null) {
        super();
        this.filter = filter;
    }

    fetchList = async () => {
        const { data } = await api.deals.getListFake();
        return data.deals;
    };

    get sortedList() {
        return this.filteredList.slice().sort(this.listSorter.sort);
    }

    get filteredList() {
        return this.nameFilter
            ? this.list.filter((item) =>
                  item.name
                      .toLowerCase()
                      .includes(this.nameFilter.toLowerCase())
              )
            : this.list;
    }

    setNameFilter(name) {
        this.nameFilter = name;
    }

    async getDeal(id) {
        // const { data } = await api.schedules.get(id);
        const data = {};
        data.deal = { id: '123', name: 'qweqweqwe' };
        return prepareScheduleFromResponse(data.deal);
    }

    async deleteSchedule(item) {
        const { data } = await api.schedules.delete({ id: item.id });
        if (data) {
            this.deleteFromList(item);
        } else {
            throw new Error(data.message);
        }
    }

    async addSchedule(schedule) {
        const onceExecuteDatetime =
            moment(schedule.date) + moment(schedule.time);
        const item = {
            ...schedule,
            id: null,
            description: 'Описание описание описание',
            onceExecuteDatetime: onceExecuteDatetime.format('DD.MM.YYYY HH:mm'),
        };
        await api.schedules.update(item);
        this.addToList(item);
    }

    async updateSchedule(schedule) {
        await api.schedules.update(schedule);
        this.updateItemInList(schedule);
    }

    deleteFromList(item) {
        const index = this.list.findIndex((i) => i === item);
        if (index !== -1) {
            this.list.splice(index, 1);
        }
    }

    updateItemInList(item) {
        const index = this.list.findIndex((i) => i.id === item.id);
        if (index !== -1) {
            this.list[index] = item;
        }
    }
    addToList(schedule) {
        console.log('addToList', schedule);
        this.list.unshift(schedule);
    }
}

export default decorate(DealsStore, {
    // list: observable,
    // setList: action,
    nameFilter: observable,
    setNameFilter: action,
    filteredList: computed,
    sortedList: computed,
    deleteSchedule: action,
    addSchedule: action,
    updateSchedule: action,
    getDeal: action,
});
