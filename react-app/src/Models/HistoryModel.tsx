import bookModel from "./BookModel";
import BookModel from "./BookModel";

class HistoryModel {
  id: number;

  book: bookModel;
  checkoutDate: string;
  returnedDate: string;

  constructor(
    id: number,
    book: BookModel,
    checkoutDate: string,
    returnedDate: string
  ) {
    this.book = book;
    this.checkoutDate = checkoutDate;
    this.returnedDate = returnedDate;
    this.id = id;
  }
}

export default HistoryModel;
