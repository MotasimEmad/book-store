import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logInOut } from '../redux/authSlice';

const Header = () => {
  const handleAuth = () => {
    dispatch(logInOut());
  }
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { error } = useSelector((state) => state.book); 
  return (
    <div>
      {error && <div class="alert alert-danger mb-0" role="alert">
        {error}
      </div>}
      <nav className='navbar navbar-dark bg-dark'>
      <span className='navbar-brand mb-0 h1'>My Books</span>

      <button className='btn btn-outline-primary' type='submit' onClick={handleAuth}>
        {isLoggedIn ? 'Log out' : 'Log In'}
      </button>
    </nav>
    </div>
  );
};

export default Header;
