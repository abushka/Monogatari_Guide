import React, {useState, useEffect} from "react";

import classnames from "classnames";
import { Icon } from '@iconify/react';

// locales
import { useTranslation } from "react-i18next";

import axios from "axios";

//Accordion
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Loader from "./Loader";


// reactstrap components
import {
  Container,
  Row,
  Col,
  TabContent,
  TabPane,
  Card,
  CardHeader,
  CardBody,
  Nav,
  NavItem,
  // Navbar,
  NavLink,
  // NavbarBrand,
  // Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  // UncontrolledTooltip
} from "reactstrap";

import { useCookies } from 'react-cookie';
import authStore from "variables/AuthStore.js";

const Ranobe_Section = () => {

  const [iconTabs, setIconsTabs] = useState(1);

  const { t } = useTranslation();

  const [cookies] = useCookies(['access', 'refresh', 'user']);

  useEffect(() => {
    authStore.setAccessToken(cookies.access);
    // console.log('проверочный токен в хуках:', authStore.accessToken);
  }, [cookies.access]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Volumes
  const [VolumesData, setVolumesData] = useState([])
  const VolumesArray = Object.values(VolumesData);

  const [VolumesStatusData, setVolumesStatusData] = useState([])
  // const VolumesStatusArray = Object.values(VolumesStatusData);

  // const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedStatusArray, setSelectedStatusArray] = useState([]);

  // Chapters
  const [ChaptersData, setChaptersData] = useState([])
  const ChaptersArray = Object.values(ChaptersData);

  const [ChaptersStatusData, setChaptersStatusData] = useState([])
  // const ChaptersStatusArray = Object.values(ChaptersStatusData);

  // const [selectedChapterStatus, setSelectedChapterStatus] = useState("");
  const [selectedChapterStatusArray, setSelectedChapterStatusArray] = useState([]);


  // Проверка на куки
  useEffect(() => {
    if (cookies.access) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [cookies]);

  // Volumes

  useEffect(() => {
  
    const Volumes = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_PROTOCOL}${process.env.REACT_APP_API_HOST}/api/volumes/`, {
        });
        // console.log(response.data);
    
        setVolumesData(response.data);
      } catch (error) {
        console.error(error);
        // Обработка ошибок
      }
    };

    Volumes()
  }, [])

  
  useEffect(() => {
  const VolumesStatus = async () => {
  
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_PROTOCOL}${process.env.REACT_APP_API_HOST}/api/volumes/status/`,
        {
          headers: {
            Authorization: `Bearer ${authStore.accessToken}`
          }
        }
      );
      setVolumesStatusData(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error(error);
      setIsLoggedIn(false)
      // Обработка ошибок
    }
  };
  if (cookies.access) {
    VolumesStatus()
  }
  }, [])


  const handleStatusSelection = async (status, volumeNumber) => {
    const updatedStatusArray = [...selectedStatusArray];
    updatedStatusArray[volumeNumber - 1] = status;
    setSelectedStatusArray(updatedStatusArray);
    // setSelectedStatus(status);
  
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_PROTOCOL}${process.env.REACT_APP_API_HOST}/api/volumes/status/change/`,
        {
          token: authStore.accessToken,
          volume_number: volumeNumber,
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${authStore.accessToken}`
          }
        }
      );
  
      // console.log(response.data);
    } catch (error) {
      console.error(error);
      // Обработка ошибок
    }
  };


  // Chapters


  useEffect(() => {
  
    const Chapters = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_PROTOCOL}${process.env.REACT_APP_API_HOST}/api/chapters/`, {
        });
        // console.log(response.data);
    
        setChaptersData(response.data);
      } catch (error) {
        console.error(error);
        // Обработка ошибок
      }
    };

    Chapters()
  }, [])


  
  useEffect(() => {
    const ChaptersStatus = async () => {
    
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_PROTOCOL}${process.env.REACT_APP_API_HOST}/api/chapters/status/`,
          {
            headers: {
              Authorization: `Bearer ${authStore.accessToken}`
            }
          }
        );
        setChaptersStatusData(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error(error);
        // Обработка ошибок
      }
    };
    if (cookies.access) {
      ChaptersStatus()
    }
    }, [])
    
  
    const handleChaptersStatusSelection = async (status, chapterNumber) => {
      const updatedStatusArray = [...selectedChapterStatusArray];
      updatedStatusArray[chapterNumber - 1] = status;
      setSelectedChapterStatusArray(updatedStatusArray);
      // setSelectedChapterStatus(status);
    
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_PROTOCOL}${process.env.REACT_APP_API_HOST}/api/chapters/status/change/`,
          {
            token: authStore.accessToken,
            chapter_number: chapterNumber,
            status: status,
          },
          {
            headers: {
              Authorization: `Bearer ${authStore.accessToken}`
            }
          }
        );
    
        console.log(response.data);
      } catch (error) {
        console.error(error);
        // Обработка ошибок
      }
    };


  return (
    <div>
      <Row>
          <Col className="ml-auto mr-auto" md="12" xl="12">
            <div className="mb-4">
              <small className="text-uppercase font-weight-bold">
                {t("Ranobe_Section-ranobe")}
              </small>
            </div>
            <Card>
              <CardHeader>
                <Nav className="nav-tabs-info" role="tablist" tabs>

                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: iconTabs === 1
                      })}
                      onClick={(e) => setIconsTabs(1)}
                      href="#"
                      id="tooltip3760483123"
                    >
                      <Icon icon="ic:baseline-clear-all" style={{ fontSize: '28px', marginTop: '-3px' }} />
                      <span className="font-weight-light"> {t('Ranobe_Section-all-chapters-and-volumes')}</span>
                    </NavLink>
                  </NavItem>

                </Nav>
              </CardHeader>
              <CardBody>
              <TabContent className="tab-space" activeTab={"link" + iconTabs}>
                <hr className="line-info"/>


                <TabPane tabId="link1" className="accordion-tabpane">
                  {VolumesArray.map((volume, index) => (
                    <div key={volume.id}>
                      <Accordion key={volume.id} className="accordion-main">
                        <AccordionSummary
                          className="accordion-array"
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography className="accordion-header">{volume.name_en}</Typography>

                          <Nav className="accordion-nav-dropdown">
                                        
                                      {isLoggedIn ?
                                            <UncontrolledDropdown className="accordion-dropdown">
                                              <DropdownToggle
                                                aria-expanded={false}
                                                aria-haspopup={true}
                                                caret
                                                color="default"
                                                data-toggle="dropdown"
                                                href="#"
                                                id="navbarDropdownMenuLink"
                                                onClick={(event) => event.stopPropagation()}
                                                nav
                                                className="accordion-select-header"
                                              >
                                                {/* {console.log(selectedStatus)} */}
                                                {selectedStatusArray[volume.number - 1] !== undefined
                                                  ? t(`Anime_Series_${selectedStatusArray[volume.number - 1]}`)
                                                  : VolumesStatusData[volume.number]?.volume !== undefined
                                                  ? t(`Anime_Series_${VolumesStatusData[volume.number]?.volume?.status}`)
                                                  : ""}

                                              </DropdownToggle>
                                              
                                              <DropdownMenu aria-labelledby="navbarDropdownMenuLink" onClick={(event) => event.stopPropagation()} className="accordion-dropdown-menu">
                                                
                                                <DropdownItem
                                                style={{
                                                  backgroundColor: "rgba(256, 256, 256, 1)",
                                                }}
                                                className="accordion-dropdown-menu-item"
                                                  href="#"
                                                  onClick={(event) => {
                                                    event.preventDefault();
                                                    handleStatusSelection('not-watched', volume.number)}}
                                                >
                                                  {t('Anime_Series_not-watched')}
                                                </DropdownItem>
                                                <DropdownItem
                                                style={{
                                                  backgroundColor: "rgba(256, 256, 256, 1)",
                                                }}
                                                className="accordion-dropdown-menu-item"
                                                  href="#"
                                                  onClick={(event) => {
                                                    event.preventDefault();
                                                    handleStatusSelection('watching', volume.number)}}
                                                >
                                                  {t('Anime_Series_watching')}
                                                </DropdownItem>
                                                <DropdownItem
                                                style={{
                                                  backgroundColor: "rgba(256, 256, 256, 1)",
                                                }}
                                                className="accordion-dropdown-menu-item"
                                                  href="#"
                                                  onClick={(event) => {
                                                    event.preventDefault();
                                                    handleStatusSelection('watched', volume.number)}}
                                                >
                                                  {t('Anime_Series_watched')}
                                                </DropdownItem>
                                                <DropdownItem
                                                style={{
                                                  backgroundColor: "rgba(256, 256, 256, 1)",
                                                }}
                                                className="accordion-dropdown-menu-item"
                                                  href="#"
                                                  onClick={(event) => {
                                                    event.preventDefault();
                                                    handleStatusSelection('to-watch', volume.number)}}
                                                >
                                                  {t('Anime_Series_to-watch')}
                                                </DropdownItem>
                                              </DropdownMenu>
                                            </UncontrolledDropdown>
                                          : <></>}

                                      </Nav>









                          
                        </AccordionSummary>
                        <AccordionDetails>
                          <div className="season-image-container">
                            {volume.image !== null && volume.image !== undefined ? 
                              <img className="season-image" alt="season_image" src={volume.image}/>
                            :
                              <></>
                            }
                          </div>
                          
                          <p>{volume.description_ru}</p>

                        {ChaptersArray
                        .filter((chapters) => chapters.volume_id === volume.id)
                        .map((chapters) => (
                          <div key={chapters.id}>
                            <Accordion className="accordion-children-main">
                              <AccordionSummary
                                className="accordion-array"
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                              >
                                <Typography className="accordion-children-header">{chapters.name_ru}</Typography>

                                {/* <Row className="row-dropdown">
                                  <Col md="12" className="">
                                    <Navbar className="accordion-navbar" expand="xs">
                                      <Container className="">
                                        <Collapse navbar className="accordion-collapse-dropdown" isOpen={false}>

                                        </Collapse>
                                      </Container>
                                    </Navbar>
                                  </Col>
                            </Row> */}




                                        <Nav className="">

                                        {isLoggedIn ? 
                                        <UncontrolledDropdown className="accordion-dropdown">
                                        <DropdownToggle
                                          aria-expanded={false}
                                          aria-haspopup={true}
                                          caret
                                          color="default"
                                          data-toggle="dropdown"
                                          href="#"
                                          id="navbarDropdownMenuLink"
                                          onClick={(event) => event.stopPropagation()}
                                          nav
                                          className="accordion-select-header"
                                        >
                                          
                                          {selectedChapterStatusArray[chapters.number - 1] !== undefined
                                            ? t(`Anime_Series_${selectedChapterStatusArray[chapters.number - 1]}`)
                                            : ChaptersStatusData[chapters.number]?.chapter !== undefined
                                            ? t(`Anime_Series_${ChaptersStatusData[chapters.number]?.chapter?.status}`)
                                            : ""}

                                            {/* {console.log(selectedChapterStatusArray)}
                                            {console.log(ChaptersStatusData[chapters.number])} */}

                                        </DropdownToggle>

                                        <DropdownMenu aria-labelledby="navbarDropdownMenuLink" onClick={(event) => event.stopPropagation()} className="accordion-dropdown-menu">
                                          
                                          <DropdownItem
                                          // style={{
                                          //   backgroundColor: "rgba(256, 256, 256, 1)",
                                          // }}
                                          className="accordion-dropdown-menu-item"
                                            href="#"
                                            onClick={(event) => {
                                              event.preventDefault();
                                              handleChaptersStatusSelection('not-watched', chapters.number)}}
                                          >
                                            {t('Anime_Series_not-watched')}
                                          </DropdownItem>
                                          <DropdownItem
                                          // style={{
                                          //   backgroundColor: "rgba(256, 256, 256, 1)",
                                          // }}
                                          className="accordion-dropdown-menu-item"
                                            href="#"
                                            onClick={(event) => {
                                              event.preventDefault();
                                              handleChaptersStatusSelection('watching', chapters.number)}}
                                          >
                                            {t('Anime_Series_watching')}
                                          </DropdownItem>
                                          <DropdownItem
                                          // style={{
                                          //   backgroundColor: "rgba(256, 256, 256, 1)",
                                          // }}
                                          className="accordion-dropdown-menu-item"
                                            href="#"
                                            onClick={(event) => {
                                              event.preventDefault();
                                              handleChaptersStatusSelection('watched', chapters.number)}}
                                          >
                                            {t('Anime_Series_watched')}
                                          </DropdownItem>
                                          <DropdownItem
                                          // style={{
                                          //   backgroundColor: "rgba(256, 256, 256, 1)",
                                          // }}
                                          className="accordion-dropdown-menu-item"
                                            href="#"
                                            onClick={(event) => {
                                              event.preventDefault();
                                              handleChaptersStatusSelection('to-watch', chapters.number)}}
                                          >
                                            {t('Anime_Series_to-watch')}
                                          </DropdownItem>
                                        </DropdownMenu>
                                        </UncontrolledDropdown>
                                        : <></>}

                                        </Nav>

                              </AccordionSummary>
                              <AccordionDetails className="accordion-children-details">
                              <div className="series-image-container">
                                {chapters.image !== null && chapters.image !== undefined ? 
                                  <img className="series-image" alt="series_image" src={chapters.image}/>
                                :
                                  <></>
                                }
                              </div>
                              
                                <div>
                                  <p>{t("Ranobe_Section-chapter-number")}: {chapters.number}</p>
{/* 
                                  <p>Номер серии по дате выхода аниме: {chapters.anime_release_view_number}</p>

                                  <p>Номер серии по выходу ранобэ: {chapters.ranobe_release_number}</p>

                                  <p>Номер серии в хронологическом порядке: {chapters.chronological_view_number}</p> */}

                                  <p>{t("Ranobe_Section-chapter-description")}: {chapters.description_ru}</p>
                                </div>
                                
                              </AccordionDetails>
                            </Accordion>
                          </div>
                        ))}


                        </AccordionDetails>
                      </Accordion>
                    </div>
                  ))}
                </TabPane>
                
              </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
    </div>
  );
};

export default Ranobe_Section;