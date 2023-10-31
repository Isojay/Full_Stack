import {useEffect, useState} from "react";
import BookModel from "../../Models/BookModel";
import {SpinnerLoading} from "../../utils/spinner";
import image from "../../Images/BooksImages/book-luv2code-1000.png";
import {useParams} from "react-router-dom";
import {StarsReview} from "./StarReview";
import {CheckoutAndReviewBox} from "./SideUserBar";
import ReviewModel from "../../Models/ReviewModel";
import {Reviews} from "./Review/ReviewHandler";

export const BookCheckout = () => {
    const [book, SetBook] = useState<BookModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [errorMSG, setErrorMsg] = useState(null);
    const {id}: { id: string } = useParams();

    const [reviews, SetReviews] = useState<ReviewModel[]>([]);
    const [totalStars, SetTotalStars] = useState(0);
    const [totalReviews, SetTotalReviews] = useState(0);
    const [isLoadingReview, setIsLoadingReview] = useState(true);

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
                const formattedDate = date.toISOString().split('T')[0];
                console.log(formattedDate);
                loadReview.push({
                    id: reviewData[key].id,
                    userEmail: reviewData[key].userEmail,
                    userName: reviewData[key].userName,
                    date: formattedDate,
                    rating: reviewData[key].rating,
                    bookId: reviewData[key].bookId,
                    reviewDescription: reviewData[key].reviewDescription,
                });
                SetTotalReviews(reviewData.length);
                totalRatings = totalRatings + reviewData[key].rating;
                if(reviewData){
                    const round = (Math.round((totalRatings /reviewData.length)*2)/2).toFixed(1);
                    SetTotalStars(Number(round));
                }
            }

            SetReviews(loadReview);
            setIsLoadingReview(false);
        };
        fetchReviews().catch((error: any) => {
            setIsLoadingReview(false);
            setErrorMsg(error.message);
        });
    }, []);

    if (isLoading || isLoadingReview) {
        return (
            <SpinnerLoading/>
        );
    }

    if (errorMSG) {
        return (
            <div className="container m-5">
                <p>{errorMSG}</p>
            </div>
        );
    }
    console.log(totalStars)
    return (
        <div>
            <div className="container d-none d-lg-block">
                <div className="row mt-5">
                    <div className="col-sm-2 col-md-3">
                        {book?.imgName ? (
                            <img src={book?.imgName} width="226" height="349" alt="Book"/>
                        ) : (
                            <img src={image} width="226" height="349" alt="Book"/>
                        )}
                        <p></p>
                        <StarsReview rating={totalStars} size={32}/>
                        <p>Rating :{totalStars}/5 - {totalReviews} votes.</p>
                    </div>
                    <div className="col-4 col-md-4">
                        <div className="ml-2">
                            <h2>{book?.title}</h2>
                            <h5 className="text-primary">{book?.author}</h5>
                            <p className="lead">{book?.description}</p>
                        </div>
                    </div>
                    <CheckoutAndReviewBox book={book} mobile={false}/>
                </div>
                <hr/>
                <Reviews reviews={reviews} mobile={false}/>
            </div>
            <div className="container d-lg-none mt-5">
                <div className="d-flex justify-content-center align-items-center">
                    {book?.imgName ? (
                        <img src={book?.imgName} width="226" height="349" alt="Book"/>
                    ) : (
                        <img src={image} width="226" height="349" alt="Book"/>
                    )}
                </div>
                <div className="mt-4">
                    <div className="ml-2">
                        <h2>{book?.title}</h2>
                        <h5 className="text-primary">{book?.author}</h5>
                        <p className="lead">{book?.description}</p>
                        <StarsReview rating={totalStars} size={32}/>
                    </div>
                </div>
                <CheckoutAndReviewBox book={book} mobile={true}/>
                <hr/>
                <Reviews reviews={reviews} mobile={true}/>
            </div>
        </div>
    );
};
