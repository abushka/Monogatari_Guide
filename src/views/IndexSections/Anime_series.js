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
  Navbar,
  NavLink,
  NavbarBrand,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  UncontrolledTooltip
} from "reactstrap";

import { Cookies } from "react-cookie";
import authStore from "variables/AuthStore.js";


export default function Anime_Series() {

  const [iconTabs, setIconsTabs] = useState(1);

  const { t } = useTranslation();

  
  const [SeasonsData, setSeasonsData] = useState([])
  const SeasonsArray = Object.values(SeasonsData);

  const [SeriesData, setSeriesData] = useState([])
  const seriesArray = Object.values(SeriesData);

  const [selectedStatus, setSelectedStatus] = useState("");


  useEffect(() => {
  
    const Seasons = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_PROTOCOL}${process.env.REACT_APP_API_HOST}/api/seasons/`, {
        });
        console.log(response.data);
    
        setSeasonsData(response.data);
      } catch (error) {
        console.error(error);
        // Обработка ошибок
      }
    };

    Seasons()
  }, [])


  useEffect(() => {
  
    const Series = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_PROTOCOL}${process.env.REACT_APP_API_HOST}/api/series/`, {
        });
        console.log(response.data);
    
        setSeriesData(response.data);
      } catch (error) {
        console.error(error);
        // Обработка ошибок
      }
    };

    Series()
  }, [])


  const handleStatusSelection = async (status, seasonNumber) => {
    setSelectedStatus(status);
  
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
  
      console.log(response.data);
      // Обработайте ответ от сервера, если необходимо
    } catch (error) {
      console.error(error);
      // Обработка ошибок
    }
  };


  return (
    <div className="section section-basic" id="basic-elements">
      <img alt="..." className="path" src={require("assets/img/path1.png")} />
      <div className="section-tabs">
        
      <Container> 
      <img alt="Anime picture" className="anime-picture" src={require("assets/img/Anime_sequence.webp")}/>
        <Col md="12">
        <div className="title">
          <h3 className="mb-3">Порядок просмотра аниме серий</h3>
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
                      <Icon icon="emojione-monotone:crab" style={{ fontSize: '20px' }} />
                      <span className="font-weight-light"> По ранобэ</span>
                    </NavLink>
                  </NavItem>
                  <UncontrolledTooltip
                      placement="top"
                      target="tooltip3760483123"
                    >
                      По ранобэ
                  </UncontrolledTooltip>

                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: iconTabs === 2
                      })}
                      onClick={(e) => setIconsTabs(2)}
                      href="#"
                      id="tooltip4123123123"
                    >
                      <Icon icon="mdi:bat" style={{ fontSize: '24px' }} />
                      <span className="font-weight-light"> По дате выхода серий</span>
                    </NavLink>
                  </NavItem>
                  <UncontrolledTooltip
                      placement="top"
                      target="tooltip4123123123"
                    >
                      По дате выхода серий
                  </UncontrolledTooltip>

                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: iconTabs === 3
                      })}
                      onClick={(e) => setIconsTabs(3)}
                      href="#"
                      id="tooltip4456345232"
                    >
                      <Icon icon="pajamas:false-positive" style={{ fontSize: '16px'}} />
                      <span className="font-weight-light"> Хронологический порядок</span>
                    </NavLink>
                  </NavItem>
                  <UncontrolledTooltip
                      placement="top"
                      target="tooltip4456345232"
                    >
                      Хронологический порядок
                  </UncontrolledTooltip>

                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: iconTabs === 4
                      })}
                      onClick={(e) => setIconsTabs(4)}
                      href="#"
                      id="tooltip124567854"
                    >
                      <Icon icon="fa6-solid:cat" style={{ fontSize: '16px'}} />
                      <span className="font-weight-light"> Другой возможный</span>
                    </NavLink>
                  </NavItem>
                  <UncontrolledTooltip
                      placement="top"
                      target="tooltip124567854"
                    >
                      Другой возможный
                  </UncontrolledTooltip>

                </Nav>
              </CardHeader>
              <CardBody>
              <TabContent className="tab-space" activeTab={"link" + iconTabs}>
                <hr className="line-info"/>
                <TabPane tabId="link1" className="accordion-tabpane">
                  {SeasonsArray.reverse().map((season) => (
                    <div key={season.id}>
                      <Accordion key={season.id} className="accordion-main">
                        <AccordionSummary
                          className="accordion-array"
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography className="accordion-header">ID Сезона: {season.number}, Name: {season.name_ru}</Typography>
                          {/* <Container id="menu-dropdown"> */}
                            <Row>
                              <Col md="12">
                                <Navbar className="bg-primary" expand="lg">
                                  <Container>
                                    <Collapse navbar isOpen={false}>
                                      <Nav navbar>
                                        <UncontrolledDropdown nav>
                                          <DropdownToggle
                                            aria-expanded={false}
                                            aria-haspopup={true}
                                            caret
                                            color="default"
                                            data-toggle="dropdown"
                                            href="http://example.com"
                                            id="navbarDropdownMenuLink"
                                            nav
                                          >
                                            <p>{console.log(season)}</p>
                                          </DropdownToggle>
                                          <DropdownMenu aria-labelledby="navbarDropdownMenuLink">
                                            <DropdownItem
                                              href="#"
                                              onClick={() => handleStatusSelection('not-watched', season.number)}
                                            >
                                              Не просмотрено
                                            </DropdownItem>
                                            <DropdownItem
                                              href="#"
                                              onClick={() => handleStatusSelection('watched', season.number)}
                                            >
                                              Просмотрено
                                            </DropdownItem>
                                            <DropdownItem
                                              href="#"
                                              onClick={() => handleStatusSelection('to-watch', season.number)}
                                            >
                                              Буду смотреть
                                            </DropdownItem>
                                          </DropdownMenu>
                                        </UncontrolledDropdown>
                                      </Nav>
                                    </Collapse>
                                  </Container>
                                </Navbar>
                              </Col>
                            </Row>
                          {/* </Container> */}
                        </AccordionSummary>
                        <AccordionDetails>
                        {seriesArray
                        .filter((series) => series.season.id === season.id)
                        .map((series) => (
                          <div key={series.number}>
                            <Accordion className="accordion-children-main">
                              <AccordionSummary
                                className="accordion-array"
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                              >
                                <Typography className="accordion-children-header">ID Серии: {series.number}, Name: {series.name_ru}</Typography>
                              </AccordionSummary>
                              <AccordionDetails className="accordion-children-details">
                                {series.description_ru}{series.number}
                              </AccordionDetails>
                            </Accordion>
                          </div>
                        ))}
                        </AccordionDetails>
                      </Accordion>
                    </div>
                  ))}
                </TabPane>

                <TabPane tabId="link2" className="color-white">
                  {SeasonsArray.map((season) => (
                    <div key={season.id}>
                      <Accordion key={season.id}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography className="color-white">Это 2 таб ID: {season.id}, Name: {season.name_ru}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        {seriesArray
                        .filter((series) => series.season.id === season.id)
                        .map((series) => (
                          <div key={series.id}>
                            <Accordion>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                              >
                                <Typography className="color-white">ID: {series.id}, Name: {series.name_ru}</Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                {series.description_ru}{series.id}
                              </AccordionDetails>
                            </Accordion>
                          </div>
                        ))}
                        </AccordionDetails>
                      </Accordion>
                    </div>
                  ))}
                </TabPane>

                <TabPane tabId="link3" className="color-white">
                  {SeasonsArray.map((season) => (
                    <div key={season.id}>
                      <Accordion key={season.id}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography className="color-white">Это 3 таб ID: {season.id}, Name: {season.name_ru}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        {seriesArray
                        .filter((series) => series.season.id === season.id)
                        .map((series) => (
                          <div key={series.id}>
                            <Accordion>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                              >
                                <Typography className="color-white">ID: {series.id}, Name: {series.name_ru}</Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                {series.description_ru}{series.id}
                              </AccordionDetails>
                            </Accordion>
                          </div>
                        ))}
                        </AccordionDetails>
                      </Accordion>
                    </div>
                  ))}
                </TabPane>

                <TabPane tabId="link4" className="color-white">
                  {SeasonsArray.map((season) => (
                    <div key={season.id}>
                      <Accordion key={season.id}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography className="color-white">Это 4-ый таб ID: {season.id}, Name: {season.name_ru}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        {seriesArray
                        .filter((series) => series.season.id === season.id)
                        .map((series) => (
                          <div key={series.id}>
                            <Accordion>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                              >
                                <Typography className="color-white">ID: {series.id}, Name: {series.name_ru}</Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                {series.description_ru}{series.id}
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
        </Col>

      </Container>
      </div>
    </div>
  );
}