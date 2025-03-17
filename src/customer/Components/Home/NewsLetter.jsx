import React from 'react';

const inputClasses = "w-full p-2 border rounded-md shadow-sm";
const containerClasses = "max-w-md mx-auto mt-10 mb-10";
const titleClasses = "text-center text-2xl font-bold mb-4";

const NewsletterSignup = () => {
  return (
    <div className={containerClasses}>
      <h2 className={titleClasses}>Newsletter Signup</h2>
      <form>
        <input type="email" placeholder="Email Address..." className={inputClasses} />
      </form>
    </div>
  );
};

export default NewsletterSignup;
