import { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../state/actions/cartActions";
import { Country, State } from "country-state-city";
import { useAlert } from "react-alert";
import { Marginer } from "../User/AccountBox/marginer/Marginer";
import {
  BoxContainer as SubContainer,
  FormContainer,
  SubmitButton,
} from "../User/AccountBox/common";
import {
  BoxContainer,
  Container,
  HeaderContainer,
  HeaderText,
  InnerContainer,
  SmallText,
} from "../User/AccountBox/AccountBox";
import Metadata from "../layout/Metadata";
import styled from "styled-components";
import CheckOutSteps from "./CheckOutSteps.jsx";
import { useNavigate } from "react-router-dom";

const CustomTopContainer = styled.div`
  width: 100%;
  height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 1.8em;
  padding-bottom: 4em;
`;

const CustomBackDrop = styled.div`
  width: 157%;
  height: 585px;
  display: flex;
  flex-direction: column;
  border-radius: 50%;
  position: absolute;
  top: -290px;
  left: -70px;
  transform: rotate(68deg);
  background: rgb(6, 42, 30);
  // background: linear-gradient(
  //   65deg,
  //   rgba(6, 42, 30, 1) 20%,
  //   rgba(28, 168, 196, 1) 100%
  // );
  background: linear-gradient(135deg,#C1A582 0,#CC4400 100%);
`;

const CustomInput = styled.input`
  outline: none;
  border: none;
  width: 100%;
  height: 36px;
  font-size: 0.8em;
  border: 1px solid rgba(200, 200, 200, 0.03);
  padding: 0 8px;
  border-bottom: 1.5px solid transparent;
  transition: all 200ms ease-in-out;
  &:placeholder {
    color: rgba(200, 200, 200, 1);
  }
  &:not(:last-of-type) {
    border-bottom: 1.5px solid rgba(200, 200, 200, 0.4);
  }
  &:focus {
    outline: none;
    border-bottom: 2px solid rgb(6, 42, 30);
  }
`;

const CustomSelectInput = styled.select`
  outline: none;
  border: none;
  width: 100%;
  height: 36px;
  font-size: 0.8em;
  border: 1px solid rgba(200, 200, 200, 0.03);
  padding: 0 4px;
  border-bottom: 1.5px solid rgba(200, 200, 200, 0.4);
  transition: all 200ms ease-in-out;
  color: rgba(110, 110, 110, 1);

  &:focus {
    outline: none;
    border-bottom: 2px solid rgb(6, 42, 30);
  }
`;

const Shipping = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pincode, setPincode] = useState(shippingInfo.pincode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const shippingDetailsSubmit = (e) => {
    e.preventDefault();
    if (phoneNo.length < 10 || phoneNo.length > 10) {
      alert.error("Phone Number should be 10 digits long");
      return;
    }
    dispatch(
      saveShippingInfo({ address, city, state, country, pincode, phoneNo }),
    );
    navigate("/order/confirm");
    alert.success("Delivary details submitted");
  };

  return (
    <Fragment>
      <Marginer direction="vertical" margin="1.25em" />
      <CheckOutSteps activeStep={0} />
      <Marginer direction="vertical" margin="1em" />
      <Container>
        <Metadata title="Delivary Details" />
        <BoxContainer>
          <CustomTopContainer>
            <CustomBackDrop />
            <HeaderContainer>
              <HeaderText>Delivary</HeaderText>
              <HeaderText>Details</HeaderText>
              {/* <SmallText>Please fill shipping details!</SmallText> */}
            </HeaderContainer>
          </CustomTopContainer>
          <InnerContainer>
            <SubContainer
              encType="multipart/form-data"
              onSubmit={shippingDetailsSubmit}
            >
              <FormContainer>
                <CustomInput
                  type="text"
                  placeholder="Full Address"
                  required
                  name="name"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <CustomSelectInput
                  name="country"
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value="">Country</option>
                  {Country &&
                    Country.getAllCountries().map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </CustomSelectInput>

                <CustomSelectInput
                  name="state"
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">State</option>
                  {country &&
                    State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </CustomSelectInput>

                <CustomInput
                  type="city"
                  placeholder="City"
                  required
                  name="email"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <CustomInput
                  type="number"
                  placeholder="Pincode"
                  required
                  name="pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                />
                <CustomInput
                  type="number"
                  placeholder="Phone Number"
                  required
                  name="phoneNo"
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                />
              </FormContainer>

              <Marginer direction="vertical" margin="1.25em" />

              <SubmitButton type="submit">Submit</SubmitButton>
            </SubContainer>
          </InnerContainer>
        </BoxContainer>
      </Container>
    </Fragment>
  );
};

export default Shipping;
