import React from 'react';

const FlybuysComponent = () => {
  return (
    <div className="p-8 dark:bg-zinc-800 text-center">
      
      <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 text-lg" style={{color:"#214C8D"}}>
        <div className="pt-10 pb-0" >
        <img src="/flybuys.png" alt="Flybuys Logo" className="w-[150px] mb-4 " />

        </div>
        
        <div>
          
        </div>
        <div className="text-center">
          <p className="font-bold">GOT 2000 FLYBUYS POINTS?</p>
          <p className="font-bold text-xl">SAVE $10 INSTANTLY</p>
        </div>
        <div className="hidden md:block h-10 w-px bg-zinc-300"></div>
        <div className="text-center">
          <p className="font-bold">GOT 4000 FLYBUYS POINTS?</p>
          <p className="font-bold text-xl">SAVE $20 INSTANTLY</p>
        </div>
        
        <div className="pt-8 pb-0">

        <LearnMoreButton />
        </div>
      </div>
     
      <div className="text-center " style={{color:"#214C8D"}}>
        <p className=" ">
        Turn your flybuys points into instant savings when you shop in store or <br/> online at Target.

        <a href="#" className=" underline">T&Cs Apply</a>
      </p>
        </div>
      
    </div>
  );
};

const LearnMoreButton = () => {
  return (
    <button className="mt-6  text-white  py-2 px-4 rounded-full"
    style={{backgroundColor:"#214C8D"}}
    >Learn more</button>
  );
};

const FlybuysPage = () => {
  return (
    <>
      <FlybuysComponent />
    
    </>
  );
};

export default FlybuysPage;
