import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState("");
    const { parcelId } = useParams();
    const { user } = useAuth();
    const axiosSecure = UseAxiosSecure();
    const navigate = useNavigate();
    const { isPending, data: parcelInfo = {} } = useQuery({
        queryKey: ["parcels", parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`);
            return res.data;
        },
    });
    if (isPending) {
        return "loading...";
    }

    const amount = parcelInfo.baseCost;
    const amountInCents = amount * 100;
    console.log(amountInCents);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (!card) {
            return;
        }
        // step-1: validate the card
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });
        if (error) {
            setError(error.message);
        } else {
            setError("");
            console.log("Payment Method", paymentMethod);
            // steps -2 : create payment intent
            const res = await axiosSecure.post(
                "http://localhost:5000/create-payment-intent",
                {
                    amountInCents,
                    parcelId,
                }
            );

            const clientSecret = res.data.clientSecret;

            // step-3: confirm payment
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: user.displayName,
                        email: user.email,
                    },
                },
            });

            if (result.error) {
                setError(result.error.message);
            } else {
                setError("");
                if (result.paymentIntent.status === "succeeded") {
                    console.log("Payment succeeded!");
                    const transactionId = result.paymentIntent.id;
                    // step-4: mark parcel paid also create payment history
                    const paymentData = {
                        parcelId,
                        email: user.email,
                        amount,
                        transactionId: transactionId,
                        paymentMethod:
                            result.paymentIntent.payment_method_types,
                    };
                    const paymentRes = await axiosSecure.post(
                        "/payments",
                        paymentData
                    );

                    if (paymentRes.data.insertedId) {
                        console.log("payment successfully ");

                        Swal.fire({
                            title: "Payment Successful 🎉",
                            html: `
          <p>Your transaction was completed successfully.</p>
          <p><b>Transaction ID:</b> ${
              res.data.transactionId || transactionId
          }</p>
        `,
                            icon: "success",
                            confirmButtonText: "Go to My Parcels",
                            confirmButtonColor: "#3085d6",
                        });
                        navigate("/dashboard/myParcels");
                    }
                }
            }
        }
    };
    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto"
            >
                <CardElement className="p-2 border rounded "></CardElement>
                <button
                    type="submit"
                    disabled={!stripe}
                    className="btn btn-primary w-full text-black"
                >
                    {amount}$
                </button>
                {error && <p className="text-red-700">{error}</p>}
            </form>
        </div>
    );
};

export default PaymentForm;
