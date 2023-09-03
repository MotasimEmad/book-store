import React, { Fragment } from 'react';

const BookInfo = ({getBook}) => {
  return (
    <Fragment>
      <h2>Book Details</h2>
      { getBook === null ? <div className='alert alert-secondary' role='alert'>
        There is no post selected yet. Please select!
      </div> : <div>
        <p className='fw-bold'>Title: { getBook.title }</p>
        <p className='fw-light'>Description: { getBook.description }</p>
        <p className='fst-italic'>Price: { getBook.price }</p>
      </div>}
      
    </Fragment>
  );
};

export default BookInfo;
