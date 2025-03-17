import React from 'react';

const sharedClasses = {
  borderB2: 'border-b-2',
  pb2: 'pb-2',
  textCenter: 'text-center',
  wFull: 'w-full',
  flex: 'flex',
  flexCol: 'flex-col',
  itemsCenter: 'items-center',
  justifyAround: 'justify-around',
  py4: 'py-4',
  my4: 'my-4',
  bgZinc100: 'bg-zinc-100',
  bgBlue500: 'bg-blue-500',
  textWhite: 'text-white',
  py2: 'py-2',
  px4: 'px-4',
  rounded: 'rounded',
};

const BasketComponent = () => {
  return (
    <div className={`flex ${sharedClasses.flexCol} ${sharedClasses.itemsCenter} ${sharedClasses.p4}`}>
      <div className={`flex ${sharedClasses.justifyAround} ${sharedClasses.wFull} ${sharedClasses.borderB2} border-zinc-200`}>
        <div className={`${sharedClasses.pb2} ${sharedClasses.borderB2} border-black`}>BASKET (0 ITEMS)</div>
        <div className={`${sharedClasses.pb2} text-zinc-500`}>DELIVERY</div>
        <div className={`${sharedClasses.pb2} text-zinc-500`}>PAYMENT</div>
      </div>
      <div className={`${sharedClasses.wFull} ${sharedClasses.textCenter} ${sharedClasses.py4} ${sharedClasses.bgZinc100}`}>
        Your basket is not reserved.
      </div>
      <div className={`${sharedClasses.wFull} ${sharedClasses.textCenter} ${sharedClasses.my4}`}>
        There are no items in your basket
      </div>
      <button className={`${sharedClasses.bgBlue500} ${sharedClasses.textWhite} ${sharedClasses.py2} ${sharedClasses.px4} ${sharedClasses.rounded}`}>
        Back to Target homepage
      </button>
    </div>
  );
};

export default BasketComponent;
