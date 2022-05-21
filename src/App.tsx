import React, { useEffect } from "react";
import styles from "./App.module.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  HomePage,
  NotFound,
  SignInPage,
  RegisterPage,
  Detail,
  SearchPage,
  ShoppingCartPage,
  PlaceOrderPage,
} from "./pages";
import { Navigate } from "react-router-dom";
import { useSelector } from "./redux/hooks";
import { useDispatch } from "react-redux";

// const PrivateRoute = ({ element, isAuthenticated, ...rest }) => {
//   const RouteComponent: any = (props) => {
//     return isAuthenticated ? (
//       React.createElement(element, props)
//     ) : (
//       <Route element={<Navigate to="/signIn" />} />
//     );
//   };
// TODO
// return <Route element={<RouteComponent />}></Route>;
// };

export const ProtectedRoute = ({ children }) => {
  const jwt = useSelector((s) => s.user.token);

  // const { user } = useAuth();
  if (!jwt) {
    // user is not authenticated
    return <Navigate to="/signIn" />;
  }
  return children;
};

function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signIn" element={<SignInPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/detail/:touristRouteID" element={<Detail />}></Route>
          <Route path="/search/:keywords" element={<SearchPage />}></Route>
          <Route
            path="/shoppingCart"
            element={
              <ProtectedRoute>
                <ShoppingCartPage />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/placeOrder"
            element={
              <ProtectedRoute>
                <PlaceOrderPage />
              </ProtectedRoute>
            }
          ></Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
