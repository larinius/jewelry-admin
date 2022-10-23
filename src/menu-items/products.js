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
            url: '/product/items',
            icon: icons.IconDiamond,
            breadcrumbs: false
        },
        {
            id: 'product-categories',
            title: 'Categories',
            type: 'item',
            url: '/product/categories',
            icon: icons.IconBoxMultiple,
            breadcrumbs: false
        },
        {
            id: 'product-brands',
            title: 'Brands',
            type: 'item',
            url: '/product/brands',
            icon: icons.IconTrademark,
            breadcrumbs: false
        }
    ]
};

export default products;
