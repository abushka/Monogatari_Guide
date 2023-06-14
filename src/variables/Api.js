// import React, { createContext, useState, useEffect } from 'react';
// import { UserProfile } from './UserProfile';

// export const UserContext = createContext();

// export const ApiProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [lastLogin, setLastLogin] = useState('');
//   const [dateJoined, setDateJoined] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       const userData = await UserProfile();
//       if (userData) {
//         setUser(userData);
//         setLastLogin(userData.last_login);
//         setDateJoined(userData.date_joined);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <UserContext.Provider value={{ user, lastLogin, dateJoined }}>
//       {children}
//     </UserContext.Provider>
//   );
// };