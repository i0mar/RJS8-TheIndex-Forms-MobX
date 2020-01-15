import { decorate, observable, computed } from "mobx";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com/api/"
});

instance.defaults.headers.common.Authorization = "jwt eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxODYsInVzZXJuYW1lIjoidGVzdGluZ2cyIiwiZXhwIjoxNTc5MTA3NTczLCJlbWFpbCI6InRlc3QxQGluZ2cuY29tIn0.H4Bxqoz-wUZiMqwMTYvSsl5HzCBsuPrahMFo6xqck0Y";

function errToArray(err) {
  return Object.keys(err).map(key => `${key}: ${err[key]}`);
}

class AuthorStore {
  authors = [];

  loading = true;

  query = "";

  errors = null;

  fetchAuthors = async () => {
    try {
      const res = await instance.get("authors/");
      const authors = res.data;
      this.authors = authors;
      this.loading = false;
    } catch (err) {
      console.error(err);
    }
  };

  addAuthor = async newAuthor => {
    try {
      const res = await instance.post("authors/", newAuthor);
      const author = res.data;
      this.authors.unshift(author);
      this.errors = null;
    } catch (err) {
      this.errors = errToArray(err.response.data);
    }
  };

  get filteredAuthors() {
    return this.authors.filter(author =>
      `${author.first_name} ${author.last_name}`
        .toLowerCase()
        .includes(this.query.toLowerCase())
    );
  }

  getAuthorById = id => this.authors.find(author => +author.id === +id);
}

decorate(AuthorStore, {
  authors: observable,
  loading: observable,
  errors: observable,
  query: observable,
  filteredAuthors: computed
});

const authorStore = new AuthorStore();
authorStore.fetchAuthors();

export default authorStore;
