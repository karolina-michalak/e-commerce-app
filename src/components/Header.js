import React from "react";
import { Link } from "react-router-dom";
import "../scss/Header.styles.scss";
import { ReactComponent as Logo } from "../assets/crown.svg";
import { auth } from "../firebase/firebase.utils.js";
import { connect } from "react-redux";
import CartIcon from "./CartIcon";
import CartDropdown from "./CartDropdown";
import { createStructuredSelector } from "reselect";
import { selectCartHidden } from "../redux/cart/cart.selectors.js";
import { selectCurrentUser } from "../redux/user/user.selectors.js";

const Header = ({ currentUser, hidden }) => {
  return (
    <div className="header">
      <Link className="logo-container" to="/">
        <Logo className="logo" />
      </Link>
      <div className="options">
        <Link className="option" to="/shop">
          SHOP
        </Link>

        <Link className="option" to="/shop">
          {" "}
          CONTACT
        </Link>
        {currentUser ? (
          <div
            className="option"
            onClick={() => {
              auth.signOut();
            }}
          >
            sign out
          </div>
        ) : (
          <Link className="option" to="/signin">
            sign in
          </Link>
        )}
        <CartIcon />
      </div>
      {hidden ? null : <CartDropdown />}{" "}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});

export default connect(mapStateToProps)(Header);
