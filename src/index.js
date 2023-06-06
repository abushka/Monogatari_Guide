/*!

=========================================================
* BLK Design System React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import ScrollToTop from "variables/ScrollToTop";

import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss";
import "assets/demo/demo.css";

import Index from "views/Index.js";
// import LandingPage from "views/examples/LandingPage.js";
import RegisterPage from "views/IndexSections/RegisterPage.js";
import LoginPage from "views/IndexSections/Login.js";
import ProfilePage from "views/IndexSections/ProfilePage.js"
// import ProfilePage from "views/examples/ProfilePage.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <ScrollToTop />
    <Switch>
      <Route exact path="/register" render={(props) => <RegisterPage {...props} />} />
      <Route exact path="/login" render={(props) => <LoginPage {...props} />} />
      <Route exact path="/profile" render={(props) => <ProfilePage {...props} />} />
      <Route path="/" render={(props) => <Index {...props} />} />
      {/* <Redirect exact from="/register" to="/register" /> */}
    </Switch>
  </BrowserRouter>
);
