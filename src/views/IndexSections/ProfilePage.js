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
import { UserProfile } from "variables/UserProfile";

import { useHistory } from 'react-router-dom';
import authStore from "variables/AuthStore.js";

// locales
import { useTranslation } from "react-i18next";


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

  const { t } = useTranslation();


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
      if (cookies.access) {
        UserProfile(setUser);
      }
    }, []);



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
        

        UserProfile(setUser);

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
      <IndexNavbar user={user} setUser={setUser} />
      <div className="wrapper">
        <div className="page-header-profiles">
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
              {/* <Col lg="6" md="6">
                <h1 className="text-left">{user.username}</h1>
              </Col> */}
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
                          {t('Profilpage-about-profile')}
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
                              <p className="profile-page-info-card">{t('Profilpage-your-username')} </p>
                              <p className="profile-page-info-card-user">{user.username}</p>
                            </div>
                          </div>
                          {/* <div className="profile_child-container">
                            <div className="profile_child-item">
                              <p>{t('Profilpage-your-id')} {user.id}</p>
                            </div>
                          </div> */}
                          <div className="profile_child-container">
                            {user.email != null && user.email != undefined ?
                              <div className="profile_child-item">
                                <p className="profile-page-info-card">{t('Profilpage-your-email')} </p>
                                <p className="profile-page-info-card-user">{user.email}</p>
                              </div>
                            : 
                            <></>
                            }
                            
                          </div>

                          <div className="profile_child-container">
                            {user.github_account != null && user.github_account != undefined ?
                              <div className="profile_child-item">
                                <p className="profile-page-info-card">{t('Profilpage-your-github')} </p>
                                <p className="profile-page-info-card-user">{user.github_account}</p>
                              </div>
                            :
                            <></>
                            }
                            
                          </div>
                          <div className="profile_child-container">
                            <div className="profile_child-item">
                              <p className="profile-page-info-card">{t('Profilpage-your-language')} </p>
                              <p className="profile-page-info-card-user">{t('Profilpage-language')}</p>
                            </div>
                          </div>

                          <div className="profile_child-container">
                          {user.date_joined != null && user.date_joined != undefined ?
                              <div className="profile_child-item">
                                <p className="profile-page-info-card">{t('Profilpage-your-date-joined')} </p>
                                <p className="profile-page-info-card-user">{user.date_joined.slice(0, 19).replace('T', ' ')}</p>
                              </div>
                            :
                            <></>
                            }
                          </div>

                          <div className="profile_child-container">
                          {user.last_login != null && user.last_login != undefined ?
                              <div className="profile_child-item">
                                <p className="profile-page-info-card">{t('Profilpage-your-last-login')} </p>
                                <p className="profile-page-info-card-user">{user.last_login.slice(0, 19).replace('T', ' ')}</p>
                              </div>
                            :
                            <></>
                            }
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
                    <h1 className="">{t('Profilpage-change-profile')}</h1>
                  </CardHeader>
                  <CardBody>
                    <Form onSubmit={handleChangeProfile}>
                      <Row>
                        <Col md="6">
                          <FormGroup>
                            <label>{t('Profilpage-username')}</label>
                            <Input value={username} onChange={(e) => setUsername(e.target.value)}  placeholder="Abushka" type="text" />
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup>
                            <label>{t('Profilpage-email-address')}</label>
                            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="abushka@email.com" type="email" />
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
                              {t('Profilpage-remove')}
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
                        {t('Profilpage-change')}
                      </Button>
                      <UncontrolledTooltip
                        delay={0}
                        placement="right"
                        target="tooltip3411487123"
                      >
                        {t('Profilpage-send-for-change')}
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
                    <h1 className="">{t('Profilpage-change-password')}</h1>
                  </CardHeader>
                  <CardBody>
                    <Form onSubmit={handleChangePassword}>
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label>{t('Profilpage-old-password')}</label>
                            <Input value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} placeholder="qwerty123" type="text" />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label>{t('Profilpage-new-password')}</label>
                            <Input value={password1} onChange={(e) => setPassword1(e.target.value)} placeholder="12345678" type="text" />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label>{t('Profilpage-confirm-password')}</label>
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
                        {t('Profilpage-change-password')}
                      </Button>
                      <UncontrolledTooltip
                        delay={0}
                        placement="right"
                        target="tooltip341148793"
                      >
                        {t('Profilpage-send-for-change')}
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
