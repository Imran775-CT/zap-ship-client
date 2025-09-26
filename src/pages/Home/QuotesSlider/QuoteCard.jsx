// QuoteCard.jsx
const QuoteCard = ({ quote, title, description, image }) => {
  return (
    <div className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 gap-4">
      {/* Quote */}
      <p className="text-gray-700 italic text-center">“{quote}”</p>

      {/* Profile */}
      <div className="flex items-center gap-4 mt-4">
        <img src={image} alt={title} className="w-16 h-16  border-2 " />
        <div className="text-left">
          <h3 className="text-gray-800 font-semibold">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default QuoteCard;
