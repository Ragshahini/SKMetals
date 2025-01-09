import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

function Email({ onclose }) {
  const form = useRef();
  const [successMessage, setSuccessMessage] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_i2gkq1b', 'template_xev8dv3', form.current, 'b51nK3wccLypCSIy_')
      .then(
        () => {
          setSuccessMessage('Email sent successfully!');
          form.current.reset();
        },
        (error) => {
          console.log('FAILED...', error.text);
          setSuccessMessage('Failed to send email. Please try again.');
        }
      );
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
      <form ref={form} onSubmit={sendEmail}>
        <label className="block mb-2 text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="user_name"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <label className="block mt-4 mb-2 text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="user_email"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <label className="block mt-4 mb-2 text-sm font-medium text-gray-700">Message</label>
        <textarea
          name="message"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        ></textarea>
        <div className='flex items-center justify-center gap-6 pt-8'>
          <button
            type="submit"
            className='btn w-32 h-12'
          >
            Send
          </button>
        </div>
      </form>
      {successMessage && (
        <div className="mt-4 text-green-600">
          {successMessage}
        </div>
      )}
    </div>
  );
}

export default Email;
