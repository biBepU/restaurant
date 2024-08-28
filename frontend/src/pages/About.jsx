import React from 'react';

const AboutUsPage = () => {
  return (
    <div className="bg-gray-50 text-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      {/* Welcome Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-teal-600 mb-4">Welcome to [Restaurant Name]</h1>
        <p className="text-lg max-w-3xl mx-auto">
          At [Restaurant Name], we believe that great food brings people together. Located in the heart of [City Name], our restaurant offers a unique dining experience that blends traditional flavors with modern culinary techniques.
        </p>
      </section>

      {/* Our Mission Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-teal-600 mb-4">Our Mission</h2>
        <p className="text-lg">
          Our mission is to provide an unforgettable dining experience by offering high-quality food, exceptional service, and a warm, inviting atmosphere. We are committed to using the freshest ingredients to create dishes that are both delicious and nutritious.
        </p>
      </section>

      {/* Our Values Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-teal-600 mb-4">Our Values</h2>
        <ul className="text-lg list-disc list-inside space-y-2">
          <li><strong>Quality:</strong> We take pride in the quality of our ingredients, ensuring every dish is made to perfection.</li>
          <li><strong>Community:</strong> We support local farmers, producers, and artisans in the [City Name] community.</li>
          <li><strong>Sustainability:</strong> Committed to sustainable practices, from sourcing to waste minimization.</li>
          <li><strong>Hospitality:</strong> We provide a welcoming environment where every guest feels like family.</li>
        </ul>
      </section>

      {/* Our Menu Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-teal-600 mb-4">Our Menu</h2>
        <p className="text-lg mb-4">
          Our menu is a celebration of flavors from around the world, crafted with care by our talented chefs. Whether you're in the mood for a hearty meal or a light bite, you'll find a variety of options to satisfy your cravings.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white shadow rounded-lg">
            <h3 className="text-2xl font-semibold mb-2">Main Courses</h3>
            <p>Explore our selection of hearty and delicious main courses, including [Dish 1], [Dish 2], and [Dish 3].</p>
          </div>
          <div className="p-6 bg-white shadow rounded-lg">
            <h3 className="text-2xl font-semibold mb-2">Desserts and Drinks</h3>
            <p>Indulge in our sweet desserts and refreshing drinks, perfect for rounding off your meal.</p>
          </div>
          <div className="p-6 bg-white shadow rounded-lg">
            <h3 className="text-2xl font-semibold mb-2">Vegetables and Tofu</h3>
            <p>Enjoy our selection of fresh vegetables and tofu dishes, offering a healthy and flavorful option.</p>
          </div>
          <div className="p-6 bg-white shadow rounded-lg">
            <h3 className="text-2xl font-semibold mb-2">Appetizers</h3>
            <p>Start your meal with our tasty appetizers, including [Appetizer 1], [Appetizer 2], and [Appetizer 3].</p>
          </div>
          <div className="p-6 bg-white shadow rounded-lg">
            <h3 className="text-2xl font-semibold mb-2">Soup and Noodle</h3>
            <p>Warm up with our comforting soups and noodles, perfect for any time of the day.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="text-center">
        <h2 className="text-3xl font-semibold text-teal-600 mb-4">Contact Us</h2>
        <p className="text-lg mb-4">We'd love to hear from you! Reach out to us at [Contact Information] or visit us at [Restaurant Address].</p>
        <button className="bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700">
          Get in Touch
        </button>
      </section>
    </div>
  );
};

export default AboutUsPage;
