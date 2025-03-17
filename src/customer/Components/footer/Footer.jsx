import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
// import TikTokIcon from '@mui/icons-material/TikTok';

const linkClasses = "hover:underline";
const spaceClasses = "space-y-2";
const imgClasses = "flex justify-center mt-4 md:mt-8 md:justify-start space-x-4 md:space-x-6";

const Footer = () => {
  return (
    <div className="bg-zinc-800 text-white py-8">
      <div className="max-w-7xl mx-auto ml-10 px-4 md:flex md:flex-wrap justify-around ">
        <div className="md:flex md:justify-start md:space-x-20 space-y-8 md:space-y-0">
          <FooterColumn title="Help" links={['Help', 'Order Tracking', 'FAQs', 'Store Locations & Hours', 'Click & Collect', 'Payment', 'Delivery', 'Returns & Refunds', 'Secure Shopping', 'Store Services']} />
          <FooterColumn title="Services" links={['eNews Signup', 'Giftcards', 'flybuys', 'Zip', 'Afterpay', 'Catch', 'OnePass', 'True Fit']} />
          <FooterColumn title="Company" links={['Company', 'Careers', 'Customer Notices', 'Product Recall']} />
        </div>
        <div className="mt-8 md:mr-20 md:mt-0 text-center md:text-left">
          <h3 className="font-bold mb-4">STAY CONNECTED</h3>
          <div className="flex justify-center mt-4 md:mt-8 md:justify-start space-x-4 md:space-x-8">
            <SocialLink href="#" icon={<FacebookIcon />} />
            <SocialLink href="#" icon={<YouTubeIcon />} />
            <SocialLink href="#" icon={<InstagramIcon />} />
            <SocialLink href="#" icon={<PinterestIcon />} />
            {/* <SocialLink href="#" icon={<TikTokIcon />} /> */}
          </div>
          <div className={`${imgClasses} mt-4 md:mt-8`}>
            <AppStoreLink href="#" src="https://www.target.com.au/medias/sys_master/hf2/h1e/14043495858206.png" alt="Get it on Google Play" />
            <AppStoreLink href="#" src="https://www.target.com.au/medias/sys_master/he8/hbc/14043496054814.png" alt="Download on the App Store" />
          </div>
        </div>
      </div>
    </div>
  );
};

const FooterColumn = ({ title, links }) => {
  return (
    <div>
      <h4 className="font-bold mb-4">{title}</h4>
      <ul className={spaceClasses}>
        {links.map((link, index) => (
          <li key={index}><a href="#" className={linkClasses}>{link}</a></li>
        ))}
      </ul>
    </div>
  );
};

const SocialLink = ({ href, icon }) => {
  return (
    <a href={href} className="text-white hover:text-gray-400 transition duration-300">{icon}</a>
  );
};

const AppStoreLink = ({ href, src, alt }) => {
  return (
    <a href={href} className="inline-block">
      <img className="h-10 w-32 md:h-10 md:w-32" src={src} alt={alt} />
    </a>
  );
};

export default Footer;
