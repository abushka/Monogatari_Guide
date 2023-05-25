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
import classnames from "classnames";

import axios from 'axios';
import { useCookies } from 'react-cookie';

// locales
import { useTranslation } from "react-i18next";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  FormText,
  NavItem,
  NavLink,
  Nav,
  Table,
  TabContent,
  TabPane,
  UncontrolledTooltip,
  UncontrolledCarousel
} from "reactstrap";

import { Icon } from '@iconify/react';

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footer/Footer.js";

const carouselItems = [
  {
    src: require("assets/img/denys.webp"),
    altText: "Slide 1",
    caption: "Big City Life, United States"
  },
  {
    src: require("assets/img/fabien-bazanegue.webp"),
    altText: "Slide 2",
    caption: "Somewhere Beyond, United States"
  },
  {
    src: require("assets/img/mark-finn.webp"),
    altText: "Slide 3",
    caption: "Stocks, United States"
  }
];

let ps = null;

export default function RegisterPage() {
  const [squares1to6, setSquares1to6] = React.useState("");
  const [squares7and8, setSquares7and8] = React.useState("");
  const [fullNameFocus, setFullNameFocus] = React.useState(false);
  // const [emailFocus, setEmailFocus] = React.useState(false);
  const [passwordFocus1, setPasswordFocus1] = React.useState(false);
  const [passwordFocus2, setPasswordFocus2] = React.useState(false);
  
  React.useEffect(() => {
    document.body.classList.toggle("register-page");
    document.documentElement.addEventListener("mousemove", followCursor);
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("register-page");
      document.documentElement.removeEventListener("mousemove", followCursor);
    };
  }, []);
  const followCursor = (event) => {
    let posX = event.clientX - window.innerWidth / 2;
    let posY = event.clientY - window.innerWidth / 6;
    setSquares1to6(
      "perspective(500px) rotateY(" +
        posX * 0.05 +
        "deg) rotateX(" +
        posY * -0.05 +
        "deg)"
    );
    setSquares7and8(
      "perspective(500px) rotateY(" +
        posX * 0.02 +
        "deg) rotateX(" +
        posY * -0.02 +
        "deg)"
    );
  };

  const [tabs, setTabs] = React.useState(1);

  // логика взаимодействия с бекендом
  const [cookies, setCookie] = useCookies(['access', 'refresh', 'user']);

  const [fullName, setFullName] = React.useState('');
  // const [email, setEmail] = React.useState('');
  const [password1, setPassword1] = React.useState('');
  const [password2, setPassword2] = React.useState('');


  const registerUser = async (userData, setCookie) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/auth/registration/', userData);
      console.log(response.data); // Результат ответа от сервера
  
      // Сохранение данных в cookie
      setCookie('access', response.data.access, { expires: new Date(Date.now() + 86400 * 1000) });
      setCookie('refresh', response.data.refresh, { expires: new Date(Date.now() + 86400 * 1000) });
      setCookie('user', JSON.stringify(response.data.user), { expires: new Date(Date.now() + 86400 * 1000) });
  
      // Дополнительные действия после успешной регистрации
    } catch (error) {
      console.error(error);
      // Обработка ошибок
    }
  };
  
  const handleRegister = (event) => {
    event.preventDefault();

    const userData = {
      username: fullName,
      // email: email,
      password1: password1,
      password2: password2
    };

    registerUser(userData, setCookie);
  };
  
  // console.log(cookies)
  
    // ...

  // locales
  const { t } = useTranslation();
  
  return (
    <>
      <IndexNavbar />
      <div className="wrapper">
        <div className="page-header">
          <div className="page-header-image" />
          <div className="content">
            <Container>
              <Row>
                <Col className="offset-lg-0 offset-md-3" lg="5" md="6">
                  <div
                    className="square square-7"
                    id="square7"
                    style={{ transform: squares7and8 }}
                  />
                  <div
                    className="square square-8"
                    id="square8"
                    style={{ transform: squares7and8 }}
                  />
                  <Card className="card-register">
                    <CardHeader>
                      <CardImg alt="..." src={require("assets/img/square-purple-1.webp")} />
                      <CardTitle tag="h4">{t("RegisterPage-register")}</CardTitle>
                    </CardHeader>
                    <CardBody>
                      <Form className="form" onSubmit={handleRegister} autoComplete="off">
                      <InputGroup
                        className={classnames({
                          "input-group-focus": fullNameFocus
                        })}
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-single-02" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder={t("RegisterPage-login")}
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          onFocus={(e) => setFullNameFocus(true)}
                          onBlur={(e) => setFullNameFocus(false)}
                          autoComplete="off"
                          name="full-name" 
                        />
                      </InputGroup>

                      <InputGroup
                        className={classnames({
                          "input-group-focus": passwordFocus1
                        })}
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-lock-circle" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder={t("RegisterPage-password")}
                          type="password"
                          value={password1}
                          onChange={(e) => setPassword1(e.target.value)}
                          onFocus={(e) => setPasswordFocus1(true)}
                          onBlur={(e) => setPasswordFocus1(false)}
                          autoComplete="new-password" 
                          name="password" 
                        />
                      </InputGroup>
                      <InputGroup
                        className={classnames({
                          "input-group-focus": passwordFocus2
                        })}
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-lock-circle" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder={t("RegisterPage-confirm-password")}
                          type="password"
                          value={password2}
                          onChange={(e) => setPassword2(e.target.value)}
                          onFocus={(e) => setPasswordFocus2(true)}
                          onBlur={(e) => setPasswordFocus2(false)}
                          autoComplete="new-password" 
                          name="password" 
                        />
                      </InputGroup>

                      <div className="error">
                        {password1 != '' && password2 != '' && password1 != password2 ? <p>{t("Register-password-mismatch")}</p> : <></> }
                      </div>

                        <FormGroup check className="text-left">
                          <Label check>
                            <Input type="checkbox" />
                            <span className="form-check-sign" />
                            {t("RegisterPage-agree")}
                            <a href="#" onClick={(e) => e.preventDefault()}>
                              {t("RegisterPage-terms-and-conditions")}
                            </a>
                          </Label>
                        </FormGroup>
                      </Form>
                    </CardBody>
                    <CardFooter>
                      <Button
                        className="btn-round"
                        color="primary"
                        size="lg"
                        type="submit"
                        onClick={handleRegister}
                        disabled={!fullName || !password1 || !password2}
                      >
                        {t("RegisterPage-get-started")}
                      </Button>
                    
                    <div className="register-form-br">
                      <p>
                      {t("RegisterPage-or")}
                      </p>
                    </div>
                    <Button
                        className="btn-icon btn-round btn-register"
                        color="github"
                        href="https://github.com/login/oauth/authorize?client_id=79ef11a4147f680234b4&redirect_uri=http://127.0.0.1:8000/api/auth/accounts/github/login/callback/&scope=SCOPE"
                        id="tooltip877922017"
                        size="md-responsive"
                        target="_blank"
                      >
                        <Icon icon="mdi:github" className="button-register" style={{ fontSize: '30px', position: 'relative'}} />
                        <p className="button-register">Войдите через Github</p>
                      </Button>

                      
                      <Button
                        className="btn-icon btn-round"
                        color="facebook"
                        href="https://accounts.google.com/o/oauth2/auth?client_id=939724390993-9fuo2mhp58lgqetmp2hnucrtsfjdqlm0.apps.googleusercontent.com&redirect_uri=http://127.0.0.1:8000/api/auth/accounts/google/login/callback/&scope=profile&response_type=code"
                        id="tooltip877922017"
                        size="md-responsive"
                        target="_blank"
                      >
                        <Icon icon="flat-color-icons:google" className="button-register"  style={{ fontSize: '30px', position: 'relative'}} />
                        <p className="button-register" >Войдите через Google</p>
                      </Button>

                      </CardFooter>
                  </Card>
                </Col>
              </Row>
              <div
                className="square square-1"
                id="square1"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-2"
                id="square2"
                style={{ transform: squares1to6 }}
              />
              {/* <div
                className="square square-3"
                id="square3"
                style={{ transform: squares1to6 }}
              /> */}
              {/* <div
                className="square square-4"
                id="square4"
                style={{ transform: squares1to6 }}
              /> */}
              <div
                className="square square-5"
                id="square5"
                style={{ transform: squares1to6 }}
              />
              {/* <div
                className="square square-6"
                id="square6"
                style={{ transform: squares1to6 }}
              /> */}
            </Container>
          </div>

          <Container className="align-items-center">
            <Row>
              <Col lg="6" md="6">
                <h1 className="profile-title text-left">{t("RegisterPage-section-1-title")}</h1>
                <h5 className="text-on-back">01</h5>
                <p className="profile-description">
                  {t("RegisterPage-section-1-description")} 
                </p>
              </Col>
              <Col className="ml-auto mr-auto" lg="4" md="6">
                <Card className="card-coin card-plain">
                  <CardHeader>
                    <img
                      alt="..."
                      className="img-center img-fluid rounded-circle"
                      src={require("assets/img/mike.webp")}
                    />
                    <h4 className="title">{t("RegisterPage-easy-peasy")}</h4>
                  </CardHeader>
                  <CardBody>
                    <Nav
                      className="nav-tabs-primary justify-content-center"
                      tabs
                    >
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: tabs === 1
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setTabs(1);
                          }}
                          href="#"
                        >
                          {t("RegisterPage-info")}
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: tabs === 2
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setTabs(2);
                          }}
                          href="#"
                        >
                          {t("RegisterPage-possibilities")}
                        </NavLink>
                      </NavItem>
                      {/* <NavItem>
                        <NavLink
                          className={classnames({
                            active: tabs === 3
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setTabs(3);
                          }}
                          href="#"
                        >
                          Send
                        </NavLink>
                      </NavItem> */}
                    </Nav>

                    <TabContent
                      className="tab-subcategories"
                      activeTab={"tab" + tabs}
                    >
                      <TabPane tabId="tab1">
                        <div className="register-info-steps">
                          <p>{t("RegisterPage-register-easy-steps")}</p>
                          <p>{t("RegisterPage-register-basic-data")}</p>
                          <p>• {t("RegisterPage-card-username")}</p>
                          <p>• {t("RegisterPage-card-email")}</p>
                          <p>• {t("RegisterPage-card-password")}</p>
                          <p>• {t("RegisterPage-card-confirm-password")}</p>
                        </div>
                      </TabPane>
                      {/* <TabPane tabId="tab2">
                        <Row>
                          <Label sm="3">Pay to</Label>
                          <Col sm="9">
                            <FormGroup>
                              <Input
                                placeholder="e.g. 1Nasd92348hU984353hfid"
                                type="text"
                              />
                              <FormText color="default" tag="span">
                                Please enter a valid address.
                              </FormText>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Label sm="3">Amount</Label>
                          <Col sm="9">
                            <FormGroup>
                              <Input placeholder="1.587" type="text" />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Button
                          className="btn-simple btn-icon btn-round float-right"
                          color="primary"
                          type="submit"
                        >
                          <i className="tim-icons icon-send" />
                        </Button>
                      </TabPane> */}
                      <TabPane tabId="tab2">
                        <div className="container_div">
                          <div className="child-container">
                            <div className="child-item">
                              <p>• {t("RegisterPage-card-status-viewed")}</p>
                            </div>
                          </div>
                          <div className="child-container">
                            <div className="child-item">
                              <p>• {t("RegisterPage-card-add-certain")}</p>
                            </div>
                          </div>
                          <div className="child-container">
                            <div className="child-item">
                              <p>• {t("RegisterPage-card-comments")}</p>
                            </div>
                          </div>
                          <div className="child-container">
                            <div className="child-item">
                              <p>• {t("RegisterPage-card-chat")}</p>
                            </div>
                          </div>
                          <div className="child-container">
                            <div className="child-item">
                              <p>• {t("RegisterPage-card-newsletter")}</p>
                            </div>
                          </div>
                          <div className="child-container">
                            <div className="child-item">
                              <p>• {t("RegisterPage-card-send-media")}</p>
                            </div>
                          </div>
                        </div>
                      </TabPane>
                    </TabContent>
                  </CardBody>
                </Card>

                

              </Col>
            </Row>
          </Container>
        
        <div className="section">
          <Container>
            <Row className="justify-content-between">
              <Col md="6">
                <Row className="justify-content-between align-items-center">
                  <UncontrolledCarousel items={carouselItems} />
                </Row>
              </Col>
              <Col md="5">
                <h1 className="profile-title text-left">{t("RegisterPage-section-2-title")}</h1>
                <h5 className="text-on-back">02</h5>
                <p className="profile-description text-left">
                {t("RegisterPage-section-2-description")}
                </p>
                {/* <div className="btn-wrapper pt-3">
                  <Button
                    className="btn-simple"
                    color="primary"
                    href="#"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="tim-icons icon-book-bookmark" /> Bookmark
                  </Button>
                  <Button
                    className="btn-simple"
                    color="info"
                    href="#"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="tim-icons icon-bulb-63" /> Check it!
                  </Button>
                </div> */}
              </Col>
            </Row>
          </Container>
          </div>

          {/* <section className="section">
          <Container>
            <Row>
              <Col md="6">
                <Card className="card-plain">
                  <CardHeader>
                    <h1 className="profile-title text-left">Contact</h1>
                    <h5 className="text-on-back">03</h5>
                  </CardHeader>
                  <CardBody>
                    <Form>
                      <Row>
                        <Col md="6">
                          <FormGroup>
                            <label>Your Name</label>
                            <Input defaultValue="Mike" type="text" />
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup>
                            <label>Email address</label>
                            <Input placeholder="mike@email.com" type="email" />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="6">
                          <FormGroup>
                            <label>Phone</label>
                            <Input defaultValue="001-12321345" type="text" />
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup>
                            <label>Company</label>
                            <Input defaultValue="CreativeTim" type="text" />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label>Message</label>
                            <Input placeholder="Hello there!" type="text" />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Button
                        className="btn-round float-right"
                        color="primary"
                        data-placement="right"
                        id="tooltip341148792"
                        type="button"
                      >
                        Send text
                      </Button>
                      <UncontrolledTooltip
                        delay={0}
                        placement="right"
                        target="tooltip341148792"
                      >
                        Can't wait for your message
                      </UncontrolledTooltip>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
              <Col className="ml-auto" md="4">
                <div className="info info-horizontal">
                  <div className="icon icon-primary">
                    <i className="tim-icons icon-square-pin" />
                  </div>
                  <div className="description">
                    <h4 className="info-title">Find us at the office</h4>
                    <p>
                      Bld Mihail Kogalniceanu, nr. 8, <br />
                      7652 Bucharest, <br />
                      Romania
                    </p>
                  </div>
                </div>
                <div className="info info-horizontal">
                  <div className="icon icon-primary">
                    <i className="tim-icons icon-mobile" />
                  </div>
                  <div className="description">
                    <h4 className="info-title">Give us a ring</h4>
                    <p>
                      Michael Jordan <br />
                      +40 762 321 762 <br />
                      Mon - Fri, 8:00-22:00
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
            <div className="register-bg" />
              <div
                className="square square-1"
                id="square1"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-2"
                id="square2"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-3"
                id="square3"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-4"
                id="square4"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-6"
                id="square5"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-7"
                id="square5"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-8"
                id="square6"
                style={{ transform: squares1to6 }}
              />
          </Container>
        </section> */}
        </div>
        <Footer />
      </div>
    </>
  );
}
