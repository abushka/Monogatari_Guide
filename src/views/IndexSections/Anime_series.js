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
import React, {useState, useEffect, lazy, Suspense} from "react";
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


const Ranobe_Section = lazy(() => import('./Ranobe_Section'));

export default function Anime_Series() {

  const [iconTabs, setIconsTabs] = useState(1);

  const { t } = useTranslation();

  const [cookies] = useCookies(['access', 'refresh', 'user']);

  useEffect(() => {
    authStore.setAccessToken(cookies.access);
    // console.log('проверочный токен в хуках:', authStore.accessToken);
  }, [cookies.access]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Seasons
  const [SeasonsData, setSeasonsData] = useState([])
  const SeasonsArray = Object.values(SeasonsData);

  const [SeasonsStatusData, setSeasonsStatusData] = useState([])
  // const SeasonsStatusArray = Object.values(SeasonsStatusData);

  // const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedStatusArray, setSelectedStatusArray] = useState([]);

  // Series
  const [SeriesData, setSeriesData] = useState([])
  const seriesArray = Object.values(SeriesData);

  const [SeriesStatusData, setSeriesStatusData] = useState([])
  // const SeriesStatusArray = Object.values(SeriesStatusData);

  // const [selectedSerieStatus, setSelectedSerieStatus] = useState("");
  const [selectedSerieStatusArray, setSelectedSerieStatusArray] = useState([]);

  // Series anime_release_view_number
  const [SeriesAnimeReleaseData, setSeriesAnimeReleaseData] = useState([])
  const seriesAnimeReleaseArray = Object.values(SeriesAnimeReleaseData);

  const [LoadingAnimeRelease, setLoadingAnimeRelease] = useState(true);

  
  // Series ranobe_release_number
  const [SeriesRanobeData, setSeriesRanobeData] = useState([])
  const seriesRanobeArray = Object.values(SeriesRanobeData);

  const [LoadingRanobe, setLoadingRanobe] = useState(true);

  // Series chronological_view_number
  const [SeriesChronologicalData, setSeriesChronologicalData] = useState([])
  const seriesChronologicalArray = Object.values(SeriesChronologicalData);

  const [LoadingChronological, setLoadingChronological] = useState(true);





  // Проверка на куки
  useEffect(() => {
    if (cookies.access) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [cookies]);

  // Seasons

  useEffect(() => {
  
    const Seasons = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_PROTOCOL}${process.env.REACT_APP_API_HOST}/api/seasons/`, {
        });
        // console.log(response.data);
    
        setSeasonsData(response.data);
      } catch (error) {
        console.error(error);
        // Обработка ошибок
      }
    };

    Seasons()
  }, [])

  
  useEffect(() => {
  const SeasonsStatus = async () => {
  
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_PROTOCOL}${process.env.REACT_APP_API_HOST}/api/seasons/status/`,
        {
          headers: {
            Authorization: `Bearer ${authStore.accessToken}`
          }
        }
      );
      setSeasonsStatusData(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error(error);
      // Обработка ошибок
    }
  };
  if (cookies.access) {
    SeasonsStatus()
  }
  }, [])


  const handleStatusSelection = async (status, seasonNumber) => {
    const updatedStatusArray = [...selectedStatusArray];
    updatedStatusArray[seasonNumber - 1] = status;
    setSelectedStatusArray(updatedStatusArray);
    // setSelectedStatus(status);
  
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_PROTOCOL}${process.env.REACT_APP_API_HOST}/api/seasons/status/change/`,
        {
          token: authStore.accessToken,
          season_number: seasonNumber,
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


  // Series


  useEffect(() => {
  
    const Series = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_PROTOCOL}${process.env.REACT_APP_API_HOST}/api/series/`, {
        });
        // console.log(response.data);
    
        setSeriesData(response.data);
      } catch (error) {
        console.error(error);
        // Обработка ошибок
      }
    };

    Series()
  }, [])


  
  useEffect(() => {
    const SeriesStatus = async () => {
    
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_PROTOCOL}${process.env.REACT_APP_API_HOST}/api/series/status/`,
          {
            headers: {
              Authorization: `Bearer ${authStore.accessToken}`
            }
          }
        );
        setSeriesStatusData(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error(error);
        // Обработка ошибок
      }
    };
    if (cookies.access) {
      SeriesStatus()
    }
    }, [])
    
  
    const handleSeriesStatusSelection = async (status, serieNumber) => {
      const updatedStatusArray = [...selectedSerieStatusArray];
      updatedStatusArray[serieNumber - 1] = status;
      setSelectedSerieStatusArray(updatedStatusArray);
      // setSelectedSerieStatus(status);
    
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_PROTOCOL}${process.env.REACT_APP_API_HOST}/api/series/status/change/`,
          {
            token: authStore.accessToken,
            serie_number: serieNumber,
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


    // Series anime_release_view_number, ranobe_release_number, chronological_view_number

    const handleTabChange = async (tabIndex) => {
      if (tabIndex === 2 && SeriesRanobeData.length === 0) {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_PROTOCOL}${process.env.REACT_APP_API_HOST}/api/series/ranobe/`);
          setSeriesRanobeData(response.data);
          setLoadingRanobe(false)
        } catch (error) {
          console.error(error);
          // Обработка ошибок
        }
      }

      else if (tabIndex === 3 && SeriesAnimeReleaseData.length === 0) {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_PROTOCOL}${process.env.REACT_APP_API_HOST}/api/series/anime-release/`);
          setSeriesAnimeReleaseData(response.data);
          setLoadingAnimeRelease(false)
        } catch (error) {
          console.error(error);
          // Обработка ошибок
        }
      } 
      
      else if (tabIndex === 4 && SeriesChronologicalData.length === 0) {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_PROTOCOL}${process.env.REACT_APP_API_HOST}/api/series/chronological/`);
          setSeriesChronologicalData(response.data);
          setLoadingChronological(false)
        } catch (error) {
          console.error(error);
          // Обработка ошибок
        }
      } 
    };

    // useEffect(() => {
  
    //   const SeriesAnimeRelease = async () => {
    //     try {
    //       const response = await axios.get(`${process.env.REACT_APP_API_PROTOCOL}${process.env.REACT_APP_API_HOST}/api/series/anime-release/`, {
    //       });
    //       console.log(response.data);
      
    //       setSeriesAnimeReleaseData(response.data);
    //     } catch (error) {
    //       console.error(error);
    //       // Обработка ошибок
    //     }
    //   };
  
    //   SeriesAnimeRelease()
    // }, [])


    // // Series ranobe_release_number

    // useEffect(() => {
  
    //   const SeriesRanobe = async () => {
    //     try {
    //       const response = await axios.get(`${process.env.REACT_APP_API_PROTOCOL}${process.env.REACT_APP_API_HOST}/api/series/ranobe/`, {
    //       });
    //       console.log(response.data);
      
    //       setSeriesRanobeData(response.data);
    //     } catch (error) {
    //       console.error(error);
    //       // Обработка ошибок
    //     }
    //   };
  
    //   SeriesRanobe()
    // }, [])



    // // Series chronological_view_number

    // useEffect(() => {
    
    //   const SeriesChronological = async () => {
    //     try {
    //       const response = await axios.get(`${process.env.REACT_APP_API_PROTOCOL}${process.env.REACT_APP_API_HOST}/api/series/chronological/`, {
    //       });
    //       console.log(response.data);
      
    //       setSeriesChronologicalData(response.data);
    //     } catch (error) {
    //       console.error(error);
    //       // Обработка ошибок
    //     }
    //   };

    //   SeriesChronological()
    // }, [])



  return (
    <div className="section section-basic" id="basic-elements">
      <img alt="..." className="path" src={require("assets/img/path1.png")} />
      <div className="section-tabs">
        
      <Container> 
      <img alt="Anime " className="anime-picture" src={require("assets/img/Monogatari_Fandom.webp")}/>
        <Col md="12">
        <div className="title">
          <h3 className="mb-3">{t('Anime_Sequence-orders-watching-anime')}</h3>
        </div>
        <Row>
          <Col className="ml-auto mr-auto" md="12" xl="12">
            <div className="mb-4">
              <small className="text-uppercase font-weight-bold">
                {t("Anime_Sequence-Anime-Seasons")}
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
                      <span className="font-weight-light"> {t('Anime_Sequence-all-series-and-seasons')}</span>
                    </NavLink>
                  </NavItem>
                  {/* <UncontrolledTooltip
                      placement="top"
                      target="tooltip3760483123"
                    >
                      Все серии и сезоны
                  </UncontrolledTooltip> */}

                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: iconTabs === 2
                      })}
                      onClick={(e) => {
                        setIconsTabs(2);
                        handleTabChange(2);
                      }}
                      href="#"
                      id="tooltip124567854"
                    >
                      <Icon icon="ion:book" style={{ fontSize: '20px', marginTop: '-2px'}} />
                      <span className="font-weight-light"> {t('Anime_Sequence-light-novel')}</span>
                    </NavLink>
                  </NavItem>


                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: iconTabs === 3
                      })}
                      onClick={(e) => {
                        setIconsTabs(3);
                        handleTabChange(3);
                      }}
                      href="#"
                      id="tooltip4123123123"
                    >
                      <Icon icon="bi:calendar-date-fill" style={{ fontSize: '20px', marginTop: '-5px' }} />
                      <span className="font-weight-light"> {t('Anime_Sequence-serie-release-date')}</span>
                    </NavLink>
                  </NavItem>


                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: iconTabs === 4
                      })}
                      onClick={(e) => {
                        setIconsTabs(4);
                        handleTabChange(4);
                      }}
                      href="#"
                      id="tooltip4456345232"
                    >
                      <Icon icon="icon-park-outline:timeline" style={{ fontSize: '24px', marginTop: '-2px'}} />
                      <span className="font-weight-light"> {t('Anime_Sequence-chronological-order')}</span>
                    </NavLink>
                  </NavItem>




                </Nav>
              </CardHeader>
              <CardBody>
              <TabContent className="tab-space" activeTab={"link" + iconTabs}>
                <hr className="line-info"/>


                <TabPane tabId="link1" className="accordion-tabpane">
                  {SeasonsArray.map((season, index) => (
                    <div key={season.id}>
                      <Accordion key={season.id} className="accordion-main">
                        <AccordionSummary
                          className="accordion-array"
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography className="accordion-header">{season.name_en}</Typography>
                          {/* <Container id="menu-dropdown"> */}
                          

                            {/* <Row className="row-dropdown">
                              <Col md="12" className="accordion-status">
                                <Navbar className="accordion-navbar" expand="xs">
                                  <Container className="">
                                    <Collapse navbar className="accordion-collapse-dropdown" isOpen={false}>
                                      
                                    </Collapse>
                                  </Container>
                                </Navbar>
                              </Col>
                            </Row> */}
                          {/* </Container> */}



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
                                                {selectedStatusArray[season.number - 1] !== undefined
                                                  ? t(`Anime_Series_${selectedStatusArray[season.number - 1]}`)
                                                  : SeasonsStatusData[season.number]?.season !== undefined
                                                  ? t(`Anime_Series_${SeasonsStatusData[season.number]?.season?.status}`)
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
                                                    handleStatusSelection('not-watched', season.number)}}
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
                                                    handleStatusSelection('watching', season.number)}}
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
                                                    handleStatusSelection('watched', season.number)}}
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
                                                    handleStatusSelection('to-watch', season.number)}}
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
                            {season.image !== null && season.image !== undefined ? 
                              <img className="season-image" alt="season_image" src={season.image}/>
                            :
                              <></>
                            }
                          </div>
                          

                        {seriesArray
                        .filter((series) => series.season_id === season.id)
                        .map((series, index) => (
                          <div key={series.id}>
                            <Accordion className="accordion-children-main">
                              <AccordionSummary
                                className="accordion-array"
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                              >
                                <Typography className="accordion-children-header">{index + 1}: {series.name_ru}</Typography>

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
                                          
                                          {selectedSerieStatusArray[series.number - 1] !== undefined
                                            ? t(`Anime_Series_${selectedSerieStatusArray[series.number - 1]}`)
                                            : SeriesStatusData[series.number]?.serie !== undefined
                                            ? t(`Anime_Series_${SeriesStatusData[series.number]?.serie?.status}`)
                                            : ""}

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
                                              handleSeriesStatusSelection('not-watched', series.number)}}
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
                                              handleSeriesStatusSelection('watching', series.number)}}
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
                                              handleSeriesStatusSelection('watched', series.number)}}
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
                                              handleSeriesStatusSelection('to-watch', series.number)}}
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
                                {series.image !== null && series.image !== undefined ? 
                                  <img className="series-image" alt="series_image" src={series.image}/>
                                :
                                  <></>
                                }
                              </div>
                              
                                <div>
                                  <p>{t("Anime_Sequence-serie-number-in-the-cycle")}: {series.number}</p>

                                  <p>{t("Anime_Sequence-serie-number-by-anime-release-date")}: {series.anime_release_view_number}</p>

                                  <p>{t("Anime_Sequence-serie-number-by-light-novel")}: {series.ranobe_release_number}</p>

                                  <p>{t("Anime_Sequence-serie-number-in-chronological-order")}: {series.chronological_view_number}</p>

                                  <p>{t("Anime_Sequence-serie-description")}: {series.description_ru}</p>
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




                <TabPane tabId="link2" className="">

                {LoadingRanobe === true ?
                <div className="loader-center">

                  <Loader />
                </div> 

                : <>

                  {isLoggedIn ? <p>{t('Anime_Sequence-only-series-status')}</p> : <></>}

                  <p>{t('Anime_Sequence-ranobe-suggestion')}</p>

                  {seriesRanobeArray.map((season, index) => (
                      <div key={index}>
                        <Accordion key={index} className="accordion-main">
                          <AccordionSummary
                            className="accordion-array"
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography className="accordion-header">{season.name_en}</Typography>

            
                            {/* <Row className="row-dropdown">
                              <Col md="12" className="">
                                <Navbar className="accordion-navbar" expand="xs">
                                  <Container className="">
                                    <Collapse navbar className="accordion-collapse-dropdown" isOpen={false}>
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
                                            
                                            {selectedStatusArray[season.number - 1] !== undefined
                                              ? t(`Anime_Series_${selectedStatusArray[season.number - 1]}`)
                                              : SeasonsStatusData[season.id]?.season != undefined
                                              ? t(`Anime_Series_${SeasonsStatusData[season.id]?.season?.status}`)
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
                                                handleStatusSelection('not-watched', season.number)}}
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
                                                handleStatusSelection('watching', season.number)}}
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
                                                handleStatusSelection('watched', season.number)}}
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
                                                handleStatusSelection('to-watch', season.number)}}
                                            >
                                              {t('Anime_Series_to-watch')}
                                            </DropdownItem>
                                          </DropdownMenu>
                                        </UncontrolledDropdown>

                                        : <></>}
                                        
                                      </Nav>
                                    </Collapse>
                                  </Container>
                                </Navbar>
                              </Col>
                            </Row> */}

                        </AccordionSummary>
                        <AccordionDetails>
                        <div className="season-image-container">
                            {season.image !== null && season.image !== undefined ? 
                              <img className="season-image" alt="season_image" src={season.image}/>
                            :
                              <></>
                            }
                          </div>
                          

                        {season.series
                        // .filter((series) => series.season_id === season.id)
                        .map((series, index) => (
                          <div key={series.number}>
                            <Accordion className="accordion-children-main">
                              <AccordionSummary
                                className="accordion-array"
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                              >
                                <Typography className="accordion-children-header">{index + 1}: {series.name_ru}</Typography>

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
                              
                              {selectedSerieStatusArray[series.number - 1] !== undefined
                                ? t(`Anime_Series_${selectedSerieStatusArray[series.number - 1]}`)
                                : SeriesStatusData[series.number]?.serie !== undefined
                                ? t(`Anime_Series_${SeriesStatusData[series.number]?.serie?.status}`)
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
                                  handleSeriesStatusSelection('not-watched', series.number)}}
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
                                  handleSeriesStatusSelection('watching', series.number)}}
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
                                  handleSeriesStatusSelection('watched', series.number)}}
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
                                  handleSeriesStatusSelection('to-watch', series.number)}}
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
                  {series.image !== null && series.image !== undefined ? 
                    <img className="series-image" alt="series_image" src={series.image}/>
                  :
                    <></>
                  }
                </div>
                  <p>{t("Anime_Sequence-serie-number-by-light-novel")}: {series.ranobe_release_number}</p>                  
                  <p>{t("Anime_Sequence-serie-description")}: {series.description_ru}</p>
                </AccordionDetails>
              </Accordion>
            </div>
          ))
          // : <></>
          }


          </AccordionDetails>
        </Accordion>
      </div>
    ))}

</>}
                </TabPane>



                <TabPane tabId="link3" className="">

                  {LoadingAnimeRelease === true ? 
                   <div className="loader-center">

                    <Loader />
                  </div> 
                  : <>
                  
                    {isLoggedIn ? <p>{t('Anime_Sequence-only-series-status')}</p> : <></>}

                    <p>{t('Anime_Sequence-anime-release-suggestion')}</p>
                  

                  {seriesAnimeReleaseArray.map((season, index) => (
                      <div key={index}>
                        <Accordion key={index} className="accordion-main">
                          <AccordionSummary
                            className="accordion-array"
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography className="accordion-header">{season.name_en}</Typography>

                            
                              {/* <Row className="row-dropdown">
                                <Col md="12" className="">
                                  <Navbar className="accordion-navbar" expand="xs">
                                    <Container className="">
                                      <Collapse navbar className="accordion-collapse-dropdown" isOpen={false}>
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
                                              
                                              {selectedStatusArray[season.number - 1] !== undefined
                                                ? t(`Anime_Series_${selectedStatusArray[season.number - 1]}`)
                                                : SeasonsStatusData[season.id]?.season != undefined
                                                ? t(`Anime_Series_${SeasonsStatusData[season.id]?.season?.status}`)
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
                                                  handleStatusSelection('not-watched', season.number)}}
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
                                                  handleStatusSelection('watching', season.number)}}
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
                                                  handleStatusSelection('watched', season.number)}}
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
                                                  handleStatusSelection('to-watch', season.number)}}
                                              >
                                                {t('Anime_Series_to-watch')}
                                              </DropdownItem>
                                            </DropdownMenu>
                                          </UncontrolledDropdown>

                                          : <></>}
                                          
                                        </Nav>
                                      </Collapse>
                                    </Container>
                                  </Navbar>
                                </Col>
                              </Row> */}

                          </AccordionSummary>
                          <AccordionDetails>
                          <div className="season-image-container">
                              {season.image !== null && season.image !== undefined ? 
                                <img className="season-image" alt="season_image" src={season.image}/>
                              :
                                <></>
                              }
                            </div>
                            

                          {season.series
                          // .filter((series) => series.season_id === season.id)
                          .map((series, index) => (
                            <div key={series.number}>
                              <Accordion className="accordion-children-main">
                                <AccordionSummary
                                  className="accordion-array"
                                  expandIcon={<ExpandMoreIcon />}
                                  aria-controls="panel2a-content"
                                  id="panel2a-header"
                                >
                                  <Typography className="accordion-children-header">{index + 1}: {series.name_ru}</Typography>

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
                                              
                                              {selectedSerieStatusArray[series.number - 1] !== undefined
                                                ? t(`Anime_Series_${selectedSerieStatusArray[series.number - 1]}`)
                                                : SeriesStatusData[series.number]?.serie !== undefined
                                                ? t(`Anime_Series_${SeriesStatusData[series.number]?.serie?.status}`)
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
                                                  handleSeriesStatusSelection('not-watched', series.number)}}
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
                                                  handleSeriesStatusSelection('watching', series.number)}}
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
                                                  handleSeriesStatusSelection('watched', series.number)}}
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
                                                  handleSeriesStatusSelection('to-watch', series.number)}}
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
                                  {series.image !== null && series.image !== undefined ? 
                                    <img className="series-image" alt="series_image" src={series.image}/>
                                  :
                                    <></>
                                  }
                                </div>
                                  <p>{t("Anime_Sequence-serie-number-by-anime-release-date")}: {series.anime_release_view_number}</p>
                                  <p>{t("Anime_Sequence-serie-description")}: {series.description_ru}</p>
                                </AccordionDetails>
                              </Accordion>
                            </div>
                          ))
                          // : <></>
                          }


                          </AccordionDetails>
                        </Accordion>
                      </div>
                    ))}

                  </>}

                  
                
                </TabPane>



                <TabPane tabId="link4" className="">

                  {LoadingChronological === true ? 
                   <div className="loader-center">

                    <Loader />
                  </div> 
                  : <>

                    {isLoggedIn ? <p>{t('Anime_Sequence-only-series-status')}</p> : <></>}
                    
                    <p>{t('Anime_Sequence-chronological-suggestion')}</p>

                    {seriesChronologicalArray.map((season, index) => (
                        <div key={index}>
                          <Accordion key={index} className="accordion-main">
                            <AccordionSummary
                              className="accordion-array"
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                            >
                              <Typography className="accordion-header">{season.name_en}</Typography>

                              
                                {/* <Row className="row-dropdown">
                                  <Col md="12" className="">
                                    <Navbar className="accordion-navbar" expand="xs">
                                      <Container className="">
                                        <Collapse navbar className="accordion-collapse-dropdown" isOpen={false}>
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
                                                
                                                {selectedStatusArray[season.number - 1] !== undefined
                                                  ? t(`Anime_Series_${selectedStatusArray[season.number - 1]}`)
                                                  : SeasonsStatusData[season.id]?.season != undefined
                                                  ? t(`Anime_Series_${SeasonsStatusData[season.id]?.season?.status}`)
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
                                                    handleStatusSelection('not-watched', season.number)}}
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
                                                    handleStatusSelection('watching', season.number)}}
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
                                                    handleStatusSelection('watched', season.number)}}
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
                                                    handleStatusSelection('to-watch', season.number)}}
                                                >
                                                  {t('Anime_Series_to-watch')}
                                                </DropdownItem>
                                              </DropdownMenu>
                                            </UncontrolledDropdown>

                                            : <></>}
                                            
                                          </Nav>
                                        </Collapse>
                                      </Container>
                                    </Navbar>
                                  </Col>
                                </Row> */}

                            </AccordionSummary>
                            <AccordionDetails>
                            <div className="season-image-container">
                                {season.image !== null && season.image !== undefined ? 
                                  <img className="season-image" alt="season_image" src={season.image}/>
                                :
                                  <></>
                                }
                              </div>
                              

                            {season.series
                            // .filter((series) => series.season_id === season.id)
                            .map((series, index) => (
                              <div key={series.number}>
                                <Accordion className="accordion-children-main">
                                  <AccordionSummary
                                    className="accordion-array"
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2a-content"
                                    id="panel2a-header"
                                  >
                                    <Typography className="accordion-children-header">{index + 1}: {series.name_ru}</Typography>

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
                                                
                                                {selectedSerieStatusArray[series.number - 1] !== undefined
                                                  ? t(`Anime_Series_${selectedSerieStatusArray[series.number - 1]}`)
                                                  : SeriesStatusData[series.number]?.serie !== undefined
                                                  ? t(`Anime_Series_${SeriesStatusData[series.number]?.serie?.status}`)
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
                                                    handleSeriesStatusSelection('not-watched', series.number)}}
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
                                                    handleSeriesStatusSelection('watching', series.number)}}
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
                                                    handleSeriesStatusSelection('watched', series.number)}}
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
                                                    handleSeriesStatusSelection('to-watch', series.number)}}
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
                                    {series.image !== null && series.image !== undefined ? 
                                      <img className="series-image" alt="series_image" src={series.image}/>
                                    :
                                      <></>
                                    }
                                  </div>
                                  <p>{t("Anime_Sequence-serie-number-in-chronological-order")}: {series.chronological_view_number}</p>
                                  <p>{t("Anime_Sequence-serie-description")}: {series.description_ru}</p>                                  
                                  </AccordionDetails>
                                </Accordion>
                              </div>
                            ))
                            // : <></>
                            }


                            </AccordionDetails>
                          </Accordion>
                        </div>
                      ))}

                  </>}

                </TabPane>

                

                
              </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
        </Col>

        <Col md="12">
          <Suspense fallback={<div><Loader/></div>}>
            <Ranobe_Section />
          </Suspense>
        </Col>

      </Container>
      </div>
    </div>
  );
}
