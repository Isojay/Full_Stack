import {useState} from "react";
import {HistoryPage} from "./History/HistoryPage";
import Loans from "./Loan/LoanPage.tsx";

export const ShelfPage = () => {
    const [historyPage, setHistoryPage] = useState(true);
    return (
        <>
            <div className="container">
                <div className="mt-3">
                    <nav>
                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                            <button
                                className="nav-link active"
                                id="nav-loans-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#nav-loans"
                                type="button"
                                role="tab"
                                aria-controls="nav-loans"
                                aria-selected="true"
                                onClick={() => setHistoryPage(false)}
                            >
                                Loans
                            </button>
                            <button
                                className="nav-link"
                                id="nav-history-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#nav-history"
                                type="button"
                                role="tab"
                                aria-controls="nav-history"
                                aria-selected="false"
                                onClick={() => setHistoryPage(true)}
                            >
                                Your History
                            </button>
                        </div>
                    </nav>
                    <div className="tab-content" id="nav-tabContent">
                        <div
                            className="tab-pane fade show active"
                            id="nav-loans"
                            role="tabpanel"
                            aria-labelledby="nav-loans-tab"
                        >
                            {/* <p>Loans</p> */}
                            <Loans/>
                        </div>
                        <div
                            className="tab-pane fade"
                            id="nav-history"
                            role="tabpanel"
                            aria-labelledby="nav-history-tab"
                        >
                            {/* <p>Checkout History</p> */}
                            {historyPage ? <HistoryPage/> : <></>}
                        </div>
                    </div>
                </div>
            </div>
            )
        </>
    );
};
