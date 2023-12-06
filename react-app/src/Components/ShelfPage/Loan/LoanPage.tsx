import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import LoanModel from "../../../Models/LoanModel";
import { SpinnerLoading } from "../../../utils/spinner";
import image from "../../../Images/BooksImages/book-luv2code-1000.png";
import { Link } from "react-router-dom";
import { LoansModal } from "./LoanModal";
import { SuccessModal } from "../../../Modal/SucessModal";

export const Loans = () => {
  const { authState } = useOktaAuth();
  const [httpError, setHttpError] = useState(null);

  const [loansDetails, setLoansDetails] = useState<LoanModel[]>([]);
  const [isLoadingLoans, setIsLoadingLoans] = useState(true);

  const [checkOut, setCheckedOut] = useState(false);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [serverResponse, setServerResponse] = useState("");

  useEffect(() => {
    const fetchCurrentUserLoan = async () => {
      if (authState && authState.isAuthenticated) {
        const url: string = `http://localhost:8080/api/secure/loans`;
        const requestOption = {
          method: "Get",
          headers: {
            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
            "Content-type": "application/json",
          },
        };
        const loanDetailsResponse = await fetch(url, requestOption);

        if (!loanDetailsResponse.ok) {
          throw new Error("Something went Wrong !!");
        }

        const loanDetailsJson = await loanDetailsResponse.json();

        const loadLoanDetails: LoanModel[] = [];

        for (const key in loanDetailsJson) {
          const book = loanDetailsJson[key].book;

          loadLoanDetails.push({
            book: {
              id: book.id,
              title: book.title,
              author: book.author,
              description: book.description,
              copies: book.copies,
              available: book.available,
              category: book.category.cname,
              categoryId: book.category.id,
              imgName: book.imgName,
            },
            daysLeft: loanDetailsJson[key].daysLeft,
          });
        }

        setLoansDetails(loadLoanDetails);
      }

      setIsLoadingLoans(false);
    };
    fetchCurrentUserLoan().catch((error: any) => {
      setIsLoadingLoans(false);
      setHttpError(error.message);
    });
    window.scrollTo(0, 0);
  }, [authState, checkOut]);

  if (isLoadingLoans) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5 ">
        <p>{httpError}</p>
      </div>
    );
  }

  async function returnBook(bookId: number) {
    const url =  `http://localhost:8080/api/secure/loans/return/${bookId}`;
    const requestOptions = {
      method : "Put",
      headers : {
        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
        "Content-type": "application/json",
      }
    };
    const returnResponse = await fetch(url, requestOptions);
    if(!returnResponse.ok){
      throw new Error('Something Went wrong');
    }

    setCheckedOut(!checkOut);
    setShowSuccessModal(true);
    setServerResponse("Book Returned !!!")
    
  }
  async function renewBook(bookId: number) {
    const url =  `http://localhost:8080/api/secure/loans/extend/${bookId}`;
    const requestOptions = {
      method : "Put",
      headers : {
        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
        "Content-type": "application/json",
      }
    };
    const returnResponse = await fetch(url, requestOptions);
    if(!returnResponse.ok){
      throw new Error('Something Went wrong');
    }

    setCheckedOut(!checkOut);
    setShowSuccessModal(true);
  }

  return (
    <div>
      {showSuccessModal && <SuccessModal onClose={() => setShowSuccessModal(false)} message={serverResponse} />}
      <div className="d-none d-lg-block mt-2">
        {loansDetails.length > 0 ? (
          <>
            <h5>Current Loans: </h5>

            {loansDetails.map((loansDetail) => (
              <div key={loansDetail.book.id}>
                <div className="row mt-3 mb-3">
                  <div className="col-4 col-md-4 container">
                    {loansDetail.book?.imgName ? (
                      <img
                        src={`/${loansDetail.book?.imgName}`}
                        width="226"
                        height="349"
                        alt="Book"
                      />
                    ) : (
                      <img src={image} width="226" height="349" alt="Book" />
                    )}
                  </div>
                  <div className="card col-3 col-md-3 container d-flex">
                    <div className="card-body">
                      <div className="mt-3">
                        <h4>Loan Options</h4>
                        {loansDetail.daysLeft > 0 && (
                          <p className="text-secondary">
                            Due in {loansDetail.daysLeft} days.
                          </p>
                        )}
                        {loansDetail.daysLeft === 0 && (
                          <p className="text-success">Due Today.</p>
                        )}
                        {loansDetail.daysLeft < 0 && (
                          <p className="text-danger">
                            Past due by {-loansDetail.daysLeft} days.
                          </p>
                        )}
                        <div className="list-group mt-3">
                          <button
                            className="list-group-item list-group-item-action"
                            aria-current="true"
                            data-bs-toggle="modal"
                            data-bs-target={`#modal${loansDetail.book.id}`}
                          >
                            Manage Loan
                          </button>
                          <Link
                            to={"search"}
                            className="list-group-item list-group-item-action"
                          >
                            Search more books?
                          </Link>
                        </div>
                      </div>
                      <hr />
                      <p className="mt-3">
                        Help other find their adventure by reviewing your loan.
                      </p>
                      <Link
                        className="btn btn-primary"
                        to={`/viewDetails/${loansDetail.book.id}`}
                      >
                        Leave a review
                      </Link>
                    </div>
                  </div>
                </div>
                <hr />
            
                <LoansModal loanDetail={loansDetail} mobile={false} returnBook={returnBook} renewBook={renewBook} />
              </div>
            ))}
          </>
        ) : (
          <>
            <h3 className="mt-3">Currently no loans</h3>
            <Link className="btn btn-primary" to={`search`}>
              Search for a new book
            </Link>
          </>
        )}
      </div>

      <div className="container d-lg-none mt-2">
        {loansDetails.length > 0 ? (
          <>
            <h5 className="mb-3">Current Loans: </h5>

            {loansDetails.map((loansDetail) => (
              <div key={loansDetail.book.id}>
                <div className="d-flex justify-content-center align-items-center">
                  {loansDetail.book?.imgName ? (
                    <img
                      src={loansDetail.book?.imgName}
                      width="226"
                      height="349"
                      alt="Book"
                    />
                  ) : (
                    <img src={image} width="226" height="349" alt="Book" />
                  )}
                </div>
                <div className="card d-flex mt-5 mb-3">
                  <div className="card-body container">
                    <div className="mt-3">
                      <h4>Loan Options</h4>
                      {loansDetail.daysLeft > 0 && (
                        <p className="text-secondary">
                          Due in {loansDetail.daysLeft} days.
                        </p>
                      )}
                      {loansDetail.daysLeft === 0 && (
                        <p className="text-success">Due Today.</p>
                      )}
                      {loansDetail.daysLeft < 0 && (
                        <p className="text-danger">
                          Past due by {loansDetail.daysLeft} days.
                        </p>
                      )}
                      <div className="list-group mt-3">
                        <button
                          className="list-group-item list-group-item-action"
                          aria-current="true"
                          data-bs-toggle="modal"
                          data-bs-target={`#mobilemodal${loansDetail.book.id}`}
                        >
                          Manage Loan
                        </button>
                        <Link
                          to={"search"}
                          className="list-group-item list-group-item-action"
                        >
                          Search more books?
                        </Link>
                      </div>
                    </div>
                    <hr />
                    <p className="mt-3">
                      Help other find their adventure by reviewing your loan.
                    </p>
                    <Link
                      className="btn btn-primary"
                      to={`/viewDetails/${loansDetail.book.id}`}
                    >
                      Leave a review
                    </Link>
                  </div>
                </div>

                <hr />
                <LoansModal loanDetail={loansDetail} mobile={true} returnBook={returnBook} renewBook={renewBook} />
                
              </div>
            ))}
          </>
        ) : (
          <>
            <h3 className="mt-3">Currently no loans</h3>
            <Link className="btn btn-primary" to={`search`}>
              Search for a new book
            </Link>
          </>
        )}
      </div>
    </div>
   
  );
};