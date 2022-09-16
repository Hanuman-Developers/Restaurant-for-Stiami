import React, { useEffect, useState } from "react";
import "./AllOrders.css";
import axios from "../../apis/axios";
function AllOrders() {
  const _id = "6323bd64ba23db2ec19abee0";

  const getOrderURL = `/orders/${_id}`;
  const [isShipped, setShipped] = useState(false);

  useEffect(async () => {
    const prod = {
      _id: _id,
    };
    try {
      const response = await axios.post(getOrderURL, prod, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (response.data.orderStatus == "Shipped") {
        console.log("yes");
        setShipped(true);
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <>
      <section class="root">
        <figure>
          <figcaption>
            <h4>Tracking Details</h4>
            <h6>Order Number</h6>
            <h2># A61452B</h2>
          </figcaption>
        </figure>
        <div class="order-track">
          <div class="order-tracking completed">
            <span class="is-complete"></span>
            <p>
              Ordered
              <br />
              <span>Mon, June 24</span>
            </p>
          </div>

          {isShipped ? (
            <div class="order-tracking completed">
              <span class="is-complete"></span>
              <p>
                Shipped
                <br />
                <span>Tue, June 25</span>
              </p>
            </div>
          ) : (
            <div class="order-tracking ">
              <span class="is-complete"></span>
              <p>
                Shipped
                <br />
                <span>Tue, June 25</span>
              </p>
            </div>
          )}
          {/* <div class="order-tracking ">
            <span class="is-complete"></span>
            <p>
              Shipped
              <br />
              <span>Tue, June 25</span>
            </p>
          </div> */}
        </div>
      </section>
    </>
  );
}

export default AllOrders;
