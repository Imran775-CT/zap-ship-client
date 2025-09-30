import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { useParams } from "react-router-dom";
import PaymentForm from "./PaymentForm";
const stripePromise = loadStripe(import.meta.env.VITE_payment_Key);

const Payment = () => {
    const { parcelId } = useParams();
    console.log(parcelId);

    return (
        <Elements stripe={stripePromise}>
            <PaymentForm></PaymentForm>
        </Elements>
    );
};

export default Payment;
