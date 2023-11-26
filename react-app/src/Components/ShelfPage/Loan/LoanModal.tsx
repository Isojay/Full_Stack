import React from "react";
import LoanModel from "../../../Models/LoanModel";
import image from "../../Images/BooksImages/book-luv2code-1000.png";

export const LoansModal : React.FC<{loanDetail : LoanModel , mobile : boolean}> = (props) =>{
    return (
        <div className='modal fade' id={props.mobile ? `mobilemodal${props.loanDetail.book.id}` : 
            `modal${props.loanDetail.book.id}`} data-bs-backdrop='static' data-bs-keyboard='false' 
            aria-labelledby='staticBackdropLabel' aria-hidden='true' key={props.loanDetail.book.id}>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title' id='staticBackdropLabel'>
                                Loan Options
                            </h5>
                            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'>
                            </button>
                        </div>
                        <div className='modal-body'>
                            <div className='container'>
                                <div className='mt-3'>
                                    <div className='row'>
                                        <div className='col-2'>
                                            {props.loanDetail.book?.imgName ?
                                                <img src={props.loanDetail.book?.imgName} 
                                                    width='56' height='87' alt='Book'/>
                                                :
                                                <img src={image} width="226" height="349" alt="Book" />
                                            }
                                        </div>
                                        <div className='col-10'>
                                            <h6>{props.loanDetail.book.author}</h6>
                                            <h4>{props.loanDetail.book.title}</h4>
                                        </div>
                                    </div>
                                    <hr/>
                                    {props.loanDetail.daysLeft > 0 && 
                                        <p className='text-secondary'>
                                            Due in {props.loanDetail.daysLeft} days.
                                        </p>
                                    }
                                    {props.loanDetail.daysLeft === 0 && 
                                        <p className='text-success'>
                                             Due Today.
                                        </p>
                                    }
                                    {props.loanDetail.daysLeft < 0 && 
                                        <p className='text-danger'>
                                            Past due by {props.loanDetail.daysLeft} days.
                                        </p>
                                    }
                                    <div className='list-group mt-3'>
                                        <button data-bs-dismiss='modal' className='list-group-item list-group-item-action' 
                                           aria-current='true'>
                                            Return Book
                                        </button>
                                        <button data-bs-dismiss='modal' 
                                            className={
                                                props.loanDetail.daysLeft < 0 ? 
                                                'list-group-item list-group-item-action inactiveLink' : 
                                                'list-group-item list-group-item-action'
                                            }>
                                            {props.loanDetail.daysLeft < 0 ? 
                                            'Late dues cannot be renewed' : 'Renew loan for 7 days'    
                                            }
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='modal-footer'>
                            <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
        </div>);
}