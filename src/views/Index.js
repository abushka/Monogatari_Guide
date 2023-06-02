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
import React, {useEffect, useState} from "react";
import axios from 'axios';
import { useCookies } from 'react-cookie';


// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import PageHeader from "components/PageHeader/PageHeader.js";
import Footer from "components/Footer/Footer.js";

// locales
import i18n from "../components/i18n.js";
import { I18nextProvider } from "react-i18next";

// sections for this page/view
import Anime_sequence from "views/IndexSections/Anime_sequence.js"
import Useful_links from "views/IndexSections/Useful_links"
import Suggestion from "views/IndexSections/Suggestion.js"
// import Basics from "views/IndexSections/Basics.js";
// import Navbars from "views/IndexSections/Navbars.js";
// import Tabs from "views/IndexSections/Tabs.js";
// import Pagination from "views/IndexSections/Pagination.js";
// import Notifications from "views/IndexSections/Notifications.js";
// import Typography from "views/IndexSections/Typography.js";
// import JavaScript from "views/IndexSections/JavaScript.js";
// import NucleoIcons from "views/IndexSections/NucleoIcons.js";
// import Signup from "views/IndexSections/Signup.js";
// import Examples from "views/IndexSections/Examples.js";
// import Download from "views/IndexSections/Download.js";


export default function Index() {
  const [cookies, setCookie, removeCookie] = useCookies(['access', 'refresh', 'user']);
  const [accessToken, setAccessToken] = useState(cookies.access);

  useEffect(() => {
    setAccessToken(cookies.access);
    console.log('проверочный токен в хуках:', accessToken);
  }, [cookies.access]);

  useEffect(() => {
    // Функция для проверки и обновления токена доступа
    const refreshAccessToken = async () => {
      const verifyUrl = `${process.env.REACT_APP_API_PROTOCOL}${process.env.REACT_APP_API_HOST}${process.env.REACT_APP_API_PORT}/api/auth/token/verify/`;
      const refreshUrl = `${process.env.REACT_APP_API_PROTOCOL}${process.env.REACT_APP_API_HOST}${process.env.REACT_APP_API_PORT}/api/auth/token/refresh/`;
      const refreshToken = cookies.refresh;

      try {
        // Проверяем валидность токена
        await axios.post(verifyUrl, { token: accessToken });

        console.log('Токен валиден.');
      } catch (error) {
        console.log('Токен недействителен. Получаем новый токен.');

        try {
          // Обновляем токен
          const response = await axios.post(refreshUrl, { refresh: refreshToken });

          const newAccessToken = response.data.access;

          if (cookies.access) {
            removeCookie('access');
          }
          setCookie('access', newAccessToken, { expires: new Date(Date.now() + 86400 * 7 * 1000) });
          console.log('проверочный токен:', accessToken);
          console.log('Новый токен получен:', newAccessToken);

          // Далее вы можете использовать новый токен для доступа к защищенным ресурсам
        } catch (error) {
          console.log('Не удалось получить новый токен.');
        }
      }
    };

    // Вызываем функцию refreshAccessToken при загрузке компонента
    refreshAccessToken();

    // Вы можете также вызывать функцию refreshAccessToken в других событиях или интервалах,
    // например при переходе пользователя на новую страницу или каждые 5 минут:

    // При переходе пользователя на новую страницу
    // window.addEventListener('beforeunload', refreshAccessToken);

    // Каждые 5 минут
    setInterval(() => {
      refreshAccessToken();
    }, 10 * 1000);

    // Очищаем обработчик события при размонтировании компонента
    // return () => {
    //   window.removeEventListener('beforeunload', refreshAccessToken);
    // };
  }, []);

  // Остальная часть вашего компонента


  return (
    <I18nextProvider i18n={i18n}>
      <IndexNavbar />
      <div className="wrapper">
        <PageHeader />
        <div className="main">
          <Anime_sequence />
          <Useful_links />
          {/* <Basics /> */}
          {/* <Navbars /> */}
          {/* <Tabs /> */}
          {/* <Pagination /> */}
          {/* <Notifications /> */}
          {/* <Typography /> */}
          {/* <JavaScript /> */}
          {/* <NucleoIcons /> */}
          {/* <Signup /> */}
          {/* <Examples /> */}
          <Suggestion />
          {/* <Download /> */}
        </div>
        <Footer />
      </div>
    </I18nextProvider>
  );
}
