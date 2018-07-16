import { action, observable, decorate } from 'mobx';
import moment from 'moment';

class PassMapListItem {
    branchName = '';
    markId = '';
    passData = '';
    stationName = '';
    vestibuleName = '';
    isLoaded = false;

    constructor(id) {
        this.id = id;
    }

    fillData(data) {
        const { passDate, ...otherData } = data;
        Object.assign(this, otherData, {
            passDate: passDate ? moment(passDate).format('DD.MM.YYYY HH:mm:ss') : null,
            isLoaded: true
        });
    }
}
// Чистый класс
export { PassMapListItem };

export default decorate(PassMapListItem, {
    branchName: observable,
    markId: observable,
    passData: observable,
    stationName: observable,
    vestibuleName: observable,
    isLoaded: observable,
    fillData: action
});
