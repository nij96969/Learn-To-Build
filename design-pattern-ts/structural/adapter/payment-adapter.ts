import { IPaymentAdapter } from "./interfaces/paymet-adapter";
import { BharatPay, GooglePay, PaytmPay, RazorPay } from "./payment/payment-api";

export class BharatPayAdapter implements IPaymentAdapter {

    constructor(private bharatPay: BharatPay) {
    }

    pay(amount: number, currency: string) {
        this.bharatPay.payWithBharatPay(amount, currency)
    }
}

export class RazorPayAdapter implements IPaymentAdapter {

    constructor(private razorPay: RazorPay) {
    }

    pay(amount: number, currency: string) {
        this.razorPay.payWithRazorPay(amount, currency)
    }
}

export class PaytmPayAdapter implements IPaymentAdapter {

    constructor(private paytmPay: PaytmPay) {
    }

    pay(amount: number, currency: string) {
        this.paytmPay.payWithPaytmPay(amount, currency)
    }
}

export class GooglePayAdapter implements IPaymentAdapter {

    constructor(private googlePay: GooglePay) {
    }

    pay(amount: number, currency: string) {
        this.googlePay.payWithGooglePay(amount, currency)
    }
}