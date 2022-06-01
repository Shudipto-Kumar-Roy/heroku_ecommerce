import React from "react";
import { Rating } from "@material-ui/lab";

const ReviewCard = ({ review }) => {
  return (
    <>
      <div className="reviewCard">
        <p>{review.name}</p>
        <div className="product_rating">
          <Rating
            readOnly={true}
            size="large"
            precision={0.5}
            value={review.rating}
          />
        </div>
        <div className="product_review_comment">
          <p>{review.comment}</p>
        </div>
      </div>
    </>
  );
};

export default ReviewCard;
