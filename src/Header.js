import React from 'react';
import pic from "./images/geeks-store-logos_white.png";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import './Header.css';
import { Link } from "react-router-dom";
import { useStateValue } from './StateProvider';
import { auth } from "./firebase";

function Header() {
    const [{ basket, user }, dispatch] = useStateValue();   // Increase value in 

    const handleAuthentication = () => {
        if (user) {
            auth.signOut();
          }
    }

  return (
    <div className='header'>
        <Link to="/">
            <img className='header_logo' src= {pic} alt='geek-store'></img>
        </Link>
        <div className='header_search'>
        <input className='header_searchInput' type='text'></input>
        <SearchIcon className='header_searchIcon' />
        </div>
        <div className='header_nav'>
            <Link to={!user && '/login'}>
                <div onClick={handleAuthentication} className='header_option'>
                    <span className='header_optionLineOne'>
                        Hello, {user?.email || 'Guest'}
                        {/* Hello, {!user ? "Guest" : user.email} */}
                    </span>
                    <span className='header_optionLineTwo'>
                        {user ? 'Sign Out' : 'Sign In'}
                    </span>
                </div>
            </Link>

            <div className='header_option'>
                <span className='header_optionLineOne'>
                    returns
                </span>
                <span className='header_optionLineTwo'>
                    & Orders
                </span>
            </div>

            {/* <div className='header_option'>
                <span className='header_optionLineOne'>
                    Your
                </span>
                <span className='header_optionLineTwo'>
                    Prime
                </span>
            </div> */}

            <Link to="/checkout">
                <div className='header_optionBasket'>
                    <ShoppingBasketIcon />
                    <span className='header_optionLineTwo header_basketCount'>{basket?.length}</span>
                </div>
            </Link>
        </div>
    </div>
  )
}

export default Header;
