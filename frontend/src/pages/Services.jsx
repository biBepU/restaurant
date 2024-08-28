import React from 'react'
import { Link } from 'react-router-dom'

export default function Services() {
  return (
    <div className="bg-gray-50 text-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-teal-600 mb-4">Our Services</h1>
        <p className="text-lg max-w-3xl mx-auto">
          At [Restaurant Name], we offer a variety of services to meet your dining needs, whether you're enjoying a meal in our cozy dining room, picking up a quick takeaway, or planning a special event.
        </p>
      </section>

      {/* Services Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* Dine-In Service */}
        <div className="p-6 bg-white shadow rounded-lg">
          <h2 className="text-2xl font-semibold text-teal-600 mb-2">Dine-In</h2>
          <p className="text-lg">
            Enjoy a relaxed and welcoming atmosphere in our dining room, where you can savor our delicious menu offerings with friends and family. Our attentive staff is here to ensure you have a wonderful dining experience.
          </p>
        </div>

        {/* Takeaway Service */}
        <div className="p-6 bg-white shadow rounded-lg">
          <h2 className="text-2xl font-semibold text-teal-600 mb-2">Takeaway</h2>
          <p className="text-lg">
            In a hurry? Order your favorite dishes for takeaway and enjoy them at home or on the go. Our takeaway service is fast, convenient, and ensures you get the same great quality as dining in.
          </p>
        </div>

        {/* Catering Service */}
        <div className="p-6 bg-white shadow rounded-lg">
          <h2 className="text-2xl font-semibold text-teal-600 mb-2">Catering</h2>
          <p className="text-lg">
            Let us bring the flavors of [Restaurant Name] to your next event. Our catering service offers a range of menu options that are perfect for weddings, corporate events, and private parties.
          </p>
        </div>

        {/* Event Hosting Service */}
        <div className="p-6 bg-white shadow rounded-lg">
          <h2 className="text-2xl font-semibold text-teal-600 mb-2">Event Hosting</h2>
          <p className="text-lg">
            Planning a special event? Host it at our restaurant! We offer a beautiful and intimate space for events of all kinds, with customizable menu options and attentive service to make your event unforgettable.
          </p>
        </div>

        {/* Online Ordering Service */}
        <div className="p-6 bg-white shadow rounded-lg">
          <h2 className="text-2xl font-semibold text-teal-600 mb-2">Online Ordering</h2>
          <p className="text-lg">
            Skip the wait and order online! Our easy-to-use online ordering system allows you to browse our menu and place your order from the comfort of your home. Choose pickup or delivery options as per your convenience.
          </p>
        </div>

        {/* Delivery Service */}
        <div className="p-6 bg-white shadow rounded-lg">
          <h2 className="text-2xl font-semibold text-teal-600 mb-2">Delivery</h2>
          <p className="text-lg">
            Can't make it to the restaurant? No problem! We offer delivery services so you can enjoy our delicious food without leaving your home. Fast, reliable, and convenient – just order online, and we'll take care of the rest.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="text-center mt-12">
        <h2 className="text-3xl font-semibold text-teal-600 mb-4">Get in Touch</h2>
        <p className="text-lg mb-4">
          For more information about our services or to make a booking, please contact us at [Contact Information] or visit us at [Restaurant Address]. We look forward to serving you!
        </p>
        <Link to ='/contact' className="bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700">
          Contact Us
        </Link>
      </section>
    </div>
  )
}
