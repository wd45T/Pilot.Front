import wait from 'utils/wait';
import moment from 'moment';

function getExportReportMethodName(methodName, reportType) {
    if (reportType === 'pdf') methodName += 'Pdf';

    return methodName;
}

const GENERIC_TYPES = {
    periodicity: 'ab9da2c2-3228-49ef-acbd-3cc99355b3c2',
    scheduleTypes: 'd8ff3d71-6d46-4c72-a279-920c26502d72',
};

export default (sender) => ({
    agents: {
        getList: () => sender.post('Agent/GetAgents'),
        getListFake: async () => {
            await wait(600);
            const agents = [];
            for (let i = 0; i < 100; i++) {
                agents.push({
                    id: i,
                    ipAddress: `${i + 10}`,
                    name: `Название агента ${i + 1}`,
                    maxExecutorsCount: i * 2,
                    stateName: i % 2 ? 'Активен' : 'Не активен',
                });
            }
            return { data: { agents } };
        },
        add: (data) => sender.post('Agent/CreateOrUpdate', data),
        delete: ({ id }) => sender.delete('Agent', { data: { id } }),
        update: (data) => sender.post('Agent/CreateOrUpdate', data),
    },
    launchHistory: {
        getList: async (filter) => {
            await wait(600);
            const items = [];
            for (let i = 0; i < 100; i++) {
                items.push({
                    id: i,
                    process: `Процесс ${i}`,
                    dateStart: moment()
                        .subtract(i, 'days')
                        .toISOString(),
                    dateEnd: moment().toISOString(),
                    status: i % 2 ? 'Активен' : 'Не активен',
                    reason: i % 3 ? '' : 'По расписанию',
                });
            }
            return { data: { items } };
        },
    },
    executors: {
        getList: (filter) => sender.post('Executor/GetExecutors', {}),
        byId: (id) => sender.post('Executor/GetById', { id }),
    },

    // TODO: подумать над названиями
    classifier: {
        getProcessStatusesList: async () => {
            await wait(600);
            return [
                { id: 1, name: 'Активный' },
                { id: 2, name: 'Завершенный' },
            ];
        },
        getRunReasonsList: async () => {
            await wait(600);
            return [
                { id: 1, name: 'Расписание' },
                { id: 2, name: 'Просто так' },
            ];
        },
        getSchedulesList: async () => {
            await wait(600);
            return [
                { id: 1, name: 'Расписание 1' },
                { id: 2, name: 'Расписание 2' },
            ];
        },
        getProcessList: async () => {
            const { data: result } = await sender.post(
                'WorkflowTemplate/GetWorkflowTemplates'
            );
            return result.workflowTemplates;
        },
        // когда будет бэк, все остальные методы classifier заменить на этот
        getGenericTypesList: async (parentId) => {
            const { data: result } = await sender.post(
                'GenericType/GetByParentId',
                {
                    parentId: GENERIC_TYPES[parentId],
                }
            );
            return result.genericTypes;
        },
    },
    processes: {
        getListFake: async () => {
            await wait(600);
            const processes = [];
            for (let i = 0; i < 50; i++) {
                let k = i + 1;
                if (k < 10) k = `0${k}`;
                processes.push({
                    id: i,
                    name: `Название процесса ${k}`,
                    schedulesInfo: i * 2,
                    stateName: i % 2 ? 'Активен' : 'Не активен',
                });
            }
            return { data: { processes } };
        },
    },
    customers: {
        getList: () => sender.post('Enterprise'),
        get: (id) => sender.post('Enterprise/GetById', { id }),

        getListFake: async () => {
            await wait(600);
            const customers = [];
            for (let i = 0; i < 100; i++) {
                customers.push({
                    id: i,
                    fullName: `Название клиента ${i + 1}`,
                    typeEnterprise: `Тип ${i + 1}`,
                    managerName: 'Иванов И.И.',
                    inn: `123234${i}`,
                    phoneFax: +71231231231,
                    email: 'qwe@qwe.qwe',
                });
            }
            console.log('data', customers);

            return { data: { customers } };
        },

        // update: (data) => sender.post('Schedule/CreateOrUpdate', data),
        // delete: (data) => sender.post('Schedule/Delete', data),
    },
});
