import {useOktaAuth} from "@okta/okta-react";
import {useEffect, useState} from "react";
import HistoryModel from "../../../Models/HistoryModel";
import {SpinnerLoading} from "../../../utils/spinner";
import {Pagination} from "../../../utils/pagination";
import {Link} from "react-router-dom";

export const HistoryPage = () => {
    const {authState} = useOktaAuth();
    const [historyContent, setHistoryContent] = useState<HistoryModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [hoveredCardId, setHoveredCardId] = useState(0);
    const [deletePrompt, setDeletePrompt] = useState(true);

    const fetchUserHistory = async () => {
        setIsLoading(true);
        try {
            if (authState?.isAuthenticated) {
                const url: string = `http://localhost:8080/api/history?userEmail=${
                    authState.accessToken?.claims.sub
                }&page=${currentPage - 1}&size=5`;
                const requestOptions = {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                };

                const historyResponse = await fetch(url, requestOptions);

                if (!historyResponse.ok) {
                    throw new Error("Something went wrong !! Try Again");
                }

                const historyResponseJson = await historyResponse.json();
                const historyResponseContent = historyResponseJson.content;

                const history = historyResponseContent.map((content: any) => ({
                    id: content.id,
                    book: {
                        ...content.book,
                        category: content.book.category.cname,
                        categoryId: content.book.category.id,
                    },
                    returnedDate: content.returnedDate,
                    checkoutDate: content.checkoutDate,
                }));

                setHistoryContent(history);
                setTotalPages(historyResponseJson.totalPages);
            }
        } catch (error: any) {
            setHttpError(error.message);
        } finally {
            setIsLoading(false);
            window.scrollTo(0, 0);
        }
    };

    useEffect(() => {
        fetchUserHistory();
    }, [authState, currentPage, deletePrompt]);

    async function deleteHistory(id: number, userEmail: any) {
        console.log(id);
        console.log(userEmail);

        let url: string = "";

        if (userEmail === null) {
            url = `http://localhost:8080/api/history?id=${id}`;
        } else {
            url = `http://localhost:8080/api/history?userEmail=${userEmail}`;
        }

        console.log(url);

        const requestOptions = {
            method: "Delete",
            headers: {
                "Content-type": "application/json",
            },
        };
        const deleteResponse = await fetch(url, requestOptions);
        if (!deleteResponse.ok) {
            throw new Error("Something went Wrong !!!");
        }

        setDeletePrompt(!deletePrompt);
    }

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    if (isLoading) {
        return <SpinnerLoading/>;
    }

    if (httpError) {
        return (
            <div>
                <div className="container m-5">
                    <p>{httpError}</p>
                </div>
            </div>
        );
    }

    const renderHistoryContent = () => {
        if (historyContent.length === 0) {
            return (
                <>
                    <div className="alert alert-warning mt-3" role="alert">
                        <h3>Whoopsie-daisy! Your reading history is as empty as a library on Mars!</h3>
                        <p>Time to sprinkle some literary stardust and fill it up!</p>
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                        <Link className="btn btn-primary" to={`search`}>
                            Blast Off to New Books!
                        </Link>
                    </div>
                </>
            );
        }

        return (
            <>
                <div className="d-flex justify-content-between align-items-center">
                    <h5>Recent History:</h5>
                    <button
                        className="btn btn-link text-danger noUnderline clear-all-button"
                        onClick={() => {
                            deleteHistory(0, authState?.accessToken?.claims.sub);
                        }}
                    >
                        Clear All
                    </button>

                </div>

                {historyContent.map((history) => (
                    <div key={history.id} className="history-card">
                        <div
                            className="card shadow p-3 mb-3 bg-body rounded"
                            onClick={() => console.log(history.id)}
                            onMouseEnter={() => setHoveredCardId(history.id)}
                            onMouseLeave={() => setHoveredCardId(0)}
                        >
                            {hoveredCardId === history.id && (
                                <button
                                    className="btn btn-outline-danger btn-sm close-button"
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent card click event
                                        deleteHistory(history.id, null);
                                        console.log(`Close button clicked for card ${history.id}`);
                                    }}
                                >
                                    &times;
                                </button>
                            )}
                            <div className="row g-0">
                                <div className="col-md-2">
                                    <div className="d-none d-lg-block">
                                        {history.book.imgName ? (
                                            <img
                                                src={history.book.imgName}
                                                width="123"
                                                height="196"
                                                alt="Book"
                                            />
                                        ) : (
                                            <img
                                                src={"new-book-1.png"}
                                                width="123"
                                                height="196"
                                                alt="Default"
                                            />
                                        )}
                                    </div>
                                    <div className="d-lg-none d-flex justify-content-center align-items-center">
                                        {history.book.imgName ? (
                                            <img
                                                src={history.book.imgName}
                                                width="123"
                                                height="196"
                                                alt="Book"
                                            />
                                        ) : (
                                            <img
                                                src={"new-book-1.png"}
                                                width="123"
                                                height="196"
                                                alt="Default"
                                            />
                                        )}
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card-body">
                                        <h5 className="card-title"> {history.book.author} </h5>
                                        <h4>{history.book.title}</h4>
                                        <p className="card-text">{history.book.description}</p>
                                        <hr/>

                                        <div className="row">
                                            <div className="col-md-8">
                                                <p className="card-text">Checked out on: {history.checkoutDate}</p>
                                                <p className="card-text">Returned on: {history.returnedDate}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr/>
                    </div>
                ))}
            </>
        );
    };

    return (
        <div className="mt-2">
            {renderHistoryContent()}
            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    paginate={paginate}
                />
            )}
        </div>
    );
};
