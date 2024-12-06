import { books } from "../book";
import { useState, useReducer } from "react";
import Modal from "./Modal";

const ReducerPractise = () => {
  const [bookName, setBookName] = useState("");

  const reducer = (state, action) => {
    // action.type action.payload
    if (action.type === "ADD") {
      const allBooks = [...state.books, action.payload];
      return {
        ...state,
        books: allBooks,
        isModalOpen: true,
        modalText: "Book is Added",
      };
    }
    if (action.type === "REMOVE") {
      const filterBooks = [...state.books].filter(
        (book) => book.id !== action.payload
      );
      return {
        ...state,
        books: filterBooks,
        isModalOpen: true,
        modalText: "Book is Deleted",
      };
    }
    return state;
  };

  const [bookState, dispatch] = useReducer(reducer, {
    books: books,
    isModalOpen: false,
    modalText: "",
  });

  function handleBookAddSubmit(e) {
    e.preventDefault();
    const newBook = {
      id: books.length + 1,
      name: bookName,
    };
    dispatch({ type: "ADD", payload: newBook });
    setBookName("");
  }

  function handleBookRemove(id) {
    dispatch({ type: "REMOVE", payload: id });
  }

  return (
    <>
      <form onSubmit={handleBookAddSubmit}>
        <input
          type="text"
          value={bookState.bookName}
          placeholder="Enter your Book Name"
          onChange={(e) => setBookName(e.target.value)}
        />
        <button type="submit">Add new</button>
      </form>
      {bookState.isModalOpen && <Modal modalText={bookState.modalText} />}
      {bookState.books.map((book) => (
        <li key={book.id}>
          {book.name}
          <button
            className="bg-green-600 text-black"
            onClick={() => handleBookRemove(book.id)}
          >
            Remove
          </button>
        </li>
      ))}
    </>
  );
};

export default ReducerPractise;
