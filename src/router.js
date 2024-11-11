import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/resetpassword";
import Changepassword from "./components/Changepassword";
import LogoutModal from "./components/Logout";
import Home from "./components/Home";
import Subscribe from "./components/Subscribe";
import MovieDetails from "./components/MovieDetails";
import Plandetails from "./components/plandetails";
import SubscriptionsHistory from "./components/subscriptionhistory";
import WatchHistory from "./components/watchHistory";
import WishList from "./components/WishList";
// import wishListDetails from "./components/wishlistdetail";

const router=createBrowserRouter([
    {path:'',element:<App/>},
    {path:'login',element:<Login/>},
    {path:'signup',element:<Signup/>},
    {path:'forgotpassword',element:<ForgotPassword/>},
    {path:'changepassword',element:<Changepassword/>},
    


    {path:'home',element:<Home/>},
    { path: 'home/:id', element: <MovieDetails /> },  // Ensure this is correct


    {path:'subscribe',element:<Subscribe/>},
    {path:'subscribe/:id',element:<Plandetails/>},
    {path:'subshistory',element:<SubscriptionsHistory/>},
    {path:'logout',element:<LogoutModal/>},


    {path:'watchhistory',element:<WatchHistory/>},
    {path:'wishlist',element:<WishList/>},
    // {path:'wishlistdetails',element:<wishListDetails/>},





])

export default router;