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

// locales
import { useTranslation } from "react-i18next";

// reactstrap components
import {
  Button,
  Container,
  Row,
  Col
} from "reactstrap";

export default function Useful_links() {
  const { t } = useTranslation();

  return (
    <div className="section section-basic" id="basic-elements">
      <img alt="..." className="path" src={require("assets/img/path1.png")} />
      <Container>
        
        <h3>{t("Useful_links-useful-links")}</h3>
        <Row>
          <Col md="12">
            
            <Button 
            className="btn-link" 
            color="success"
            target="_blank"
            href="https://docs.google.com/spreadsheets/u/0/d/1LCuqahTKzkdCFvRp6cL3hzUkMZFuYjgB53hrZgdZZHg/htmlview#"
            role="button">
              {t("Useful_links-Google-Docs")}
            </Button>

            <Button 
            className="btn-link" 
            color="warning"
            target="_blank"
            href="https://www.reddit.com/r/araragi/comments/5eilqt/monogatari_short_stories_translation_project/"
            role="button">
              {t("Useful_links-Reddit")}
            </Button>            

            <Button 
            className="btn-link" 
            color="info"
            target="_blank"
            href="https://github.com/Chortowod/Monogatari-Series-Checklist-Ru/releases/"
            role="button">
              {t("Useful_links-check-chronology-windows-app")}
            </Button>

            <Button 
            className="btn-link" 
            color="danger"
            target="_blank"
            href="https://bakemonogatari.fandom.com/wiki/Bakemonogatari_Wiki"
            role="button">
              {t("Useful_links-fandom")}
            </Button>

            <Button
            className="btn-link"  
            color="success"
            target="_blank"
            href="https://abushka.uz/beautiful_site"
            role="button"
            > {t("Useful_links-beautiful-site")} 
            </Button>

            {/* <Button 
            className="btn-link" 
            color="primary"
            target="_blank"
            href="https://t.me/YaJ75"
            role="button">
              Success
            </Button>

            <Button 
            className="btn-link" 
            color="primary"
            target="_blank"
            href="https://t.me/YaJ75"
            role="button">
              Success
            </Button>

            <Button 
            className="btn-link" 
            color="primary"
            target="_blank"
            href="https://t.me/YaJ75"
            role="button">
              Success
            </Button> */}


          </Col>
        </Row>
        
      </Container>
    </div>
  );
}
