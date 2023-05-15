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

// locales
import { useTranslation } from "react-i18next";

import { Icon } from '@iconify/react';

import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md="3">
            <h1 className="title">Fanat•</h1>
          </Col>
          <Col md="3">
            {/* <Nav>
              <NavItem>
                <NavLink to="/" tag={Link}>
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/landing-page" tag={Link}>
                  Landing
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/register-page" tag={Link}>
                  Register
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/profile-page" tag={Link}>
                  Profile
                </NavLink>
              </NavItem>
            </Nav> */}
          </Col>
          <Col md="3">
            <Nav>
              <NavItem>
                <NavLink href="https://t.me/YaJ75" target="_blank">
                  {t("Footer-contact-us")}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/abushka" target="_blank">
                  {t("Footer-about-us")}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://blog.astafeev.dev" target="_blank">
                  {t("Footer-blog")}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://opensource.org/licenses/MIT" target="_blank">
                  {t("Footer-Licence")}
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
          <Col md="3">
            <h3 className="title">{t("Footer-follow-us")}:</h3>
            <div className="btn-wrapper profile">
              <Button
                className="btn-icon btn-neutral btn-round btn-simple"
                color="default"
                href="https://twitter.com/abushka_404"
                id="tooltip622135962"
                target="_blank"
              >
                
                <Icon icon="mdi:twitter" style={{ fontSize: '20px', position: 'relative', top: '7px'}} />
              </Button>
              <UncontrolledTooltip target="tooltip622135962">
                {t("Footer-follow-us")}
              </UncontrolledTooltip>
              <Button
                className="btn-icon btn-neutral btn-round btn-simple"
                color="default"
                href="https://www.instagram.com/abushka_404"
                id="tooltip230450801"
                target="_blank"
              >
                <Icon icon="mdi:instagram" style={{ fontSize: '20px', position: 'relative', top: '7px'}} />
              </Button>
              <UncontrolledTooltip target="tooltip230450801">
                {t("Footer-like-us")}
              </UncontrolledTooltip>
              <Button
                className="btn-icon btn-neutral btn-round btn-simple"
                color="default"
                href="https://t.me/monogatari_poryadok"
                id="tooltip318450378"
                target="_blank"
              >
                <Icon icon="ic:baseline-telegram" style={{ fontSize: '22px', position: 'relative', top: '6px'}} />
              </Button>
              <UncontrolledTooltip target="tooltip318450378">
                {t("Footer-follow-us")}
              </UncontrolledTooltip>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
