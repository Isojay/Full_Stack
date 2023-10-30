import { useEffect, useState } from "react";
import BookModel from "../../Models/BookModel";
import { SpinnerLoading } from "../../utils/spinner";
import image from "../../Images/BooksImages/book-luv2code-1000.png";
import { useParams } from "react-router-dom";
import { StarsReview } from "./StarReview";
import { CheckoutAndReviewBox } from "./SideUserBar";

export const BookCheckout = () => {
  const [book, SetBook] = useState<BookModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMSG, setErrorMsg] = useState(null);
  const { id }: { id: string } = useParams();

  useEffect(() => {
    const fetchBooks = async () => {
      const baseUrl: string = `http://localhost:8080/api/books/bookById/${id}`;

      const response = await fetch(baseUrl);

      if (!response.ok) {
        throw new Error("Something went wrong !!");
      }

      const responseData = await response.json();

      const loadBook: BookModel = {
        id: responseData.id,
        title: responseData.title,
        author: responseData.author,
        description: responseData.description,
        copies: responseData.copies,
        available: responseData.available,
        category: responseData.category.cname,
        categoryId: responseData.category.id,
        imgName: responseData.imgName,
      };

      SetBook(loadBook);

      setIsLoading(false);
    };
    fetchBooks().catch((error: any) => {
      setIsLoading(false);
      setErrorMsg(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="container m-5">
        <SpinnerLoading />
      </div>
    );
  }
  if (errorMSG) {
    return (
      <div className="container m-5">
        <p>{errorMSG}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="container d-none d-lg-block">
        <div className="row mt-5">
          <div className="col-sm-2 col-md-2">
            {book?.imgName ? (
              <img src={book?.imgName} width="226" height="349" alt="Book" />
            ) : (
              <img src={image} width="226" height="349" alt="Book" />
            )}
          </div>
          <div className="col-4 col-md-4 container">
            <div className="ml-2">
              <h2>{book?.title}</h2>
              <h5 className="text-primary">{book?.author}</h5>
              <p className="lead">{book?.description}</p>
              <StarsReview rating={4.5} size={32}/>
            </div>
          </div>
          <CheckoutAndReviewBox book={book} mobile={false}/>
        </div>
        <hr />
      </div>
      <div className="container d-lg-none mt-5">
        <div className="d-flex justify-content-center align-items-center">
          {book?.imgName ? (
            <img src={book?.imgName} width="226" height="349" alt="Book" />
          ) : (
            <img src={image} width="226" height="349" alt="Book" />
          )}
        </div>
        <div className="mt-4">
          <div className="ml-2">
            <h2>{book?.title}</h2>
            <h5 className="text-primary">{book?.author}</h5>
            <p className="lead">{book?.description}</p>
            <StarsReview rating={4.5} size={32}/>
          </div>
        </div>
        <CheckoutAndReviewBox book={book} mobile={true}/>
        <hr />
      </div>
    </div>
  );
};
