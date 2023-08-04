import "./App.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Home from "./pages/Home";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";
import Collections from "./pages/Collections";
import Friends from "./pages/Friends";
import CollectionPage from "./components/collections/CollectionPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Discover from "./pages/Discover";
import RestaurantSpotlight from "./pages/RestaurantSpotlight";
import { useEffect } from "react";
import { getCollectionsAsync } from "./redux/thunks/collectionsThunks";
import { useDispatch } from "react-redux";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <NavigationBar />
                <Routes>
                    <Route exact path="/" element={<Home />}></Route>
                    <Route path={"/search"} element={<Search />}></Route>
                    <Route path={"/collections"} element={<Collections />}></Route>
                    <Route path={"/collections/:collectionId"} element={<CollectionPage />}></Route>
                    <Route path={"/restaurants/:placeID"} element={<RestaurantSpotlight />}></Route>
                    <Route path={"/friends/*"} element={<Friends />}></Route>
                    <Route path={"/login"} element={<Login />}></Route>
                    <Route path={"/signup"} element={<Signup />}></Route>
                    <Route path={"/profile"} element={<Profile />}></Route>
                    <Route path={"/discover"} element={<Discover />}></Route>
                    <Route path="/*" element={<NotFound />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
