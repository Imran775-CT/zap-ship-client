import containerImg from "../../../assets/containerImg/Vector (2).png";

const BeMarchant = () => {
  return (
    <div
      data-aos="flip-up"
      className="bg-[url('assets/be-a-merchant-bg.png')] bg-no-repeat bg-base-200 p-20 "
    >
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img src={containerImg} className="max-w-sm rounded-lg shadow-2xl" />
        <div>
          <h1 className="text-5xl font-bold">
            Merchant and Customer Satisfaction is Our First Priority!
          </h1>
          <p className="py-6">
            We offer the lowest delivery charge with the highest value along
            with 100% safety of your product. Pathao courier delivers your
            parcels in every corner of Bangladesh right on time.
          </p>
          <div className="flex gap-4">
            <button className="btn rounded-full border-2 border-green-600 text-green-600 bg-transparent hover:bg-green-600 hover:text-white transition-colors duration-300">
              Become a Merchant
            </button>
            <button className="btn rounded-full border-2 border-green-600 text-green-600 bg-transparent hover:bg-green-600 hover:text-white transition-colors duration-300">
              Earn with Profast Courier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeMarchant;
