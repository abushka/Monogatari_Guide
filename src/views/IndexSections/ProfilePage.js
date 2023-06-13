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
import authStore from "variables/AuthStore.js";


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
  useEffect(() => {
    // if (navigator.platform.indexOf("Win") > -1) {
    //   document.documentElement.className += " perfect-scrollbar-on";
    //   document.documentElement.classList.remove("perfect-scrollbar-off");
    //   let tables = document.querySelectorAll(".table-responsive");
    //   for (let i = 0; i < tables.length; i++) {
    //     ps = new PerfectScrollbar(tables[i]);
    //   }
    // }
    document.body.classList.toggle("profile-page");
    // // Specify how to clean up after this effect:
    // return function cleanup() {
    //   if (navigator.platform.indexOf("Win") > -1) {
    //     ps.destroy();
    //     document.documentElement.className += " perfect-scrollbar-off";
    //     document.documentElement.classList.remove("perfect-scrollbar-on");
    //   }
    //   document.body.classList.toggle("profile-page");
    // };
  }, []);


  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedCardFile, setSelectedCardFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileChangeAvatar = async (event) => {
    const file = event.target.files[0];
    setSelectedCardFile(file);
  
    const userData = {
      image: file
    };
  
    await ChangeProfile(userData);
  };

  const handleFileRemove = (e) => {
    setSelectedFile(null);
    e.preventDefault();
    fileInputRef.current.value = '';
  };


    // логика взаимодействия с бекендом
    const [cookies, setCookie] = useCookies(['access', 'refresh', 'user']);

    useEffect(() => {
      authStore.setAccessToken(cookies.access);
    }, [cookies.access]);

    
    const [user, setUser] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    const [lastLogin, setLastLogin] = useState('')
    const formattedDate = lastLogin.slice(0, 19).replace('T', ' ');

    const [oldPassword, setOldPassword] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
  
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
              Authorization: `Bearer ${authStore.accessToken}`
            }
          });
          console.log(response.data); // Результат ответа от сервера
      
          setUser(response.data);
          setLastLogin(response.data.last_login)
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



    const ChangeProfile = async (userData) => {
      try {
        const ChangeResponse = await axios.put(`${process.env.REACT_APP_API_PROTOCOL}${process.env.REACT_APP_API_HOST}/api/auth/user/change/`, userData,
        {
          headers: {
            Authorization: `Bearer ${cookies.access}`,
            'Content-Type': 'multipart/form-data'
          }
        });

        console.log(userData)
        console.log(ChangeResponse.data);
        

        const response = await axios.get(`${process.env.REACT_APP_API_PROTOCOL}${process.env.REACT_APP_API_HOST}/api/auth/user/`, {
          headers: {
            Authorization: `Bearer ${authStore.accessToken}`
          }
        });
        console.log(response.data);
    
        setUser(response.data);

        setSelectedFile(null)
        fileInputRef.current.value = '';
    
        history.push('/profile');
      } catch (error) {
        console.error(error);
        // Обработка ошибок
      }
    };
    
    
    const handleChangeProfile = (event) => {
      event.preventDefault();
  
      const userData = {
        username: username,
        email: email,
        image: selectedFile
      };
  
      ChangeProfile(userData);
    };



    const ChangePassword = async (passwordData) => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_PROTOCOL}${process.env.REACT_APP_API_HOST}/api/auth/password/change/`, passwordData,
        {
          headers: {
            Authorization: `Bearer ${cookies.access}`,
          }
        });
        console.log(response.data); // Результат ответа от сервера
    
        history.push('/profile');
      } catch (error) {
        console.error(error);
        // Обработка ошибок
      }
    };
    
    
    const handleChangePassword = (event) => {
      event.preventDefault();
  
      const passwordData = {
        old_password: oldPassword,
        new_password1: password1,
        new_password2: password2
      };
  
      ChangePassword(passwordData);
    };


    const ProfileImageDelete = async () => {
      try {
        const deleteResponse = await axios.post(`${process.env.REACT_APP_API_PROTOCOL}${process.env.REACT_APP_API_HOST}/api/auth/user/profile/avatar/delete/`, null, {
          headers: {
            Authorization: `Bearer ${authStore.accessToken}`
          }
        });
        console.log(deleteResponse.data);

          const response = await axios.get(`${process.env.REACT_APP_API_PROTOCOL}${process.env.REACT_APP_API_HOST}/api/auth/user/`, {
            headers: {
              Authorization: `Bearer ${authStore.accessToken}`
            }
          });
          console.log(response.data); // Результат ответа от сервера
      
          setUser(response.data);

      } catch (error) {
        console.error(error);
        // Обработка ошибок
      }
    };

    // const handleDeleteImage = (event) => {
    //   event.preventDefault();
  
    //   ProfileImageDelete();
    // };

  return (
    <>
      <IndexNavbar />
      <div className="wrapper">
        <div className="page-header-profile">
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
                    {user != undefined && user.image != undefined && user.image != null ?<>

                    <div className="profile-picture">
                      <img
                      alt="..."
                      className="img-center img-fluid rounded-circle square-image"
                      src={user.image}
                      />
                      
                      <div onClick={ProfileImageDelete} className="delete-profile-picture">&times;</div>
                    </div>
                    
                  </>
                  :
                  <>
                  <div className="add-profile-picture">
                    <img
                      alt="..."
                      className="img-center img-fluid rounded-circle square-image"
                      src={require("assets/img/profile.jpg")}
                    />
                    <div className="add-profile-overlay">
                      <Icon icon="material-symbols:add-a-photo" className="add-profile-picture-svg" />
                      <form onSubmit={handleChangeProfile} style={{ cursor: 'pointer' }}>
                        <input type="file" onChange={handleFileChangeAvatar} accept="image/*" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0, cursor: "pointer" }} />
                      </form>
                    </div>
                  </div>
                  </>
                  
                  }

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
                      <div className="profile_container_div">
                          <div className="profile_child-container">
                            <div className="profile_child-item">
                              <p>Ваш юзернейм: {user.username}</p>
                            </div>
                          </div>
                          <div className="profile_child-container">
                            <div className="profile_child-item">
                              <p>Ваш id: {user.id}</p>
                            </div>
                          </div>
                          <div className="profile_child-container">
                            <div className="profile_child-item">
                              <p>Ваша почта: {user.email}</p>
                            </div>
                          </div>
                          <div className="profile_child-container">
                            <div className="profile_child-item">
                              <p>Ваша дата присоединения: {user.date_joined}</p>
                            </div>
                          </div>
                          <div className="profile_child-container">
                            <div className="profile_child-item">
                              <p>Ваш github account: {user.github_account}</p>
                            </div>
                          </div>
                          <div className="profile_child-container">
                            <div className="profile_child-item">
                              <p>Ваш язык: {user.language}</p>
                            </div>
                          </div>
                          <div className="profile_child-container">
                            <div className="profile_child-item">
                              <p>Вы последний раз заходили: {formattedDate}</p>
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
        </div>
        <section className="section">
          <Container>
            <Row>
              <Col lg="6">
                <Card className="card-plain">
                  <CardHeader>
                    <h1 className="">Изменить профиль</h1>
                  </CardHeader>
                  <CardBody>
                    <Form onSubmit={handleChangeProfile}>
                      <Row>
                        <Col md="6">
                          <FormGroup>
                            <label>Username</label>
                            <Input value={username} onChange={(e) => setUsername(e.target.value)}  placeholder="Abushka" type="text" />
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup>
                            <label>Email address</label>
                            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="mike@email.com" type="email" />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                      </Row>
                      <Row>
                        <Col xs="8">
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
                        id="tooltip3411487123"
                        type="button"
                        onClick={handleChangeProfile}
                      >
                        Изменить
                      </Button>
                      <UncontrolledTooltip
                        delay={0}
                        placement="right"
                        target="tooltip3411487123"
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

        <section className="section">
          <Container>
            <Row>
              <Col lg="6">
                <Card className="card-plain">
                  <CardHeader>
                    <h1 className="">Изменить пароль</h1>
                  </CardHeader>
                  <CardBody>
                    <Form onSubmit={handleChangePassword}>
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label>Old Password</label>
                            <Input value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} placeholder="qwerty123" type="text" />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label>New password</label>
                            <Input value={password1} onChange={(e) => setPassword1(e.target.value)} placeholder="12345678" type="text" />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label>Confirm password</label>
                            <Input value={password2} onChange={(e) => setPassword2(e.target.value)} placeholder="12345678" type="text" />
                          </FormGroup>
                        </Col>
                      </Row>
                      
                      <Button
                        className="btn-round float-right"
                        color="primary"
                        data-placement="right"
                        id="tooltip341148793"
                        type="button"
                        onClick={handleChangePassword}
                      >
                        Изменить Пароль
                      </Button>
                      <UncontrolledTooltip
                        delay={0}
                        placement="right"
                        target="tooltip341148793"
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
