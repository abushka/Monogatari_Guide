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
import { Link } from "react-router-dom";
// locales
import { useTranslation } from "react-i18next";
import i18n from "../i18n.js";

// Icons
import { Icon } from '@iconify/react';

// import axios from 'axios';
import { useCookies } from 'react-cookie';
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
  UncontrolledTooltip
} from "reactstrap";

export default function IndexNavbar() {
  const [cookies, setCookie, removeCookie] = useCookies(['access', 'refresh', 'user']);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();

  const [collapseOpen, setCollapseOpen] = useState(false);
  const [collapseOut, setCollapseOut] = useState("");
  const [color, setColor] = useState("navbar-transparent");

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

  // console.log(cookies.access);
  // console.log(cookies.refresh);
  // console.log(cookies.user);


  // const logoutUser = async (userData, setCookie) => {
  //   try {
  //     const response = await axios.post('http://127.0.0.1:8000/api/auth/logout/', userData);
  //     console.log(response.data); // Результат ответа от сервера
  //     // Сохранение данных в cookie
  //     removeCookie('access');
  //     removeCookie('refresh');
  //     removeCookie('user');
  //     setIsLoggedIn(false);
  //     history.push('/');
  //   } catch (error) {
  //     console.error(error);
  //     // Обработка ошибок
  //   }
  // };

  // const userData = {

  // }

  useEffect(() => {
    if (cookies.access) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [cookies]);


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
            {/* <NavItem className="p-0">
              <NavLink
                data-placement="bottom"
                href="https://twitter.com/abushka_404"
                rel="noopener noreferrer"
                target="_blank"
                title={t("IndexNavbar-Subscribe-Twitter")} // Подпишись на мой Twitter
              >
                <Icon icon="mdi:twitter" style={{ fontSize: '20px'}} />
                <p className="d-lg-none d-xl-none">Twitter</p>
              </NavLink>
            </NavItem> */}

            <NavItem className="p-0">
              <NavLink
                data-placement="bottom"
                href="https://t.me/monogatari_poryadok"
                rel="noopener noreferrer"
                target="_blank"
                title={t("IndexNavbar-Subscribe-Telegram")} // Подпишись на мой Telegram канал
              >
                <Icon icon="ic:baseline-telegram" style={{ fontSize: '20px'}} />
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
                <Icon icon="mdi:instagram" style={{ fontSize: '20px'}} />
                <p className="d-lg-none d-xl-none">Instagram</p>
              </NavLink>
            </NavItem>


            
            {/* <NavItem>
              <Button
                className="nav-link d-none d-lg-block"
                color="default"
                target="_blank"
                href="https://t.me/YaJ75"
              >
                <Icon icon="material-symbols:rocket-launch" style={{ fontSize: '20px'}} /> {t("IndexNavbar-Feedback")}
              </Button>
            </NavItem> */}

            {/* <UncontrolledDropdown nav>
              <DropdownToggle
                caret
                color="default"
                data-toggle="dropdown"
                href="#"
                nav
                onClick={(e) => e.preventDefault()}
              >
                
                <Icon icon="material-symbols:format-list-bulleted" style={{ fontSize: '20px', marginRight: '8px'}}/> {t("IndexNavbar-Pages")}
              </DropdownToggle>

              <DropdownMenu className="dropdown-with-icons">

                <DropdownItem tag={Link} to="/">
                    <Icon icon="ic:baseline-home" style={{ fontSize: '20px', marginRight: '13px'}}/>
                    {t("IndexNavbar-Home")}
                </DropdownItem>
                <DropdownItem tag={Link} to="/register">
                    <Icon icon="mdi:register" style={{ fontSize: '20px', marginRight: '13px'}}/>
                    {t("IndexNavbar-Register-Page")}
                </DropdownItem>

              </DropdownMenu>
            </UncontrolledDropdown> */}

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
                <Icon icon="icon-park-solid:people" style={{ fontSize: '20px', marginRight: '5px'}} />
               {t("IndexNavbar-Profile")} 
              </>
               : <>
               <Icon icon="teenyicons:signin-outline" style={{ fontSize: '20px', marginRight: '5px'}} />
               {/* {t("IndexNavbar-user")} */}
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
              <DropdownItem tag={Link} to="/login">
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
                
                <Icon icon="material-symbols:language" style={{ fontSize: '20px', marginRight: '13px' }} /> {t("IndexNavbar-Language")}
              </DropdownToggle>

              <DropdownMenu className="dropdown-with-icons">
                <DropdownItem onClick={() => changeLanguage("en")}>
                  <Icon icon="fxemoji:greatbritainflag" style={{ fontSize: '20px' }} /> English
                </DropdownItem>
                <DropdownItem onClick={() => changeLanguage("ru")}>
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
    </Navbar>
  );
}
