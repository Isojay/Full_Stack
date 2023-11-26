import { useEffect, useState } from "react";
import BookModel from "../../Models/BookModel";
import { SpinnerLoading } from "../../utils/spinner";
import image from "../../Images/BooksImages/book-luv2code-1000.png";
import { useParams } from "react-router-dom";
import { StarsReview } from "./StarReview";
import { CheckoutAndReviewBox } from "./SideUserBar";
import ReviewModel from "../../Models/ReviewModel";
import { Reviews } from "./Review/ReviewHandler";
import { useOktaAuth } from "@okta/okta-react";
import { Simulate } from "react-dom/test-utils";
import error = Simulate.error;
import ReviewRequestModel from "../../Models/ReviewRequesModel";


export const BookCheckout = () => {
  const { authState } = useOktaAuth();
  const [errorMSG, setErrorMsg] = useState(null);
  const { id }: { id: string } = useParams();

  const [book, SetBook] = useState<BookModel>();
  const [isLoading, setIsLoading] = useState(true);

  const [reviews, SetReviews] = useState<ReviewModel[]>([]);
  const [totalStars, SetTotalStars] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [isReviewLoading, setIsReviewLoading] = useState(true);

  const [userReviewStatus, setUserReviewStatus] = useState(false);
  const [isUserReviewStatusLoading, setIsReviewStatusLoading] = useState(true);

  const [userLoan, setUserLoan] = useState(0);
  const [isUserLoanLoading, setIsUserLoanLoading] = useState(true);

  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [isCheckedOutLoading, setIsCheckedOutLoading] = useState(true);


  useEffect(() => {
    const fetchCheckOutCondition = async () => {
      if (authState && authState.isAuthenticated) {
        const url: string = `http://localhost:8080/api/books/secure/checkout/byUser/${id}`;
        const requestOptions = {
          method: "Get",
          headers: {
            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
            "Content-type": "application/json",
          },
        };
        const checkOutCondition = await fetch(url, requestOptions);
        if (!checkOutCondition.ok) {
          throw new Error("Something went wrong !!!");
        }
        const checkOutConditionJson = await checkOutCondition.json();
        setIsCheckedOut(checkOutConditionJson);
      }
      setIsCheckedOutLoading(false);
    };
    fetchCheckOutCondition().catch((error: any) => {
      setIsCheckedOutLoading(false);
      setErrorMsg(error.message);
    });
  }, [authState]);

  useEffect(() => {
    const fetchUserLoan = async () => {
      if (authState && authState.isAuthenticated) {
        const url: string = "http://localhost:8080/api/books/secure/checkout";
        const requestOptions = {
          method: "Get",
          headers: {
            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
            "Content-type": "application/json",
          },
        };
        const userLoanResponse = await fetch(url, requestOptions);
        if (!userLoanResponse.ok) {
          throw new Error("Something went wrong !!");
        }
        const userLoanJson = await userLoanResponse.json();
        setUserLoan(userLoanJson);
      }
      setIsUserLoanLoading(false);
    };
    fetchUserLoan().catch((error: any) => {
      setIsUserLoanLoading(false);
      setErrorMsg(error.message);
    });
  }, [authState, isCheckedOut]);

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
  }, [isCheckedOut]);

  useEffect(() => {
    const fetchReviews = async () => {
      const reviewUrl: string = `http://localhost:8080/api/reviews/${id}`;

      const reviewResponse = await fetch(reviewUrl);
      if (!reviewResponse.ok) {
        throw new Error("Something went Wrong !!");
      }
      const reviewJson = await reviewResponse.json();

      const reviewData = reviewJson.content;

      const loadReview: ReviewModel[] = [];

      let totalRatings: number = 0;

      for (const key in reviewData) {
        //Format date in such a way this only Date is shown
        const date = new Date(reviewData[key].date);
        const formattedDate = date.toISOString().split("T")[0];

        loadReview.push({
          id: reviewData[key].id,
          userEmail: reviewData[key].userEmail,
          userName: reviewData[key].userName,
          date: formattedDate,
          rating: reviewData[key].rating,
          bookId: reviewData[key].bookId,
          reviewDescription: reviewData[key].reviewDescription,
        });
        setTotalReviews(reviewData.length);
        totalRatings = totalRatings + reviewData[key].rating;
        if (reviewData) {
          const round = (
            Math.round((totalRatings / reviewData.length) * 2) / 2
          ).toFixed(1);
          SetTotalStars(Number(round));
        }
      }

      SetReviews(loadReview);
      setIsReviewLoading(false);
    };

    fetchReviews().catch((error: any) => {
      setIsReviewLoading(false);
      setErrorMsg(error.message);
    });
    window.scrollTo(0, 0);
  }, [userReviewStatus]);

  useEffect(() => {
    const fetchUserReviewStatus = async () => {
      if (authState && authState.isAuthenticated) {
        const url: string = `http://localhost:8080/api/reviews/secure/userReviewStatus?bookId=${id}`;
        const requestOptions = {
          method: "Get",
          headers: {
            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
            "Content-type": "application/json",
          },
        };
        const userReviewStatus = await fetch(url, requestOptions);

        if (!userReviewStatus.ok) {
          throw new Error("Somthing went wrong!!!");
        }

        const userReviewStatusJson = await userReviewStatus.json();
        setUserReviewStatus(userReviewStatusJson);
      }
      setIsReviewStatusLoading(false);
    };
    fetchUserReviewStatus().catch((error: any) => {
      setIsReviewStatusLoading(false);
      setErrorMsg(error.message);
    });
  }, [authState]);

  if (
    isLoading ||
    isReviewLoading ||
    isUserLoanLoading ||
    isCheckedOutLoading ||
    isUserReviewStatusLoading
  ) {
    return <SpinnerLoading />;
  }

  if (errorMSG) {
    return (
      <div className="container m-5">
        <p>{errorMSG}</p>
      </div>
    );
  }

  async function checkoutBook() {
    const url = `http://localhost:8080/api/books/secure/checkout/${id}`;
    const requestOptions = {
      method: "Put",
      headers: {
        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
        "Content-type": "application/json",
      },
    };
    const checkoutResponse = await fetch(url, requestOptions);
    if (!checkoutResponse.ok) {
      throw new Error("Something Went Wrong !!");
    }
    setIsCheckedOut(true);
  }

  async function submitReview(rating: number, reviewDescription: string) {
    const bookId: any = id;
    const reviewRequestModel = new ReviewRequestModel(
      rating,
      bookId,
      reviewDescription
    );

    const url = `http://localhost:8080/api/reviews/secure/addUserReview`;
    const requestOptions = {
      method: "Post",
      headers: {
        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(reviewRequestModel),
    };

    const reviewResponse = await fetch(url, requestOptions);
    if (!reviewResponse.ok) {
      throw new Error("Something Went Wrong !!");
    }

    setUserReviewStatus(true);
  }

  return (
    <div>
      <div className="container d-none d-lg-block">
        <div className="row mt-5">
          <div className="col-sm-2 col-md-3">
            {book?.imgName ? (
              <img src={`/${book?.imgName}`} width="226" height="349" alt="Book" />
          
            ) : (
              <img src={image} width="226" height="349" alt="Book" />
              // 
            )}
            <p></p>
            <StarsReview rating={totalStars} size={32} />
            <p>
              Rating :{totalStars}/5 - {totalReviews} votes.
            </p>
          </div>
          <div className="col-4 col-md-4">
            <div className="ml-2">
              <h2>{book?.title}</h2>
              <h5 className="text-primary">{book?.author}</h5>
              <p className="lead">{book?.description}</p>
            </div>
          </div>
          <CheckoutAndReviewBox
            book={book}
            mobile={false}
            userLoan={userLoan}
            checkOutCondition={isCheckedOut}
            isAuthenticated={authState?.isAuthenticated}
            checkOutBook={checkoutBook}
            userReviewStatus={userReviewStatus} 
            submitReview={submitReview}          />
        </div>
        <hr />
        <Reviews reviews={reviews} mobile={false} />
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
            <StarsReview rating={totalStars} size={32} />
          </div>
        </div>
        <CheckoutAndReviewBox
          book={book}
          mobile={true}
          userLoan={userLoan}
          checkOutCondition={isCheckedOut}
          isAuthenticated={authState?.isAuthenticated}
          checkOutBook={checkoutBook}
          userReviewStatus={userReviewStatus}
          submitReview={submitReview}        />
        <hr />
        <Reviews reviews={reviews} mobile={true} />
      </div>
    </div>
  );
};

