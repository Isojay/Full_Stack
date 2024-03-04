import React, {useState} from "react";

import {Link} from "react-router-dom";
import ReviewModel from "../../../Models/ReviewModel";
import {StarsReview} from "../StarReview";

function Review(props: { review: ReviewModel }) {
    return (
        <div>
            <div className="col-sm-8 col-md-8">
                <h5>{props.review.userEmail}</h5>
                <div className="row">
                    <div className="col">{props.review.date}</div>
                    <div className="col">
                        <StarsReview rating={props.review.rating} size={16}/>
                    </div>
                </div>
                <div className="mt-2">
                    <p>{props.review.reviewDescription}</p>
                </div>
            </div>
            <hr/>
        </div>
    );
}

function PersonalReview(props: { review: ReviewModel; deleteReview: any }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="row" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <div className="col-sm-8 col-md-8">
                <h5>{props.review.userEmail}</h5>
                <div className="row">
                    <div className="col">{props.review.date}</div>
                    <div className="col">
                        <StarsReview rating={props.review.rating} size={16}/>
                    </div>
                </div>
                <div className="mt-2">
                    <p>{props.review.reviewDescription}</p>
                </div>
            </div>
            {isHovered && (
                <div className="col-sm-4 col-md-4 d-flex align-items-center justify-content-end">
                    {/* Buttons section */}
                    <div className="btn-group">
                        <button type="button" className="btn btn-outline-primary me-2">Edit</button>
                        <button
                            type="button"
                            className="btn btn-outline-danger"
                            onClick={() => props.deleteReview(props.review.id)}
                        >Delete
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export const Reviews: React.FC<{
    reviews: ReviewModel[];
    userReview: ReviewModel[],
    mobile: boolean,
    deleteReview: any
}> = (
    props
) => {
    return (
        <>
            {props.userReview.length > 0 && (
                <>
                    <div className={props.mobile ? "mt-3" : "row mt-5"}>
                        <div className={props.mobile ? "" : "col-sm-2 col-md-2"}>
                            <h2>Your Review: </h2>
                        </div>
                        <div className="col-sm-10 col-md-10">
                            <PersonalReview review={props.userReview[0]} key={1}
                                            deleteReview={props.deleteReview}></PersonalReview>
                        </div>
                    </div>
                    <hr/>
                </>)}

            <div className={props.mobile ? "mt-3" : "row mt-5"}>
                <div className={props.mobile ? "" : "col-sm-2 col-md-2"}>
                    <h2>Latest Reviews: </h2>
                </div>
                <div className="col-sm-10 col-md-10">
                    {props.reviews.length > 0 ? (
                        <>
                            {props.reviews.slice(0, 3).map((eachReview) => (
                                <Review review={eachReview} key={eachReview.id}></Review>
                            ))}

                            <div className="m-3">
                                <Link
                                    type="button"
                                    className="btn main-color btn-md text-white"
                                    to="#"
                                >
                                    Reach all reviews.
                                </Link>
                            </div>
                        </>
                    ) : (
                        <div className="m-3">
                            <p className="lead">Currently there are no reviews for this book</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};
