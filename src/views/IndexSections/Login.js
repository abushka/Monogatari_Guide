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

import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';

import { GoogleLogin } from 'react-google-login';

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
  UncontrolledTooltip
} from "reactstrap";

import { Icon } from '@iconify/react';

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footer/Footer.js";


export default function LoginPage() {
    const [squares1to6, setSquares1to6] = React.useState("");
    const [squares7and8, setSquares7and8] = React.useState("");
    const [fullNameFocus, setFullNameFocus] = React.useState(false);
    const [passwordFocus, setPasswordFocus] = React.useState(false);
    
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

// return (
//     <div>
//         <button onClick={handleGoogleLogin}>Login with Google</button>
//         <button onClick={handleGitHubLogin}>Login with GitHub</button>
//     </div>
// );

  // логика взаимодействия с бекендом
  const [cookies, setCookie] = useCookies(['access', 'refresh', 'user']);

  const [fullName, setFullName] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();

  useEffect(() => {
      if (cookies.access) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }, [cookies]);

  const loginUser = async (userData, setCookie) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_PROTOCOL}${process.env.REACT_APP_API_HOST}${process.env.REACT_APP_API_PORT}/api/auth/login/`, userData);
      console.log(response.data); // Результат ответа от сервера
  
      // Сохранение данных в cookie
      setCookie('access', response.data.access, { expires: new Date(Date.now() + 86400 * 7 * 1000) });
      setCookie('refresh', response.data.refresh, { expires: new Date(Date.now() + 86400 * 90 * 1000) });
      setCookie('user', JSON.stringify(response.data.user), { expires: new Date(Date.now() + 86400 * 90 * 1000) });
  
      setIsLoggedIn(true);

      history.push('/');
    } catch (error) {
      console.error(error);
      // Обработка ошибок
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




  const handleGoogleLoginSuccess = (response) => {
    // Handle successful Google authentication
    console.log('Google login success:', response);
      // You can send the `response.tokenId` to the server for further processing
    };

    const handleGoogleLoginFailure = (error) => {
      // Handle Google authentication failure
      console.log('Google login failure:', error);
    };
  
  const handleGoogleLogin = async (userData, setCookie) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_PROTOCOL}${process.env.REACT_APP_API_HOST}${process.env.REACT_APP_API_PORT}/api/auth/accounts/google/login/`)
        .then(response => {
            window.location.href = response.data.authorization_url;
        })
        .catch(error => {
            console.error(error);
        });
    } catch (error) {
      console.error(error);
      // Обработка ошибок
    }

  };

  const handleGitHubLogin = () => {
      axios.get('http://localhost:8000/api/auth/accounts/github/login/')
          .then(response => {
              window.location.href = response.data.authorization_url;
          })
          .catch(error => {
              console.error(error);
          });
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
                      <CardTitle tag="h4">{t("Login-signin")}</CardTitle>
                    </CardHeader>
                    <CardBody>
                      <Form className="form" onSubmit={handleLogin} autoComplete="off">
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
                          "input-group-focus": passwordFocus
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
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          onFocus={(e) => setPasswordFocus(true)}
                          onBlur={(e) => setPasswordFocus(false)}
                          autoComplete="new-password" 
                          name="password" 
                        />
                      </InputGroup>

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
                        onClick={handleLogin}
                        disabled={!fullName || !password}
                      >
                        {t("RegisterPage-get-started")}
                      </Button>
                    
                    {/* <div className="register-form-br">
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
                        href="https://accounts.google.com/o/oauth2/auth?client_id=939724390993-9fuo2mhp58lgqetmp2hnucrtsfjdqlm0.apps.googleusercontent.com&redirect_uri=http://127.0.0.1:3000/accounts/profile/&scope=profile&response_type=code"
                        id="tooltip877922017"
                        size="md-responsive"
                        target="_blank"
                        // onClick={handleGoogleLogin}
                      >
                        <Icon icon="flat-color-icons:google" className="button-register"  style={{ fontSize: '30px', position: 'relative'}} />
                        <p className="button-register" >Войдите через Google</p>
                      </Button>
                        
                      <GoogleLogin
                        clientId="939724390993-9fuo2mhp58lgqetmp2hnucrtsfjdqlm0.apps.googleusercontent.com"
                        buttonText="Sign up with Google"
                        uxMode={'redirect'}
                        redirectUri={'http://localhost:8000/api/auth/accounts/google/login/callback/'}
                        onSuccess={handleGoogleLoginSuccess}
                        onFailure={handleGoogleLoginFailure}
                        cookiePolicy={'single_host_origin'}
                      /> */}
                      {/* <GoogleLogin
                        clientId="939724390993-9fuo2mhp58lgqetmp2hnucrtsfjdqlm0.apps.googleusercontent.com"
                        buttonText="Sign up with Google"
                        scope="profile"
                        onSuccess={handleGoogleLoginSuccess}
                        onFailure={handleGoogleLoginFailure}
                        cookiePolicy={'single_host_origin'}
                        responseType={'code'}
                        uxMode={'redirect'}
                        redirectUri={'https://localhost:5000/google_oauth_redirect'}
                      /> */}
                      </CardFooter>
                  </Card>
                </Col>
              </Row>
              {/* <div
                className="square square-1"
                id="square1"
                style={{ transform: squares1to6 }}
              /> */}
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
                className="square square-5"
                id="square5"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-6"
                id="square6"
                style={{ transform: squares1to6 }}
              />
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
