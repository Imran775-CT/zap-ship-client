import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";

const MyParcels = () => {
    const { user } = useAuth();
    const axiosSecure = UseAxiosSecure();
    const navigate = useNavigate();

    const {
        data: parcels = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["my-parcels", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`);
            return res.data;
        },
    });

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleDateString("en-GB", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    // Action handlers (replace with your actual logic)
    const onView = (parcel) => {
        console.log("View details:", parcel);
    };

    const onPay = (id) => {
        console.log("Pay for:", id);
        navigate(`/dashboard/payment/${id}`);
    };

    const onDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This parcel will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure
                        .delete(`/parcels/${id}`)
                        .then((res) => {
                            if (res.data.deletedCount > 0) {
                                Swal.fire(
                                    "Deleted!",
                                    "The parcel has been deleted.",
                                    "success"
                                );
                                refetch(); // refresh parcels list
                            }
                        });
                } catch (error) {
                    Swal.fire("Error!", "Something went wrong.", "error");
                }
            }
        });
        console.log("Delete:", id);
    };

    if (isLoading) {
        return <p className="text-center">Loading...</p>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="table w-full">
                {/* Head */}
                <thead>
                    <tr className="bg-base-200">
                        <th>#</th>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Created At</th>
                        <th>Cost</th>
                        <th>Payment</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {parcels.map((parcel, index) => (
                        <tr key={parcel._id}>
                            <td>{index + 1}</td>
                            <td className="font-semibold capitalize">
                                {parcel.type === "document"
                                    ? "Document"
                                    : "Non-Document"}
                            </td>
                            <td className="capitalize max-w-[180px] truncate overflow-hidden whitespace-nowrap">
                                {parcel.title || "-"}
                            </td>
                            <td>{formatDate(parcel.creation_date)}</td>
                            <td>${parcel.totalCost}</td>
                            <td>
                                <span
                                    className={`badge ${
                                        parcel.payment_status === "paid"
                                            ? "badge-success"
                                            : "badge-error"
                                    } text-white`}
                                >
                                    {parcel.payment_status.toUpperCase()}
                                </span>
                            </td>
                            <td className="flex gap-2">
                                <button
                                    onClick={() => onView(parcel)}
                                    className="btn btn-sm btn-info text-white"
                                >
                                    View
                                </button>
                                {parcel.payment_status === "unpaid" && (
                                    <button
                                        onClick={() => onPay(parcel._id)}
                                        className="btn btn-sm btn-success text-white"
                                    >
                                        Pay
                                    </button>
                                )}
                                <button
                                    onClick={() => onDelete(parcel._id)}
                                    className="btn btn-sm btn-error text-white"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}

                    {parcels.length === 0 && (
                        <tr>
                            <td
                                colSpan="6"
                                className="text-center text-gray-500 py-6"
                            >
                                No parcels found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default MyParcels;
