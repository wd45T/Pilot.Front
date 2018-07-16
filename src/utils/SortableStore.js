import { decorate, observable, action } from 'mobx';

class Sorter {
    by = null;
    direction = 'ASC';
    sortRules = {};

    constructor({ by = null, direction = 'ASC', sortRules = {} } = {}) {
        this.sortRules = sortRules;
        if (by !== this.by || direction !== this.direction) this.changeSort(by, direction);
    }

    changeSort = (by, direction) => {
        this.by = by;
        this.direction = direction;
    };

    resetSort = () => {
        this.by = null;
        this.direction = 'ASC';
    };

    sort = (a, b) => {
        if (!a.hasOwnProperty(this.by) || !b.hasOwnProperty(this.by)) {
            return 0;
        }

        if (this.sortRules.hasOwnProperty(this.by)) {
            if (this.direction === 'ASC') {
                return this.sortRules[this.by](a[this.by], b[this.by], a, b, this.by);
            }
            return this.sortRules[this.by](b[this.by], a[this.by], b, a, this.by);
        }

        const varA = typeof a[this.by] === 'string' ? a[this.by].toUpperCase() : a[this.by];
        const varB = typeof b[this.by] === 'string' ? b[this.by].toUpperCase() : b[this.by];

        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return this.direction === 'DESC' ? comparison * -1 : comparison;
    };
}

export default decorate(Sorter, {
    by: observable,
    direction: observable,
    changeSort: action,
    resetSort: action
});
