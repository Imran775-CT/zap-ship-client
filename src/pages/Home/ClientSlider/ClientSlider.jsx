import Marquee from "react-fast-marquee";

import logo1 from "../../../assets/brands/amazon.png";
import logo2 from "../../../assets/brands/amazon_vector.png";
import logo3 from "../../../assets/brands/casio.png";
import logo4 from "../../../assets/brands/moonstar.png";
import logo5 from "../../../assets/brands/randstad.png";
import logo6 from "../../../assets/brands/start-people 1.png";
import logo7 from "../../../assets/brands/start.png";

const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7];

const ClientSlider = () => {
  return (
    <section className="bg-gray-50 py-10">
      <h2 className="text-center text-primary text-2xl md:text-3xl font-bold mb-8">
        Trusted by Leading Brands
      </h2>

      <Marquee
        className="py-2" // padding কমানো হলো
        speed={50}
        pauseOnHover={true}
        gradient={false}
      >
        {logos.map((logo, index) => (
          <div key={index} className="mx-16 flex items-center justify-center">
            <img
              src={logo}
              alt={`Client ${index}`}
              className="h-8 object-contain"
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default ClientSlider;
