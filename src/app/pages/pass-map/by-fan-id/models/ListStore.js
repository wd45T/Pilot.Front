import api from 'utils/api';
import LoadableStore from 'utils/LoadableStore';
import { computed, action, observable } from 'mobx';

import ListItemObserved from './ListItem';

class ByFanStore extends LoadableStore {
    @observable list = [];
    cacheIndexById = {};
    cancelList = [];

    constructor(fanId) {
        super();
        this.fanId = fanId;
    }

    @computed
    get listCount() {
        return this.list.length;
    }

    @computed
    get listIsEmpty() {
        return this.listCount === 0;
    }

    @action
    setList(list) {
        this.list.replace(list);
    }

    @action
    updateList(newList = []) {
        newList.forEach((item) => {
            // Достаем положение элемента
            const { id } = item;
            const index = this.cacheIndexById[id];
            if (index === undefined)
                throw new Error(`Получил запись, id которой не была известна ${id}`);
            this.list[index].fillData(item);
        });
    }

    setCache(list) {
        const cacheStore = {};
        list.reduce((cache, id, index) => {
            cache[id] = index; // eslint-disable-line no-param-reassign
            return cache;
        }, cacheStore);

        this.cacheIndexById = cacheStore;
    }

    fetchList(ids) {
        return api.pass.getByFanId(this.fanId, ids);
    }

    listItemBuilder(id) {
        return new ListItemObserved(id);
    }

    async loadListKeys() {
        this.setLoading(true);
        try {
            const promise = this.fetchList();
            this.cancelList.push(promise.cancel);
            const { data } = await promise;
            if (data.status !== -1) {
                // Превращаем ключи в объекты
                this.setCache(data.data);
                this.setList(data.data.map((id) => this.listItemBuilder(id)));
            }
        } finally {
            this.setLoading(false);
        }
    }
    async loadMoreByIds(ids) {
        const promise = this.fetchList(ids);
        this.cancelList.push(promise.cancel);
        const { data } = await promise;

        if (data.status !== -1) {
            this.updateList(data.data);
        }

        return data;
    }

    cancelSendingRequests() {
        this.cancelList.forEach((cancel) => cancel());
    }
}
export default ByFanStore;
