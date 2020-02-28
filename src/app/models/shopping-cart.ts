export interface ShoppingCart {
    _id: string,
    items: [{
        _id: string,
        product: {
            title: string,
            price: number
        },
        quantity: number
    }]
}
