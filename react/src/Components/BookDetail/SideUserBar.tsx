import {Link} from "react-router-dom";
import BookModel from "../../Models/BookModel";
import React from "react";
import {LeaveReview} from "./Review/LeaveReview";

export const CheckoutAndReviewBox: React.FC<{
    book: BookModel | undefined;
    mobile: boolean;
    userLoan: number;
    checkOutCondition: boolean;
    isAuthenticated: any;
    checkOutBook: any;
    userReviewStatus: boolean;
    submitReview: any;
}> = (props) => {
    function buttonRender() {
        if (props.isAuthenticated) {
            if (!props.checkOutCondition && props.userLoan < 5) {
                return (
                    <button
                        onClick={() => props.checkOutBook()}
                        className="btn btn-primary btn-lg"
                    >
                        Checkout
                    </button>
                );
            } else if (props.checkOutCondition) {
                return (
                    <p>
                        <b>Book Checked Out. Enjoy!</b>
                    </p>
                );
            } else if (!props.checkOutCondition) {
                return <p className="text-danger">Too Many Books Checked Out.</p>;
            }
        }
        return (
            <Link to={"/login"} className="btn btn-success btn-lg">
                Sign in
            </Link>
        );
    }

    function renderReview() {
        if (props.isAuthenticated) {
            if (!props.userReviewStatus) {
                return (
                    <div>
                        <p>Leave a comment on the Book.</p>
                        <LeaveReview submitReview={props.submitReview}/>
                    </div>
                );
            } else if (props.userReviewStatus) {
                return (
                    <div>
                        <p>
                            <b>Thank you for the review</b>
                        </p>
                    </div>
                );
            }
        }
        return (
            <div>
                <hr/>
                <p>Sign in to be able to leave a review.</p>
            </div>
        );
    }

    return (
        <div
            className={
                props.mobile
                    ? "card d-flex mt-5"
                    : "card custom-width-60 container d-flex mb-5"
            }
        >
            <div className="card-body container">
                <div className="mt-3">
                    <p>
                        <b>{props.userLoan}/5 </b>
                        Books checked out
                    </p>
                    <hr/>
                    {props.book && props.book.available && props.book.available > 0 ? (
                        <h4 className="text-success">Available</h4>
                    ) : (
                        <h4 className="text-danger">Wait List</h4>
                    )}
                    <div className="row">
                        <p className="col-6 lead">
                            <b>{props.book?.copies} </b>
                            copies
                        </p>
                        <p className="col-6 lead">
                            <b>{props.book?.available} </b>
                            available
                        </p>
                    </div>
                </div>
                {buttonRender()}
                <hr/>
                <p className="mt-3">
                    This number can change until placing order has been complete.
                </p>
                {renderReview()}
            </div>
        </div>
    );
};
