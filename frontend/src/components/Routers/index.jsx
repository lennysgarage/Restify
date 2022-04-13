import LandingPage from "../../pages/LandingPage";
import { BrowserRouter , Routes, Route } from "react-router-dom";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />}>
                {/*<Route path="/register" element={<RegisterPage />}> </Route>
                <Route path="/login" element={<LoginPage />}> </Route>
                <Route path="/profile" element={<ProfilePage />}> </Route>
                <Route path="/feed" element={<FeedPage />}> </Route>
                <Route path="/search/?q=" element={<SearchResultsPage />}> </Route>
                <Route path="/restaurant" element={<CreateRestaurantPage />}> </Route>
                <Route path="/restaurant/<restaurantid>" element={<RestaurantPage />}> </Route>
                <Route path="/restaurant/<restaurantid>/blog/<blogid>" element={<BlogPage />}> </Route>*/}
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;