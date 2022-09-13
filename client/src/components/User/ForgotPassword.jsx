import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../state/actions/userActions";
import { Marginer } from "./AccountBox/marginer/Marginer";
import {
  BoxContainer as SubContainer,
  FormContainer,
  Input,
  MutedText,
  SubmitButton,
} from "./AccountBox/common";
import {
  BackDrop,
  BoxContainer,
  Container,
  HeaderContainer,
  HeaderText,
  InnerContainer,
  SmallText,
  TopContainer,
} from "./AccountBox/AccountBox";
import Metadata from "../layout/Metadata";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, message } = useSelector((state) => state.forgotPassword);

  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      alert.success(message);
    }
  }, [dispatch, alert, error, message]);

  return (
    <Container>
      <Metadata title="Update Password" />
      <BoxContainer>
        <TopContainer>
          <BackDrop />
          <HeaderContainer>
            <HeaderText>Forgot</HeaderText>
            <HeaderText>Password</HeaderText>
            <SmallText>Please enter email to continue!</SmallText>
          </HeaderContainer>
        </TopContainer>
        <Marginer direction="vertical" margin="2em" />
        <InnerContainer>
          <SubContainer onSubmit={forgotPasswordSubmit}>
            <FormContainer>
              <Input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormContainer>

            <Marginer direction="vertical" margin="1.1em" />

            <SubmitButton type="submit">Submit</SubmitButton>

            <Marginer direction="vertical" margin="2em" />

            <MutedText>Forgot Password Link is sent to your email</MutedText>
          </SubContainer>
        </InnerContainer>
      </BoxContainer>
    </Container>
  );
};
export default ForgotPassword;
