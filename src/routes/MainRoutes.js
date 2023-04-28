import { lazy } from "react";

// project imports
import MainLayout from "layout/MainLayout";
import Loadable from "ui-component/Loadable";
import AuthGuard from 'utils/route-guard/AuthGuard';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import("views/dashboard/Default")));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import("views/utilities/Typography")));
const UtilsColor = Loadable(lazy(() => import("views/utilities/Color")));
const UtilsShadow = Loadable(lazy(() => import("views/utilities/Shadow")));
const UtilsMaterialIcons = Loadable(lazy(() => import("views/utilities/MaterialIcons")));
const UtilsTablerIcons = Loadable(lazy(() => import("views/utilities/TablerIcons")));

const ProductList = Loadable(lazy(() => import("views/product/ProductList")));
const ProductItem = Loadable(lazy(() => import("views/product/ProductItem")));
const CategoriesList = Loadable(lazy(() => import("views/category/CategoryList")));
const CategoryItem = Loadable(lazy(() => import("views/category/CategoryItem")));
const BrandsList = Loadable(lazy(() => import("views/brand/BrandsList")));
const BrandItem = Loadable(lazy(() => import("views/brand/BrandItem")));
const CartsList = Loadable(lazy(() => import("views/carts/CartsList")));
const CustomersList = Loadable(lazy(() => import("views/customer/CustomersList")));
const CustomerItem = Loadable(lazy(() => import("views/customer/CustomerItem")));
const OrdersList = Loadable(lazy(() => import("views/order/OrdersList")));
const OrderItem = Loadable(lazy(() => import("views/order/OrderItem")));
const OrderNew = Loadable(lazy(() => import("views/order/OrderNew")));
const SettingsList = Loadable(lazy(() => import("views/settings/SettingsList")));

// sample page routing
const SamplePage = Loadable(lazy(() => import("views/sample-page")));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: "/",
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
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
            path: "user",
            children: [
                {
                    path: "list",
                    element: <CustomersList />,
                },
            ],
        },
        {
            path: "user",
            children: [
                {
                    path: "item/:id",
                    element: <CustomerItem />,
                },
            ],
        },
        {
            path: "product",
            children: [
                {
                    path: "list",
                    element: <ProductList />,
                },
            ],
        },
        {
            path: "product",
            children: [
                {
                    path: "item/:id",
                    element: <ProductItem />,
                },
            ],
        },
        {
            path: "category",
            children: [
                {
                    path: "list",
                    element: <CategoriesList />,
                },
            ],
        },
        {
            path: "category",
            children: [
                {
                    path: "item/:id",
                    element: <CategoryItem />,
                },
            ],
        },
        {
            path: "brand",
            children: [
                {
                    path: "list",
                    element: <BrandsList />,
                },
            ],
        },
        {
            path: "brand",
            children: [
                {
                    path: "item/:id",
                    element: <BrandItem />,
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
            path: "order",
            children: [
                {
                    path: "list",
                    element: <OrdersList />,
                },
            ],
        },
        {
            path: "order",
            children: [
                {
                    path: "item/:id",
                    element: <OrderItem />,
                },
            ],
        },
        {
            path: "order",
            children: [
                {
                    path: "new",
                    element: <OrderNew />,
                },
            ],
        },
        {
            path: "order",
            children: [
                {
                    path: "item/:id",
                    element: <OrderItem />,
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
        {
            path: "settings",
            children: [
                {
                    path: "list",
                    element: <SettingsList />,
                },
            ],
        },
    ],
};

export default MainRoutes;
