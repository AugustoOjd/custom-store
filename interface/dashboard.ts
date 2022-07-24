


export interface DashboardSummaryResponse {
    numberOfOrders: number,
    paidOrders: number,
    numberOfClients: number,
    numberOfProducts: number,
    productsWithNoInvetory: number,
    lowInventory: number
    notPaidOrders: number
}