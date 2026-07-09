import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/signup", form);
      alert(res.data.message);
      navigate("/Login");
    } catch (err) {
      console.log(err);
      alert("Signup Failed");
    }
  };

  return (
    <div className="w-[90%] sm:w-[400px] mx-auto mt-10 mb-16 bg-white shadow-lg rounded-2xl p-6 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
        Create Account
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
          className="border rounded-xl p-3 text-sm md:text-base outline-none focus:ring-2 focus:ring-green-600"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="border rounded-xl p-3 text-sm md:text-base outline-none focus:ring-2 focus:ring-green-600"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="border rounded-xl p-3 text-sm md:text-base outline-none focus:ring-2 focus:ring-green-600"
        />

        <button
          type="submit"
          className="bg-green-600 text-white py-3 rounded-xl text-sm md:text-base font-semibold hover:bg-green-700 transition"
        >
          Signup
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-4">
        Already have an account?{" "}
        <Link to="/Login" className="text-green-600 font-semibold">
          Login
        </Link>
      </p>
    </div>
  );
}

export default Signup;