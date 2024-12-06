import { books } from "../book";
import { useState } from "react";
import Modal from "./Modal";
const Reducer = () => {
  const [allBooks, setAllBooks] = useState(books);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [bookName, setBookName] = useState("");

  function handleBookAddSubmit(e) {
    e.preventDefault();
    const newBook = {
      id: allBooks.length + 1,
      name: bookName,
    };
    const updatedBooks = [...allBooks, newBook];

    setAllBooks(updatedBooks);
    setIsModalOpen(true);
    setModalText("Book is Added");
  }

  return (
    <>
      <form onSubmit={handleBookAddSubmit}>
        <input
          type="text"
          value={bookName}
          placeholder="Enter your Book Name"
          onChange={(e) => setBookName(e.target.value)}
        />
        <button type="submit">Add new</button>
      </form>
      {isModalOpen && <Modal modalText={modalText} />}
      {allBooks.map((book) => (
        <li key={book.id}>{book.name}</li>
      ))}
    </>
  );
};

export default Reducer;
