export class Book {
    _id?: string;
    title: string;
    author: string;
}

export class BookFilter {
    title?: string;
    author?: string;
    page: number;
    pageSize: number;
}
