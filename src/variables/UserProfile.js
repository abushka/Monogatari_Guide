import axios from 'axios';
import authStore from './AuthStore';

export const UserProfile = async (setUser) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_PROTOCOL}${process.env.REACT_APP_API_HOST}/api/auth/user/`, {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`
      }
    });
    console.log(response.data);

    setUser(response.data);
    // history.push('/');
  } catch (error) {
    console.error(error);
    // Обработка ошибок
  }
};