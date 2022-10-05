import "./Login.css";
import styled from "styled-components/macro";
import * as MaterialDesign from "react-icons/md";
import GoogleIcon from "@mui/icons-material/Google";

import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
// import FcGoogle from "react-icons/fc";
import Button from "./Button";
import Icon from "./Icon";
import Input from "./Input";
import login_background from "../../assets/login_background.jpg";
import Navbar from "../../components/Navbar/Navbar";
function App() {
  const FacebookBackground =
    "linear-gradient(to right, #0546A0 0%, #0546A0 40%, #663FB6 100%)";
  const InstagramBackground =
    "linear-gradient(to right, #A12AC4 0%, #ED586C 40%, #F0A853 100%)";
  const TwitterBackground =
    "linear-gradient(to right, #56C1E1 0%, #35A9CE 50%)";
  const GoogleBackground =
    "linear-gradient(to right, #f7c205 0%, #eed579 100%)";

  const google = () => {
    // window.open("http://stiamivip.com/api/auth/google", "_self")
    const fetchUrl =
      process.env.REACT_APP_NODE_ENV === "development"
        ? "http://localhost:5000/api/auth/google"
        : "http://stiamivip.com/api/auth/google";

    window.open(fetchUrl, "_self");
  };
  return (
    <>
      <Container>
        <MainContainer>
          <WelcomeText>Welcome</WelcomeText>
          <InputContainer>
            <Input type="text" placeholder="Ip Address" />
            {/* <Input type='password' placeholder='Password' /> */}
          </InputContainer>
          <ButtonContainer>
            <Button content="Submit" />
          </ButtonContainer>
          {/* <LoginWith>OR LOGIN WITH</LoginWith> */}
          {/* <HorizontalRule /> */}
          {/* <IconsContainer onClick={google}>
						
						<Icon color={GoogleBackground}>
							<GoogleIcon />
						</Icon>
					</IconsContainer> */}
          {/* <ForgotPassword>Forgot Password ?</ForgotPassword> */}
        </MainContainer>
      </Container>
    </>
  );
}
// background: rgba(255, 255, 255, 0.15);
//   background: rgba(13, 13, 14, 1);
{
  /* <Icon color={FacebookBackground}>
              <FcGoogle />
            </Icon>
            <Icon color={InstagramBackground}>
              <FaInstagram />
            </Icon>
            <Icon color={TwitterBackground}>
              <FaTwitter />
            </Icon> */
}
const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-image: url(${login_background});
`;

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 80vh;
  width: 30vw;
  justify-content: center;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 8px 32px 0 rgba(243, 205, 70, 1);

  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  @media only screen and (max-width: 320px) {
    width: 80vw;
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

const WelcomeText = styled.h2`
  margin: 3rem 0 4rem 0;
  color: black;
  font-size: 2rem;
  font-family: "Cormorant Upright";
  margin: 3rem auto 2rem;
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

const ButtonContainer = styled.div`
  margin: 1rem 0 2rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginWith = styled.h5`
  cursor: pointer;
`;

const HorizontalRule = styled.hr`
  width: 90%;
  height: 0.3rem;
  border-radius: 0.8rem;
  border: none;
  background: linear-gradient(to right, #f7c205 0%, #eed579 79%);
  background-color: #ebd0d0;
  margin: 1.5rem 0 1rem 0;
  backdrop-filter: blur(25px);
`;

const IconsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 2rem 0 3rem 0;
  width: 80%;
`;

// const ForgotPassword = styled.h4`
//   cursor: pointer;
// `;

export default App;
