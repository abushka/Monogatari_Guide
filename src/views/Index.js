import React, { useEffect } from "react";
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { observer } from 'mobx-react-lite';
import authStore from "variables/AuthStore.js";

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

const Index = observer(() => {
  const [cookies, setCookie, removeCookie] = useCookies(['access', 'refresh', 'user']);

  useEffect(() => {
    authStore.setAccessToken(cookies.access);
    // console.log('проверочный токен в хуках:', authStore.accessToken);
  }, [cookies.access]);

  useEffect(() => {
    const refreshAccessToken = async () => {
      const verifyUrl = `${process.env.REACT_APP_API_PROTOCOL}${process.env.REACT_APP_API_HOST}${process.env.REACT_APP_API_PORT}/api/auth/token/verify/`;
      const refreshUrl = `${process.env.REACT_APP_API_PROTOCOL}${process.env.REACT_APP_API_HOST}${process.env.REACT_APP_API_PORT}/api/auth/token/refresh/`;
      const refreshToken = cookies.refresh;
      // console.log(authStore.accessToken)

      // console.log(cookies.refresh)
      if (authStore.accessToken == '' && cookies.refresh == '' || authStore.accessToken == undefined && cookies.refresh == undefined ||
          authStore.accessToken == '' && cookies.refresh == undefined || authStore.accessToken == undefined && cookies.refresh == ''
      ) {
        console.log('Не найден токен в cookie. Завершение проверки валидности токена.');
        return;
      }

      try {
        await axios.post(verifyUrl, { token: authStore.accessToken });
        console.log('Токен валиден.');
      } catch (error) {
        console.log('Токен недействителен. Получаем новый токен.');

        try {
          const response = await axios.post(refreshUrl, { refresh: refreshToken });
          const newAccessToken = response.data.access;

          if (cookies.access) {
            removeCookie('access');
          }
          setCookie('access', newAccessToken, { expires: new Date(Date.now() + 86400 * 7 * 1000) });

          authStore.setAccessToken(newAccessToken);

          // console.log('проверочный токен:', authStore.accessToken);
          console.log('Новый токен получен:', newAccessToken);

        } catch (error) {
          if (cookies.access) {
            removeCookie('access');
            authStore.setAccessToken('')
          }
          if (cookies.refresh) {
            cookies.refresh = ''
            removeCookie('refresh');
          }
          if (cookies.user) {
            removeCookie('user');
          }
          console.log('Не удалось получить новый токен.');

          // return alert('Вам нужно залогиниться')
        }
      }
    };
    if (cookies.refresh) {
      refreshAccessToken();

      setInterval(() => {
        refreshAccessToken();
      }, 60 * 10 * 1000);
    }

  }, []);

  React.useEffect(() => {
    document.body.classList.toggle("index-page");
    return function cleanup() {
      document.body.classList.toggle("index-page");
    };
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <IndexNavbar />
      <div className="wrapper">
        <PageHeader />
        <div className="main">
          <Anime_sequence />
          <Useful_links />
          <Suggestion />
        </div>
        <Footer />
      </div>
    </I18nextProvider>
  );
});

export default Index;