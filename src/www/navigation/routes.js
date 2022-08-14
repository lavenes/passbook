export const routes = {
    HOME: '/',
    SETTINGS: '/settings',
    PRODUCT: {
        MARKET: '/products',
        INFORMATION: {
            TICKET: '/tickets/:ticketId',
            ITEM: '/items/:itemId',
        },
        CATEGORY: {
            LIST: '/products/categories/:categoryId',
            PRODUCT_INFORMATION: '/products/categories/:categoryId/:productId',
        }
    }
};