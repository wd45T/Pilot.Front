import { observable, action, decorate } from 'mobx';
import LoadableStore from 'utils/LoadableStore';

class BaseTableStore {
    list = [];

    loader = new LoadableStore();

    fetchList = () => new Promise((resolve) => resolve([]));

    setList(list) {
        this.list.replace(list);
    }

    loadList = () => {
        this.loader.setLoading(true);
        // Сбросим список, чтобы на его месте рисовался загрузчик
        this.setList([]);
        this.fetchList()
            .then((list) => {
                this.setList(list);
                this.loader.setLoading(false);
            })
            .catch((error) => {
                this.loader.setLoading(false);
                return Promise.reject(error);
            });
    };

    loadInChain = (dataFromChain) => {
        this.loadList();
        return dataFromChain;
    };
}

export default decorate(BaseTableStore, {
    list: observable,
    setList: action
});
