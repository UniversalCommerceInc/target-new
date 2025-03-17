import React, {
  useEffect,
  useState,
  Suspense,
  lazy,
  startTransition,
} from "react";
import { Skeleton } from "@mui/material";
import HomeCarousel from "../customer/Components/Carousel/HomeCarousel";
import { homeCarouselData } from "../customer/Components/Carousel/HomeCaroselData";
import { receiveGetContent, receiveProducts } from "../action";

// Lazy load components
const HeaderTopSection = lazy(() =>
  import("../customer/Components/Navbar/HeaderTop")
);
const NavigationSection = lazy(() =>
  import("../customer/Components/Navbar/Navigation")
);
const NavbarSection = lazy(() =>
  import("../customer/Components/Navbar/Navbar")
);
const FooterSection = lazy(() =>
  import("../customer/Components/footer/Footer")
);
const PaymentOptionsSection = lazy(() =>
  import("../customer/Components/footer/PaymentOption")
);
const HomeProductSection = lazy(() =>
  import("../customer/Components/Home/HomeProductSection")
);
const SaleComponent = lazy(() =>
  import("../customer/Components/Home/SaleComponent")
);
const DiscountCard = lazy(() =>
  import("../customer/Components/Home/DiscountCard")
);
const DiscountBanner = lazy(() =>
  import("../customer/Components/Home/DiscountBanner")
);
const NewArrivals = lazy(() =>
  import("../customer/Components/Home/NewArrival")
);
const TargetProducts = lazy(() =>
  import("../customer/Components/Home/TargetProduct")
);
const InstagramComponent = lazy(() =>
  import("../customer/Components/Home/InstagramComponent")
);
const FlybuysPage = lazy(() =>
  import("../customer/Components/Home/FlybuyComponent")
);
const PaymentMethods = lazy(() =>
  import("../customer/Components/Home/PaymentMethod")
);
const NewsletterSignup = lazy(() =>
  import("../customer/Components/Home/NewsLetter")
);
const ToyClearance = lazy(() =>
  import("../customer/Components/Home/ToyClearance")
);
const DiliveryInfo = lazy(() =>
  import("../customer/Components/Home/DiliveryInfo")
);

const Homepage = () => {
  const [topProducts, setTopProducts] = useState();
  const [banners, setBanners] = useState();

  useEffect(() => {
    receiveProducts().then((data) => {
      startTransition(() => {
        setTopProducts(data.hits);
      });
    });
  }, []);

  useEffect(() => {
    receiveGetContent().then((data) => {
      console.log("this is banners", data);
      startTransition(() => {
        setBanners(data);
      });
    });
  }, []);

  return (
    <div className="mx-auto px-1">
      <Suspense
        fallback={<Skeleton variant="rectangular" width="100%" height={118} />}
      >
        <HeaderTopSection />
      </Suspense>
      <Suspense
        fallback={<Skeleton variant="rectangular" width="100%" height={118} />}
      >
        <NavigationSection />
      </Suspense>
      <Suspense
        fallback={<Skeleton variant="rectangular" width="100%" height={118} />}
      >
        <DiliveryInfo />
      </Suspense>
      <Suspense
        fallback={<Skeleton variant="rectangular" width="100%" height={118} />}
      >
        <SaleComponent />
      </Suspense>
      <Suspense
        fallback={<Skeleton variant="rectangular" width="100%" height={118} />}
      >
        <DiscountCard />
      </Suspense>
      <Suspense
        fallback={<Skeleton variant="rectangular" width="100%" height={118} />}
      >
        <div className="flex flex-col items-center justify-center p-8 bg-white dark:bg-zinc-900">
          <div className="text-center mt-[100px] pt-8 pb-8">
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-4 mb-2">
              *T&Cs apply. Ends 5 June
            </p>
            <button className="bg-black text-white mt-4 py-2 px-4 rounded-full">
              Shop all Sleepwear
            </button>
          </div>
        </div>
      </Suspense>
      <Suspense
        fallback={<Skeleton variant="rectangular" width="100%" height={118} />}
      >
        <DiscountBanner />
      </Suspense>
      <Suspense
        fallback={<Skeleton variant="rectangular" width="100%" height={118} />}
      >
        <div className="flex flex-col items-center justify-center p-8 bg-white dark:bg-zinc-900">
          <div className="text-center mt-[100px] pt-8 pb-8">
            <button className="bg-black text-white mt-4 py-2 px-4 rounded-full">
              Shop all Deals
            </button>
          </div>
        </div>
      </Suspense>
      <Suspense
        fallback={<Skeleton variant="rectangular" width="100%" height={118} />}
      >
        <NewArrivals title="New Arrival" />
      </Suspense>
      <Suspense
        fallback={<Skeleton variant="rectangular" width="100%" height={118} />}
      >
        <TargetProducts />
      </Suspense>
      <Suspense
        fallback={<Skeleton variant="rectangular" width="100%" height={118} />}
      >
        <img
          className="mt-10"
          src="https://www.target.com.au/medias/sys_master/root/h40/had/h00/h00/28576716587038/300524-Quilts-Pillows-Strip-Banner-Desktop-4.jpg"
          alt=""
        />
      </Suspense>
      <Suspense
        fallback={<Skeleton variant="rectangular" width="100%" height={118} />}
      >
        <div className="mt-10">
          <ToyClearance />
        </div>
      </Suspense>
      <Suspense
        fallback={<Skeleton variant="rectangular" width="100%" height={118} />}
      >
        <img
          className="mt-10"
          src="https://www.target.com.au/medias/sys_master/root/hc9/hd3/h00/h00/28460669861918/OnePass-Supercharge-5xFlybuys-Desktop.png"
          alt=""
        />
      </Suspense>
      <Suspense
        fallback={<Skeleton variant="rectangular" width="100%" height={118} />}
      >
        <FlybuysPage />
      </Suspense>
      <Suspense
        fallback={<Skeleton variant="rectangular" width="100%" height={118} />}
      >
        <PaymentMethods />
      </Suspense>
      <Suspense
        fallback={<Skeleton variant="rectangular" width="100%" height={118} />}
      >
        <NewsletterSignup />
      </Suspense>
      <Suspense
        fallback={<Skeleton variant="rectangular" width="100%" height={118} />}
      >
        <FooterSection />
      </Suspense>
      <Suspense
        fallback={<Skeleton variant="rectangular" width="100%" height={118} />}
      >
        <PaymentOptionsSection />
      </Suspense>
    </div>
  );
};

export default Homepage;
