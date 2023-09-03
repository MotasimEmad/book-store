import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteBooks, getBook } from '../../redux/bookSlice';

const BooksList = ({ isLoading, books, isLoggedIn }) => {
  const dispatch = useDispatch();
  const bookList =  books.length > 0 ?  books.map((book) => (
    <li className='list-group-item d-flex  justify-content-between align-items-center' key={book.id}>
          <div>{book.title}</div>
          <div className='btn-group' role='group'>
            <button type='button' className='btn btn-primary' onClick={() => {
              dispatch(getBook(book))
            }}>
              Read
            </button>
            <button type='button' className='btn btn-danger' disabled={!isLoggedIn} onClick={() => {
              dispatch(deleteBooks(book)).unwrap()
              .then((originalPromiseResult) => {
                console.log(originalPromiseResult);
              })
              .catch((rejectedValueOrSerializedError) => {
                console.log(rejectedValueOrSerializedError);
              })
            }}>
              Delete
            </button>
          </div>
        </li>
  )) : 'no data found';
  return (
    <div>
      <h2>Books List</h2>
      {isLoading ? "loading ..." : <ul className='list-group'>{bookList}</ul>}
    </div>
  );
};

export default BooksList;
