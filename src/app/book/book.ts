export class Book {
    _id?: string;
    title: string;
    author: string;
}

export class Pagination {
    page: number;
    pageSize: number;
    totalRecords?: number;
}

export class BookFilter {
    title: string;
    author: string;
}

export class IBookListItems {
    books: Book[];
}
