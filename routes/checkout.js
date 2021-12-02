const express = require('express');
const router = express.Router();
const braintree = require('braintree');

router.post('/', (req, res, next) => {
    const gateway = new braintree.BraintreeGateway({
        environment: braintree.Environment.Sandbox,
        merchantId: '7c2b6vwtqz2z38zm',
        publicKey: 'jz9vzwrkt5f8nhth',
        privateKey: '5b0ff1974c3bf8ebd94ab143b15cc610'
    });
    // use the payment method nonce
    const nonceFromTheClient = req.body.paymentMethodNonce;

    // create a new transaction for $10
    const newTransaction = gateway.transaction.sale({
        amount: '10.00',
        paymentMethodNonce: nonceFromTheClient,
        options: {
            // This option request the funds from the transaction
            // once it has ben authorized successfully
            submitForSettlement: true
        }
    }, (error, result) => {
        if(result) {
            res.send(result);
        } else {
            res.status(500).send(error);
        }
    });
});


module.exports = router;