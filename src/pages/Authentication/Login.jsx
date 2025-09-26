import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import SocialLogin from "./SocialLogin/SocialLogin";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-5xl font-bold">Login now!</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              {...register("email")}
              type="email"
              className="input"
              placeholder="Email"
            />
            <label className="label">Password</label>
            <input
              {...register("password", { required: true, minLength: 6 })}
              type="password"
              className="input"
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-600" role="alert">
                Password must be charracter!
              </p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-blue-700" role="alert">
                Password must be at least 6 charracter!
              </p>
            )}
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
          </fieldset>
          <button className="btn btn-primary text-black mt-4 w-full">
            Login
          </button>
          <SocialLogin></SocialLogin>
          <p>
            <small>
              Don't have an account?
              <Link className="bg-amber-300" to="/register">
                Register Now!
              </Link>
            </small>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
