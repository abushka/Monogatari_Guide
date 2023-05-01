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
import { Link } from "react-router-dom";
// locales
import { useTranslation } from "react-i18next";
import i18n from "../i18n.js";

// Icons
import { Icon } from '@iconify/react';

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
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const [collapseOut, setCollapseOut] = React.useState("");
  const [color, setColor] = React.useState("navbar-transparent");
  React.useEffect(() => {
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

  return (
    <Navbar className={"fixed-top " + color} color-on-scroll="100" expand="lg">
      <Container>
        <div className="navbar-translate">
          <NavbarBrand to="/" tag={Link} id="navbar-brand">
            <span>Fanat•</span>
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
                  <i className="tim-icons icon-simple-remove" />
                </button>
              </Col>
            </Row>
          </div>
          <Nav navbar>
            <NavItem className="p-0">
              <NavLink
                data-placement="bottom"
                href="https://twitter.com/abushka_404"
                rel="noopener noreferrer"
                target="_blank"
                title={t("IndexNavbar-Subscribe-Twitter")} // Подпишись на мой Twitter
              >
                <i className="fab fa-twitter" />
                <p className="d-lg-none d-xl-none">Twitter</p>
              </NavLink>
            </NavItem>
            <NavItem className="p-0">
              <NavLink
                data-placement="bottom"
                href="https://t.me/monogatari_poryadok"
                rel="noopener noreferrer"
                target="_blank"
                title={t("IndexNavbar-Subscribe-Telegram")} // Подпишись на мой Telegram канал
              >
                <i className="fab fa-telegram" />
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
                <i className="fab fa-instagram" />
                <p className="d-lg-none d-xl-none">Instagram</p>
              </NavLink>
            </NavItem>


            <NavItem>
              <Button
                className="nav-link d-none d-lg-block"
                color="primary"
                onClick={scrollToSuggestion}
              >
                <i className="tim-icons icon-bulb-63" /> {t("IndexNavbar-Give-Suggestion")}
              </Button> 
            </NavItem>
            <NavItem>
              <Button
                className="nav-link d-none d-lg-block"
                color="default"
                target="_blank"
                href="https://t.me/YaJ75"
              >
                <i className="tim-icons icon-spaceship" /> {t("IndexNavbar-Feedback")}
              </Button>
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
                <i className="fa fa-cogs d-lg-none d-xl-none" />
                <Icon icon="material-symbols:language" style={{ fontSize: '20px' }} />
                {t("IndexNavbar-Language")}
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

          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}
