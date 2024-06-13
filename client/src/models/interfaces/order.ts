export interface IOrderResponse {
    paymentMethod: string,
    stripeCustomerId: string,
    email: string,
    level: number,
    orderDate: string,
    activeUntil: string,
    isPaymentSuccess: boolean,
    renewStatus: boolean,
    transactionId: string,
    amount: number,
    currency: string,
    isCancelling: boolean,
    isActive: boolean
}


export interface IExistingOrderResData {
    _id: string
}