export const routes = {
    HOME: '/',
    QR_SCAN: '/qr_scan',
    SETTINGS: '/settings',
    PRODUCT: {
        CREATE: '/product/create',
        MARKET: '/products',
        INFORMATION: {
            TICKET: '/tickets/:ticketId',
            ITEM: '/items/:itemId',
        },
        CATEGORY: {
            OWNED: '/products/categories/owned/:categoryId',
            LIST: '/products/categories/:categoryId',
        }
    },
    PROFILE: '/users/:principalId',
    PERMISSION: '/permission'
};