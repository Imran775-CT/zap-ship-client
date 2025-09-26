import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";

const ProfastLogo = () => {
  return (
    <Link to="/">
      <div className="flex items-end">
        <img className="mb-2" src={logo} alt="" />
        <p className="text-3xl -ml-2 font-extrabold">Profast</p>
      </div>
    </Link>
  );
};

export default ProfastLogo;
