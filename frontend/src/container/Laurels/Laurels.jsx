import React from "react";

import { SubHeading } from "../../components";
import { images, data } from "../../constants";
import "./Laurels.css";

const AwardCard = ({ award: { imgUrl, title, subtitle } }) => (
  <div className="app__laurels_awards-card">
    <img src={imgUrl} alt="awards" />
    <div className="app__laurels_awards-card_content">
      <p className="p__cormorant" style={{ color: "#DCCA87" }}>
        {title}
      </p>
      <p className="p__opensans">{subtitle}</p>
    </div>
  </div>
);

const Laurels = () => (
  // <div className="app__bg app__wrapper section__padding" id="awards">
  //   <div className="app__wrapper_info">
  //     <SubHeading title="Awards & recognition" />
  //     <h1 className="headtext__cormorant">Our Laurels</h1>

  //     <div className="app__laurels_awards">
  //       {data.awards.map((award) => <AwardCard award={award} key={award.title} />)}
  //     </div>
  //   </div>

  //   <div className="app__wrapper_img">
  //     <img src={images.laurels} alt="laurels_img" />
  //   </div>
  // </div>
  <>
    <div className="membership_cards">
      {/* <div className="wrapper"> */}
      <div className="box">
        <div className="box__header">
          <h2> Players Membership</h2>
        </div>
        <ul>
          <li>Standing reservations</li>
          <li>Dedicated seats </li>
          <li>Gifting powers</li>
          <li>Send a free drink </li>
          <li>Enjoy by-the-glass options</li>
          {/* <li>Pick any of our wine without committing to the full bottle</li>
            <li>5 Stiami Pre rolls per month </li>
            <li>
              You get also $110 in food and drink credits every month. Credits
              roll over indefinitely.
            </li>
            <li>
              Miss months and there will be enough to feed the family with your
              next visit.
            </li> */}
        </ul>
        <a href="/"> Learn More</a>
      </div>
      <div className="box">
        <div className="box__header">
          <h2> Gold VIP Membership</h2>
        </div>
        <ul>
          <li>Standing reservations</li>
          <li>Dedicated seats </li>
          <li>Gifting powers</li>
          <li>Send a free drink </li>
          <li>Enjoy by-the-glass options</li>
          {/* <li>Pick any of our wine without committing to the full bottle</li>
            <li>5 Stiami Pre rolls per month </li>
            <li>
              You get also $110 in food and drink credits every month. Credits
              roll over indefinitely.
            </li>
            <li>
              Miss months and there will be enough to feed the family with your
              next visit.
            </li> */}
        </ul>
        <a href="/"> Learn More</a>
      </div>
      <div className="box">
        <div className="box__header">
          <h2> Box club Membership</h2>
        </div>
        <ul>
          <li>Standing reservations</li>
          <li>Dedicated seats </li>
          <li>Gifting powers</li>
          <li>Send a free drink </li>
          <li>Enjoy by-the-glass options</li>
          <li>You also get $225 in food and drink credits every month</li>
          {/* <li>Pick any of our wine without committing to the full bottle</li>
            <li>5 Stiami Pre rolls per month </li>
            <li>
              You get also $110 in food and drink credits every month. Credits
              roll over indefinitely.
            </li>
            <li>
              Miss months and there will be enough to feed the family with your
              next visit.
            </li> */}
        </ul>
        <a href="/"> Learn More</a>
      </div>
    </div>
    {/* </div> */}
  </>
);

export default Laurels;
