import React, { Fragment, useEffect, useState } from "react";
import {
  AccountTree,
  Storage,
  Spellcheck,
  AttachMoney,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Metadata from "../layout/Metadata";
import Sidebar from "./Sidebar";
import {
  clearErrors,
  updateProduct,
  getProductDetails,
} from "../../state/actions/productActions";
import { useNavigate, useParams } from "react-router-dom";
import { UPDATE_PRODUCT_RESET } from "../../state/constants/productConstants";
import {
  BoxContainer as SubContainer,
  FileInput,
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

const categories = [
  "Rice",
  "Veg-Items",
  "NonVeg-Items",
  "Others"
];

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
  width: 138%;
  height: 595px;
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

const CustomTextArea = styled.textarea`
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

export const CustomImgPreview = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  max-width: 2.5rem;
  margin-left: 0.5rem;
`;
//------------------------- styled components for custom styles-------------------------(end)

// Update Product Component is same as new product with slight changes
const UpdateProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { id } = useParams();

  const { error, product } = useSelector((state) => state.productDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  useEffect(() => {
    if (product && product._id !== id) {
      //here id is taken from the params by using usePrams hook from above
      dispatch(getProductDetails(id));
    } else {
      setProductName(product.name);
      setProductPrice(product.price);
      setCategory(product.category);
      setStock(product.stock);
      setOldImages(product.images);
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
      alert.success("Product Updated Successfully");
      navigate("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [alert, dispatch, updateError, navigate, isUpdated, id, product, error]);

  // submit handler for the form
  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", productName);
    myForm.set("price", productPrice);
    myForm.set("category", category);
    myForm.set("stock", stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(updateProduct(id, myForm));
  };

  // onchange handler for the create product images change
  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <Metadata title="Update Product" />

      <div className="dashboardPage">
        <Sidebar />

        <CustomContainer>
          <BoxContainer>
            <CustomTopContainer>
              <CustomBackDrop />
              <HeaderContainer>
                <HeaderText>Update</HeaderText>
                <HeaderText>Product</HeaderText>
                {/* <SmallText>Update the product details!</SmallText> */}
              </HeaderContainer>
            </CustomTopContainer>
            <InnerContainer>
              <SubContainer
                encType="multipart/form-data"
                onSubmit={updateProductSubmitHandler}
              >
                <FormContainer>
                  <div className="inputContainer">
                    <Spellcheck />
                    <CustomInput
                      type="text"
                      placeholder="Meal Name"
                      required
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                    />
                  </div>

                  <div className="inputContainer">
                    <AttachMoney />
                    <CustomInput
                      type="number"
                      placeholder="Meal Price"
                      required
                      value={productPrice}
                      onChange={(e) => setProductPrice(e.target.value)}
                    />
                  </div>


                  <div className="inputContainer">
                    <AccountTree />
                    <CustomSelectInput
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="">Choose Category</option>
                      {categories.map((item) => (
                        <option value={item} key={item}>
                          {item}
                        </option>
                      ))}
                    </CustomSelectInput>
                  </div>

                  <div className="inputContainer">
                    <Storage />
                    <CustomInput
                      type="number"
                      placeholder="Stock"
                      required
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                    />
                  </div>

                  <Marginer direction="vertical" margin="0.25em" />

                  <FileInput
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProductImagesChange}
                    multiple
                  />

                  <Marginer direction="vertical" margin="0.25em" />

                  <div id="createProductForm-Image">
                    {oldImages &&
                      oldImages.map((image, index) => (
                        <CustomImgPreview
                          key={index}
                          src={image ? image.url : "/profile-icon.png"}
                          alt="Old Product Preview"
                        />
                      ))}
                  </div>

                  <div id="createProductForm-Image">
                    {imagesPreview.map((image, index) => (
                      <CustomImgPreview
                        key={index}
                        src={image ? image : "/profile-icon.png"}
                        alt="Product Preview"
                      />
                    ))}
                  </div>
                </FormContainer>

                <Marginer direction="vertical" margin="1em" />

                <SubmitButton disabled={loading ? true : false} type="submit">
                  Update
                </SubmitButton>
              </SubContainer>
            </InnerContainer>
          </BoxContainer>
        </CustomContainer>
      </div>
      {/* 
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          <h1>Create Product</h1>
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <div>
              <Spellcheck />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>

            <div>
              <AttachMoney />
              <input
                type="number"
                placeholder="Product Price"
                required
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
              />
            </div>

          

            <div>
              <AccountTree />
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Storage />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div id="createProductForm-File">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductForm-Image">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Avatar Preview" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div> */}
    </Fragment>
  );
};

export default UpdateProduct;
