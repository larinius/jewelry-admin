// assets
import { IconUsers, IconShoppingCart, IconReportMoney } from "@tabler/icons";

// constant
const icons = {
    IconReportMoney,
    IconShoppingCart,
    IconUsers,
};

// ==============================|| ORDERS MENU ITEMS ||============================== //

const orders = {
    id: "orders",
    title: "Orders",
    type: 'group',
    children: [
        {
            id: "orders-group",
            title: "Orders",
            type: 'collapse',
            icon: icons.IconReportMoney,
            breadcrumbs: true,

            children: [
                {
                    id: "order-list",
                    title: "Orders list",
                    type: "item",
                    url: "/order/list",
                    breadcrumbs: true,
                },
                {
                    id: "order-new",
                    title: "Create new order",
                    type: "item",
                    url: "/order/new",
                    breadcrumbs: true,
                },
            ],
        },
    ],
};

export default orders;
