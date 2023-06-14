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
import React, {useState, useEffect} from "react";
import classnames from "classnames";

import googleLogo from "../../assets/img/google.svg";
import githubLogo from "../../assets/img/github.svg";

import { Link } from "react-router-dom";
// locales
import { useTranslation } from "react-i18next";
import i18n from "../i18n.js";

// Icons
import { Icon } from '@iconify/react';

import axios from 'axios';
import { UserProfile } from "variables/UserProfile";

import { useCookies } from 'react-cookie';
import authStore from "variables/AuthStore.js";

import { useHistory } from 'react-router-dom';


// reactstrap components
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  FormGroup,
  Modal,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  UncontrolledTooltip,
} from "reactstrap";

export default function IndexNavbar({ user, setUser}) {
  const [cookies, setCookie, removeCookie] = useCookies(['access', 'refresh', 'user']);
  const [fullName, setFullName] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [user, setUser] = useState('');

  const history = useHistory();

  const [collapseOpen, setCollapseOpen] = useState(false);
  const [collapseOut, setCollapseOut] = useState("");
  const [color, setColor] = useState("navbar-transparent");

  const [formModal, setFormModal] = useState(false);
  const [loginFocus, setLoginFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);


  useEffect(() => {
    window.addEventListener("scroll", changeColor);
    return function cleanup() {
      window.removeEventListener("scroll", changeColor);
    };
  }, []);
  const changeColor = () => {
    if (
      document.documentElement.scrollTop > 99 ||
      document.body.scrollTop > 99
    ) {
      setColor("bg-info");
    } else if (
      document.documentElement.scrollTop < 100 ||
      document.body.scrollTop < 100
    ) {
      setColor("navbar-transparent");
    }
  };
  const toggleCollapse = () => {
    document.documentElement.classList.toggle("nav-open");
    setCollapseOpen(!collapseOpen);
  };
  const onCollapseExiting = () => {
    setCollapseOut("collapsing-out");
  };
  const onCollapseExited = () => {
    setCollapseOut("");
  };
  const scrollToSuggestion = () => {
    document
      .getElementById("suggestion-section")
      .scrollIntoView({ behavior: "smooth" });
  };


  // locales
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const { t } = useTranslation();

  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  useEffect(() => {
    if (cookies.access) {
      UserLanguageChange(selectedLanguage);
    }
  }, [selectedLanguage]);

  const UserLanguageChange = async (selectedLanguage) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_PROTOCOL}${process.env.REACT_APP_API_HOST}/api/auth/user/change-language/`, 
      {
        language: selectedLanguage},
      {
        headers: {
          Authorization: `Bearer ${cookies.access}`
        }
      });

      console.log(selectedLanguage)
      console.log(response.data); 
  
    } catch (error) {
      console.error(error);
      // Обработка ошибок
    }
  };



    useEffect(() => {
      if (cookies.access && cookies.refresh) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }, [cookies]);
  
    const loginUser = async (userData, setCookie) => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_PROTOCOL}${process.env.REACT_APP_API_HOST}/api/auth/login/`, userData);
        console.log(response.data); 
    
        // Сохранение данных в cookie
        setCookie('access', response.data.access, { expires: new Date(Date.now() + 86400 * 7 * 1000) });
        setCookie('refresh', response.data.refresh, { expires: new Date(Date.now() + 86400 * 90 * 1000) });
        setCookie('user', JSON.stringify(response.data.user), { expires: new Date(Date.now() + 86400 * 90 * 1000) });
    
        setIsLoggedIn(true);
  
        window.location.href = '/';
      } catch (error) {
        console.error(error);
      }
    };
    
    const handleLogin = (event) => {
      event.preventDefault();
  
      const userData = {
        username: fullName,
        password: password
      };
  
      loginUser(userData, setCookie);
    };




  const handleLogout = () => {
    if (cookies.access) {
      removeCookie('access');
    }
    if (cookies.refresh) {
      removeCookie('refresh');
    }
    if (cookies.user) {
      removeCookie('user');
    }
    setIsLoggedIn(false);
    window.location.href = '/';
  };


  useEffect(() => {
    authStore.setAccessToken(cookies.access);
  }, [cookies.access]);

  useEffect(() => {
    if (cookies.access) {
      UserProfile(setUser);
    }
  }, []);

  

  return (
    <Navbar className={"fixed-top " + color} color-on-scroll="100" expand="lg">
      <Container>
        <div className="navbar-translate">
          <NavbarBrand to="/" tag={Link} id="navbar-brand">
            <span>Fanat • </span>
            Monogatari Series Guide
          </NavbarBrand>
          <UncontrolledTooltip placement="bottom" target="navbar-brand">
            Designed and Coded by Abushka 
          </UncontrolledTooltip>
          <button
            aria-expanded={collapseOpen}
            className="navbar-toggler navbar-toggler"
            onClick={toggleCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className={"justify-content-end " + collapseOut}
          navbar
          isOpen={collapseOpen}
          onExiting={onCollapseExiting}
          onExited={onCollapseExited}
        >
          <div className="navbar-collapse-header">
            <Row>
              <Col className="collapse-brand" xs="6">
                <a href="#" onClick={(e) => e.preventDefault()}>
                  Fanat•Monogatari Series Guide
                </a>
              </Col>
              <Col className="collapse-close text-right" xs="6">
                <button
                  aria-expanded={collapseOpen}
                  className="navbar-toggler"
                  onClick={toggleCollapse}
                >
                  <Icon icon="ph:x-bold" style={{ fontSize: '30px'}} /> 
                </button>
              </Col>
            </Row>
          </div>
          <Nav navbar>

            <NavItem className="p-0">
              <NavLink
                data-placement="bottom"
                href="https://t.me/monogatari_poryadok"
                rel="noopener noreferrer"
                target="_blank"
                title={t("IndexNavbar-Subscribe-Telegram")} // Подпишись на мой Telegram канал
              >
                <Icon icon="ic:baseline-telegram" style={{ fontSize: '28px'}} />
                <p className="d-lg-none d-xl-none">Telegram</p>
              </NavLink>
            </NavItem>
            <NavItem className="p-0">
              <NavLink
                data-placement="bottom"
                href="https://www.instagram.com/abushka_404"
                rel="noopener noreferrer"
                target="_blank"
                title={t("IndexNavbar-Subscribe-Instagram")} // Подпишись на мой Instagram
              >
                <Icon icon="mdi:instagram" style={{ fontSize: '28px'}} />
                <p className="d-lg-none d-xl-none">Instagram</p>
              </NavLink>
            </NavItem>


            <UncontrolledDropdown nav>
            <DropdownToggle
              caret
              color="default"
              data-toggle="dropdown"
              href="#"
              nav
              onClick={(e) => e.preventDefault()}
            >

              {isLoggedIn ? <>
                {user.image_thumbnail ? 
                <img alt="user_avatar" src={user.image_thumbnail} className="index-navbar-user-image"/>
                : 
                <Icon icon="icon-park-solid:people" style={{ fontSize: '20px', marginRight: '5px'}} />
                }
                
               {t("IndexNavbar-Profile")} 
              </>
               : <>
               <Icon icon="teenyicons:signin-outline" style={{ fontSize: '20px', marginRight: '5px'}} />
               {t("IndexNavbar-sign-in")}
               </>}
               
            </DropdownToggle>

            <DropdownMenu className="dropdown-with-icons">

              <DropdownItem tag={Link} to="/">
                    <Icon icon="ic:baseline-home" style={{ fontSize: '20px', marginRight: '13px'}}/>
                    {t("IndexNavbar-Home")}
              </DropdownItem>

            {isLoggedIn ?
              <DropdownItem tag={Link} to="/profile">
                <Icon icon="icon-park-solid:people" style={{ fontSize: '20px', marginRight: '11px' }} /> {t("IndexNavbar-Profile")}
              </DropdownItem>
               : <></>}

            {isLoggedIn ?<></> : 
              <DropdownItem tag={Link} to="/register">
                <Icon icon="mdi:register" style={{ fontSize: '20px', marginRight: '11px' }} /> {t("IndexNavbar-Registration")}
              </DropdownItem>
              }

            {isLoggedIn ?<></> : 
              <DropdownItem onClick={() => {
                setFormModal(true); 
                // toggleCollapse();
                }}>
                <Icon icon="fluent-mdl2:signin" style={{ fontSize: '20px', marginRight: '13px' }} /> {t("IndexNavbar-Signin")}
              </DropdownItem>
              }

            {isLoggedIn ? 
              <DropdownItem onClick={handleLogout} to="/logout">
                <Icon icon="mdi:exit-run" style={{ fontSize: '20px', marginRight: '13px' }} /> {t("IndexNavbar-Logout")}
              </DropdownItem>
              : <></>}

            </DropdownMenu>
          </UncontrolledDropdown>


            <UncontrolledDropdown nav>
              <DropdownToggle
                caret
                color="default"
                data-toggle="dropdown"
                href="#"
                nav
                onClick={(e) => e.preventDefault()}
              >
                
                <Icon icon="material-symbols:language" style={{ fontSize: '20px', marginTop: '-4px' }} /> {t("IndexNavbar-Language")}
              </DropdownToggle>

              <DropdownMenu className="dropdown-with-icons">
                <DropdownItem onClick={() => {
                                changeLanguage("en");
                                handleLanguageChange("en");
                              }}>
                  <Icon icon="fxemoji:greatbritainflag" style={{ fontSize: '20px' }} /> English
                </DropdownItem>
                <DropdownItem onClick={() => {
                                changeLanguage("ru");
                                handleLanguageChange("ru");
                              }}>
                  <Icon icon="openmoji:flag-russia" style={{ fontSize: '20px' }} /> Русский
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

            <NavItem>
              <Button
                className="nav-link d-none d-lg-block"
                color="primary"
                onClick={scrollToSuggestion}
              >
                <Icon icon="tabler:bulb" style={{ fontSize: '20px', position: 'relative', top: '-2px'}} /> {t("IndexNavbar-Give-Suggestion")}
              </Button> 
            </NavItem>

          </Nav>
        </Collapse>
      </Container>


      {/* Start Form Modal */}
      <Modal
            modalClassName="modal-black"
            isOpen={formModal}
            toggle={() => setFormModal(false)}
          >
            <div className="modal-header justify-content-center">
              <button className="close" onClick={() => setFormModal(false)}>
                <i className="tim-icons icon-simple-remove text-white" />
              </button>
              <div className="text-muted text-center ml-auto mr-auto">
                {/* <h3 className="mb-0">Sign in with</h3> */}
                <h3 className="mb-0">Sign in</h3>
              </div>
            </div>
            <div className="modal-body">
              {/* <div className="btn-wrapper text-center">
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="#"
                  onClick={(e) => e.preventDefault()}
                >
                  <img alt="..." src={githubLogo} />
                </Button>
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="#"
                  onClick={(e) => e.preventDefault()}
                >
                  <img alt="..." src={googleLogo} />
                </Button>
              </div>
              <div className="text-center text-muted mb-4 mt-3">
                <small>Or sign in with credentials</small>
              </div> */}
              <Form role="form" onSubmit={handleLogin} autoComplete="off">
                <FormGroup className="mb-3">
                  <InputGroup
                    className={classnames("input-group-alternative", {
                      "input-group-focus": loginFocus
                    })}
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <Icon icon={'wpf:name'} />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder={t("RegisterPage-login")}
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      autoComplete="off"
                      name="full-name" 
                      onFocus={(e) => setLoginFocus(true)}
                      onBlur={(e) => setLoginFocus(false)}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup
                    className={classnames("input-group-alternative", {
                      "input-group-focus": passwordFocus
                    })}
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <Icon icon={'teenyicons:key-solid'} />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={t("RegisterPage-password")}
                      type="password"
                      onFocus={(e) => setPasswordFocus(true)}
                      onBlur={(e) => setPasswordFocus(false)}
                      autoComplete="new-password" 
                      name="password" 
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup check className="mt-3">
                  {/* <Label check>
                    <Input defaultChecked type="checkbox" />
                    <span className="form-check-sign" />
                    Remember me!
                  </Label> */}
                </FormGroup>
                <div className="text-center">
                  <Button className="my-4" color="primary" 
                  // type="button"
                  type="submit"
                  onClick={handleLogin}
                  disabled={!fullName || !password}
                  >
                    Sign in
                  </Button>
                </div>
              </Form>
            </div>
          </Modal>
          {/* End Form Modal */}

    </Navbar>

    
  );
}
