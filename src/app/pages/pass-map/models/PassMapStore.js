import { action, observable, configure, computed, decorate } from 'mobx';
import api from 'utils/api';
import Loadable from 'utils/LoadableStore';
import ListItem from './PassMapListItem';

configure({
    enforceActions: true
});

function prepareStationsTree(lines, labelTree = '') {
    return lines.map((item) => ({
        label: item.name,
        labelTree: labelTree + item.name,
        key: item.id,
        value: item.id,
        children: item.children
            ? prepareStationsTree(item.children, `${labelTree}${item.name} > `)
            : null
    }));
}

class PassMapStore extends Loadable {
    stations = [];

    passList = [];
    isExporting = false;
    cacheIndexById = {};
    sendingRequestList = [];

    constructor(filter) {
        super();
        this.filter = filter;
    }

    get listIsEmpty() {
        return this.listCount === 0;
    }

    get listCount() {
        return this.passList.length;
    }

    setStations(stations) {
        this.stations.replace(stations);
    }

    setPassList(passList) {
        this.setCache(passList);
        this.passList.replace(passList);
    }

    setIsExporting(isExporting) {
        this.isExporting = isExporting;
    }

    mergePassListById(newPassList = []) {
        newPassList.forEach((item) => {
            // Достаем положение элемента
            const { id } = item;
            const index = this.cacheIndexById[id];
            if (index === undefined)
                throw new Error(`Получил запись, id которой не была известна ${id}`);
            this.passList[index].fillData(item);
        });
    }

    setCache(passList) {
        const cacheStore = {};
        passList.reduce((cache, item, index) => {
            cache[item.id] = index; // eslint-disable-line no-param-reassign
            return cache;
        }, cacheStore);

        this.cacheIndexById = cacheStore;
    }

    async loadStationsTree() {
        const promise = api.metroPlan.getUhfTree();
        this.sendingRequestList.push(promise.cancel);

        const { data } = await promise;
        if (data.status !== -1) {
            const items = prepareStationsTree(data.data);
            this.setStations(items);
        }
    }

    listItemBuilder(data) {
        return new ListItem(data);
    }

    async loadPassListKeys() {
        this.setLoading(true);
        try {
            const promise = this.loadList();
            this.sendingRequestList.push(promise.cancel);
            const { data } = await promise;
            this.setLoading(false);
            if (data.status !== -1) {
                // Превращаем ключи в объекты
                this.setPassList(data.data.map((id) => this.listItemBuilder(id)));
            }
        } finally {
            this.setLoading(false);
        }
    }

    updatePassListByFilter(filterData) {
        this.filter.fillFilter(filterData);
        return this.loadPassListKeys();
    }

    loadList() {
        return api.pass.getListByFilter(this.filter.forRequest);
    }

    async loadMorePassListByIds(ids) {
        this.filter.setIds(ids);
        const promise = this.loadList();
        this.cancelSendingRequests(promise.cancel);
        const { data } = await promise;

        if (data.status !== -1) {
            this.filter.resetIds();
            // Дозаполним данными объекты
            this.mergePassListById(data.data);
        }

        return data;
    }

    sortPassList(sortBy, sortDirection) {
        this.filter.setForSort(sortBy, sortDirection);
        return this.loadPassListKeys();
    }

    getExcelBlob() {
        const promise = api.pass.getExcel(this.filter.forRequest);
        this.sendingRequestList.push(promise.cancel);
        return promise;
    }

    getPassDetailsById(id) {
        return api.pass.getById(id);
    }

    cancelSendingRequests() {
        this.sendingRequestList.forEach((cancel) => cancel());
    }
}

export { PassMapStore };
export default decorate(PassMapStore, {
    stations: observable,
    passList: observable,
    isExporting: observable,
    listIsEmpty: computed,
    listCount: computed,
    setStations: action,
    setPassList: action,
    setIsExporting: action,
    mergePassListById: action
});
