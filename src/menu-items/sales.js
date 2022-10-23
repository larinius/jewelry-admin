// assets
import { IconUsers, IconShoppingCart, IconReportMoney } from '@tabler/icons';

// constant
const icons = {
    IconReportMoney,
    IconShoppingCart,
    IconUsers
};

// ==============================|| SALES MENU ITEMS ||============================== //

const sales = {
    id: 'sales',
    title: 'Sales',
    type: 'group',
    children: [
        {
            id: 'sales-orders',
            title: 'Orders',
            type: 'item',
            url: '/sales/orders',
            icon: icons.IconReportMoney,
            breadcrumbs: true
        },
        {
            id: 'sales-customers',
            title: 'Customers',
            type: 'item',
            url: '/sales/customers',
            icon: icons.IconUsers,
            breadcrumbs: true
        },
        {
            id: 'sales-carts',
            title: 'Carts',
            type: 'item',
            url: '/sales/carts',
            icon: icons.IconShoppingCart,
            breadcrumbs: true
        }
    ]
};

export default sales;
