import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "./SocialLogin/SocialLogin";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // 🔥 যদি PrivateRoute থেকে from পাঠানো থাকে, তাহলে সেটা নাও
  const from = location.state?.from || "/";

  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then((res) => {
        console.log("✅ Logged in user:", res.user);
        // 🔥 সফল লগইনের পর আগের পেজে ফিরে যাক
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.error("❌ Login failed:", err.message);
      });
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto mt-10">
      <div className="card-body">
        <h1 className="text-4xl font-bold text-center mb-4">Login now!</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              {...register("email", { required: true })}
              type="email"
              className="input"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-600 text-sm">Email is required!</p>
            )}

            {/* Password Field */}
            <label className="label mt-2">Password</label>
            <input
              {...register("password", {
                required: true,
                minLength: 6,
              })}
              type="password"
              className="input"
              placeholder="Password"
            />

            {errors.password?.type === "required" && (
              <p className="text-red-600 text-sm">Password is required!</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-blue-700 text-sm">
                Password must be at least 6 characters!
              </p>
            )}

            <div className="mt-2">
              <a className="link link-hover text-sm">Forgot password?</a>
            </div>
          </fieldset>

          {/* Login Button */}
          <button className="btn btn-primary text-black mt-4 w-full">
            Login
          </button>

          {/* Social Login */}
          <div className="mt-3">
            <SocialLogin />
          </div>

          {/* Register Redirect */}
          <p className="text-center mt-3 text-sm">
            Don't have an account?{" "}
            <Link
              state={{ from }}
              className="text-amber-500 font-semibold"
              to="/register"
            >
              Register Now!
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
