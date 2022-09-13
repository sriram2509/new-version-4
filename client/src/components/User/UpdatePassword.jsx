import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword } from "../../state/actions/userActions";
import { UPDATE_PASSWORD_RESET } from "../../state/constants/userConstant";
import { Marginer } from "./AccountBox/marginer/Marginer";
import {
  BoxContainer as SubContainer,
  BoldLink,
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

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, isUpdated } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Password updated successfully");
      navigate("/account");
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, alert, error, isUpdated, navigate]);

  return (
    <Container>
      <Metadata title="Update Password" />
      <BoxContainer>
        <TopContainer>
          <BackDrop />
          <HeaderContainer>
            <HeaderText>Update</HeaderText>
            <HeaderText>Password</HeaderText>
            <SmallText>Please update to continue!</SmallText>
          </HeaderContainer>
        </TopContainer>
        <InnerContainer>
          <SubContainer onSubmit={updatePasswordSubmit}>
            <FormContainer>
              <Input
                type="password"
                placeholder="Old Password"
                required
                name="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <Input
                type="password"
                placeholder="New Password"
                required
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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

            <SubmitButton type="submit">Update</SubmitButton>

            <Marginer direction="vertical" margin="0.6em" />

            <MutedText>
              Don't want to Update? <BoldLink href="/account">Reset</BoldLink>
            </MutedText>
          </SubContainer>
        </InnerContainer>
      </BoxContainer>
    </Container>
  );
};

export default UpdatePassword;
