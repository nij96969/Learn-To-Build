import { BharatPayAdapter, GooglePayAdapter, PaytmPayAdapter, RazorPayAdapter } from "./payment-adapter";
import { BharatPay, GooglePay, PaytmPay, RazorPay } from "./payment/payment-api";

const bharatPay = new BharatPay()
const bharatPayAdapter = new BharatPayAdapter(bharatPay)

bharatPayAdapter.pay(100)

const razorPay = new RazorPay()
const razorPayAdapter = new RazorPayAdapter(razorPay)

razorPayAdapter.pay(200)

const paytmPay = new PaytmPay()
const paytmPayAdapter = new PaytmPayAdapter(paytmPay)
paytmPayAdapter.pay(300)

const googlePay = new GooglePay()
const googlePayAdapter = new GooglePayAdapter(googlePay)

googlePayAdapter.pay(400)