import BookModel from "../../Models/BookModel";
import { useState, useEffect } from "react";
import { SpinnerLoading } from "../../utils/spinner";
import { SearchBook } from "./SearchBookIndividual";
import { Pagination } from "../../utils/pagination";
import CategoryModel from "../../Models/CategoryModel";

export const SearchPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMSG, setErrorMsg] = useState(null);
  const [books, setBooks] = useState<BookModel[]>([]);
  const [category, setCategory] = useState<CategoryModel[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [booksPerPage, setBooksPerPage] = useState(3);
  const [totalBooks, setTotalBooks] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchUrl, setSearchUrl] = useState("");
  const [categoryName, setCategoryName] = useState("Category");

  useEffect(() => {
    const fetchBooks = async () => {
      const baseUrl: string = "http://localhost:8080/api/books";

      let url: string = "";

      if (searchUrl == "") {
        url = `${baseUrl}?page=${currentPage - 1}&size=${booksPerPage}`;
      } else {
        //Pagination Bug
        let pageChangBug = searchUrl.replace(
          "<pageNumber>",
          `${currentPage - 1}`
        );
        url = baseUrl + pageChangBug;
      }

      console.log(url);
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Something went wrong !!");
      }

      const responseJson = await response.json();

      //Pagination
      //All Datas are from the Backend.
      setTotalBooks(responseJson.totalElements);
      setCurrentPage(responseJson.number + 1);
      setBooksPerPage(responseJson.size);
      setTotalPages(responseJson.totalPages);

      //For the content of the Book
      const responseData = responseJson.content;
      const bookLoaded: BookModel[] = [];

      for (const key in responseData) {
        // Elements of category is concentrated.
        const category = responseData[key].category;

        bookLoaded.push({
          id: responseData[key].id,
          title: responseData[key].title,
          author: responseData[key].author,
          description: responseData[key].description,
          copies: responseData[key].copies,
          available: responseData[key].available,
          category: category.cname,
          categoryId: category.id,
          imgName: responseData[key].imgName,
        });
      }

      setBooks(bookLoaded);
      setIsLoading(false);

      //for Book Category

      const responseCategory = await fetch(
        "http://localhost:8080/api/books/category"
      );

      const category_Json = await responseCategory.json();
      const category_Data = category_Json.content;

      const categoryLoaded: CategoryModel[] = [];

      for (const key in category_Data) {
        categoryLoaded.push({
          id: category_Data[key].id,
          cname: category_Data[key].cname,
        });
      }

      setCategory(categoryLoaded);
    };
    fetchBooks().catch((error: any) => {
      setIsLoading(false);
      setErrorMsg(error.message);
    });

    window.scrollTo(0, 0);
  }, [currentPage, searchUrl]);

  const indexOfLastBook: number = currentPage * booksPerPage;
  const indexOfFirstBook: number = indexOfLastBook - booksPerPage;
  let lastItem =
    booksPerPage * currentPage <= totalBooks
      ? booksPerPage * currentPage
      : totalBooks;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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

  function searchHandler() {
    setCurrentPage(1);
    if (searchKeyword === "") {
      setSearchUrl("");
    } else {
      const encodedSearchKeyword: string = encodeURIComponent(searchKeyword);
      console.log(encodedSearchKeyword);
      setSearchUrl(
        `?keyword=${encodedSearchKeyword}&page=<pageNumber>&size=${booksPerPage}`
      );
    }
    setCategoryName("Category");
  }

  function resetHandler() {
    setSearchUrl("");
    setSearchKeyword("");
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
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  value={searchKeyword}
                />
                <button
                  className="btn btn-outline-success"
                  onClick={() => searchHandler()}
                >
                  Search
                </button>
                <button
                  className="btn btn-outline-success marginLeft"
                  onClick={() => resetHandler()}
                >
                  Reset
                </button>
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
                  {categoryName}
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                  style={{ maxHeight: "200px", overflowY: "auto" }}
                >
                  <li onClick={() => searchHandler()}>
                    <a className="dropdown-item" href="#">
                      All
                    </a>
                  </li>
                  {category.map((category) => (
                    <li
                      key={category.id}
                      onClick={() => {
                        setCurrentPage(1);
                        setCategoryName(category.cname);
                        setSearchUrl(
                          `?id=${category.id}&page=<pageNumber>&size=${booksPerPage}`
                        );
                      }}
                    >
                      <a className="dropdown-item" href="#">
                        {category.cname}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {totalBooks > 0 ? (
            <>
              <div className="mt-3">
                <h5>Number of Results : {totalBooks}</h5>
              </div>
              <p>
                {indexOfFirstBook + 1} to {lastItem} of {totalBooks} Items:
              </p>
              {books.map((book) => (
                <SearchBook book={book} key={book.id} />
              ))}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  paginate={paginate}
                />
              )}
            </>
          ) : (
            <div className="m-5">
              <h3>Can't find what you are looking for?</h3>
              <a
                type="button"
                className="btn main-color btn-md px-4 me-md-2 fw-bold text-black"
                href="#"
              >
                Library Services
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
