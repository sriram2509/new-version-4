import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../state/actions/userActions";
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
import { Marginer } from "./AccountBox/marginer/Marginer";
import Metadata from "../layout/Metadata";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { token } = useParams();

  const { error, success } = useSelector((state) => state.forgotPassword);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(resetPassword(token, myForm));
    console.log("token", token);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Password updated successfully");
      navigate("/login");
    }
  }, [dispatch, alert, error, navigate, success]);

  return (
    <Container>
      <Metadata title="Reset Password" />
      <BoxContainer>
        <TopContainer>
          <BackDrop />
          <HeaderContainer>
            <HeaderText>Reset</HeaderText>
            <HeaderText>Password</HeaderText>
            <SmallText>Try to add strong password!</SmallText>
          </HeaderContainer>
        </TopContainer>
        <InnerContainer>
          <SubContainer onSubmit={resetPasswordSubmit}>
            <FormContainer>
              <Input
                type="password"
                placeholder="New Password"
                required
                name="newPassword"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Confirm New Password"
                required
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormContainer>

            <Marginer direction="vertical" margin="1.1em" />

            <SubmitButton type="submit">Reset</SubmitButton>

            <Marginer direction="vertical" margin="1.1em" />

            <MutedText>Eat Almonds for better memory</MutedText>
          </SubContainer>
        </InnerContainer>
      </BoxContainer>
    </Container>
  );
};

export default ResetPassword;
