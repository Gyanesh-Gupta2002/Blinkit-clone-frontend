function Contact() {
  return (
    <div className="w-[90%] md:w-[70%] mx-auto mt-10 mb-16 text-center">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">Contact Us</h1>
      <p className="text-gray-600 text-sm md:text-base mb-6">
        Have questions or need help? Reach out to us anytime.
      </p>
      <div className="text-gray-700 text-sm md:text-base space-y-2">
        <p>📧 support@quickkart.com</p>
        <p>📞 +91 98765 43210</p>
        <p>📍 Kursi Road, Lucknow, Uttar Pradesh</p>
      </div>
    </div>
  );
}

export default Contact;