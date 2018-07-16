import moment from 'moment';

export function formatTime(timeString) {
    timeString = timeString || '00:00:00';
    const lastTwoChars = timeString.slice(-2).toLowerCase();
    const am = lastTwoChars === 'am';
    const pm = lastTwoChars === 'pm';

    if (pm || am)
        timeString = timeString.slice(0, -2);

    const time = moment(timeString, 'H:mm');

    if (pm && time.get('hour') !== 12)
        time.add(12, 'hours');
    else if (am && time.get('hour') === 12)
        time.subtract(12, 'hours');

    return time.format('H:mm');
}

export function formatDateTime(dateTime) {
    return moment(dateTime).format('DD.MM.YYYY HH:mm:ss');
}