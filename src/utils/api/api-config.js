const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function getExportReportMethodName(methodName, reportType) {
    if (reportType === 'pdf')
        methodName += 'Pdf';

    return methodName;
}

export default (sender) => ({
    auth: {
        // login: (data) => sender.post('user/GetByLoginPassword', data),
        login: (data) => sender.post('user/Login', data),
        getCurrentUser: () => sender.get('user/Current'),
        changePassword: (data) => sender.put('user/Current/Password', data)
    },

    user: {
        get: (id) => {
            if (id) return sender.get(`user/${id}`);
            return sender.get('user');
        },
        create: (data) => sender.post('user', data),
        update: (id, data) => sender.put(`user/${id}`, data),
        changePasswordByAdmin: (data) => sender.put(`user/${data.id}/Password`, data),
        toggleAdminRights: (id, admin) =>
            sender.put(`user/${id}/Rights`, { id, admin, test: 'hdsgfjdsfgjh' }),
        delete: (id) => sender.delete(`user/${id}`)
    },

    report: {
        getByVestibules: ({ stationIds, ...params }) =>
            sender.post(
                `report/GetDataByVestibules`,
                { managedObjectsIdList: stationIds },
                { params }
            ),
        getByTickets: ({ stationIds, ...params }) =>
            sender.post(
                'report/GetDataByTickets',
                { managedObjectsIdList: stationIds },
                { params }
            ),
        getMonitoring: ({ stationIds, ...params }) =>
            sender.post(
                'report/GetMonitoringByTicketType',
                { managedObjectsIdList: stationIds },
                { params }
            ),
        getVestibulesExcel: ({ reportType, stationIds, ...params }) => {
            const method = getExportReportMethodName('ExportReportByVestibules', reportType);

            return sender.post(
                'report/' + method,
                { managedObjectsIdList: stationIds },
                { params, responseType: 'blob' }
            );
        },
        getTicketsExcel: ({ reportType, stationIds, ...params }) => {
            const method = getExportReportMethodName('ExportReportByTickets', reportType);

            return sender.post(
                'report/' + method,
                { managedObjectsIdList: stationIds },
                { params, responseType: 'blob' }
            );
        },
        getMonitoringExcel: ({ reportType, stationIds, ...params }) => {
            const method = getExportReportMethodName('ExportMonitoringByTicketType', reportType);

            return sender.post(
                'report/' + method,
                { managedObjectsIdList: stationIds },
                { params, responseType: 'blob' }
            );
        }
    },
    dashboard: {
        getByStation: (params) =>
            sender.get('Statistics/GetPassengerTrafficBy5Minutes', {
                params
            }),
        getByStadium: (params) =>
            sender.get('Statistics/GetPassengerTrafficByStadium', {
                params
            })
    },

    whiteList: function(controller = 'OverallWhitelistItem/') {
        return {
            getLists: ({ ids = [], ...params }) =>
                sender.post(controller + 'GetWhitelistsByFilter', ids, {
                    params
                }),
            delete: (listId) => sender.delete(controller + 'DeleteList', {
                params: { listId }
            }),
            getListByFilter: (listId, { ids = [], ...params }) =>
                sender.post(controller + 'GetByFilter', ids, {
                    params: { listId, ...params }
                }),
            deleteById: (id) => sender.post(controller + 'SetDeleteDate', [id]),
            uploadFile: ({ file }) => {
                const formData = new FormData();
                formData.append('file', file);
                return sender.post(controller + 'LoadFromCsv', formData);
            }
        };
    }(),
    metroPlan: {
        getTree: () => sender.get('MetroPlan/GetObjectsTree'),
        getUhfTree: (maxLevel = 3) =>
            sender.get('MetroPlan/GetUhfObjectsTree', { params: { maxLevel } }),
        getStadiumList: () => sender.get('MetroPlan/GetStadiumList')
    },
    pass: {
        getListByFilter: ({ ids, periodStart, periodEnd, desc = false, idData, orderBy = null }) =>
            sender.post(
                `Pass/GetPassListByFilter`,
                {
                    ids,
                    managedObjectsIdList: idData
                },
                {
                    params: {
                        periodStart: periodStart !== null ? periodStart : undefined,
                        periodEnd: periodEnd !== null ? periodEnd : undefined,
                        orderBy: orderBy !== null ? orderBy : undefined,
                        desc
                    }
                }
            ),
        getExcel: ({ periodStart, periodEnd, desc = false, idData, orderBy = null }) =>
            sender.post(
                `Pass/ExportToExcelByFilter`,
                {
                    managedObjectsIdList: idData
                },
                {
                    params: {
                        periodStart: periodStart !== null ? periodStart : undefined,
                        periodEnd: periodEnd !== null ? periodEnd : undefined,
                        orderBy: orderBy !== null ? orderBy : undefined,
                        desc
                    },
                    responseType: 'blob',
                    headers: {
                        Accept: 'application/vnd.ms-excel'
                    }
                }
            ),
        getById: (id) => sender.get('Pass/GetById', { params: { id } }),
        getByFanId: (fanId, ids) => sender.post('Pass/GetByFanId', ids || {}, { params: { fanId } })
    },
    telemetry: {
        getLastStatesTree: () => sender.get('Telemetry/GetObjectCurrentStatesTree'),
        getLastStatesById: (parentId) =>
            sender.get('Telemetry/GetObjectCurrentStates', { params: { parentId } })
    },
    emails: {
        getList: () => sender.get('Email/GetEmails'),
        insert: (address) => sender.post('Email/InsertEmail', { address }),
        delete: (id) => sender.delete('Email/DeleteEmail', { params: { id } })
    },
    versions: {
        getList: () => sender.get('Version/GetList'),
        insert: ({ number, file }) => {
            const formData = new FormData();
            formData.append('number', number);
            formData.append('file', file);
            return sender.post('Version/LoadVersion', formData);
        },
        getFile: (id) => sender.get('Version/GetVersion', { params: { id }, responseType: 'blob' })
    },
    devices: {
        getList: () => sender.get('Version/GetDeviceVersions')
    },
    visitors: {
        getListByFilter: ({ ids, periodStart, periodEnd, desc = false, idData, orderBy = null }) =>
            sender.post(
                `StationVisitors/GetVisitorsByFilter`,
                {
                    ids,
                    managedObjectsIdList: idData
                },
                {
                    params: {
                        periodStart: periodStart !== null ? periodStart : undefined,
                        periodEnd: periodEnd !== null ? periodEnd : undefined,
                        orderBy: orderBy !== null ? orderBy : undefined,
                        desc
                    }
                }
            ),
        getExcel: ({ ids, periodStart, periodEnd, desc = false, idData, orderBy = null }) =>
            sender.post(
                `StationVisitors/ExportToExcelByFilter`,
                {
                    ids,
                    managedObjectsIdList: idData
                },
                {
                    params: {
                        periodStart: periodStart !== null ? periodStart : undefined,
                        periodEnd: periodEnd !== null ? periodEnd : undefined,
                        orderBy: orderBy !== null ? orderBy : undefined,
                        desc
                    },
                    responseType: 'blob',
                    headers: {
                        Accept: 'application/vnd.ms-excel'
                    }
                }
            ),
        getById: (id) => sender.get('StationVisitors/GetById', { params: { id } }),

        getByFanId: (fanId, ids) =>
            sender.post('StationVisitors/GetByFanId', ids || {}, { params: { fanId } })
    },
    overallVisitors: {
        getListByFilter: ({ markId, ids, periodStart, periodEnd, desc = false, orderBy = null }) =>
            sender.post(
                `OverallVisitors/GetOverallPassByFanFilter`,
                {
                    ids
                },
                {
                    params: {
                        id: markId,
                        periodStart: periodStart || undefined,
                        periodEnd: periodEnd || undefined,
                        orderBy: orderBy || undefined,
                        desc: orderBy ? desc : undefined
                    }
                }
            ),
        getExcel: ({ markId, ids, periodStart, periodEnd, desc = false, orderBy = null }) =>
            sender.post(
                `OverallVisitors/ExportToExcelByFilter`,
                {
                    ids
                },
                {
                    params: {
                        id: markId,
                        periodStart: periodStart || undefined,
                        periodEnd: periodEnd || undefined,
                        orderBy: orderBy || undefined,
                        desc: orderBy ? desc : undefined
                    },
                    responseType: 'blob',
                    headers: {
                        Accept: 'application/vnd.ms-excel'
                    }
                }
            )
    },
    turnstiles: {
        setState: (state) => sender.put('Turnstiles/State', null, { params: { state } }),
        getState: () => sender.get('Turnstiles/State')
    }
});
