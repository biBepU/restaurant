import React from 'react'

export default function Contact() {
  return (
     <div className="bg-gray-50 text-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-teal-600 mb-4">Contact Us</h1>
        <p className="text-lg max-w-3xl mx-auto">
          We’d love to hear from you! Whether you have a question about our menu, want to make a reservation, or just want to say hello, feel free to get in touch with us.
        </p>
      </section>

      {/* Contact Information Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-teal-600 mb-4">Our Contact Information</h2>
        <p className="text-lg">
          <strong>Phone:</strong> [Your Phone Number] <br />
          <strong>Email:</strong> [Your Email Address] <br />
          <strong>Address:</strong> [Your Restaurant Address]
        </p>
      </section>

      {/* Contact Form Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-teal-600 mb-4">Send Us a Message</h2>
        <form className="space-y-6 max-w-lg mx-auto">
          <div>
            <label htmlFor="name" className="block text-lg font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
              placeholder="Your email address"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-lg font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              rows="4"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
              placeholder="Your message"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-3 px-4 rounded-lg hover:bg-teal-700"
            >
              Send Message
            </button>
          </div>
        </form>
      </section>

      {/* Location Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-teal-600 mb-4">Our Location</h2>
        <div className="max-w-4xl mx-auto">
          <iframe
            title="Restaurant Location"
            src="https://www.google.com/maps/embed?pb=[Your-Google-Maps-Embed-Code]"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          />
        </div>
      </section>

      {/* Social Media Section */}
      <section className="text-center">
        <h2 className="text-3xl font-semibold text-teal-600 mb-4">Follow Us</h2>
        <p className="text-lg mb-4">Stay connected with us on social media:</p>
        <div className="flex justify-center space-x-6">
          <a href="[Your Facebook Link]" className="text-teal-600 hover:text-teal-700">
            <svg
              className="w-8 h-8"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              {/* Facebook Icon SVG Path */}
            </svg>
          </a>
          <a href="[Your Twitter Link]" className="text-teal-600 hover:text-teal-700">
            <svg
              className="w-8 h-8"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              {/* Twitter Icon SVG Path */}
            </svg>
          </a>
          <a href="[Your Instagram Link]" className="text-teal-600 hover:text-teal-700">
            <svg
              className="w-8 h-8"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              {/* Instagram Icon SVG Path */}
            </svg>
          </a>
          <a href="[Your LinkedIn Link]" className="text-teal-600 hover:text-teal-700">
            <svg
              className="w-8 h-8"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              {/* LinkedIn Icon SVG Path */}
            </svg>
          </a>
        </div>
      </section>
    </div>
  )
}
