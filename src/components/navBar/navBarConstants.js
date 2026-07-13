import * as Icons from "../../shared/icons";

export const getAvatarOptions = (onLoginClick) => [
    { text: "Iniciar sesión", icon: Icons.LoginIcon, action: onLoginClick },
    { text: "Perfil", icon: Icons.PersonIcon, url: "/profile", requiresAuth: true },
    { text: "Mi carrito", icon: Icons.ShoppingCartIcon, url: "/checkout", requiresAuth: true },
    { text: "Mis compras", icon: Icons.LocalMallIcon, url: "/orders", requiresAuth: true },
];

export const CATEGORIES_OPTIONS = [
    { text: "Bebidas", icon: Icons.BottleIcon, url: "/category/bebidas" },
    { text: "Licores", icon: Icons.LiquorIcon, url: "/category/licores" },
    { text: "Snacks", icon: Icons.SnackIcon, url: "/category/snacks" },
    { text: "Golosinas", icon: Icons.CandyIcon, url: "/category/golosinas" },
    { text: "Helados", icon: Icons.IceCreamIcon, url: "/category/helados" },
];

export const socialNetworks = [
    { name: "Facebook", url: "https://www.facebook.com/JCEV.TITO?locale=es_LA", icon: Icons.FacebookIcon },
    { name: "Instagram", url: "https://instagram.com", icon: Icons.InstagramIcon },
    { name: "TikTok", url: "https://www.tiktok.com/@minimarket_jordan", icon: Icons.TiktokIcon },
];

export const menuItems = [
    { text: "Inicio", icon: Icons.HomeIcon, url: "/dashboard" },
    { text: "Registrar Empleados", icon: Icons.PeopleIcon, url: "/registerEmployee" },
    { text: "Ver Delivery Activos", icon: Icons.LocalShippingIcon, url: "/activeDeliveries" },
    { text: "Agregar al Catálogo", icon: Icons.AddCircleIcon, url: "/addCatalog" },
];