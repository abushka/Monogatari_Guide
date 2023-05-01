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
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCat } from '@fortawesome/free-solid-svg-icons';
import { Icon } from '@iconify/react';
// import { faCrab} from '@fortawesome/fontawesome-svg-core'

// locales
import { useTranslation } from "react-i18next";

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
  NavLink,
  UncontrolledTooltip
} from "reactstrap";

export default function Anime_sequence() {

  const [iconTabs, setIconsTabs] = React.useState(1);

  const { t } = useTranslation();

  // const carouselItems = [
  //   {
  //     src: require("assets/img/denys.jpg"),
  //     altText: "Slide 1",
  //     caption: "Big City Life, United States"
  //   },
  //   {
  //     src: require("assets/img/fabien-bazanegue.jpg"),
  //     altText: "Slide 2",
  //     caption: "Somewhere Beyond, United States"
  //   },
  //   {
  //     src: require("assets/img/mark-finn.jpg"),
  //     altText: "Slide 3",
  //     caption: "Stocks, United States"
  //   }
  // ];

  
  return (
    <div className="section section-basic" id="basic-elements">
      <img alt="..." className="path" src={require("assets/img/path1.png")} />
      <div className="section-tabs">
        
      <Container>
        
      <img alt="Anime picture" className="img-fluid" src={require("assets/img/Anime_sequence.jpg")}/>
        <Col md="12">
        <div className="title">
          <h3 className="mb-3">{t("Anime_Sequence-Navigation")}</h3>
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
                      <span className="font-weight-light"> Bakemonogatari</span>
                    </NavLink>
                  </NavItem>
                  <UncontrolledTooltip
                      placement="top"
                      target="tooltip3760483123"
                    >
                      История монстров
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
                      <span className="font-weight-light"> Kizumonogatari</span>
                      {/* Kizumonogatari */}
                    </NavLink>
                  </NavItem>
                  <UncontrolledTooltip
                      placement="top"
                      target="tooltip4123123123"
                    >
                      История ран
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
                      <span className="font-weight-light"> Nisemonogatari</span>
                      {/* Nisemonogatari */}
                    </NavLink>
                  </NavItem>
                  <UncontrolledTooltip
                      placement="top"
                      target="tooltip4456345232"
                    >
                      История подделок
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
                      {/* <FontAwesomeIcon icon={faCat} /> */}
                      <Icon icon="fa6-solid:cat" style={{ fontSize: '16px'}} />
                      <span className="font-weight-light"> Nekomonogatari Kuro</span>
                      {/* Nekomonogatari kuro */}
                    </NavLink>
                  </NavItem>
                  <UncontrolledTooltip
                      placement="top"
                      target="tooltip124567854"
                    >
                      История кошки (чёрная)
                  </UncontrolledTooltip>

                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: iconTabs === 5
                      })}
                      onClick={(e) => setIconsTabs(5)}
                      href="#"
                      id="tooltip15345234234"
                    >
                      <Icon icon="material-symbols:view-list" style={{ fontSize: '18px'}} />
                      <span className="font-weight-light"> Monogatari Series: Second Season</span>
                      {/* Monogatari series: second season */}
                    </NavLink>
                  </NavItem>
                  <UncontrolledTooltip
                      placement="top"
                      target="tooltip15345234234"
                    >
                      Цикл историй: второй сезон
                  </UncontrolledTooltip>

                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: iconTabs === 6
                      })}
                      onClick={(e) => setIconsTabs(6)}
                      href="#"
                      id="tooltip15344124213"
                    >
                      <Icon icon="ph:flower-fill" style={{ fontSize: '18px'}} />
                      <span className="font-weight-light"> Hanamonogatari</span>
                      {/* Hanamonogatari */}
                    </NavLink>
                  </NavItem>
                  <UncontrolledTooltip
                      placement="top"
                      target="tooltip15344124213"
                    >
                      История цветов
                  </UncontrolledTooltip>

                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: iconTabs === 7
                      })}
                      onClick={(e) => setIconsTabs(7)}
                      href="#"
                      id="tooltip124534643"
                    >
                      <Icon icon="material-symbols:view-list" style={{ fontSize: '18px'}} />
                      <span className="font-weight-light"> Monogatari series: second season</span>
                      {/* Monogatari series: second season */}
                    </NavLink>
                  </NavItem>
                  <UncontrolledTooltip
                      placement="top"
                      target="tooltip124534643"
                    >
                      Цикл историй: второй сезон
                  </UncontrolledTooltip>

                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: iconTabs === 8
                      })}
                      onClick={(e) => setIconsTabs(8)}
                      href="#"
                      id="tooltip7567547457"
                    >
                      <Icon icon="game-icons:voodoo-doll" style={{ fontSize: '22px'}} />
                      <span className="font-weight-light"> Tsukimonogatari</span>
                      {/* Tsukimonogatari */}
                    </NavLink>
                  </NavItem>
                  <UncontrolledTooltip
                      placement="top"
                      target="tooltip7567547457"
                    >
                      История одержимости
                  </UncontrolledTooltip>

                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: iconTabs === 9
                      })}
                      onClick={(e) => setIconsTabs(9)}
                      href="#"
                      id="tooltip7235125125"
                    >
                      <Icon icon="tabler:math" style={{ fontSize: '20px'}} />
                      <span className="font-weight-light"> Owarimonogatari</span>
                      {/* Owarimonogatari */}
                    </NavLink>
                  </NavItem>
                  <UncontrolledTooltip
                      placement="top"
                      target="tooltip7235125125"
                    >
                      История финала
                  </UncontrolledTooltip>

                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: iconTabs === 10
                      })}
                      onClick={(e) => setIconsTabs(10)}
                      href="#"
                      id="tooltip07734"
                    >
                      <Icon icon="material-symbols:nature-people" style={{ fontSize: '23px'}} />
                      <span className="font-weight-light"> Koyomimonogatari</span>
                      {/* Koyomimonogatari */}
                    </NavLink>
                  </NavItem>
                  <UncontrolledTooltip
                      placement="top"
                      target="tooltip07734"
                    >
                      История Коёми
                  </UncontrolledTooltip>

                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: iconTabs === 11
                      })}
                      onClick={(e) => setIconsTabs(11)}
                      href="#"
                      id="tooltip123412251512"
                    >
                      <Icon icon="tabler:cherry-filled" style={{ fontSize: '20px'}} />
                      <span className="font-weight-light"> Owarimonogatari II</span>
                      {/* Owarimonogatari */}
                    </NavLink>
                  </NavItem>
                  <UncontrolledTooltip
                      placement="top"
                      target="tooltip123412251512"
                    >
                      История финала II
                  </UncontrolledTooltip>

                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: iconTabs === 12
                      })}
                      onClick={(e) => setIconsTabs(12)}
                      href="#"
                      id="tooltip126346326"
                    >
                      <Icon icon="solar:mirror-linear" style={{ fontSize: '22px'}} />
                      <span className="font-weight-light"> Zoku Owarimonogatari</span>
                      {/* Zoku owarimonogatari */}
                    </NavLink>
                  </NavItem>
                  <UncontrolledTooltip
                      placement="top"
                      target="tooltip126346326"
                    >
                      История финала: продолжение
                  </UncontrolledTooltip>

                </Nav>
              </CardHeader>
              <CardBody>
                <TabContent className="tab-space" activeTab={"link" + iconTabs}>
                  <hr className="line-info"/>
                  <TabPane tabId="link1">
                    <p> {t("Anime_Seguence-Bakemonogatari-description-1")}<br />
                        {t("Anime_Seguence-Bakemonogatari-description-2")}<br /><br />
                        {t("Anime_Seguence-Bakemonogatari-description-3")}<br />
                        {t("Anime_Seguence-Bakemonogatari-description-4")}


                      {/* В первых сериях может показаться что мы начинаем 
                      с середины истории и автор забыл нам показать то, что было до этого,
                      т.к. возникает вопрос "что здесь вообще происходит ?".
                      Очень печально то, что многие (в СНГ сегменте) не дожидаются самой развязки и просто перестают 
                      смотреть данный шедвер, я же, не советую переставать смотреть, я советую смотреть его дальше и уверяю Вас 
                      развязка уже близко, и кстати да, вы действительно начали с середины истории :)<br />
                      Но так задумывал автор!<br />
                      НИКОГДА НЕ СМОТРИТЕ ПО ХРОНОЛОГИИ (ну или хотя бы не при первом просмотре)<br /><br />
                      

                      Bakemonogatari! Это один из самых захватывающих и запоминающихся аниме-сериалов, который с первых минут 
                      заставляет зрителя пристально следить за каждым кадром и звуком.<br /><br />

                      Первые 5-7 минут первой серии Bakemonogatari - это настоящее шоу! Ведь именно здесь мы встречаемся с главным героем
                      сериала, Коёми Арараги, и в полной мере понимаем, что он - необычный и интересный персонаж.<br />

                      В этих первых минутах мы видим, как Коёми встречается с девушкой - Хитаги Сендзюгахара, которая, кажется, находится в беде.
                      Хитаги рассказывает Коёми о своей проблеме, и мы видим, что главный герой очень серьезно к этому относится. 
                      Его наблюдательность и внимательность к деталям, а также его остроумие и быстрота реакции позволяют ему быстро понять,
                      что происходит, и принять решение о том, что делать. <br />

                      Кроме того, в эти первые минуты мы также видим, что аниме Bakemonogatari выделяется своим необычным стилем.
                      Он наполнен деталями и символикой, которые не сразу понятны зрителю, но которые постепенно раскрываются и придают сериалу еще 
                      больше глубины и смысла.<br /><br />

                      И, конечно же, нельзя не упомянуть музыку в первых минутах Bakemonogatari! Она создает уникальную атмосферу и подчеркивает все,
                      что происходит на экране. */}
                    </p>
                  </TabPane>
                  <TabPane tabId="link2">
                    <p> 
                        {t("Anime_Seguence-Kizumonogatari-description-1")}<br /><br />
                        {t("Anime_Seguence-Kizumonogatari-description-2")}<br /><br />
                        {t("Anime_Seguence-Kizumonogatari-description-3")}                      
                    </p>
                  </TabPane>
                  <TabPane tabId="link3">
                    <p>
                        {t("Anime_Seguence-Nisemonogatari-description-1")}<br />
                        {t("Anime_Seguence-Nisemonogatari-description-2")}
                    </p>
                  </TabPane>
                  <TabPane tabId="link4">
                    <p>
                        {t("Anime_Seguence-Nekomonogatari-Kuro-description-1")}<br />
                        {t("Anime_Seguence-Nekomonogatari-Kuro-description-2")}
                    </p>
                  </TabPane>
                  <TabPane tabId="link5">
                    <p>
                        {t("Anime_Seguence-Second-Season-description-1")}<br /><br />
                        {t("Anime_Seguence-Second-Season-Nekomonogatari-Shiro-description-2")}<br />
                        {t("Anime_Seguence-Second-Season-Kabukimonogatari-description-3")}<br />
                        {t("Anime_Seguence-Second-Season-Otorimonogatari-description-4")}<br />
                        {t("Anime_Seguence-Second-Season-Onimonogatari-description-5")}<br />
                        {t("Anime_Seguence-Second-Season-Koimonogatari-description-6")}<br />
                        {t("Anime_Seguence-Second-Season-Hanamonogatari-description-7")}<br /><br />
                        {t("Anime_Seguence-Second-Season-description-8")}
                    </p>
                  </TabPane>
                  <TabPane tabId="link6">
                    <p>
                        {t("Anime_Seguence-Hanamonogatari-description-1")}<br />
                        {t("Anime_Seguence-Hanamonogatari-description-2")}<br />
                        {t("Anime_Seguence-Hanamonogatari-description-3")}
                    </p>
                  </TabPane>
                  <TabPane tabId="link7">
                    <p>
                        {t("Anime_Seguence-Second-Season-description-9")}<br />
                        {t("Anime_Seguence-Second-Season-description-10")}
                    </p>
                  </TabPane>
                  <TabPane tabId="link8">
                    <p>
                        {t("Anime_Seguence-Tsukimonogatari-description-1")}<br />
                        {t("Anime_Seguence-Tsukimonogatari-description-2")}
                    </p>
                  </TabPane>
                  <TabPane tabId="link9">
                    <p>
                        {t("Anime_Seguence-Owarimonogatari-description-1")}<br />
                        {t("Anime_Seguence-Owarimonogatari-description-2")}<br />
                        {t("Anime_Seguence-Owarimonogatari-description-3")}
                    </p>
                  </TabPane>
                  <TabPane tabId="link10">
                    <p>
                        {t("Anime_Seguence-Koyomimonogatari-description-1")}<br />
                        {t("Anime_Seguence-Koyomimonogatari-description-2")}
                    </p>
                  </TabPane>
                  <TabPane tabId="link11">
                    <p>
                        {t("Anime_Seguence-Owarimonogatari-II-description-1")}<br />
                        {t("Anime_Seguence-Owarimonogatari-II-description-2")}
                    </p>
                  </TabPane>
                  <TabPane tabId="link12">
                    <p>
                        {t("Anime_Seguence-Zoku-Owarimonogatari-description-1")}<br />
                        {t("Anime_Seguence-Zoku-Owarimonogatari-description-2")}
                    </p>
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>

          {/* <Row className="justify-content-between align-items-center">
            <UncontrolledCarousel items={carouselItems} />
          </Row> */}
        </Col>
      </Container>
      </div>
    </div>
  );
}
