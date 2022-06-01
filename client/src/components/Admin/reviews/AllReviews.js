import React, { useEffect, useState } from "react";
import { deleteReviewApi, deleteUserApi, getAllReviewsApi } from "../../../api";
import { useAlert } from "react-alert";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./AllReviews.css";
import { AiFillDelete } from "react-icons/ai";
const AllReviews = () => {
    const alert = useAlert();
    const [reviews, setReviews] = useState([]);
    const [productId, setProductId] = useState("");



    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await getAllReviewsApi(productId, alert) // api call
        if (res.status === 200) {
            setReviews(res.data.reviews);
        }
    }

    const handleDelete = async (id) => {
        const isOk = window.confirm("Do you really want to delete ?");
        if (isOk) {
            const res = await deleteReviewApi(id, productId, alert);
            if (res.status === 200) {
                alert.success("Review deleted successfully");
            }
        }
    };
    return (<>
        <div>
            <Container className="reviewsContainer">
                <Row className="my-5">
                    <Col md={12}>
                        <div>
                            <form onSubmit={handleSubmit}>
                                <div className="formgroup">
                                    <input type="text" required className="formcontroller" placeholder="Product Id" name="productId" value={productId}
                                        onChange={(e) => setProductId(e.target.value)}
                                    />
                                </div>
                                <div className="formgroup">
                                    <button type="submit" className="whiteButton">Find and Update</button>
                                </div>
                            </form>
                        </div>
                    </Col>
                    <Col md={12}>
                        <div className="reviews_label">
                            <h3 className="reviews_label_item">Name</h3>
                            <h3 className="reviews_label_item">Comment</h3>
                            <h3 className="reviews_label_item">Rating</h3>
                            <h3 className="reviews_label_item">Actions</h3>
                        </div>
                    </Col>
                    {reviews &&
                        reviews.map((review, index) => (
                            <Col md={12} key={index}>
                                <div className="reviews_body">
                                    <h3 className="reviews_body_item">{review.name}</h3>
                                    <h3 className="reviews_body_item">{review.comment}</h3>
                                    <h3 className="reviews_body_item">{review.rating}</h3>
                                    <h3 className="reviews_body_item">
                                        <AiFillDelete className="deleteUser" onClick={() => handleDelete(review._id)} />
                                    </h3>
                                </div>
                                <div className="reviews_body_responsive">
                                    <div>

                                        <h3 className="reviews_label_item">Name</h3>
                                        <h3 className="reviews_label_item">Comment</h3>
                                        <h3 className="reviews_label_item">Rating</h3>
                                        <h3 className="reviews_label_item">Actions</h3>
                                    </div>
                                    <div>

                                        <h3 className="reviews_body_item">{review.name}</h3>
                                        <h3 className="reviews_body_item">{review.email}</h3>
                                        <h3 className="reviews_body_item">{review.comment}</h3>
                                        <h3 className="reviews_body_item">{review.rating}</h3>
                                        <h3 className="reviews_body_item">
                                            <AiFillDelete className="deleteReview" onClick={() => handleDelete(review._id)} />
                                        </h3>
                                    </div>

                                </div>
                            </Col>
                        ))}
                    {reviews.length === 0 && <h1>No Reviews Found</h1>}


                </Row>
            </Container>
        </div>
    </>);
}

export default AllReviews;