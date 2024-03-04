import BookModel from "../../Models/BookModel";
import {useEffect, useState} from "react";
import {SpinnerLoading} from "../../utils/spinner";
import {SearchBook} from "./SearchBookIndividual";
import {Pagination} from "../../utils/pagination";
import CategoryModel from "../../Models/CategoryModel";
import {Link} from "react-router-dom";
export const SearchPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [books, setBooks] = useState<BookModel[]>([]);
    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [booksPerPage, setBooksPerPage] = useState(6);
    const [totalBooks, setTotalBooks] = useState(0);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchUrl, setSearchUrl] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    useEffect(() => {
        fetchBooks();
        fetchCategories();
    }, [currentPage, searchUrl, selectedCategory]);

    const fetchBooks = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const baseUrl = "http://localhost:8080/api/books";
            let url;
            if (selectedCategory == "All") {
                url = searchUrl === "" ? `${baseUrl}?page=${currentPage - 1}&size=${booksPerPage}` : `${baseUrl}${searchUrl.replace("<pageNumber>", `${currentPage - 1}`)}`;
            } else {
                url = searchUrl === "" ? `${baseUrl}?page=${currentPage - 1}&size=${booksPerPage}` : `${baseUrl}${searchUrl.replace("<pageNumber>", `${currentPage - 1}`)}`;
            }
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Failed to fetch datas");
            }

            const data = await response.json();
            setTotalBooks(data.totalElements);
            setCurrentPage(data.number + 1);
            setBooksPerPage(data.size);
            setTotalPages(data.totalPages);

            const loadedBooks = data.content.map((item: {
                id: any;
                title: any;
                author: any;
                description: any;
                copies: any;
                available: any;
                category: { cname: any; id: any; };
                imgName: any;
            }) => ({
                id: item.id,
                title: item.title,
                author: item.author,
                description: item.description,
                copies: item.copies,
                available: item.available,
                category: item.category.cname,
                categoryId: item.category.id,
                imgName: item.imgName,
            }));
            setBooks(loadedBooks);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/books/category");
            if (!response.ok) {
                throw new Error("Failed to fetch categories");
            }
            const data = await response.json();
            setCategories(data.content.map((category: { id: any; cname: any; }) => ({
                id: category.id,
                cname: category.cname,
            })));
        } catch (error: any) {
            setError(error.message);
        }
    };

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const lastItem = booksPerPage * currentPage <= totalBooks ? booksPerPage * currentPage : totalBooks;

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const searchHandler = () => {
        setCurrentPage(1);
        if (searchKeyword === "") {
            setSearchUrl("");
        } else {
            const encodedSearchKeyword = encodeURIComponent(searchKeyword);
            setSearchUrl(
                `?keyword=${encodedSearchKeyword}&page=<pageNumber>&size=${booksPerPage}`
            );
        }
        setSelectedCategory("All");
    };

    const resetHandler = () => {
        setSearchUrl("");
        setSearchKeyword("");
    };

    if (isLoading) {
        return (
            <div className="container m-5">
                <SpinnerLoading/>
            </div>
        );
    }

    if (error) {
        throw new Error(error);
    }

    return (
        <div className="container">
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
                            onClick={searchHandler}
                        >
                            Search
                        </button>
                        <button
                            className="btn btn-outline-success marginLeft"
                            onClick={resetHandler}
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
                            aria-expanded="false"
                            style={{minWidth: "125px"}}

                        >
                            {selectedCategory}
                        </button>
                        <ul
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuButton1"
                            style={{maxHeight: "200px", overflowY: "auto"}}

                        >
                            <li onClick={() => setSelectedCategory("All")}>
                                <a className="dropdown-item" href="#">
                                    All
                                </a>
                            </li>
                            {categories.map((category) => (
                                <li
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.cname)}
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
                        <SearchBook book={book} key={book.id}/>
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
                    <Link
                        className="btn btn-primary btn-md px-4 me-md-2 fw-bold text-white"
                        to="/"
                    >
                        Library Services
                    </Link>
                </div>
            )}
        </div>
    );
};

