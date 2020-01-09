const Razorpay = require('razorpay')

export function post(req, res, next) {
    CreateOrder(req,res);
}

function CreateOrder(req, res) {
    var OrderID;
    var instance = new Razorpay({
        key_id: 'rzp_test_6hU64GtcNIjENJ',
        key_secret: 'bvkwZhEGVMOpdnbrsWRZxMpx'
    })
    var options = {
        amount: req.body.amount,
        receipt: req.body.receipt,
        currency: "INR",
        payment_capture: '0'
    }
    instance.orders.create(options, function (err, order) {
        res.send(order)
    })
}