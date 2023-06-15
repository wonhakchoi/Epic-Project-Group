import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ResLists from "./pages/ResLists";
import Friends from "./pages/Friends";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <NavigationBar />
                <Routes>
                    <Route exact path="/" element={<Home />}></Route>
                    <Route path={"/lists"} element={<ResLists />}></Route>
                    <Route path={"/friends"} element={<Friends />}></Route>
                    <Route path="/*" element={<NotFound />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
