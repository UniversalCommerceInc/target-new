import React, { useEffect, useRef } from 'react';
import Navigation from '../Navbar/Navigation';
import Footer from '../footer/Footer';

const HCLForm = () => {
  const iframeRef = useRef(null);

  // Listen for messages from the iframe
  useEffect(() => {
    // const handleMessage = (event) => {
    //   if (event.origin !== 'https://dx.sbx0328.play.hclsofy.com') return;

    //   console.log('Received data from iframe:', event.data);

    //   // Example: Post the received data to your backend
    //   fetch('/api/submit', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(event.data),
    //   })
    //     .then((res) => res.json())
    //     .then((data) => console.log('Data submitted successfully:', data))
    //     .catch((error) => console.error('Error submitting data:', error));
    // };

    // window.addEventListener('message', handleMessage);

    // return () => {
    //   window.removeEventListener('message', handleMessage);
    // };
  }, []);

  // Example: Send data to the iframe
//   const sendDataToIframe = () => {
//     const data = { key: 'value', userId: 123 };
//     iframeRef.current.contentWindow.postMessage(data, 'https://dx.sbx0328.play.hclsofy.com');
//   };

  return (
    <div className="h-screen w-full">
      <Navigation/>
      <iframe
        ref={iframeRef}
        src="https://dx.sbx0328.play.hclsofy.com/apps/anon/org/app/61abf82a-d82f-4e13-8a82-c8867e4c48b9/launch/index.html?form=F_DeliveryAddress"
        title="HCL DX Form"
        width="100%"
        height="100%"
        style={{
          border: 'none',
          overflow: 'hidden'
        }}
        allow="geolocation; microphone; camera"
      />
      {/* <button onClick={sendDataToIframe} className="mt-4 px-4 py-2 bg-blue-500 text-white">
        Send Data to Iframe
      </button> */}
      <Footer/>
    </div>
  );
};

export default HCLForm;
