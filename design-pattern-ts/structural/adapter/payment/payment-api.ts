export class BharatPay {
    payWithBharatPay(amount: number, currency: string) {
        console.log(`BharatPay: ${amount} ${currency}`)
    }
}

export class RazorPay {
    payWithRazorPay(amount: number, currency: string) {
        console.log(`RazorPay: ${amount} ${currency}`)
    }
}

export class PaytmPay {
    payWithPaytmPay(amount: number, currency: string) {
        console.log(`PaytmPay: ${amount} ${currency}`)
    }
}

export class GooglePay {
    payWithGooglePay(amount: number, currency: string) {
        console.log(`GooglePay: ${amount} ${currency}`)
    }
}