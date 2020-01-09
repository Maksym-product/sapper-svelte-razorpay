const crypto = require('crypto');

export function post(req, res, next) {
    let key_secret = 'bvkwZhEGVMOpdnbrsWRZxMpx'
    let razorpay_order_id = req.body.order_id
    let razorpay_payment_id = req.body.payment_id
    let razorpay_signature = req.body.signature
    console.log(req.body)
    const hmac = crypto.createHmac('sha256', key_secret);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    let generated_signature = hmac.digest('hex');
    console.log(generated_signature)
    let isSignatureValid = generated_signature == razorpay_signature;
    res.send(isSignatureValid)
}