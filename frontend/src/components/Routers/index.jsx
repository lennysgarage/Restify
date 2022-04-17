import LandingPage from "../../pages/LandingPage";
import RegisterPage from "../../pages/RegisterPage";
import LoginPage from "../../pages/LoginPage";
import ProfilePage from "../../pages/ProfilePage";
import FeedPage from "../../pages/FeedPage";
import SearchResultsPage from "../../pages/SearchResultsPage";
import CreateRestaurantPage from "../../pages/CreateRestaurantPage";
import RestaurantPage from "../../pages/RestaurantPage";
import AddBlogPage from "../../pages/AddBlogPage";
import BlogPage from "../../pages/BlogPage";
import Layout from "../../pages/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditRestaurantPage from "../../pages/EditRestaurantPage";
import AddMenuPage from "../../pages/AddMenuPage";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index={true} element={<LandingPage />} />
                    <Route path="register" element={<RegisterPage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="feed" element={<FeedPage />} />
                    <Route path="search/" element={<SearchResultsPage />} />
                    <Route path="search/:query" element={<SearchResultsPage />} />
                    <Route path="restaurant" element={<CreateRestaurantPage />} />
                    <Route path="restaurant/:restaurant_id" element={<RestaurantPage />} />
                    <Route path="restaurant/:restaurant_id/edit" element={<EditRestaurantPage />} />
                    <Route path="restaurant/:restaurant_id/addmenu" element={<AddMenuPage />} />
                    <Route path="restaurant/:restaurant_id/addblog" element={<AddBlogPage />} />
                    <Route path="restaurant/:restaurant_id/blogs/" element={<BlogPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;