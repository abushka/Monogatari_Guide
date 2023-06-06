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
import React, { useState, useEffect, useRef } from "react";
import classnames from "classnames";
import { Icon } from '@iconify/react';


import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Label,
  FormGroup,
  Form,
  Input,
  FormText,
  NavItem,
  NavLink,
  Nav,
  Table,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  UncontrolledCarousel
} from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footer/Footer.js";

let ps = null;

export default function ProfilePage() {
  const [tabs, setTabs] = React.useState(1);
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    document.body.classList.toggle("profile-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.documentElement.className += " perfect-scrollbar-off";
        document.documentElement.classList.remove("perfect-scrollbar-on");
      }
      document.body.classList.toggle("profile-page");
    };
  }, []);


  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileRemove = (e) => {
    setSelectedFile(null);
    e.preventDefault();
    // Сбрасываем значение поля выбора файла
    fileInputRef.current.value = '';
  };


    // логика взаимодействия с бекендом
    const [cookies, setCookie] = useCookies(['access', 'refresh', 'user']);

    
    const [user, setUser] = React.useState('');
    const [password1, setPassword1] = React.useState('');
    const [password2, setPassword2] = React.useState('');
  
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const history = useHistory();
  
    // useEffect(() => {
    //     if (cookies.access && cookies.refresh) {
    //       setIsLoggedIn(true);
    //     } else {
    //       setIsLoggedIn(false);
    //     }
    //   }, [cookies]);

    useEffect(() => {
      const tokenAccess = {
        Bearer: cookies.access
      };
    
      const UserProfile = async (tokenAccess) => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_PROTOCOL}${process.env.REACT_APP_API_HOST}/api/auth/user/`, {
            headers: {
              Authorization: `Bearer ${cookies.access}`
            }
          });
          console.log(response.data); // Результат ответа от сервера
      
          // Сохранение данных в cookie
          setUser(response.data);
          // setCookie('refresh', response.data.refresh, { expires: new Date(Date.now() + 86400 * 90 * 1000) });
          // setCookie('user', JSON.stringify(response.data.user), { expires: new Date(Date.now() + 86400 * 90 * 1000) });
      
          // setIsLoggedIn(true);
    
          // history.push('/');
        } catch (error) {
          console.error(error);
          // Обработка ошибок
        }
      };

      if (cookies.access) {
        UserProfile(tokenAccess)
      }
    }, [])



    
    // const handleChangeProfile = (event) => {
    //   event.preventDefault();
  
    //   const userData = {
    //     username: fullName,
    //     password1: password1,
    //     password2: password2
    //   };
  
    //   ChangeProfile(userData, setCookie);
    // };

  return (
    <>
      <IndexNavbar />
      <div className="wrapper">
        <div className="page-header">
          <img
            alt="..."
            className="dots"
            src={require("assets/img/dots.png")}
          />
          <img
            alt="..."
            className="path"
            src={require("assets/img/path4.png")}
          />
          <Container className="align-items-center">
            <Row>
              <Col lg="6" md="6">
                <h1 className="text-left">{user.username}</h1>
              </Col>
              <Col className="ml-auto mr-auto" lg="4" md="6">
                <Card className="card-coin card-plain">
                  <CardHeader>
                    <img
                      alt="..."
                      className="img-center img-fluid rounded-circle"
                      src={require("assets/img/mike.jpg")}
                    />
                    {/* <h4 className="title">Профиль</h4> */}
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
                          О профиле
                        </NavLink>
                      </NavItem>
                    </Nav>
                    <TabContent
                      className="tab-subcategories"
                      activeTab={"tab" + tabs}
                    >
                      <TabPane tabId="tab1">
                        <Table className="tablesorter" responsive>
                          <thead className="text-primary">
                            <tr>
                              <th className="header">Ваш юзернейм: {user.username}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Ваш id: {user.id}</td>
                            </tr>
                            <tr>
                              <td>Ваша почта: {user.email}</td>
                            </tr>
                            <tr>
                              <td>Ваша дата присоединения: {user.date_joined}</td>
                            </tr>
                            <tr>
                              <td>Ваш github account: {user.github_account}</td>
                            </tr>
                            <tr>
                              <td>Ваш язык: {user.language}</td>
                            </tr>
                            <tr>
                              <td>Вы последний раз заходили: {user.last_login}</td>
                            </tr>
                          </tbody>
                        </Table>
                      </TabPane>
                    </TabContent>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
        <section className="section">
          <Container>
            <Row>
              <Col md="6">
                <Card className="card-plain">
                  <CardHeader>
                    <h1 className="profile-title text-left">Изменить профиль</h1>
                    <h5 className="text-on-back">02</h5>
                  </CardHeader>
                  <CardBody>
                    <Form>
                      <Row>
                        <Col md="6">
                          <FormGroup>
                            <label>Username</label>
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
                        {/* <Col md="6">
                          <FormGroup>
                            <label>Password</label>
                            <Input defaultValue="001-12321345" type="text" />
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup>
                            <label>Password</label>
                            <Input defaultValue="CreativeTim" type="text" />
                          </FormGroup>
                        </Col> */}
                      </Row>
                      <Row>
                        <Col md="12">
                        <FormGroup>
                        <div className="input_container">
                          <input type="file" id="fileUpload" onChange={handleFileChange} ref={fileInputRef} />
                          {selectedFile && (
                            <button className="remove-file btn-primary" onClick={handleFileRemove}>
                              Удалить
                            </button>
                          )}
                        </div>
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
                        Изменить
                      </Button>
                      <UncontrolledTooltip
                        delay={0}
                        placement="right"
                        target="tooltip341148792"
                      >
                        Отправить для изменения
                      </UncontrolledTooltip>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
        <Footer />
      </div>
    </>
  );
}
