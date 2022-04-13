import LandingPage from "../../pages/LandingPage";
import { BrowserRouter , Routes, Route } from "react-router-dom";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />}>
                {/*<Route path="register" element={<RegisterPage />}> />
                <Route path="login" element={<LoginPage />}> />
                <Route path="profile" element={<ProfilePage />}> />
                <Route path="feed" element={<FeedPage />}> />
                <Route path="search/?q=" element={<SearchResultsPage />}> />
                <Route path="restaurant" element={<CreateRestaurantPage />}> />
                <Route path="restaurant/<restaurantid>" element={<RestaurantPage />}> />
                <Route path="restaurant/<restaurantid>/blog/<blogid>" element={<BlogPage />}> />*/}
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;