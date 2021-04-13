import React, { useState, useEffect } from "react";
import HomePage from "./pages/HomePage";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ShopPage from "./pages/ShopPage";
import Header from "./components/Header";
import SignInSignUp from "./pages/SignInSignUp";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils.js";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions.js";
import { selectCurrentUser } from "./redux/user/user.selectors.js";
import { createStructuredSelector } from "reselect";
import Checkout from "./pages/checkout/Checkout.js";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      }
      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/shop" component={ShopPage} />
            <Route exact path="/checkout" component={Checkout} />
            <Route
              exact
              path="/signin"
              render={() =>
                this.props.currentUser ? <Redirect to="/" /> : <SignInSignUp />
              }
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
