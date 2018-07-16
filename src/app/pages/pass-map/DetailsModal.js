import React from 'react';
import moment from 'moment';

const DetailsModal = ({ branchName, dateRecorded, passDate, stationName, vestibuleName }) => (
    <div className="pass__details">
        <p>
            <strong>Название ветки:</strong>
            <span>{branchName}</span>
        </p>
        <p>
            <strong>Название станции:</strong>
            <span>{stationName}</span>
        </p>
        <p>
            <strong>Название вестибюля:</strong>
            <span>{vestibuleName}</span>
        </p>
        <p>
            <strong>Дата загрузки в БД:</strong>
            <span>{dateRecorded ? moment(dateRecorded).format('DD.MM.YYYY HH:mm:ss') : ''}</span>
        </p>
        <p>
            <strong>Дата прохода:</strong>
            <span>{passDate ? moment(passDate).format('DD.MM.YYYY HH:mm:ss') : ''}</span>
        </p>
    </div>
);

export default DetailsModal;
