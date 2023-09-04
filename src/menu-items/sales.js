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
        // {
        //     id: 'orders',
        //     title: 'Orders',
        //     type: 'group',
        //     icon: icons.IconReportMoney,
        //     breadcrumbs: true,
            
        //     children: [
        //         {
        //             id: 'new',
        //             title: 'Creatre new order',
        //             type: 'item',
        //             url: '/order/new',
        //             target: true
        //         },
        //         {
        //             id: 'item',
        //             title: 'Open order',
        //             type: 'item',
        //             url: '/order/item/:id',
        //             target: true
        //         },
        //     ]
        // },
        {
            id: 'sales-customers',
            title: 'Customers',
            type: 'item',
            url: '/user/list',
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
