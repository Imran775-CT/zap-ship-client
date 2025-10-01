import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import SocialLogin from "../SocialLogin/SocialLogin";

const Register = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { createUser } = useAuth();

    const axiosInstance = useAxios();

    const onSubmit = (data) => {
        console.log("Form Data:", data);

        createUser(data.email, data.password)
            .then(async (result) => {
                console.log("User created:", result.user);

                // ইউজারের বেসিক তথ্য তৈরি
                const userInfo = {
                    name: data.name,
                    email: data.email,
                    role: "user", // default role
                    created_at: new Date().toISOString(),
                    last_log_in: new Date().toISOString(),
                };

                try {
                    // Backend এ পাঠানো (MongoDB/Firestore এ সেভ হবে)
                    const userRes = await axiosInstance.post(
                        "/users",
                        userInfo
                    );
                    console.log("User saved in DB:", userRes.data);
                    navigate(from);
                } catch (dbErr) {
                    console.error("Error saving user in DB:", dbErr);
                }
            })
            .catch((error) => {
                console.log("Error creating user:", error);
            });
    };

    const handleImageUpload = (event) => {
        const image = event.target.files[0];
        console.log("Selected Image:", image);
    };

    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
                <h1 className="text-5xl font-bold">Register now!</h1>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset space-y-2">
                        {/* Profile Image */}
                        <label className="label">Profile Picture</label>
                        <input
                            type="file"
                            onChange={handleImageUpload}
                            className="input"
                            placeholder="Your Profile Picture"
                        />

                        {/* Name field */}
                        <label className="label">Your Name</label>
                        <input
                            {...register("name", { required: true })}
                            type="text"
                            className="input"
                            placeholder="your name"
                        />
                        {errors.name?.type === "required" && (
                            <p className="text-red-600" role="alert">
                                Name is required!
                            </p>
                        )}

                        {/* Email field */}
                        <label className="label">Email</label>
                        <input
                            {...register("email", { required: true })}
                            type="email"
                            className="input"
                            placeholder="Email"
                        />
                        {errors.email?.type === "required" && (
                            <p className="text-red-600" role="alert">
                                Email is required!
                            </p>
                        )}

                        {/* Password field */}
                        <label className="label">Password</label>
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
                            <p role="alert" className="text-red-600">
                                Password is required!
                            </p>
                        )}
                        {errors.password?.type === "minLength" && (
                            <p role="alert" className="text-red-600">
                                Password must be at least 6 characters!
                            </p>
                        )}

                        {/* Forgot Password */}
                        <div>
                            <Link
                                to="/forgot-password"
                                className="link link-hover"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <button className="btn btn-primary text-black mt-4 w-full">
                            Register
                        </button>

                        <SocialLogin />
                    </fieldset>

                    <p className="mt-2">
                        <small>
                            Already have an account?{" "}
                            <Link className="text-blue-600" to="/login">
                                Login Now!
                            </Link>
                        </small>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
