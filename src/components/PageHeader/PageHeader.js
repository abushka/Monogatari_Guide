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

// Icons
import { Icon } from '@iconify/react';

// reactstrap components
import { Button, Container } from "reactstrap";

export default function PageHeader() {
  const { t } = useTranslation();
  
  return (
    <div className="page-header header-filter">
      <div className="squares square1" />
      <div className="squares square2" />
      <div className="squares square3" />
      <div className="squares square4" />
      <div className="squares square5" />
      <div className="squares square6" />
      <div className="squares square7" />
      <Container>
      <div>
      </div>
        <div className="content-center brand">
          <h1 className="h1-seo">{t("PageHeader-welcome")}</h1>
          <h3 className="d-none d-md-block">
            {t("PageHeader-from-amateur")} <br/>
            {t("PageHeader-copyright")}
            <Icon icon="material-symbols:arrow-circle-down" style={{ fontSize: '32px'}} />
          </h3>
          <Button
                className="nav-link d-none d-md-block"
                color="primary"
                size="lg"
                target="_blank"
                href="https://monogatari-series.com"
              >
                <Icon icon="mdi:cards-heart-outline" style={{ fontSize: '20px'}} /> Monogatari-series.com <Icon icon="mdi:cards-heart-outline" style={{ fontSize: '20px'}} />
          </Button>
        </div>
      </Container>
    </div>
  );
}
