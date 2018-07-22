import Customers from './pages/customers';
import DealsView from './pages/deals';

export default [
    {
        alias: 'customers',
        to: '/customers',
        icon: 'team',
        text: 'Клиенты',
        component: Customers,
        exact: true,
    },
    {
        alias: 'deals',
        to: '/deals ',
        icon: 'solution',
        text: 'Сделки',
        component: DealsView,
        exact: true,
    },
];
