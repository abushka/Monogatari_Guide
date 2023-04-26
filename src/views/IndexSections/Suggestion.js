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
// reactstrap components
import { Button, Container, Row, Col, UncontrolledTooltip } from "reactstrap";

export default function Suggestion() {
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
              Вам нравится это руководство по Циклу Историй ?
            </h2>
            <h4 className="description">
            Если у вас есть идеи, предложения, советы или вы можете помочь проекту, подкинув какой-то материал - пишите в телеграм.
            Если увидели ошибку в материале - так же можете написать в телеграм.
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
              Спасибо что помогаете нам!
            </h3>
            <h4 className="mb-0 font-weight-light">
              Можем связаться на любой из этих платформ.
            </h4>
          </Col>
          <Col className="text-lg-center btn-wrapper" lg="6">
            <Button
              className="btn-icon btn-round"
              color="twitter"
              id="twitter"
              size="lg"
            >
              <i className="fab fa-twitter" />
            </Button>
            <UncontrolledTooltip delay={0} target="twitter">
              Tweet!
            </UncontrolledTooltip>
            <Button
              className="btn-icon btn-round"
              color="danger"
              id="instagram"
              size="lg"
            >
              <i className="fab fa-instagram" />
            </Button>
            <UncontrolledTooltip delay={0} target="instagram">
              Подпишись!
            </UncontrolledTooltip>
            <Button
              className="btn-icon btn-round"
              color="github"
              href="https://github.com/abushka"
              id="tooltip877922017"
              size="lg"
              target="_blank"
            >
              <i className="fab fa-github" />
            </Button>
            <UncontrolledTooltip delay={0} target="tooltip877922017">
              Звёздочка на Github
            </UncontrolledTooltip>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
