import Customers from './pages/customers';
import Contracts from './pages/contracts';

export default [ 
    {
    alias: 'customers',
    to: '/customers',
    icon: 'team',
    text: 'Клиенты',
    component: Customers,
    exact: true
},
{
    alias: 'contracts',
    to: '/contracts ',
    icon: 'solution',
    text: 'Сделки',
    component: Contracts,
    exact: true
},
];
