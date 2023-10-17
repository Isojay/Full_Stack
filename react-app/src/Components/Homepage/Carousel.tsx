import React from "react";
import { ListCarousel } from "./ListCarousel";
import BookModel from "../../Models/BookModel";
import { useState, useEffect } from "react";

export const Carousel = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMSG, setErrorMsg] = useState(null);
  const [books, setBooks] = useState<BookModel[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const baseUrl: string = "http://localhost:8080/api/books";

      const url: string = `${baseUrl}?page=0&size=9`;

      const response = await fetch(baseUrl);

      if (!response.ok) {
        throw new Error("Something went wrong !!");
      }

      const responseJson = await response.json();

      const responseData = responseJson._embedded.books;

      const bookLoaded: BookModel[] = [];

      for (const key in responseData) {
        bookLoaded.push({
          id: responseData[key].id,
          title: responseData[key].title,
          author: responseData[key].author,
          description: responseData[key].description,
          copies: responseData[key].copies,
          available: responseData[key].available,
          imgName: responseData[key].imgName,
        });
      }

      setBooks(bookLoaded);
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
        <p>Loading.....</p>
      </div>
    );
  }
    if (errorMSG){
      return(
          <div className="container m-5">
              <p>{errorMSG}</p>
          </div>
      )
    }

  return (
    <div className="container mt-5" style={{ height: 550 }}>
      <div className="homepage-carousel-title">
        <h3>Find your next "I stayed up too late reading" book.</h3>
      </div>
      <div
        id="carouselExampleControls"
        className="carousel carousel-dark slide mt-5 d-none d-lg-block"
        data-bs-interval="false"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="row d-flex justify-content-center align-items-center">
              {books.splice(0, 3).map((book) => (
                <ListCarousel book={book} key={book.id} />
              ))}
            </div>
          </div>
          <div className="carousel-item">
            <div className="row d-flex justify-content-center align-items-center">
              {books.splice(3, 6).map((book) => (
                <ListCarousel book={book} key={book.id} />
              ))}
            </div>
          </div>
          <div className="carousel-item">
            <div className="row d-flex justify-content-center align-items-center">
              {books.splice(6, 9).map((book) => (
                <ListCarousel book={book} key={book.id} />
              ))}
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      {/* Mobile */}
      <div className="d-lg-none mt-3">
        <div className="row d-flex justify-content-center align-items-center">
          <ListCarousel book={books[7]} key={books[7].id} />
        </div>
      </div>
      <div className="homepage-carousel-title mt-3">
        <a className="btn btn-outline-secondary btn-lg" href="#">
          View More
        </a>
      </div>
    </div>
  );
};
