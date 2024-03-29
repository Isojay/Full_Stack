import React from "react";
import BookModel from "../../Models/BookModel";
import image from "../../Images/BooksImages/book-luv2code-1000.png";
import { Link } from "react-router-dom";

export const SearchBook: React.FC<{ book: BookModel }> = (props) => {
  return (
    <>
      <div className="card mt-3  shadow p-3 mb-3  bg-body  rounded ">
        <div className="row g-0 d-flex align-items-center">
          <div className="col-md-2 d-flex justify-content-center">
            <div className="d-none d-lg-block ">
              {props.book.imgName ? (
                <img
                  src={props.book.imgName}
                  width="123"
                  height="196"
                  alt="book"
                />
              ) : (
                <img src={image} width="123" height="196" alt="book" />
              )}
            </div>
            <div
              className="d-lg-none d-flex justify-content-center 
                        align-items-center"
            >
              {props.book.imgName ? (
                <img
                  src={props.book.imgName}
                  width="123"
                  height="196"
                  alt="book"
                />
              ) : (
                <img src={image} width="123" height="196" alt="book" />
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <h4 className="card-title">{props.book.title}</h4>
              <h5>{props.book.author}</h5>
              <p className="card-text">{props.book.description}</p>
            </div>
          </div>
          <div className="col-md-4 d-flex justify-content-center align-items-center">
            <Link
              className="btn btn-md btn-primary text-white"
              to={`/viewDetails/${props.book.id}`}
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
