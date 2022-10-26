// assets
import { IconDiamond, IconBoxMultiple, IconTrademark } from '@tabler/icons';

// constant
const icons = {
    IconDiamond,
    IconBoxMultiple,
    IconTrademark
};

// ==============================|| PRODUCTS MENU ITEMS ||============================== //

const products = {
    id: 'products',
    title: 'Products',
    type: 'group',
    children: [
        {
            id: 'product-items',
            title: 'Products',
            type: 'item',
            url: '/product/list',
            icon: icons.IconDiamond,
            breadcrumbs: true
        },
        {
            id: 'product-categories',
            title: 'Categories',
            type: 'item',
            url: '/category/list',
            icon: icons.IconBoxMultiple,
            breadcrumbs: true
        },
        {
            id: 'product-brands',
            title: 'Brands',
            type: 'item',
            url: '/brand/list',
            icon: icons.IconTrademark,
            breadcrumbs: true
        }
    ]
};

export default products;
