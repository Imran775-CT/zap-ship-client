import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = UseAxiosSecure();

    const { data: payments = [], isPending } = useQuery({
        queryKey: ["payments", user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`);
            return res.data;
        },

        if(isPending) {
            return "Loading...";
        },
    });
    return (
        <div className="overflow-x-auto mt-6">
            <h2 className="text-xl font-semibold mb-4 text-center">
                Payment History
            </h2>
            <table className="table w-full">
                <thead>
                    <tr className="bg-base-200">
                        <th>#</th>
                        <th>Parcel ID</th>
                        <th>Transaction ID</th>
                        <th>Amount</th>
                        <th>Method</th>
                        <th>Status</th>
                        <th>Paid At</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((payment, index) => (
                        <tr key={payment._id}>
                            <td>{index + 1}</td>
                            <td>{payment.parcelId}</td>
                            <td className="font-mono text-sm">
                                {payment.transactionId}
                            </td>
                            <td>${payment.amount}</td>
                            <td className="capitalize">
                                {payment.paymentMethod}
                            </td>
                            <td>
                                <span
                                    className={`badge ${
                                        payment.status === "succeeded"
                                            ? "badge-success"
                                            : "badge-error"
                                    } text-white`}
                                >
                                    {payment.status}
                                </span>
                            </td>
                            <td>
                                {new Date(
                                    payment.paid_at_string
                                ).toLocaleString()}
                            </td>
                        </tr>
                    ))}

                    {payments.length === 0 && (
                        <tr>
                            <td
                                colSpan="7"
                                className="text-center text-gray-500 py-6"
                            >
                                No payment history found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default PaymentHistory;
