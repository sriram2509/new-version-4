import styled from "styled-components";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./loginForm";
import SignUpForm from "./signUpForm";
import { clearErrors } from "../../../state/actions/userActions";
import "../AccountBox/AccountBox.css"
import cart from "../../../images/ricey N W.png"

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 86.1vh;
  background-color: antiquewhite;
`;

export const BoxContainer = styled.div`
  width: 410px;
  height: 715px;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  background-color: rgb(194 194 194 / 40%);
  box-shadow: 0 0 15px rgb(6 42 30);
  position: relative;
  overflow: hidden;
`;

export const TopContainer = styled.div`
  width: 100%;
  height: 240px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 1.8em;
  padding-bottom: 4em;
`;

export const BackDrop = styled(motion.div)`
  width: 160%;
  height: 550px;
  display: flex;
  flex-direction: column;
  border-radius: 50%;
  position: absolute;
  top: -290px;
  left: -70px;
  transform: rotate(60deg);
  background: rgb(6, 42, 30);
  // background: linear-gradient(
  //   65deg,
  //   rgba(6, 42, 30, 1) 20%,
  //   rgba(28, 168, 196, 1) 100%
  // );
  background: linear-gradient(135deg,#C1A582 0,#CC4400 100%);

`;

export const BackDrop1 = styled(motion.div)`
  width: 140%;
  height: 605px;
  display: flex;
  flex-direction: column;
  border-radius: 50%;
  position: absolute;
  top: -290px;
  left: -70px;
  transform: rotate(60deg);
  background: rgb(6, 42, 30);
  // background: linear-gradient(
  //   65deg,
  //   rgba(6, 42, 30, 1) 20%,
  //   rgba(28, 168, 196, 1) 100%
  // );
  background: linear-gradient(135deg,#C1A582 0,#CC4400 100%);
`;

export const HeaderContainer = styled.div`
  width: 100%;
  // display: flex;
  // flex-direction: column;
  z-index: 10;
`;

export const HeaderText = styled.h3`
  font-size: 2.5em;
  font-weight: 600;
  color: rgb(255, 255, 255);
  line-height: 4.24;
  margin: -113px;
  text-align: center;
  font-family: unset;
`;

export const HeaderText6 = styled.h3`
  font-size: 2.5em;
  font-weight: 600;
  color: rgb(255, 255, 255);
  line-height: 4.24;
  margin: -50px;
  text-align: center;
  font-family: unset;
`;

export const HeaderText7 = styled.h3`
  font-size: 2.5em;
  font-weight: 600;
  color: rgb(255, 255, 255);
  line-height: 1.24;
  margin: 10px;
  text-align: center;
`;


export const HeaderText3 = styled.h3`
  font-size: 2.4em;
  font-weight: 900;
  color: rgb(255, 255, 255);
  line-height: 1.26;
  margin: 20px;
  text-align: center;
`;

export const HeaderText4 = styled.h3`
  font-size: 2.4em;
  font-weight: 900;
  color: rgb(255, 255, 255);
  line-height: 0.26;
  margin: 12px;
  text-align: center;
`;

export const HeaderText1 = styled.h2`
  text-align: center;
  padding-top: 10px;
`;

export const HeaderText5 = styled.h2`
  text-align: center;
  padding-top: 10px;
`;

export const HeaderText2 = styled.h3`
  padding-top: 10px;

`;

export const SmallText = styled.h3`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.3em;
  font-weight: 900;
  margin-top: -6.4em;
  letter-spacing: 0.02em;
  word-spacing: 0.1em;
  text-align: center;
`;

export const SmallText1 = styled.h3`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.3em;
  font-weight: 900;
  margin-top: -6.4em;
  letter-spacing: 0.02em;
  word-spacing: 0.1em;
  text-align: center;
`;

export const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 60px 1.8em;
  margin-top: 65px;
`;

// variant for the back drop
const BackDropVariants = {
  expanded: {
    width: "233%",
    height: "1000px",
    borderRradius: "20%",
    transform: "rotate(60deg)",
  },
  collapsed: {
    width: "145%",
    height: "655px",
    borderRradius: "50%",
    transform: "rotate(60deg)",
  },
};

const expandingTransition = {
  type: "spring",
  duration: 2,
  stiffness: 30,
};

const AccountBox = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const location = useLocation();

  const { error, isAuthenticated } = useSelector((state) => state.user);

  const [isExpanded, setIsExpanded] = useState(false);
  const [active, setActive] = useState("login");

  const playTransitionAnimation = () => {
    setIsExpanded(true);
    setTimeout(() => {
      setIsExpanded(false);
    }, expandingTransition.duration * 1000 - 1000);
  };

  const switchToSignUp = () => {
    playTransitionAnimation();
    setTimeout(() => {
      setActive("signup");
    }, 1150);
  };

  const switchToLogIn = () => {
    playTransitionAnimation();
    setTimeout(() => {
      setActive("login");
    }, 1150);
  };

  // redirect function used especially for the check out page
  const redirectFunc = location.search
    ? location.search.split("=")[1]
    : "account";

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate(`/${redirectFunc}`);
    }
  }, [dispatch, alert, error, isAuthenticated, navigate, redirectFunc]);

  return (
    <Container>
      <BoxContainer>
        <TopContainer>
          <BackDrop
            initial={false}
            animate={isExpanded ? "expanded" : "collapsed"}
            variants={BackDropVariants}
            transition={expandingTransition}
          />
          {active === "login" ? (
            <HeaderContainer>
              <HeaderText2>
              <HeaderText6>Welcome</HeaderText6>
              {/* <HeaderText>Back</HeaderText> */}
              <HeaderText1>

                <h3>
                  <img src={cart} alt="cart" width="260" />
                </h3>
              </HeaderText1>
              </HeaderText2>
              {/* <SmallText>Please login to continue!</SmallText> */}
              <SmallText>TO</SmallText>
            </HeaderContainer>
            
            
          ) : (
            
            <HeaderContainer>
              <HeaderText3>Create</HeaderText3>
              <HeaderText4>Account</HeaderText4>
              <HeaderText5>
                <h3>
                  <img src={cart} alt="cart" width="260" />
                </h3>
              </HeaderText5>
              {/* <SmallText1>Please signup to continue!</SmallText1> */}
              {/* <SmallText1>In</SmallText1> */}
              <SmallText1/>
            </HeaderContainer>
          )}
        </TopContainer>
        <InnerContainer>
          {active === "login" && (
            <LoginForm switchToSignUp={switchToSignUp} dispatch={dispatch} />
          )}
          {active === "signup" && (
            <SignUpForm switchToLogIn={switchToLogIn} dispatch={dispatch} />
          )}
        </InnerContainer>
      </BoxContainer>      
    </Container>
  );
};

export default AccountBox;
