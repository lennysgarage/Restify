import LandingPage from "../../pages/LandingPage";
import { BrowserRouter , Routes, Route } from "react-router-dom";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />}>
                    {/* Add other routers here */ }
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;