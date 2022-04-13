import LandingPage from "../../pages/LandingPage";
import RegisterPage from "../../pages/RegisterPage";
import LoginPage from "../../pages/LoginPage";
import ProfilePage from "../../pages/ProfilePage";
import FeedPage from "../../pages/FeedPage";
import SearchResultsPage from "../../pages/SearchResultsPage";
import CreateRestaurantPage from "../../pages/CreateRestaurantPage";
import RestaurantPage from "../../pages/RestaurantrPage";
import BlogPage from "../../pages/BlogPage";
import { BrowserRouter , Routes, Route } from "react-router-dom";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />}>
                <Route path="register" element={<RegisterPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="feed" element={<FeedPage />} />
                <Route path="search/?q=" element={<SearchResultsPage />} />
                <Route path="restaurant" element={<CreateRestaurantPage />} />
                <Route path="restaurant/<restaurantid>" element={<RestaurantPage />} />
                <Route path="restaurant/<restaurantid>/blog/<blogid>" element={<BlogPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;