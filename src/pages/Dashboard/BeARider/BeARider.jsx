import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";

const BeARider = () => {
  const { user } = useAuth(); // user থেকে displayName & email পাবো
  const serviceCenters = useLoaderData();

  const [selectedRegion, setSelectedRegion] = useState("");
  const axiosSecure = UseAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const regions = [...new Set(serviceCenters.map((c) => c.region))];
  const districts = serviceCenters
    .filter((c) => c.region === selectedRegion)
    .map((c) => c.district);

  const onSubmit = (data) => {
    const riderData = {
      ...data,
      name: user?.displayName || "",
      email: user?.email || "",
      status: "pending", // default status
      created_at: new Date().toISOString(),
    };
    console.log("Rider Application Data:", riderData);
    axiosSecure.post("/riders", riderData).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success", // icon type
          title: "Application submitted!", // main title
          text: "Your application is pending approval.",
        });
      }
    });
    reset();
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Be a Rider</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={user?.displayName || ""}
              readOnly
              {...register("name")} // register still needed for form submission
              className="w-full border rounded-lg p-3 bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="w-full border rounded-lg p-3 bg-gray-100"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Age
            </label>
            <input
              type="number"
              {...register("age", { required: "Age is required" })}
              placeholder="Enter your age"
              className="w-full border rounded-lg p-3"
            />
            {errors.age && (
              <p className="text-red-500 text-sm">{errors.age.message}</p>
            )}
          </div>

          {/* Region & District */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Region
              </label>
              <select
                {...register("region", { required: "Region is required" })}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full border rounded-lg p-3"
              >
                <option value="">Select Region</option>
                {regions.map((region, idx) => (
                  <option key={idx} value={region}>
                    {region}
                  </option>
                ))}
              </select>
              {errors.region && (
                <p className="text-red-500 text-sm">{errors.region.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                District
              </label>
              <select
                {...register("district", { required: "District is required" })}
                className="w-full border rounded-lg p-3"
              >
                <option value="">Select District</option>
                {districts.map((district, idx) => (
                  <option key={idx} value={district}>
                    {district}
                  </option>
                ))}
              </select>
              {errors.district && (
                <p className="text-red-500 text-sm">
                  {errors.district.message}
                </p>
              )}
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              {...register("phone", { required: "Phone number is required" })}
              placeholder="Enter your phone number"
              className="w-full border rounded-lg p-3"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>

          {/* NID */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              National ID Card Number
            </label>
            <input
              type="text"
              {...register("nid", { required: "NID is required" })}
              placeholder="Enter your NID number"
              className="w-full border rounded-lg p-3"
            />
            {errors.nid && (
              <p className="text-red-500 text-sm">{errors.nid.message}</p>
            )}
          </div>

          {/* Bike Brand */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bike Brand
            </label>
            <input
              type="text"
              {...register("bikeBrand", { required: "Bike brand is required" })}
              placeholder="Enter your bike brand"
              className="w-full border rounded-lg p-3"
            />
            {errors.bikeBrand && (
              <p className="text-red-500 text-sm">{errors.bikeBrand.message}</p>
            )}
          </div>

          {/* Bike Registration Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bike Registration Number
            </label>
            <input
              type="text"
              {...register("bikeRegNo", {
                required: "Bike registration number is required",
              })}
              placeholder="Enter your bike registration number"
              className="w-full border rounded-lg p-3"
            />
            {errors.bikeRegNo && (
              <p className="text-red-500 text-sm">{errors.bikeRegNo.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-lime-500 text-black font-semibold py-3 rounded-lg hover:bg-lime-600 transition duration-300"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default BeARider;
