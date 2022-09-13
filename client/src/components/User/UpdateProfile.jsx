import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  loadUser,
  updateUserProfile,
} from "../../state/actions/userActions";
import { UPDATE_PROFILE_RESET } from "../../state/constants/userConstant";
import { Marginer } from "./AccountBox/marginer/Marginer";
import {
  AvatarContainer,
  BoxContainer as SubContainer,
  AvatarImg,
  BoldLink,
  FileInput,
  FormContainer,
  Input,
  MutedText,
  SubmitButton,
} from "./AccountBox/common";
import {
  BackDrop,
  BackDrop1,
  BoxContainer,
  Container,
  HeaderContainer,
  HeaderText,
  InnerContainer,
  SmallText,
  TopContainer,
} from "./AccountBox/AccountBox";
import Metadata from "../layout/Metadata";

// ------------styled components ----------------

// ------------styled components ----------------

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

  const updateProfileSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateUserProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  // name update handler
  const nameUpdateHandler = (e) => {
    e.persist();
    setName(e.target.value);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar && user.avatar.url);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Profile updated successfully");
      dispatch(loadUser());
      navigate("/account");
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, alert, error, isUpdated, navigate, user]);

  return (
    <Container>
      <Metadata title="Update Profile" />
      <BoxContainer>
        <TopContainer>
          <BackDrop1 />
          <HeaderContainer>
            <HeaderText>Update</HeaderText>
            <HeaderText>Profile</HeaderText>
            {/* <SmallText>Please update to continue!</SmallText> */}
          </HeaderContainer>
        </TopContainer>
        <InnerContainer>
          <SubContainer
            encType="multipart/form-data"
            onSubmit={updateProfileSubmit}
          >
            <FormContainer>
              <Input
                type="text"
                placeholder="Full Name"
                required
                name="name"
                value={name}
                onChange={nameUpdateHandler}
              />
              <Input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormContainer>

            <Marginer direction="vertical" margin="0.35em" />

            <AvatarContainer>
              <AvatarImg src={avatarPreview} alt="avatar" />
              <FileInput
                type="file"
                placeholder="image"
                name="avatar"
                accept="image/*"
                onChange={updateProfileDataChange}
              />
            </AvatarContainer>

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

export default UpdateProfile;
