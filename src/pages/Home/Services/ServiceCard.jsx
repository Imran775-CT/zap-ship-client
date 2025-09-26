import React from "react";

const ServiceCard = ({ icon: Icon, title, description }) => {
  return (
    <div
      className="card bg-base-100 shadow-xl p-6 rounded-2xl text-center 
                    hover:bg-primary hover:text-white transition-all duration-300"
    >
      {/* Icon */}
      <div className="flex justify-center mb-4 text-5xl">
        <Icon />
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold mb-2">{title}</h3>

      {/* Description */}
      <p className="text-gray-600 hover:text-gray-100">{description}</p>
    </div>
  );
};

export default ServiceCard;
