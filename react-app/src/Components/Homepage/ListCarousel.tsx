import React from "react";
import image from "../../Images/BooksImages/book-luv2code-1000.png";
import BookModel from "../../Models/BookModel";
import {Link} from "react-router-dom";

export const ListCarousel: React.FC<{ book: BookModel }> = (props) => {
  return (
    <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
      <div className="text-center">
        {props.book.imgName ? (
          <img src={props.book.imgName} width="151" height="233" alt="book"/>
        ) : (
          <img src={image} width="151" height="233" alt="book" />
        )}
        <h6 className="mt-2">{props.book.title}</h6>
        <p>{props.book.author || "Luv2Code"}</p>
        <Link className="btn main-color btn-primary text-white" to={`/viewDetails/${props.book.id}`}>
          Reserve
        </Link>
      </div>
    </div>
  );
};
