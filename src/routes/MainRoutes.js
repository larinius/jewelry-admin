import { lazy } from "react";

// project imports
import MainLayout from "layout/MainLayout";
import Loadable from "ui-component/Loadable";

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import("views/dashboard/Default")));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import("views/utilities/Typography")));
const UtilsColor = Loadable(lazy(() => import("views/utilities/Color")));
const UtilsShadow = Loadable(lazy(() => import("views/utilities/Shadow")));
const UtilsMaterialIcons = Loadable(lazy(() => import("views/utilities/MaterialIcons")));
const UtilsTablerIcons = Loadable(lazy(() => import("views/utilities/TablerIcons")));

const ProductList = Loadable(lazy(() => import("views/products/ProductList")));
const CategoriesList = Loadable(lazy(() => import("views/categories/CategoriesList")));
const BrandsList = Loadable(lazy(() => import("views/brands/BrandsList")));
const CartsList = Loadable(lazy(() => import("views/carts/CartsList")));
const CustomersList = Loadable(lazy(() => import("views/customers/CustomersList")));
const OrdersList = Loadable(lazy(() => import("views/orders/OrdersList")));

// sample page routing
const SamplePage = Loadable(lazy(() => import("views/sample-page")));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: "/",
    element: <MainLayout />,
    children: [
        {
            path: "/",
            element: <DashboardDefault />,
        },
        {
            path: "dashboard",
            children: [
                {
                    path: "default",
                    element: <DashboardDefault />,
                },
            ],
        },
        {
            path: "products",
            children: [
                {
                    path: "items",
                    element: <ProductList />,
                },
            ],
        },
        {
            path: "products",
            children: [
                {
                    path: "categories",
                    element: <CategoriesList />,
                },
            ],
        },
        {
            path: "products",
            children: [
                {
                    path: "brands",
                    element: <BrandsList />,
                },
            ],
        },
        {
            path: "sales",
            children: [
                {
                    path: "carts",
                    element: <CartsList />,
                },
            ],
        },
        {
            path: "sales",
            children: [
                {
                    path: "customers",
                    element: <CustomersList />,
                },
            ],
        },
        {
            path: "sales",
            children: [
                {
                    path: "orders",
                    element: <OrdersList />,
                },
            ],
        },
        {
            path: "sample-page",
            element: <SamplePage />,
        },
        {
            path: "product-list",
            element: <ProductList />,
        },
    ],
};

export default MainRoutes;
