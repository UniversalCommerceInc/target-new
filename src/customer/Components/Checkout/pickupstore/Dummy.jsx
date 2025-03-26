import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal, RadioGroup, Radio, FormControlLabel } from '@mui/material';
import { toast } from 'react-toastify';
import ShopSelectionModal from './ShopSelectionModal';
import { useNavigate } from 'react-router-dom';
import { getStore, setShippingMethod } from '../../../../action';

const initialShippingData = [
  { id: 'a9493bb2-7d0c-4ea9-9038-daa3794f080b', name: 'Standard US' },
  { id: '38a9635b-d62c-45b2-885e-b8d1c63aebea', name: 'Express US' },
  { id: '6bfbe97d-b70f-4766-9549-5a4ed1ee78ab', name: 'Pickup From Store' },
  { id: '2502988c-b3ed-4c1a-9a22-8e4731fd26c7', name: 'Ship From Store' },
];

const ShippingDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [shop, setShop] = useState([]);
  const [locationGranted, setLocationGranted] = useState(false);
  const [browserCoordinates, setBrowserCoordinates] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(initialShippingData[0].name); // ✅ Set first option by default
  const [selectedShop, setSelectedShop] = useState(null);
  const [nearbyShops, setNearbyShops] = useState([]);
  const [showShippingPopup, setShowShippingPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredShippingData, setFilteredShippingData] = useState([]);

  const orderId = localStorage.getItem('orderId');

  // 🌍 Get browser location
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationGranted(true);
          setBrowserCoordinates({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          setLocationGranted(false);
          console.error('Error getting location:', error);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    }
  }, []);

  // ✅ Filter shipping methods based on location permission
  useEffect(() => {
    const availableMethods = initialShippingData.filter((method) => {
      // Always show first two methods
      if (
        method.name === 'Standard US' ||
        method.name === 'Express US'
      ) {
        return true;
      }
      // Show last two only if location is granted
      if (locationGranted) {
        return true;
      }
      return false;
    });

    setFilteredShippingData(availableMethods);
  }, [locationGranted]);

  // ✅ Fetch and map shop data
  useEffect(() => {
    const fetchShops = async () => {
      try {
        setIsLoading(true);
        const res = await getStore();

        const mappedShops = res
          .map((store) => {
            const latitude = store?.custom?.fields?.latitude;
            const longitude = store?.custom?.fields?.longitude;

            if (latitude && longitude) {
              return {
                ...store,
                sellers: [
                  {
                    sellerId: store.id,
                    name: store.name['en-US'],
                    coordinates: { lat: latitude, lng: longitude },
                    googleMapsLink: store?.custom?.fields?.googleMapsLink,
                  },
                ],
              };
            }
            return null;
          })
          .filter(Boolean);

        setShop(mappedShops);
      } catch (error) {
        console.error('Error fetching store:', error);
        toast.error('Failed to fetch store data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchShops();
  }, [dispatch]);

  // ✅ Find nearby shops (within 50 km)
  useEffect(() => {
    if (browserCoordinates && shop.length > 0) {
      const shopsWithin50km = shop.flatMap((store) => {
        return store.sellers
          .map((seller) => {
            const distance = calculateDistance(
              browserCoordinates.lat,
              browserCoordinates.lng,
              seller.coordinates.lat,
              seller.coordinates.lng
            );
            if (distance <= 50) {
              return { ...seller, distance };
            }
            return null;
          })
          .filter(Boolean);
      });

      setNearbyShops(shopsWithin50km);
    }
  }, [browserCoordinates, shop]);

  // 🌍 Distance calculation (Haversine Formula)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const deg2rad = (deg) => deg * (Math.PI / 180);

  // 🚚 Handle shipping option change
  const handleOptionChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);

    if (value === 'Pickup From Store') {
      setIsModalOpen(true);
      console.log(browserCoordinates, shop, nearbyShops);
    } else if (value === 'Ship From Store') {
      setShowShippingPopup(true);
    }
  };

  // ✅ Confirm shipping from dealer or address
  const handleShippingConfirmation = (useCurrentLocation) => {
    setShowShippingPopup(false);
    if (useCurrentLocation) {
      setIsModalOpen(true);
    }
  };

  // ✅ Handle checkout navigation
  const handleContinue = async () => {
    try {
      const cartVersion = localStorage.getItem('cartVersion');
      const selectedMethod = initialShippingData.find(
        (method) => method.name === selectedOption
      );

      if (!selectedMethod) {
        toast.error('Shipping method not found.');
        return;
      }

      const res = await dispatch(
        setShippingMethod({
          shippingID: selectedMethod.id,
          CartID: orderId,
          version: cartVersion,
        })
      );

      if (res?.version) {
        navigate('/checkout/billing');
      } else {
        throw new Error('Failed to set shipping method');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      {/* ✅ Shipping Method Selection */}
      <RadioGroup value={selectedOption} onChange={handleOptionChange}>
        {filteredShippingData.map((method) => (
          <FormControlLabel
            key={method.id}
            value={method.name}
            control={<Radio />}
            label={method.name}
          />
        ))}
      </RadioGroup>

      {/* ✅ Shop Selection Modal */}
      <ShopSelectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        nearbyShops={nearbyShops}
        onSelectShop={(shop) => setSelectedShop(shop)}
        isLoading={isLoading}
      />

      {/* ✅ Confirmation Popup */}
      <Modal open={showShippingPopup} onClose={() => setShowShippingPopup(false)}>
        <div className="p-6 bg-white rounded-md w-1/2">
          <h2>Shipping Confirmation</h2>
          <Button onClick={() => handleShippingConfirmation(true)}>Yes</Button>
          <Button onClick={() => handleShippingConfirmation(false)}>No</Button>
        </div>
      </Modal>

      {/* ✅ Continue Button */}
      <Button onClick={handleContinue} disabled={!selectedOption}>
        Continue
      </Button>
    </div>
  );
};

export default ShippingDetails;
