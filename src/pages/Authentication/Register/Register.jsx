import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import SocialLogin from "../SocialLogin/SocialLogin";
import Swal from "sweetalert2";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ আগের পেজ থেকে আসা লোকেশন ট্র্যাক করা
  const from = location.state?.from?.pathname || "/";

  const { createUser } = useAuth();
  const axiosInstance = useAxios();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ✅ প্রোফাইল ইমেজ হ্যান্ডেল
  const handleImageUpload = (event) => {
    const image = event.target.files[0];
    if (!image) return;
    setProfileImage(image);
    console.log("Selected Image:", image);
  };

  // ✅ ফর্ম সাবমিট
  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      // 1️⃣ Create Firebase user
      const result = await createUser(data.email, data.password);
      console.log("User created:", result.user);

      // 2️⃣ Prepare user data for backend
      const userInfo = {
        name: data.name.trim(),
        email: data.email,
        role: "user",
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
        // You can handle profileImage upload later
      };

      // 3️⃣ Send user info to backend
      const userRes = await axiosInstance.post("/users", userInfo);
      console.log("User saved in DB:", userRes.data);

      // ✅ সফল রেজিস্ট্রেশনের পর
      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "Your account has been created.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Continue",
      }).then(() => {
        navigate(from, { replace: true }); // ✅ আগের পেজে রিডিরেক্ট করবে
      });
    } catch (error) {
      console.error("Error during registration:", error);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="card bg-white w-full max-w-md shadow-2xl p-6 rounded-lg">
        <h1 className="text-4xl font-bold mb-6 text-center">Register Now!</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Profile Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profile Picture
            </label>
            <input
              type="file"
              onChange={handleImageUpload}
              className="input input-bordered w-full"
            />
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              placeholder="Your Name"
              className="input input-bordered w-full bg-gray-100"
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              placeholder="Your Email"
              className="input input-bordered w-full bg-gray-100"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters required",
                },
              })}
              type="password"
              placeholder="Your Password"
              className="input input-bordered w-full bg-gray-100"
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <Link to="/forgot-password" className="link link-hover text-sm">
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`btn btn-primary w-full text-white font-semibold ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>

          {/* Social Login */}
          <SocialLogin />

          {/* Login link */}
          <p className="text-center text-sm mt-2">
            Already have an account?{" "}
            <Link className="text-blue-600 font-medium" to="/login">
              Login Now!
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
