import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import LoanModel from "../../../Models/LoanModel";
import { SpinnerLoading } from "../../../utils/spinner";
import image from "../../Images/BooksImages/book-luv2code-1000.png";
import { Link } from "react-router-dom";
import { LoansModal } from "./LoanModal";

export const Loans = () => {
  const { authState } = useOktaAuth();
  const [httpError, setHttpError] = useState(null);

  const [loansDetails, setLoansDetails] = useState<LoanModel[]>([]);
  const [isLoadingLoans, setIsLoadingLoans] = useState(true);

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
  }, [authState]);

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

  return (
    <div>
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
                            Past due by {loansDetail.daysLeft} days.
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
                        to={`/checkout/${loansDetail.book.id}`}
                      >
                        Leave a review
                      </Link>
                    </div>
                  </div>
                </div>
                <hr />
                <LoansModal loanDetail={loansDetail} mobile={false}/>
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
                      to={`/checkout/${loansDetail.book.id}`}
                    >
                      Leave a review
                    </Link>
                  </div>
                </div>

                <hr />
                <LoansModal loanDetail={loansDetail} mobile={true}/>
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
//     <>
//     <br/>
//     <div className="row justify-content-center mb-3">
//     <div className="col-md-12 col-xl-10">
//       <div className="card shadow-0 border rounded-3">
//         <div className="card-body">
//           <div className="row">
//             <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
//               <div className="bg-image hover-zoom ripple rounded ripple-surface">
//                 <img src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/new/img(4).webp"
//                   className="w-100" />
//                 <a href="#!">
//                   <div className="hover-overlay">
//                     <div className="mask" ></div>
//                   </div>
//                 </a>
//               </div>
//             </div>
//             <div className="col-md-6 col-lg-6 col-xl-6">
//               <h5>Quant olap shirts</h5>
//               <div className="d-flex flex-row">
//                 <div className="text-danger mb-1 me-2">
//                   <i className="fa fa-star"></i>
//                   <i className="fa fa-star"></i>
//                   <i className="fa fa-star"></i>
//                   <i className="fa fa-star"></i>
//                 </div>
//                 <span>289</span>
//               </div>
//               <div className="mt-1 mb-0 text-muted small">
//                 <span>100% cotton</span>
//                 <span className="text-primary"> • </span>
//                 <span>Light weight</span>
//                 <span className="text-primary"> • </span>
//                 <span>Best finish<br /></span>
//               </div>
//               <div className="mb-2 text-muted small">
//                 <span>Unique design</span>
//                 <span className="text-primary"> • </span>
//                 <span>For men</span>
//                 <span className="text-primary"> • </span>
//                 <span>Casual<br /></span>
//               </div>
//               <p className="text-truncate mb-4 mb-md-0">
//                 There are many variations of passages of Lorem Ipsum available, but the
//                 majority have suffered alteration in some form, by injected humour, or
//                 randomised words which don't look even slightly believable.
//               </p>
//             </div>
//             <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
//               <div className="d-flex flex-row align-items-center mb-1">
//                 <h4 className="mb-1 me-1">$14.99</h4>
//                 <span className="text-danger"><s>$21.99</s></span>
//               </div>
//               <h6 className="text-success">Free shipping</h6>
//               <div className="d-flex flex-column mt-4">
//                 <button className="btn btn-primary btn-sm" type="button">Details</button>
//                 <button className="btn btn-outline-primary btn-sm mt-2" type="button">
//                   Add to wishlist
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
//   <div className="row justify-content-center mb-3">
//   <div className="col-md-12 col-xl-10">
//     <div className="card shadow-0 border rounded-3">
//       <div className="card-body">
//         <div className="row">
//           <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
//             <div className="bg-image hover-zoom ripple rounded ripple-surface">
//               <img src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/new/img(4).webp"
//                 className="w-100" />
//               <a href="#!">
//                 <div className="hover-overlay">
//                   <div className="mask" ></div>
//                 </div>
//               </a>
//             </div>
//           </div>
//           <div className="col-md-6 col-lg-6 col-xl-6">
//             <h5>Quant olap shirts</h5>
//            <br/>
//             <div className="mt-1 mb-0 text-muted small">
//               <span>100% cotton</span>
//               <span className="text-primary"> • </span>
//               <span>Light weight</span>
//               <span className="text-primary"> • </span>
//               <span>Best finish<br /></span>
//             </div>
//             <div className="mb-2 text-muted small">
//               <span>Unique design</span>
//               <span className="text-primary"> • </span>
//               <span>For men</span>
//               <span className="text-primary"> • </span>
//               <span>Casual<br /></span>
//             </div>
//             <p className="text-truncate mb-4 mb-md-0">
//               There are many variations of passages of Lorem Ipsum available, but the
//               majority have suffered alteration in some form, by injected humour, or
//               randomised words which don't look even slightly believable.
//             </p>
//           </div>
//           <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
//             <div className="d-flex flex-row align-items-center mb-1">
//               <h4 className="mb-1 me-1">$14.99</h4>
//               <span className="text-danger"><s>$21.99</s></span>
//             </div>
//             <h6 className="text-success">Free shipping</h6>
//             <div className="d-flex flex-column mt-4">
//               <button className="btn btn-primary btn-sm" type="button">Details</button>
//               <button className="btn btn-outline-primary btn-sm mt-2" type="button">
//                 Add to wishlist
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </div></>
  );
};
