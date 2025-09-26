import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

import QuoteCard from "./QuoteCard";

import img1 from "../../../assets/banner/banner1.png";
import img2 from "../../../assets/banner/banner2.png";
import img3 from "../../../assets/banner/banner3.png";

const quotesData = [
  {
    id: 1,
    quote: "This service has completely changed the way I handle deliveries!",
    title: "John Doe",
    description: "CEO, Example Company",
    image: img1,
  },
  {
    id: 2,
    quote: "Reliable, fast, and professional — I highly recommend it.",
    title: "Jane Smith",
    description: "Founder, Startup Hub",
    image: img2,
  },
  {
    id: 3,
    quote: "Excellent support team and 100% safe delivery every time.",
    title: "Michael Lee",
    description: "Logistics Manager, GlobalTrade",
    image: img3,
  },
  {
    id: 4,
    quote: "The platform is user-friendly and makes tracking so simple.",
    title: "Sophia Brown",
    description: "Operations Head, BrightLogistics",
    image: img1,
  },
  {
    id: 5,
    quote: "I’ve saved so much time and money thanks to this service!",
    title: "David Wilson",
    description: "E-commerce Owner, ShopEase",
    image: img2,
  },
  {
    id: 6,
    quote: "Truly dependable — I can focus on my business stress-free.",
    title: "Emily Johnson",
    description: "Managing Director, QuickMart",
    image: img3,
  },
];

const Quotes = () => {
  return (
    <div className="py-12 px-4 bg-gray-50">
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: true }}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="mySwiper"
      >
        {quotesData.map((item) => (
          <SwiperSlide key={item.id}>
            <QuoteCard
              quote={item.quote}
              title={item.title}
              description={item.description}
              image={item.image}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Quotes;
