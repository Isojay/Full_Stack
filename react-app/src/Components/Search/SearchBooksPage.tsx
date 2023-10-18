import React from "react";
import BookModel from "../../Models/BookModel";
import { useState, useEffect } from "react";
import { SpinnerLoading } from "../../utils/spinner";
import { SearchBook } from "./SearchBook";

export const SearchPage = () => {
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

      const responseData = responseJson;

      const bookLoaded: BookModel[] = [];

      for (const key in responseData) {
        bookLoaded.push({
          id: responseData[key].id,
          title: responseData[key].title,
          author: responseData[key].author,
          description: responseData[key].description,
          copies: responseData[key].copies,
          available: responseData[key].available,
          category: responseData[key].category,
          imgName: responseData[key].imgName,
        });
      }

      console.log(bookLoaded);

      setBooks(bookLoaded);

      console.log(books);

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
    <>
      <div className="container">
        <div>
          <div className="row mt-5">
            <div className="col-6">
              <div className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-labelledby="Search"
                />
                <button className="btn btn-outline-success">Search</button>
              </div>
            </div>
            <div className="col-4">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Category
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      All
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Front End
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Back End
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Data
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      DevOps
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <h5>Number of Results : 22</h5>
          </div>
          <p>1 to 5 of 22 items:</p>
          {books.map((book) => (
            <SearchBook book={book} key={book.id} />
          ))}
        </div>
      </div>
    </>
  );
};
