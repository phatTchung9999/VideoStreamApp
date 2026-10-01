import SignIn from "./Auth/SignIn.js";
import SignUp from "./Auth/SignUp.js";
import Header from "./Navbar/Header.js";
import VideoList from "./Video/VideoList.js";
import Video from "./Video/Video.js";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";



export default function Index(props) {
    const { isLoggedIn, setIsLoggedIn } = props
    return (
        <div>
            <Header isLoggedIn={isLoggedIn} />
            <BrowserRouter>
                {isLoggedIn ?
                    <Routes>
                        <Route path="/video" element={<VideoList setIsLoggedIn={setIsLoggedIn}/>}>
                        </Route>
                        <Route path="/video/:id" element={<Video setIsLoggedIn={setIsLoggedIn}/>}>
                        </Route>
                    </Routes>
                    :
                    <Routes>
                        <Route path="/" element={<SignIn setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />}>
                        </Route>
                        <Route path="/signup" element={<SignUp setIsLoggedIn={setIsLoggedIn} />}>
                        </Route>
                    </Routes>
                }
            </BrowserRouter>
        </div>

    )
}