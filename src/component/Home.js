import React, { useEffect } from "react";
import Feedback from "./Feedback";
import Review from "./Review";
import BestOffers from "./BestOffers";
import TestFilter from "./TestFilter";
import About from "./About";
export default function Home() {
  return (
    <>
      <div className="hero">
        <img
          src="assests/image/backgroudimg.jpg"
          alt="Snow"
          style={{ width: "100%" }}
        />
        <div className="heading">
          <h1>Reliable &amp; High-Quality Laboratory Services</h1>
          <p>We employ the latest technology and innovations</p>
        </div>
      </div>
      {/* End Hero */}

      {/* start Scroll bar */}

      <TestFilter />

      {/* Add more scroll items as needed */}
      {/* end scroll bar */}
      {/*  Start Offer Section */}
      <BestOffers />
      {/*  End Offer Section */}
      {/*Feedback Section starts here*/}
      <Feedback />
      {/*Feedback Section ends here*/}
      {/*review Section starts here*/}
      <Review />
      {/*review Section starts here*/}

      <About/>
    </>
  );
}
