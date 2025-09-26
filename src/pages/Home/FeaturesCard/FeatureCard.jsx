const FeatureCard = ({ image, title, description }) => {
  return (
    <div className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-2xl p-6 gap-6 hover:shadow-2xl transition-all duration-300">
      {/* Left Side: Image */}
      <div className="flex-shrink-0 w-28 h-28 flex items-center justify-center bg-primary/10 rounded-xl">
        <img src={image} alt={title} className="w-20 h-20 object-contain" />
      </div>

      {/* Right Side: Text */}
      <div className="text-center md:text-left">
        <h3 className="text-2xl font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
