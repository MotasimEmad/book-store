import React, { Fragment, useEffect } from 'react';
import BookInfo from './BookInfo';
import BooksList from './BooksList';

import './book.css';
import { useDispatch, useSelector } from 'react-redux';
import { getBooks } from '../../redux/bookSlice';


const PostContainer = () => {
const { isLoggedIn } = useSelector((state) => state.auth);
  const { isLoading, books, getBook } = useSelector((state) => state.book);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);
  return (
    <Fragment>
      <hr className='my-5' />
      <div className='row'>
        <div className='col'>
          <BooksList isLoading={isLoading} books={books} isLoggedIn={isLoggedIn} />
        </div>
        <div className='col side-line'>
          <BookInfo getBook={getBook} />
        </div>
      </div>
    </Fragment>
  );
};

export default PostContainer;
