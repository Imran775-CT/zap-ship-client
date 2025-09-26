import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import useAuth from "../../hooks/useAuth";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";

const generateTrackingID = () => {
  const now = new Date();

  // Date Part (YYYYMMDD)
  const datePart = now.toISOString().split("T")[0].replace(/-/g, "");

  // Time Part (HHMMSS)
  const timePart = now.toTimeString().split(" ")[0].replace(/:/g, "");

  // Random 4-digit number
  const rand = Math.floor(1000 + Math.random() * 9000);

  // Final Tracking ID
  return `TRK-${datePart}-${timePart}-${rand}`;
};

const SendParcel = () => {
  const serviceCenters = useLoaderData();
  const { user } = useAuth();
  const axiosSecure = UseAxiosSecure();

  // unique regions from serviceCenters
  const regions = [...new Set(serviceCenters.map((sc) => sc.region))];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const type = watch("type");
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");

  // ===== get districts/service centers by region =====
  const getDistrictsByRegion = (region) => {
    if (!region) return [];
    return serviceCenters.filter((sc) => sc.region === region);
  };

  const onSubmit = (data) => {
    let baseCost = 0;
    let extraCharge = 0;
    let deliveryZone = "";

    // check if within same district
    const withinDistrict = data.senderDistrict === data.receiverDistrict;
    deliveryZone = withinDistrict ? "Within District" : "Outside District";

    if (data.type === "document") {
      baseCost = withinDistrict ? 60 : 80;
    } else if (data.type === "non-document") {
      if (data.weight <= 3) {
        baseCost = withinDistrict ? 110 : 150;
      } else {
        const extraWeight = data.weight - 3;
        baseCost = withinDistrict ? 110 : 150;
        extraCharge = extraWeight * 40 + (withinDistrict ? 0 : 40); // +40 extra for outside district
      }
    }

    const totalCost = baseCost + extraCharge;

    // SweetAlert2 modal with detailed breakdown
    Swal.fire({
      title: "Parcel Pricing Breakdown",
      html: `
        <div style="text-align:left">
          <p><strong>Parcel Type:</strong> ${data.type}</p>
          <p><strong>Parcel Name:</strong> ${data.title}</p>
          <p><strong>Weight:</strong> ${data.weight || 0} kg</p>
          <p><strong>Delivery Zone:</strong> ${deliveryZone}</p>
          <hr/>
          <p><strong>Base Cost:</strong> ৳${baseCost}</p>
          <p><strong>Extra Charges:</strong> ৳${extraCharge}</p>
          <hr/>
          <p style="font-size:18px;"><strong>Total Price:</strong> 
             <span style="color:green;">৳${totalCost}</span>
          </p>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Proceed to Payment",
      cancelButtonText: "Go Back to Edit",
      icon: "info",
      width: 520,
      padding: "1.5rem",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const parcelData = {
          ...data,
          baseCost,
          extraCharge,
          totalCost,
          deliveryZone,
          payment_status: "unpaid",
          delivery_status: "not_collected",
          created_by: user.email,
          creation_date: new Date().toISOString(),
          trackingId: generateTrackingID(),
        };

        console.log("Parcel Info:", parcelData);

        try {
          const res = await axiosSecure.post("/parcels", parcelData);
          console.log(res.data);
          if (res.data.insertedId) {
            Swal.fire("Redirecting to Payment...", "", "success");
            // TODO: Redirect to payment page or call payment API
          }
        } catch (error) {
          console.error("Error saving parcel:", error);
          Swal.fire("Error", "Something went wrong!", "error");
        }
      } else {
        Swal.fire("You can edit your parcel details.", "", "info");
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-2">Add Parcel</h2>
      <p className="text-center mb-6 text-gray-600">
        Door to Door Delivery – Fill the form below
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* ==== Parcel Info ==== */}
        <div className="w-full border p-6 rounded-md shadow-md">
          <h3 className="text-2xl font-semibold text-center mb-4">
            Parcel Info
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Type */}
            <div>
              <label className="label">Type</label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="document"
                    {...register("type", { required: true })}
                    className="radio radio-primary"
                  />
                  <span>Document</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="non-document"
                    {...register("type", { required: true })}
                    className="radio radio-primary"
                  />
                  <span>Non-document</span>
                </label>
              </div>
              {errors.type && (
                <span className="text-red-500 text-sm">Type is required</span>
              )}
            </div>

            {/* Parcel Name */}
            <div className="md:col-span-2">
              <label className="label">Parcel Name</label>
              <input
                type="text"
                {...register("title", { required: true })}
                className="input input-bordered w-full"
                placeholder="Describe your parcel..."
              />
              {errors.title && (
                <span className="text-red-500 text-sm">
                  Parcel Name is required
                </span>
              )}
            </div>

            {/* Weight (only if non-document) */}
            {type === "non-document" && (
              <div>
                <label className="label">Weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  {...register("weight")}
                  className="input input-bordered w-full"
                />
              </div>
            )}
          </div>
        </div>

        {/* ==== Sender & Receiver Info ==== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sender */}
          <div className="border p-6 rounded-md shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-center">
              Sender Info
            </h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Sender Name"
                {...register("senderName", { required: true })}
                className="input input-bordered w-full"
              />
              <input
                type="text"
                placeholder="Sender Contact"
                {...register("senderContact", { required: true })}
                className="input input-bordered w-full"
              />
              <input
                type="text"
                placeholder="Sender Address"
                {...register("senderAddress", { required: true })}
                className="input input-bordered w-full"
              />
              <textarea
                placeholder="Pickup Instruction"
                {...register("pickupInstruction")}
                className="textarea textarea-bordered w-full"
              />
              <select
                {...register("senderRegion", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select Region</option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
              <select
                {...register("senderDistrict", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select Service Center</option>
                {getDistrictsByRegion(senderRegion).map((sc) => (
                  <option key={sc.id} value={sc.district}>
                    {sc.name} ({sc.district})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Receiver */}
          <div className="border p-6 rounded-md shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-center">
              Receiver Info
            </h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Receiver Name"
                {...register("receiverName", { required: true })}
                className="input input-bordered w-full"
              />
              <input
                type="text"
                placeholder="Receiver Contact"
                {...register("receiverContact", { required: true })}
                className="input input-bordered w-full"
              />
              <input
                type="text"
                placeholder="Receiver Address"
                {...register("receiverAddress", { required: true })}
                className="input input-bordered w-full"
              />
              <textarea
                placeholder="Delivery Instruction"
                {...register("deliveryInstruction")}
                className="textarea textarea-bordered w-full"
              />
              <select
                {...register("receiverRegion", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select Region</option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
              <select
                {...register("receiverDistrict", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select Service Center</option>
                {getDistrictsByRegion(receiverRegion).map((sc) => (
                  <option key={sc.id} value={sc.district}>
                    {sc.name} ({sc.district})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SendParcel;
