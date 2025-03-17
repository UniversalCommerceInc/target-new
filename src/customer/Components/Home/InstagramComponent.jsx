import React from 'react';

const InstagramComponent = () => {
  return (
    <div>
      <div className="text-center my-8">
        <h2 className="text-xl font-bold">CONNECT WITH US @TARGETAUS</h2>
        <p className="text-zinc-600">Follow us on Instagram</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 px-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="relative">
            <img
              src={`https://placehold.co/400x400?text=Image+${index + 1}`}
              alt={`Instagram Image ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2">
              <img src="/icons/play.svg" alt="play" aria-hidden="true" />
            </div>
          </div>
        ))}
      </div>
      <div className="text-center my-8">
        <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-blue-500">Load More</button>
      </div>
    </div>
  );
};

export default InstagramComponent;
