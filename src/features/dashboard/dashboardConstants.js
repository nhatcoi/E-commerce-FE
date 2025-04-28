import {
    LayoutDashboard,
    Users,
    ShoppingBag,
    LayoutGrid,
    ShoppingCart,
    Settings,
    BarChart3,
    Home,
    Gallery,
    FileBox,
    User,
    ScrollText,
    ListOrdered,
    Map
} from "lucide-react";

export const DASHBOARD_TEXTS = {
    MAIN_HOME: "MAIN HOME",
    ALL_PAGE: "ALL PAGE",
    COMPONENTS: "COMPONENTS",
    SETTING: "SETTING",
    SUPPORT: "SUPPORT",
    SIDEBAR: {
        DASHBOARD: "Dashboard",
        HOME: "Home",
        ECOMMERCE: "Ecommerce",
        CATEGORY: "Category",
        ATTRIBUTES: "Attributes",
        ORDER: "Order",
        USER: "User",
        ROLES: "Roles",
        GALLERY: "Gallery",
        REPORT: "Report",
        LOCATION: "Location",
        SETTING: "Setting",
        PAGES: "Pages",
        COMPONENTS: "Components"
    },
    STATS: {
        TOTAL_SALES: "Total Sales",
        TOTAL_INCOME: "Total Income",
        ORDERS_PAID: "Orders Paid",
        TOTAL_VISITOR: "Total Visitor"
    },
    SECTIONS: {
        RECENT_ORDER: "Recent Order",
        TOP_PRODUCTS: "Top Products",
        TOP_COUNTRIES: "Top Countries By Sales",
        VIEW_ALL: "View all",
        BEST_SHOP_SELLERS: "Best Shop Sellers",
        PRODUCT_OVERVIEW: "Product overview"
    },
    TABLE: {
        SHOP: "Shop",
        CATEGORIES: "Categories",
        TOTAL: "Total",
        STATUS: "Status",
        NAME: "Name",
        PRODUCT_ID: "Product ID",
        PRICE: "Price",
        QUANTITY: "Quantity",
        SALE: "Sale",
        REVENUE: "Revenue"
    }
};

export const DASHBOARD_NAVIGATION = {
    MAIN: [
        {name: DASHBOARD_TEXTS.SIDEBAR.DASHBOARD, href: "/dashboard", icon: LayoutDashboard},
        {
            name: DASHBOARD_TEXTS.SIDEBAR.HOME,
            icon: Home,
            children: [
                {name: "Home 01", href: "/dashboard/home/01"},
                {name: "Home 02", href: "/dashboard/home/02"},
                {name: "Home 03", href: "/dashboard/home/03"},
                {name: "Home 04", href: "/dashboard/home/04"},
                {name: "Home Boxed", href: "/dashboard/home/boxed"},
                {name: "Home Menu Icon Hover", href: "/dashboard/home/menu-icon-hover"},
                {name: "Home Menu Icon Default", href: "/dashboard/home/menu-icon-default"}
            ]
        }
    ],
    ALL_PAGES: [
        {
            name: DASHBOARD_TEXTS.SIDEBAR.ECOMMERCE,
            href: "/dashboard/ecommerce",
            icon: ShoppingCart
        },
        {
            name: DASHBOARD_TEXTS.SIDEBAR.CATEGORY,
            href: "/dashboard/categories",
            icon: LayoutGrid
        },
        {
            name: DASHBOARD_TEXTS.SIDEBAR.ATTRIBUTES,
            href: "/dashboard/attributes",
            icon: FileBox
        },
        {
            name: DASHBOARD_TEXTS.SIDEBAR.ORDER,
            href: "/dashboard/orders",
            icon: ListOrdered
        },
        {
            name: DASHBOARD_TEXTS.SIDEBAR.USER,
            href: "/dashboard/users",
            icon: User
        },
        {
            name: DASHBOARD_TEXTS.SIDEBAR.ROLES,
            href: "/dashboard/roles",
            icon: Users
        },
        {
            name: DASHBOARD_TEXTS.SIDEBAR.GALLERY,
            href: "/dashboard/gallery",
            icon: Gallery
        },
        {
            name: DASHBOARD_TEXTS.SIDEBAR.REPORT,
            href: "/dashboard/report",
            icon: ScrollText
        }
    ],
    SETTINGS: [
        {
            name: DASHBOARD_TEXTS.SIDEBAR.LOCATION,
            href: "/dashboard/location",
            icon: Map
        },
        {
            name: DASHBOARD_TEXTS.SIDEBAR.SETTING,
            href: "/dashboard/settings",
            icon: Settings
        },
        {
            name: DASHBOARD_TEXTS.SIDEBAR.PAGES,
            href: "/dashboard/pages",
            icon: FileBox
        }
    ],
    SUPPORT: [
        {
            name: DASHBOARD_TEXTS.SIDEBAR.COMPONENTS,
            href: "/dashboard/components",
            icon: LayoutGrid
        }
    ]
};