import React, { useState, useReducer } from "react";
import VerticalNav from "../../components/VerticalNav/VerticalNav";
import "./AddFoodItem.scss";
import axios from "../../apis/axios";
import Button from "../Login/Button";
import Icon from "../Login/Icon";
import Input from "../Login/Input";
import AdminNavbar from "../../components/AdminNavbar/AdminNavbar.js";
import styled from "styled-components/macro";
import login_background from "../../assets/login_background.jpg";
// import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const initialState = {
  name: "",
  category: "",
  price: 0,
  description: "",
};

function reducer(state, action) {
  // For a specific field name
  // if (action.input == "name") {
  //   return { ...state, name: action.value };
  // }

  return { ...state, [action.input]: action.value };
}

function AddFoodItem() {
  const options = ["Starters", "Main Course", "Dessert", "Drinks"];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [ip, setIp] = useState("");

  const toggling = () => setIsOpen(!isOpen);

  const [state, dispatch] = useReducer(reducer, initialState);
  const ADD_URL = "ip/";

  const onOptionClicked = (value) => () => {
    const action = {
      input: "category",
      value: value,
    };
    setIsOpen(false);
    setSelectedOption(value);

    dispatch(action);
  };

  function onChange(e) {
    console.log(e.target.value);
    setIp(e.target.value);
  }

  async function onSubmit(e) {
    e.preventDefault();
    console.log(e.target);

    const prod = {
      address: ip,
    };
    console.log(prod);

    const response = await axios.post(ADD_URL, prod, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    console.log(response);
    setOpen(true);
  }

  /* ----------------Notification--------------------- */
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <>
      {/* <VerticalNav></VerticalNav>
      <AdminNavbar heading="Create Product" /> */}
      <>
        <div className="full_bg">
          <div className="board">
            <AddItemContainer>
              <FormContainer>
                <Header>Enter Ip Address</Header>
                {/* <form onSubmit={onSubmit}> */}
                <InputContainer>
                  <Input
                    name="ip"
                    type="ip"
                    placeholder="Ip Address"
                    onChange={onChange}
                  />
                  {/* <Input
                    name="price"
                    type="number"
                    placeholder="Price"
                    onChange={onChange}
                  />
                  <Input
                    type="description"
                    name="description"
                    placeholder="description"
                    onChange={onChange}
                  /> */}
                </InputContainer>
                {/* <CatergoryContainer>
                  <DropDownContainer>
                    <DropDownHeader onClick={toggling}>
                      {selectedOption || "Starters"}
                    </DropDownHeader>
                    {isOpen && (
                      <DropDownListContainer>
                        <DropDownList>
                          {options.map((option) => (
                            <ListItem
                              onClick={onOptionClicked(option)}
                              key={Math.random()}
                            >
                              {option}
                            </ListItem>
                          ))}
                        </DropDownList>
                      </DropDownListContainer>
                    )}
                  </DropDownContainer>
                  <TextArea> Category</TextArea>
                </CatergoryContainer> */}
                <ButtonContainer onClick={onSubmit}>
                  <Button content="Create" />
                </ButtonContainer>
                <Snackbar
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                  message="Successfully saved"
                  action={action}
                />
                {/* </form> */}
              </FormContainer>
            </AddItemContainer>
          </div>
        </div>
      </>
    </>
  );
}
const AddItemContainer = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-image: url(${login_background});
`;

const FormContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 90vh;
  width: 30vw;
  // justify-content: center;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 8px 32px 0 rgba(243, 205, 70, 1);

  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
  color: #ffffff;
  // text-transform: uppercase;
  letter-spacing: 0.1rem;
  @media only screen and (max-width: 320px) {
    width: 100vw;
    height: 90vh;
    hr {
      margin-bottom: 0.3rem;
    }
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 360px) {
    width: 80vw;
    height: 90vh;
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 411px) {
    width: 80vw;
    height: 90vh;
  }
  @media only screen and (min-width: 768px) {
    width: 80vw;
    height: 80vh;
  }

  @media only screen and (min-width: 360px) {
    width: 70vw;
    height: 50vh;
  }
  @media only screen and (min-width: 350px) {
    width: 30vw;
    height: 80vh;
  }
`;

const Header = styled.h2`
  color: black;
  font-size: 1.5rem;
  font-family: "Cormorant Upright ";
  margin: 2rem auto 4rem;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 20%;
  width: 100%;
  margin: 1rem;
`;

/* Scrollbar Components */

const DropDownContainer = styled("div")`
  width: auto;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border-radius: 2rem;
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
`;

const TextArea = styled.p`
  width: 100%;
  margin: 0 auto;
  color: black;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  // display: flex;
  // justify-content: space-around;
  // align-items: center;
  // flex-direction: row;
  margin-left: 1.2 rem;
  padding: 0.5rem;
  border-radius: 2rem;
`;

const CatergoryContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: center;
  // height: 20%;
  width: 30vh;
  margin: 2rem;
  gap: 2rem;
  @media (max-width: 800) {
    flex-direction: column-reverse;
  }
`;

const DropDownHeader = styled("div")`
  margin-bottom: 0.8em;
  padding: 0.8em 1em 0em 1em;
  // box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  font-weight: 500;
  font-size: 0.8rem;
  color: black;
`;

const DropDownListContainer = styled("div")`
  position: absolute;
  // top: 50rem;
  z-index: 100;
  width: 10.5em;
  border-radius: 2px solid yellow;
`;

const DropDownList = styled("ul")`
  padding: 0;
  margin: 0;
  padding-left: 1em;
  background: #ffffff;
  border-radius: 2px solid yellow;
  box-sizing: border-box;
  color: black;
  font-size: 1rem;
  font-weight: 500;
  &:first-child {
    padding-top: 0.8em;
  }
`;
const ListItem = styled("li")`
  list-style: none;
  margin-bottom: 0.8em;
  &:hover {
    color: #dcca87;
  }
`;

const ButtonContainer = styled.div`
  margin: 1rem 0 2rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default AddFoodItem;
