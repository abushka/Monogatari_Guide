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

// reactstrap components
import { Button, Container, Row, Col, UncontrolledTooltip } from "reactstrap";

export default function Suggestion() {
  const { t } = useTranslation();

  return (
    <div
      className="section section-download"
      data-background-color="black"
      id="suggestion-section"
    >
      <img alt="..." className="path" src={require("assets/img/path1.png")} />
      <Container>
        <Row className="justify-content-md-center">
          <Col className="text-center" lg="8" md="12">
            <h2 className="title">
              {t("Suggestion-title")}
            </h2>
            <h4 className="description">
            {t("Suggestion-description")}
            </h4>
          </Col>
          <Col className="text-center" lg="8" md="12">
            <Button
              className="btn-round"
              color="info"
              target="_blank"
              href="https://t.me/YaJ75"
              role="button"
              size="lg"
            >
            Telegram
            </Button>
          </Col>
        </Row>
        <br />
        <br />
        <br />
        <br />
        <br />
        <Row className="row-grid align-items-center my-md">
          <Col lg="6">
            <h3 className="text-info font-weight-light mb-2">
              {t("Suggestion-ty-for-help")}
            </h3>
            <h4 className="mb-0 font-weight-light">
              {t("Suggestion-communication-methods")}
            </h4>
          </Col>
          <Col className="text-lg-center btn-wrapper" lg="6">
            <Button
              className="btn-icon btn-round"
              color="telegram"
              href="https://t.me/YaJ75"
              id="twitter"
              size="lg"
              target="_blank"
            >
              <Icon icon="ic:baseline-telegram" style={{ fontSize: '38px', position: 'relative', top: '10px', left: '1px'}} />
            </Button>
            <UncontrolledTooltip target="twitter">
              {t("Suggestion-Telegram")}
            </UncontrolledTooltip>
            <Button
              className="btn-icon btn-round"
              color="danger"
              href="https://instagram.com/abushka_404"
              id="instagram"
              size="lg"
              target="_blank"
            >
              <Icon icon="mdi:instagram" style={{ fontSize: '35px', position: 'relative', top: '12px'}} />
            </Button>
            <UncontrolledTooltip target="instagram">
              {t("Suggestion-subscribe")}
            </UncontrolledTooltip>
            <Button
              className="btn-icon btn-round"
              color="github"
              href="https://github.com/abushka"
              id="tooltip877922017"
              size="lg"
              target="_blank"
            >
              <Icon icon="mdi:github" style={{ fontSize: '35px', position: 'relative', top: '12px'}} />
            </Button>
            <UncontrolledTooltip target="tooltip877922017">
              {t("Suggestion-star-on-github")}
            </UncontrolledTooltip>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
