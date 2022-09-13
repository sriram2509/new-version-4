import React, { useState } from "react";
import { Marginer } from "./marginer/Marginer";
import {
  AvatarContainer,
  AvatarImg,
  BoldLink,
  BoxContainer,
  FileInput,
  FormContainer,
  Input,
  MutedText,
  SubmitButton,
} from "./common";
import { signUp } from "../../../state/actions/userActions";

const SignUpForm = ({ switchToLogIn, dispatch }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    PhoneNo:"",
  });

  const [avatar, setAvatar] = useState();

  const [avatarPreview, setAvatarPreview] = useState("/profile-icon.png");

  const { name, email, password, PhoneNo } = user;

  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("PhoneNo", PhoneNo);
    myForm.set("avatar", avatar);
    dispatch(signUp(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  return (
    <BoxContainer encType="multipart/form-data" onSubmit={registerSubmit}>
      <FormContainer>
        <Input
          type="text"
          placeholder="Full Name"
          required
          name="name"
          value={name}
          onChange={registerDataChange}
        />
        <Input
          type="email"
          placeholder="Email"
          required
          name="email"
          value={email}
          onChange={registerDataChange}
        />
        <Input
          type="password"
          placeholder="Password"
          required
          name="password"
          value={password}
          onChange={registerDataChange}
        />
        <Input
          type="String"
          placeholder="Phone No"
          required
          name="PhoneNo"
          pattern="[0-9]{10}"
          value={PhoneNo}
          onChange={registerDataChange}
        />
        {/* <Input type="password" placeholder=" Confirm Password" required /> */}
      </FormContainer>

      <Marginer direction="vertical" margin="0.35em" />

      <AvatarContainer>
        <AvatarImg src={avatarPreview} alt="avatar" />
        <FileInput
          type="file"
          placeholder="image"
          name="avatar"
          accept="image/*"
          onChange={registerDataChange}
        />
      </AvatarContainer>

      <Marginer direction="vertical" margin="1.1em" />

      <SubmitButton type="submit">SignUp</SubmitButton>

      <Marginer direction="vertical" margin="0.6em" />

      <MutedText>
        Already have an account?{" "}
        <BoldLink href="#" onClick={switchToLogIn}>
          Login
        </BoldLink>
      </MutedText>
    </BoxContainer>
  );
};

export default SignUpForm;
