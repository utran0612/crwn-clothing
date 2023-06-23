//attach all the secrets keys in .env file to process env
require("dotenv").config()

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

// serverless function
// create a handler that request a payment intent to the backend
exports.handler = async (event) => {
    try {
        const { amount } = JSON.parse(event.body)

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
            payment_method_types: ['card'],
        })

        return {
            statusCode: 200,
            body: JSON.stringify({paymentIntent})
        }
    } catch (error) {
        console.log({error})

        return {
            status: 400,
            body: JSON.stringify({error}),
        }
    }
}