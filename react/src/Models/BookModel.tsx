class BookModel {
    id: number;
    title: string;
    author?: string;
    description?: string;
    copies?: number;
    available?: number;
    category?: string;
    categoryId?: number;
    imgName?: string;

    constructor(
        id: number,
        title: string,
        author: string,
        description: string,
        copies: number,
        available: number,
        category: string,
        categoryId: number,
        imgName: string
    ) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.description = description;
        this.copies = copies;
        this.available = available;
        this.category = category;
        this.categoryId = categoryId;
        this.imgName = imgName;
    }
}

export default BookModel;
