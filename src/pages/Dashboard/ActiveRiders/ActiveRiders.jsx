import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";

const ActiveRiders = () => {
  const queryClient = useQueryClient();
  const axiosSecure = UseAxiosSecure();

  // ✅ Active Riders load করা
  const { data: activeRiders = [], isLoading } = useQuery({
    queryKey: ["activeRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/active");
      return res.data;
    },
  });

  // ✅ Deactivate rider mutation
  const mutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/riders/deactivate/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["activeRiders"]); // auto refresh
    },
  });

  // ✅ Deactivate handler
  const handleDeactivate = async (id) => {
    const confirm = await Swal.fire({
      title: "Deactivate Rider?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, deactivate",
      cancelButtonText: "No",
    });

    if (!confirm.isConfirmed) return;

    mutation.mutate(id, {
      onSuccess: () => {
        Swal.fire("Success!", "Rider has been deactivated.", "success");
      },
      onError: () => {
        Swal.fire("Error", "Could not deactivate rider", "error");
      },
    });
  };

  // ✅ View handler
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
      <h2 className="text-xl font-bold mb-4">Active Riders</h2>
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
            {activeRiders.map((rider, index) => (
              <tr key={rider._id}>
                <td>{index + 1}</td>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.phone}</td>
                <td>{rider.bikeBrand}</td>
                <td className="flex gap-2">
                  {/* ✅ Activated marked button */}
                  <span className="px-3 py-1 rounded-full text-white font-semibold bg-sky-500 cursor-default">
                    Activated
                  </span>

                  <button
                    onClick={() => handleView(rider)}
                    className="btn btn-sm btn-info"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDeactivate(rider._id)}
                    className="btn btn-sm btn-error"
                  >
                    Deactivate
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

export default ActiveRiders;
