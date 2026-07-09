import { useState, useEffect } from "react";

const heroSlides = [
  {
    title: "Groceries delivered",
    highlight: "in 10 minutes ⚡",
    subtitle: "Fresh fruits, vegetables, snacks and daily essentials at your doorstep.",
    image: "https://cdn-icons-png.flaticon.com/512/3081/3081559.png",
    bg: "from-green-100 to-yellow-100 dark:from-green-900 dark:to-yellow-900",
  },
  {
    title: "Flat 50% OFF",
    highlight: "on your first order 🎉",
    subtitle: "Use code WELCOME50 and save big on your first purchase.",
    image: "https://cdn-icons-png.flaticon.com/512/3081/3081840.png",
    bg: "from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900",
  },
  {
    title: "Fresh Fruits",
    highlight: "& Veggies 🥦",
    subtitle: "Farm fresh produce delivered daily to your home.",
    image: "https://cdn-icons-png.flaticon.com/512/2909/2909808.png",
    bg: "from-orange-100 to-red-100 dark:from-orange-900 dark:to-red-900",
  },
];

function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  const slide = heroSlides[current];

  return (
    <div
      className={`relative w-[95%] md:w-[90%] mx-auto mt-4 md:mt-6 min-h-[320px] md:min-h-[360px] max-h-[420px] flex flex-col-reverse md:flex-row items-center justify-between bg-gradient-to-r ${slide.bg} rounded-2xl md:rounded-3xl p-5 md:p-8 pb-10 md:pb-10 shadow-lg overflow-hidden transition-all duration-700`}
    >
      <div className="w-full md:w-1/2 text-center md:text-left mt-4 md:mt-0">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight text-gray-900 dark:text-white">
          {slide.title} <br />
          <span className="text-green-600 dark:text-green-400">{slide.highlight}</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-3 md:mt-4 text-sm md:text-lg">{slide.subtitle}</p>
        <button
          onClick={() => {
            document.getElementById("products-section")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="mt-4 md:mt-6 bg-green-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl text-base md:text-lg hover:bg-green-700 dark:hover:bg-green-500"
        >
          Order Now
        </button>
      </div>

      <div className="w-1/2 md:w-1/2 flex justify-center">
        <img
          src={slide.image}
          alt="banner"
          className="w-[140px] sm:w-[200px] md:w-[328px] transition-all duration-700"
        />
      </div>

      <button
        onClick={prevSlide}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 dark:bg-gray-800/70 hover:bg-white dark:hover:bg-gray-700 rounded-full w-10 h-10 items-center justify-center text-xl shadow text-gray-900 dark:text-white"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 dark:bg-gray-800/70 hover:bg-white dark:hover:bg-gray-700 rounded-full w-10 h-10 items-center justify-center text-xl shadow text-gray-900 dark:text-white"
      >
        ›
      </button>

      <div className="absolute bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {heroSlides.map((_, i) => (
          <span
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full cursor-pointer transition-all ${
              i === current ? "bg-green-600 w-4 md:w-5" : "bg-gray-300 dark:bg-gray-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Hero;