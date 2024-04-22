const Razorpay = require('razorpay');
const crypto = require('crypto');
const KEY_ID = 'rzp_test_5GbJWB2fyG8G7w';
const KEY_SECRET = 'wBJ3qhyFBNcoN0e2M2yTrnUy';
let instance = new Razorpay({
    key_id: KEY_ID,
    key_secret: KEY_SECRET,
  });
const PaymentController = {
    createOrder: (request,response)=>{
        let {amount} = request.body;
        let options = {
            amount: amount * 100,  // amount in the smallest currency unit
            currency: "INR",
            receipt: "order_rcptid_11"
          };
          instance.orders.create(options, function(err, order) {
            if(err){
                response.status(500).send({
                    status:false,
                    message:'Payment not able to do'
                });
            }
            else{
                response.send({
                    status:true,
                    order
                });
            }
          });
    },
    veryfyPayment: (request,response)=>{ 
        const {payment_id,order_id,signature} = request.body;
        let payDetails = order_id + "|" + payment_id
        generated_signature = crypto
        .createHmac('sha256',KEY_SECRET)
        .update(payDetails.toString())
        .digest('hex');

        console.log('generated_sig',generated_signature);
        console.log('client_sig',signature);

        if (generated_signature == signature) {
          response.send({
            status:true,
            message:'payment Done'
          })
        }
        else{
            response.send({
                status:false,
                message:'payment Fail'
            })
        }
    },
}
module.exports = PaymentController;