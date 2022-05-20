import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

const BookDetails = () => {
  const defaultFormData = {
    title: '',
    description: '',
    rating: 0,
    author: '',
  };
  const { id } = useParams();
  const navigateTo = useNavigate();
  const [book, setBook] = useState(null);
  const [editToggler, setEditToggler] = useState(false);
  const [formData, setFormData] = useState(defaultFormData);

  const getBookDetails = async () => {
    const { data } = await axios.get(`http://localhost:5005/books/${id}`);
    setBook(() => data);
    setFormData(() => data);
  };

  const updateBookDetail = async () => {
    const { data } = await axios.post(
      `http://localhost:5005/books/${id}`,
      formData
    );
    setBook(() => data);
    setEditToggler(() => !editToggler);
  };

  const deleteBook = async () => {
    const { data } = await axios.delete(`http://localhost:5005/books/${id}`);
    navigateTo('/books');
  };

  useEffect(() => {
    try {
      getBookDetails();
    } catch (error) {}
  }, []);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    try {
      updateBookDetail();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteHandler = () => {
    try {
      deleteBook();
    } catch (error) {}
  };

  return (
    <div>
      <h1>BookDetails</h1>
      {book && !editToggler && (
        <div>
          <p>Title: {book.title}</p>
          <p>Description: {book.description}</p>
          <p>Author: {book.author}</p>
          <p>Rating: {book.rating}</p>
          <button onClick={() => setEditToggler(() => !editToggler)}>
            Edit
          </button>
          <button onClick={deleteHandler}>Delete</button>
        </div>
      )}

      {editToggler && (
        <div>
          <form onSubmit={submitHandler}>
            <label>Title: </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={changeHandler}
            />
            <br />
            <label>Description: </label>
            <textarea
              type="text"
              name="description"
              value={formData.description}
              onChange={changeHandler}
            />
            <br />
            <label>Author: </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={changeHandler}
            />
            <br />
            <label>Rating:</label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={changeHandler}
            />
            <br />
            <button type="submit">Submit</button>
          </form>
          <button onClick={() => setEditToggler(() => !editToggler)}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};
export default BookDetails;

// author: "J.K. Rowling "
// createdAt: "2022-05-19T23:20:20.448Z"
// description: "Harry Potter is a series of seven fantasy novels written by British author, J. K. Rowling. The novels chronicle the lives of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry. The main story arc concerns Harry's struggle against Lord Voldemort, a dark wizard who intends to become immortal, overthrow the wizard governing body known as the Ministry of Magic and subjugate all wizards and Muggles (non-magical people)."
// rating: 9
// title: "Harry Potter"
// updatedAt: "2022-05-19T23:20:20.448Z"
// __v: 0
// _id: "6286d0b40aad71810e09849c"
