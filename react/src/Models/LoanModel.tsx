import BookModel from "./BookModel";

class LoanModel {

    book: BookModel;
    daysLeft: number;


    constructor(book: BookModel, daysLeft: number) {
        this.book = book;
        this.daysLeft = daysLeft;
    }
}

export default LoanModel;