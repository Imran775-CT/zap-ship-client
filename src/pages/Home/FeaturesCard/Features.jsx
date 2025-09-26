import FeatureCard from "./FeatureCard";

import img1 from "../../../assets/pngImage/Vector (1).png";
import img2 from "../../../assets/pngImage/Illustration.png";
import img3 from "../../../assets/pngImage/Group 4.png";
import CustomerSays from "../CustomerSays/CustomerSays";

const Features = () => {
  const featuresData = [
    {
      id: 1,
      title: "Live Parcel Tracking",
      description:
        "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
      image: img1,
    },
    {
      id: 2,
      title: "100% Safe Delivery",
      description:
        "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
      image: img2,
    },
    {
      id: 3,
      title: "24/7 Call Center Support",
      description:
        "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
      image: img3,
    },
  ];
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl text-primary font-bold text-center mb-12">
          Why Choose Us?
        </h2>

        <div className="grid gap-10">
          {featuresData.map((feature) => (
            <>
              <FeatureCard
                key={`feature-${feature.id}`}
                image={feature.image}
                title={feature.title}
                description={feature.description}
              />
            </>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
