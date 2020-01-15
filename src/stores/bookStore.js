import { decorate, observable, computed } from "mobx";
import axios from "axios";
import authorStore from "./authorStore";

const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com/api/"
});

instance.defaults.headers.common.Authorization = "jwt eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxODYsInVzZXJuYW1lIjoidGVzdGluZ2cyIiwiZXhwIjoxNTc5MTA2ODMxLCJlbWFpbCI6InRlc3QxQGluZ2cuY29tIn0.lQj6dlp3MJRVG8zjsIJ10f9_rCCYsShKHRj8BH3a8Ns";

class BookStore {
  books = [];

  query = "";

  loading = true;

  fetchBooks = async () => {
    try {
      const res = await instance.get("books/");
      const books = res.data;
      this.books = books;
      this.loading = false;
    } catch (err) {}
  };

  addBook = async (newBook, author) => {
    try {
      const data = {...newBook, authors: [author]};
      console.log(data);
      const res = await instance.post("books/", data);
      this.books.unshift(res.data);
      authorStore.getAuthorById(author).books.unshift(res.data.id);
    } catch(error) {
      console.error(error);
    }
  };

  get filteredBooks() {
    return this.books.filter(book => {
      return book.title.toLowerCase().includes(this.query.toLowerCase());
    });
  }

  getBookById = id => this.books.find(book => +book.id === +id);

  getBooksByColor = color =>
    this.filteredBooks.filter(book => book.color === color);
}

decorate(BookStore, {
  books: observable,
  query: observable,
  loading: observable,
  filteredBooks: computed
});

const bookStore = new BookStore();
bookStore.fetchBooks();

export default bookStore;
