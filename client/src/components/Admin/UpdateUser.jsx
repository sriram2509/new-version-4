import { Fragment, useEffect, useState } from "react";
import { Person, MailOutline, VerifiedUser } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Metadata from "../layout/Metadata";
import Sidebar from "./Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import {
  BoxContainer as SubContainer,
  FormContainer,
  SubmitButton,
} from "../User/AccountBox/common";
import {
  BoxContainer,
  HeaderContainer,
  HeaderText,
  InnerContainer,
  SmallText,
} from "../User/AccountBox/AccountBox";
import styled from "styled-components";
import { Marginer } from "../User/AccountBox/marginer/Marginer";
import "./NewProduct.css";
import {
  getUserDetails,
  updateUser,
  clearErrors,
} from "../../state/actions/userActions";
import { UPDATE_USER_RESET } from "../../state/constants/userConstant";
import Loader from "../layout/Loader/Loader";

//------------------------- styled components for custom styles-----------------------(start)------
const CustomContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  border-left: 1px solid rgba(0, 0, 0, 0.13);
  background-color: rgb(255, 255, 255);
  padding: 3rem 0;
`;

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
  width: 150%;
  height: 540px;
  display: flex;
  flex-direction: column;
  border-radius: 50%;
  position: absolute;
  top: -290px;
  left: -70px;
  transform: rotate(68deg);
  background: rgb(6, 42, 30);
  background: linear-gradient(
    65deg,
    rgba(6, 42, 30, 1) 20%,
    rgba(28, 168, 196, 1) 100%
  );
`;

// const InputContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 100%;
// `;

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

//------------------------- styled components for custom styles-------------------------(end)

// Update Product Component is same as new product with slight changes
const UpdateUser = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { id } = useParams();

  const { loading, error, user } = useSelector((state) => state.userDetails);

  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  // console.log("user", user);

  useEffect(() => {
    if (user && user._id !== id) {
      //here id is taken from the params by using usePrams hook from above
      dispatch(getUserDetails(id));
    } else {
      setName(user && user.name);
      setEmail(user && user.email);
      setRole(user && user.role);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("User Updated Successfully");
      navigate("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [alert, dispatch, updateError, navigate, isUpdated, id, user, error]);

  // submit handler for the form
  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateUser(id, myForm));
  };

  return (
    <Fragment>
      <Metadata title="Update User" />

      <div className="dashboardPage">
        <Sidebar />

        <CustomContainer>
          {loading ? (
            <Loader />
          ) : (
            <BoxContainer>
              <CustomTopContainer>
                <CustomBackDrop />
                <HeaderContainer>
                  <HeaderText>Update</HeaderText>
                  <HeaderText>User Details</HeaderText>
                  <SmallText>Update the user details!</SmallText>
                </HeaderContainer>
              </CustomTopContainer>
              <Marginer direction="vertical" margin="1.25em" />
              <InnerContainer>
                <SubContainer
                  encType="multipart/form-data"
                  onSubmit={updateUserSubmitHandler}
                >
                  <FormContainer>
                    <div className="inputContainer">
                      <Person />
                      <CustomInput
                        type="text"
                        placeholder="User Name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <div className="inputContainer">
                      <MailOutline />
                      <CustomInput
                        type="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="inputContainer">
                      <VerifiedUser />
                      <CustomSelectInput
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                      >
                        <option value=""> Choose Role </option>
                        <option value="admin"> Admin </option>
                        <option value="user"> User </option>
                      </CustomSelectInput>
                    </div>
                  </FormContainer>

                  <Marginer direction="vertical" margin="1.25em" />

                  <SubmitButton
                    disabled={
                      updateLoading ? true : false || role === "" ? true : false
                    }
                    type="submit"
                  >
                    Update
                  </SubmitButton>
                </SubContainer>
              </InnerContainer>
            </BoxContainer>
          )}
        </CustomContainer>
      </div>
    </Fragment>
  );
};

export default UpdateUser;
