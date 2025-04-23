import {
    Navigate,
    Route,
    createHashRouter,
    createRoutesFromElements,
} from "react-router-dom";
import App from "./App";
import Error from "./Content/Error/Error";
import Bus from "./utils/Bus";

import Login from "./Content/Login/Login";
import SignUp from "./Content/Login/SignUp";

import Home from "./Content/Home/Home";
import MessageWindow from "./Content/MessageWindow/MessageWindow";
import Profile from "./Content/Profile/Profile";
import ContactList from "./Content/ContactList/ContactList";

window.flash = (message, type = "success") =>
    Bus.emit("flash", { message, type });

export const router = createHashRouter(
    createRoutesFromElements(
        <Route path="/" loader={ContactList.loader} element={<App />} errorElement={<Error />}>
            <Route index element={<Home/>} />
            <Route path="messageWindow/:contactId" loader={MessageWindow.loader} element={<MessageWindow/>}/>
            <Route path="profile/:contactId" loader={Profile.loader} element={<Profile/>}/>

            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />

            <Route
                path="*"
                loader={() => {
                throw { status: 404, message: "Page Not Found" };
                }}
            />

        </Route>
    ),
)