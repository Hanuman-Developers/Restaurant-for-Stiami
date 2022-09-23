import React, { useState, useEffect } from "react";
import VerticalNav from "../../components/VerticalNav/VerticalNav";
import "./Inventory.css";
import { CartState } from "../../context/cartItem_context";
import FoodItem from "../../components/FoodItem/FoodItem";
import { useLocation, useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar/AdminNavbar";
import { Scrollbars } from "react-custom-scrollbars-2";
// Material UI
import { IconContext } from "react-icons";

import { MdOutlineLibraryAdd } from "react-icons/md";
function Inventory() {
  const { cart, total, clearCart } = CartState();
  const history = useNavigate();

  // Tab States
  // const [value, setValue] = React.useState("one");

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };
  // const [starter, setStarter] = useState({});
  // const [mainCourse, setMainCourse] = useState({});
  const get_starters = cart.filter(function (item) {
    return item.category == "Starters";
  });

  const get_mainCourse = cart.filter(function (item) {
    return item.category == "Main Course";
  });

  useEffect(() => {
    // const get_starters = cart.filter(function (item) {
    //   return item.category == "Starters";
    // });
    // const get_mainCourse = cart.filter(function (item) {
    //   return item.category == "Main Course";
    // });
    // setStarter(get_starters);
    // setMainCourse(mainCourse);
  }, []);

  return (
    <>
      {/* <div className="main__container"> */}
      <VerticalNav></VerticalNav>
      <AdminNavbar heading="Stiami Foods"></AdminNavbar>
      {/* <div className="board">
        <div className="edit-grid-override">
          <div className="create_product">
            <p>Want to add a new Item? </p>
            <Button
              variant="contained"
              style={{
                maxWidth: "100px",
                maxHeight: "40px",
                minWidth: "50px",
                minHeight: "30px",
              }}
              sx={{
                size: "small",
                fontSize: "0.6rem",
                padding: "0rem 0.5rem 0rem 0.5rem",
                backgroundColor: "green",
                marginTop: "0.3rem",
              }}
              onClick={() => {
                history("/additem");
              }}
            >
              Add
            </Button>
          </div>

          {/* <div className="app__specialMenu_menu_items"> 
          {cart.map((wine) => (
            <FoodItem
              key={wine.id}
              {...wine}
              // id={wine.id}
              // title={wine.title}
              // price={wine.price}
              // tags={wine.tags}
              // amount={wine.amount}
            />
          ))}
          {/* </div>
        </div>
      </div> */}
      {/* <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Item One" value="1" />
              <Tab label="Item Two" value="2" />
              <Tab label="Item Three" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">Item One</TabPanel>
          <TabPanel value="2">Item Two</TabPanel>
          <TabPanel value="3">Item Three</TabPanel>
        </TabContext>
      </Box> */}

      <div className="full_bg">
        <div className="board">
          {/* <div className="Inventory_header">
          <h2>Stiami Products</h2>
        </div> */}
          <div className="product__add__container">
            <div className="bloc-tabs">
              <h1> Want to add new item?</h1>
            </div>
            <div
              className="product__add__button"
              onClick={() => {
                history("/additem");
              }}
            >
              <IconContext.Provider value={{ color: "dcca87", size: "40px" }}>
                <MdOutlineLibraryAdd />
              </IconContext.Provider>
            </div>
          </div>

          <div className="Food-container">
            <div className="container">
              <div className="bloc-tabs">
                <button
                  className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                  onClick={() => toggleTab(1)}
                >
                  Starter
                </button>
                <button
                  className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                  onClick={() => toggleTab(2)}
                >
                  Main Course
                </button>
                <button
                  className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
                  onClick={() => toggleTab(3)}
                >
                  Desert
                </button>
              </div>

              <div className="content-tabs">
                <div
                  className={
                    toggleState === 1 ? "content  active-content" : "content"
                  }
                >
                  <div className="product-grid-override">
                    <Scrollbars
                      style={{
                        width: "100%",
                        height: "100%",
                        // backgroundColor: "#dcca87",
                        // transform: "translateX(-50%)",
                      }}
                      renderTrackVertical={(props) => (
                        <div {...props} className="vtrack" />
                      )}
                      renderThumbVertical={(props) => (
                        <div {...props} className="vthumb" />
                      )}
                    >
                      {get_starters.length > 0 &&
                        get_starters.map((wine) => (
                          <FoodItem
                            key={wine.id}
                            {...wine}
                            // id={wine.id}
                            // title={wine.title}
                            // price={wine.price}
                            // tags={wine.tags}
                            // amount={wine.amount}
                          />
                        ))}
                    </Scrollbars>

                    {/* <h1>Heor</h1> */}
                  </div>
                </div>

                <div
                  className={
                    toggleState === 2 ? "content  active-content" : "content"
                  }
                >
                  {/* <h2>Content 2</h2> */}

                  <div className="product-grid-override">
                    <Scrollbars
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      {get_mainCourse.length > 0 &&
                        get_mainCourse.map((wine) => (
                          <FoodItem
                            key={wine.id}
                            {...wine}
                            // id={wine.id}
                            // title={wine.title}
                            // price={wine.price}
                            // tags={wine.tags}
                            // amount={wine.amount}
                          />
                        ))}
                    </Scrollbars>

                    {/* <h1>Heor</h1> */}
                  </div>
                </div>

                <div
                  className={
                    toggleState === 3 ? "content  active-content" : "content"
                  }
                >
                  <h2>Content 3</h2>
                  <hr />
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Eos sed nostrum rerum laudantium totam unde adipisci
                    incidunt modi alias! Accusamus in quia odit aspernatur
                    provident et ad vel distinctio recusandae totam quidem
                    repudiandae omnis veritatis nostrum laboriosam architecto
                    optio rem, dignissimos voluptatum beatae aperiam voluptatem
                    atque. Beatae rerum dolores sunt.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Inventory;
