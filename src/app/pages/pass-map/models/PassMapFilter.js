import { observable, action, computed, decorate } from 'mobx';

class PassMapFilter {
    periodStart = null;
    periodEnd = null;
    idData = [];
    ids = [];
    desc = false;
    orderBy = null;
    markId = null;

    get sortDirection() {
        return this.desc ? 'DESC' : 'ASC';
    }

    fillFilter({ dateStart = null, dateEnd = null, nodeData, markId }) {
        this.periodEnd = dateEnd;
        this.periodStart = dateStart;
        this.idData.replace(nodeData);
        this.markId = markId;
    }

    setIds(ids) {
        this.ids = ids;
    }

    setForSort(sortBy, sortDirection) {
        this.resetIds();
        this.orderBy = sortBy;
        this.desc = sortDirection === 'DESC';
    }

    resetIds() {
        this.ids = [];
    }

    get isEmpty() {
        return !this.idData || this.idData.length === 0;
    }

    get raw() {
        return {
            periodStart: this.periodStart,
            periodEnd: this.periodEnd,
            idData: this.idData,
            markId: this.markId
        };
    }

    get forRequest() {
        return {
            ...this,
            periodStart: this.periodStart ? this.periodStart.toISOString() : null,
            periodEnd: this.periodEnd ? this.periodEnd.toISOString() : null
        };
    }
}

// Класс, обвязанный mobx
export default decorate(PassMapFilter, {
    desc: observable,
    orderBy: observable,
    sortDirection: computed,
    fillFilter: action,
    isEmpty: computed,
    idData: observable,
    setForSort: action,
    markId: observable
});
