import img1 from "../../../assets/CustomersReview/Vector (4).png";
const CustomerSays = () => {
  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="text-center max-w-5xl mx-auto flex flex-col items-center gap-8 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
        {/* Image Part */}
        <div className="w-full flex justify-center">
          <img src={img1} className="w-40 h-40 md:w-56 md:h-56" />
        </div>

        {/* Content Part */}
        <div className="w-full text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            What our customers are saying
          </h3>
          <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Enhance posture, mobility, and well-being effortlessly with Posture
            Pro. Achieve proper alignment, reduce pain, and strengthen your body
            with ease!
          </p>
        </div>
      </div>
    </section>
  );
};

export default CustomerSays;
