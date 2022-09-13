import styled from "styled-components";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useState } from "react";
// import image from "../../../assets/Images/user-1.jpg";
import { motion, AnimatePresence } from "framer-motion";

// the component where this carousel used then we remove container from here and define the styles in its parent container in the place where this componenet is used
// const Container= styled.div`
//     width: 50%;
//     height: 92vh;
// `;

const SliderOuter = styled.div`
  width: 430px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
`;

const Slider = styled.div`
  width: 320px;
  height: 360px;
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: ${({ isPrev }) => (isPrev ? "flex-start" : "flex-end")};
  border: 1px solid rgba(205, 205, 205, 0.4);
`;

const Image = styled(motion.img)`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const Button = styled.button`
  padding: 10px;
  width: 3.5vmax;
  height: 3.5vmax;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 50%;
  font-size: 1.6rem;
  background-color: rgba(204, 204, 204, 0.4);
  color: rgba(0, 0, 0, 0.5);
  transition: 0.2s ease-in;
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
    color: rgba(204, 204, 204, 0.5);
    transition: 0.2s ease-in;
  }
`;

const CustomImgCarousel = ({ productImages }) => {
  const product = productImages || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPrev, setIsPrev] = useState(false); //this is used to track the animation from button clicks

  // Prev slider
  const prevSlider = () => {
    if (currentIndex === 0) {
      setCurrentIndex(product.length - 1);
      setIsPrev(true);
    } else {
      setCurrentIndex(currentIndex - 1);
      setIsPrev(true);
    }
  };

  // next slider
  const nextSlider = () => {
    if (currentIndex === product.length - 1) {
      setCurrentIndex(0);
      setIsPrev(false);
    } else {
      setCurrentIndex(currentIndex + 1);
      setIsPrev(false);
    }
  };

  // console.log("currentIndex", currentIndex);

  return (
    // <Container>

    <SliderOuter>
      <Button onClick={prevSlider}>
        <FaAngleLeft />
      </Button>

      <Slider isPrev={isPrev}>
        <AnimatePresence exitBeforeEnter initial={false}>
          {product.slice(currentIndex, currentIndex + 1).map((item, i) => {
            return (
              <Image
                // animate with framer motion
                initial={{ opacity: 0, x: isPrev ? "100%" : "-100%" }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: "tween", duration: 0.4 }}
                exit={{
                  height: 0,
                  width: 0,
                }}
                // animated with framer motion
                key={item.url}
                src={item.url}
                alt={`${i} Slide`}
              />
            );
          })}
        </AnimatePresence>
      </Slider>

      <Button onClick={nextSlider}>
        <FaAngleRight />
      </Button>
    </SliderOuter>

    // </Container>
  );
};

export default CustomImgCarousel;
