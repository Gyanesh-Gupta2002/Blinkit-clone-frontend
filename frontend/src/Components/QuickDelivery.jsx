function QuickDelivery({ selectedCategory, setSelectedCategory }) {
  const items = [
    { emoji: "🥛", name: "Milk" },
    { emoji: "🍞", name: "Bread" },
    { emoji: "🍎", name: "Fruits" },
    { emoji: "🥤", name: "Drinks" },
    { emoji: "🍫", name: "Snacks" },
    { emoji: "💊", name: "Protein" },
  ];
  const handleClick = (name) => {
    if (selectedCategory === name) {
      setSelectedCategory("");
    } else {
      setSelectedCategory(name);
    }
  };

  return (
    <div className="w-[90%] mx-auto mt-12">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        🚀 Quick Delivery
      </h1>

      <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-6">
        {items.map((item, index) => (
          <div
            key={index}
            onClick={() => handleClick(item.name)}
            className={`bg-white dark:bg-gray-800 shadow-lg rounded-2xl md:rounded-3xl p-4 md:p-8 text-center cursor-pointer hover:-translate-y-2 duration-300 ${selectedCategory === item.name ? 'ring-2 ring-green-600' : ''}`}
          >
            <h1 className="text-3xl md:text-5xl">{item.emoji}</h1>
            <p className="mt-2 md:mt-4 text-xs md:text-base font-semibold text-gray-800 dark:text-gray-100">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuickDelivery;