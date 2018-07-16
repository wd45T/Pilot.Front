import moment from 'moment';
import { action, observable, decorate } from 'mobx';
import api from 'utils/api';
import LoadableStore from 'utils/LoadableStore';
import { formatDateTime } from 'utils/datetime';

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

class CustomersStore {
    listLoader = new LoadableStore();
    list = [];

    setList(list) {
        Object.assign(this.list, list.map(item => ({
            ...item,
            updateDate: formatDateTime(item.updateDate),
            whitelistUpdateDate: formatDateTime(item.whitelistUpdateDate)
        })));
    }

    async loadList() {
        this.listLoader.setLoading(true);
        try {
            const { data } = await api.devices.getList();
            this.setList(data.data);
        } finally {
            this.listLoader.setLoading(false);
        }
    }
}

export default decorate(DeviceStore, {
    list: observable,
    setList: action,
    addToList: action
});
