import api from "../axios/index";
import { books } from "../endpoints/index";

export const getBooksList = (searchtext = "") => {
  return api.get(books);
};

export const postBookDetails = (book) => {
  return api.post(book);
};
