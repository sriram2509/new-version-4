import React from "react";
import { Rating } from "@mui/material";

const ReviewCard = ({ review }) => {
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <div className="reviewCard">
      <div className="review-card-row-1">
        <div className="userDetails">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
              clipRule="evenodd"
            />
          </svg>
          <h4>{review.name}</h4>
        </div>
        <div className="ratings">
          <Rating {...options} />
        </div>
      </div>

      <div className="comment-container">
        <span>{review.comment}</span>
      </div>
    </div>
  );
};

export default ReviewCard;
