import { IPaymentAdapter } from "./interfaces/paymet-adapter";
import { BharatPay, GooglePay, PaytmPay, RazorPay } from "./payment/payment-api";

export class BharatPayAdapter implements IPaymentAdapter {

    constructor(private bharatPay: BharatPay) {
    }

    pay(amount: number) {
        this.bharatPay.payWithBharatPay(amount)
    }
}

export class RazorPayAdapter implements IPaymentAdapter {

    constructor(private razorPay: RazorPay) {
    }

    pay(amount: number) {
        this.razorPay.payWithRazorPay(amount)
    }
}

export class PaytmPayAdapter implements IPaymentAdapter {

    constructor(private paytmPay: PaytmPay) {
    }

    pay(amount: number) {
        this.paytmPay.payWithPaytmPay(amount)
    }
}

export class GooglePayAdapter implements IPaymentAdapter {

    constructor(private googlePay: GooglePay) {
    }

    pay(amount: number) {
        this.googlePay.payWithGooglePay(amount)
    }
}