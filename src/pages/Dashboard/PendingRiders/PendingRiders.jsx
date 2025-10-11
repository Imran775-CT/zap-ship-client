import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";

const PendingRiders = () => {
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();

  // ✅ Load pending riders
  const { data: pendingRiders = [], isLoading } = useQuery({
    queryKey: ["pendingRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/pending");
      return res.data;
    },
  });

  // ✅ Approve or Reject mutation
  const mutation = useMutation({
    mutationFn: async ({ id, status, email }) => {
      const res = await axiosSecure.patch(`/riders/${id}/status`, {
        status,
        email,
      });
      return { id, status, res: res.data };
    },
    onSuccess: ({ id, status, res }) => {
      console.log("✅ Update Success:", res);

      // ✅ Remove from Pending instantly
      queryClient.setQueryData(["pendingRiders"], (oldData) =>
        oldData ? oldData.filter((rider) => rider._id !== id) : []
      );

      // ✅ Refresh Active Riders
      if (status === "active") {
        queryClient.invalidateQueries(["activeRiders"]);
      }
    },
    onError: (err) => {
      console.error("❌ Update failed:", err);
      Swal.fire("Error!", "Failed to update rider status", "error");
    },
  });

  const handleDecision = async (id, action, email) => {
    const confirm = await Swal.fire({
      title: `${action === "approve" ? "Approve" : "Reject"} Rider?`,
      text: `Are you sure you want to ${action} this rider?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });

    if (!confirm.isConfirmed) return;

    mutation.mutate(
      {
        id,
        status: action === "approve" ? "active" : "rejected",
        email,
      },
      {
        onSuccess: () => {
          Swal.fire(
            "Success!",
            `Rider has been ${action === "approve" ? "approved" : "rejected"}.`,
            "success"
          );
        },
      }
    );
  };

  const handleView = (rider) => {
    Swal.fire({
      title: `<strong>${rider.name || "N/A"}</strong>`,
      html: `
        <p><b>Email:</b> ${rider.email || "N/A"}</p>
        <p><b>Phone:</b> ${rider.phone || "N/A"}</p>
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
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Bike</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingRiders.length > 0 ? (
              pendingRiders.map((rider, index) => (
                <tr key={rider._id}>
                  <td>{index + 1}</td>
                  <td>{rider.name || "N/A"}</td>
                  <td>{rider.email || "N/A"}</td>
                  <td>{rider.phone || "N/A"}</td>
                  <td>{rider.bikeBrand || "N/A"}</td>
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
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-6">
                  No pending riders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingRiders;
