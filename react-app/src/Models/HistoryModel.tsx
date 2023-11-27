import bookModel from "./BookModel";
import BookModel from "./BookModel";


class HistoryModel{

    book : bookModel;
    checkoutDate : string;
    returnDate : string;

    constructor(book: BookModel, checkoutDate: string, returnDate: string) {
        this.book = book;
        this.checkoutDate = checkoutDate;
        this.returnDate = returnDate;
    }
}


export default  HistoryModel;
