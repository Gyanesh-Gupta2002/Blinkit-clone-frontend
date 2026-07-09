import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white text-center px-4 py-6 md:py-8 mt-8 md:mt-10">
      <h3 className="text-lg md:text-xl font-bold">QuickKart</h3>
      <p className="text-xs md:text-sm text-gray-300 mt-1">
        Fast delivery at your doorstep 🚀
      </p>

      <div className="flex flex-wrap justify-center gap-3 md:gap-6 mt-3 md:mt-4 text-sm md:text-base">
        <Link to="/"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="text-white hover:text-green-400 transition">
          Home
        </Link>
        <Link to="/about" className="text-white hover:text-green-400 transition">
          About
        </Link>
        <Link to="/contact" className="text-white hover:text-green-400 transition">
          Contact
        </Link>
      </div>

      <p className="text-[10px] md:text-xs text-gray-400 mt-3 md:mt-4">
        © 2026 QuickKart. All Rights Reserved.
      </p>
    </footer>
  );
}

export default Footer;