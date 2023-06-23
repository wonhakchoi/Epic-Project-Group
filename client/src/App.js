import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Collections from "./pages/Collections";
import Friends from "./pages/Friends";
import CollectionPage from "./components/collections/CollectionPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <NavigationBar />
                <Routes>
                    <Route exact path="/" element={<Home />}></Route>
                    <Route path={"/collections"} element={<Collections />}></Route>
                    <Route path={"/collections/*"} element={<CollectionPage />}></Route>
                    <Route path={"/friends"} element={<Friends />}></Route>
                    <Route path={"/login"} element={<Login />}></Route>
                    <Route path={"/signup"} element={<Signup />}></Route>
                    <Route path="/*" element={<NotFound />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
