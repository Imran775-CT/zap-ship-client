import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";

const PendingRiders = () => {
  const axiosSecure = UseAxiosSecure();

  // ✅ Pending Riders লোড করা
  const {
    data: pendingRiders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["pendingRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/pending");
      return res.data;
    },
  });

  // ✅ Approve/Reject handler
  const handleDecision = async (id, action, email) => {
    const confirm = await Swal.fire({
      title: `${action === "approve" ? "Activate" : "Reject"} Application?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, proceed",
      cancelButtonText: "No",
    });

    if (!confirm.isConfirmed) return;

    try {
      const status = action === "approve" ? "active" : "rejected";
      const res = await axiosSecure.patch(`/riders/${id}/status`, {
        status,
        email,
      });
      console.log("Update response:", res.data);
      refetch && refetch();

      Swal.fire(
        "Success!",
        `Rider has been ${action === "approve" ? "approved" : "rejected"}.`,
        "success"
      );
    } catch (error) {
      console.error("Error updating rider status:", error);
      Swal.fire(
        "Error!",
        "Could not update rider status. Please try again.",
        "error"
      );
    }
  };

  // ✅ View rider details
  const handleView = (rider) => {
    Swal.fire({
      title: `<strong>${rider.name}</strong>`,
      html: `
        <p><b>Email:</b> ${rider.email}</p>
        <p><b>Phone:</b> ${rider.phone}</p>
        <p><b>Age:</b> ${rider.age || "N/A"}</p>
        <p><b>Region:</b> ${rider.region || "N/A"}</p>
        <p><b>District:</b> ${rider.district || "N/A"}</p>
        <p><b>Bike Brand:</b> ${rider.bikeBrand || "N/A"}</p>
        <p><b>Bike Reg No:</b> ${rider.bikeRegNumber || "N/A"}</p>
        <p><b>NID:</b> ${rider.nid || "N/A"}</p>
      `,
      showCloseButton: true,
      confirmButtonText: "Close",
    });
  };

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Pending Riders</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Bike</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingRiders.map((rider) => (
              <tr key={rider._id}>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.phone}</td>
                <td>{rider.bikeBrand}</td>
                <td className="flex gap-2">
                  <button
                    onClick={() => handleView(rider)}
                    className="btn btn-sm btn-info"
                  >
                    View
                  </button>
                  <button
                    onClick={() =>
                      handleDecision(rider._id, "approve", rider.email)
                    }
                    className="btn btn-sm btn-success"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() =>
                      handleDecision(rider._id, "reject", rider.email)
                    }
                    className="btn btn-sm btn-error"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingRiders;
