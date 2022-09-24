import React from "react";

import { SubHeading } from "../../components";
import { images } from "../../constants";
import "./Chef.css";

const Chef = () => (
  <div className="app__bg app__wrapper section__padding">
    <div className="app__wrapper_img app__wrapper_img-reverse">
      <img src={images.chef} alt="chef_image" />
    </div>
    <div className="app__wrapper_info">
      <SubHeading title="Chef's word" />
      <h1 className="headtext__cormorant">What we believe in</h1>

      <div className="app__chef-content">
        <div className="app__chef-content_quote">
          <img src={images.quote} alt="quote_image" />
          <p className="p__opensans"></p>
        </div>
        <p className="p__opensans">
          {" "}
          Creating a culture of Arts, Entertainment & Cannabis Entrepreneurs in
          a environment , where everyone is welcome. Acting with Integrity,
          challenging the status quo and finding ways to grow our community and
          each other under one race Being present, connecting with transparency,
          dignity and respect. Delivering our very best in all we do, holding
          one accountable for results. We are cannabis Brothers and Sister
          driven, through the lens of humanity, trust, determination & Ambition.{" "}
        </p>
      </div>

      <div className="app__chef-sign">
        <p>Kevin Luo</p>
        <p className="p__opensans">Chef & Founder</p>
        <img src={images.sign} alt="sign_image" />
      </div>
    </div>
  </div>
);

export default Chef;
