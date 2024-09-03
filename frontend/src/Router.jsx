import {
  createBrowserRouter,
} from "react-router-dom";

import App from "./App";
import Home from "./pages/Home/Home";
import LoginForm from "./pages/Login/Login";
import RegisterForm from "./pages/Register/Register";
import FoodMenuCreateForm from "./components/create/CreateMenuForm";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import CartPage from "./pages/CartPage/CartPage";
import FoodPage from "./pages/FoodPage/FoodPage";
import Checkout from "./pages/Checkout/Checkout";
import AuthRoute from "./components/AuthRoute";
import UserControlPage from "./pages/Admin/UserControlPage";
import OrdersPage from "./pages/Admin/OrdersPage";
import OrderHistoryPage from "./pages/Admin/OrdersHistory";
import UserOrderHistory from "./pages/UserOrderHistory/UserOrderHistory";
import RateFood from "./components/Rating/Rating";

import AllFoodPage from "./pages/AllFoodPage/AllFoodPage";
import NotFound from "./components/NotFound/NotFound.jsx";
import UserProfilePage from "./pages/UserProfile/UserProfile.jsx";
import AuthForLogin from "./components/AuthForLogin.jsx";

// Define the router
const router = createBrowserRouter(
  [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />,
      },
       {
        path: '/foods',
        element: <AllFoodPage/>,
      },
      {
        path: '/search/:searchTerm',
        element: <Home />,
      },
      {
        path: "/tag/:tag",
        element: <Home />,
      },
      {
        path: "/food/:id",
        element:
        
        <FoodPage />, // Food page accessible from home and admin
      },
    
      
       
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/services',
        element: <Services />
      },
      {
        path: '/contact',
        element: <Contact />
      },
      {
        path: '/userprofile',
        element: 
        <AuthForLogin>

          <UserProfilePage />
        </AuthForLogin>
      },
      {
        path: '/rating/:id',
        element: 
        <AuthForLogin>
          <RateFood />

        </AuthForLogin>
      },
      {
        path: '/create/:id',
        element: 
          <AuthRoute  isAdmin={true}>
            <FoodMenuCreateForm />
          </AuthRoute>
      },
      {
        path: '/create',
        element: 
          <AuthRoute  isAdmin={true}>
            <FoodMenuCreateForm />
          </AuthRoute>
      },
      {
        path: '/usercontrol',
        element: 
          <AuthRoute isAdmin={true}>
            <UserControlPage />
          </AuthRoute>
      },
      {
        path: '/orderscontrol',
        element: 
          <AuthRoute isAdmin={true}>
            <OrdersPage />
          </AuthRoute>
      },
      {
        path: '/ordershistory',
        element: 
          <AuthRoute isAdmin={true}>
            <OrderHistoryPage />
          </AuthRoute>
      },
      {
        path: '/cart',
        element: <CartPage />
      },
      {
        path: '/userorderhistory',
        element: 
        <AuthForLogin>

          <UserOrderHistory />
        </AuthForLogin>
      },
      {
        path: '/orders',
        element: <Home />
      },
      {
        path: '/checkout',
        element:
        <AuthForLogin>

          <Checkout />
        </AuthForLogin>
      },
      {
        path: 'login',
        element: <LoginForm />
      },
      {
        path: 'register',
        element: <RegisterForm />
      },
      {
        path: '*',
        element: <NotFound/> // 404 page
      },
      
    ]
  },
]);

export default router;
