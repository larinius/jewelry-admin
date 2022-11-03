// assets
import { IconUsers, IconShoppingCart, IconReportMoney } from "@tabler/icons";

// constant
const icons = {
    IconReportMoney,
    IconShoppingCart,
    IconUsers,
};

// ==============================|| ORDERS MENU ITEMS ||============================== //

const commerce = {
    id: "commerce",
    title: "Orders and clients",
    type: "group",
    children: [
        {
            id: "orders",
            title: "Orders",
            type: "item",
            url: "/order/list",
            icon: icons.IconReportMoney,
            breadcrumbs: false,
        },
        {
            id: "clients",
            title: "Clients",
            type: "item",
            url: "/user/list",
            icon: icons.IconUsers,
            breadcrumbs: false,
        }
    ],
};

export default commerce;
