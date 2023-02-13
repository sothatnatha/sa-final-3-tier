// import { useContext, createContext, useEffect, useState } from "react";

// import {
//   GoogleAuthProvider,
//   signInWithPopup,
//   signInWithRedirect,
//   signOut,
//   onAuthStateChanged,
// } from "firebase/auth";
// import { auth } from "../firebase";

// const AuthContext = createContext();

// export const AuthContextProvider = ({ children }) => {
//   const googleSignin = () => {
//     const provider = new GoogleAuthProvider();
//     // signInWithPopup(auth, provider);
//     signInWithRedirect(auth, provider);
//   };

//   const logOut = () => {
//     signOut(auth);
//   };
//   const [user, setUser] = useState({});

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (curentUser) => {
//       setUser(curentUser);
//       console.log(curentUser);
//     });
//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   return (
//     <AuthContext.Provider value={{ googleSignin, logOut, user }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const UserAuth = () => {
//   return useContext(AuthContext);
// };
