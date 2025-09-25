import { createBrowserRouter } from "react-router-dom";
import Browse from "./Browse"
import Logins from "./Logins"
import { RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import {onAuthStateChanged } from "firebase/auth";
import {auth} from "../utills/firebase"
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utills/userSlice";



const BodyA = () => {
    const dispatch = useDispatch();
    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Logins />,
        },
        {
            path: "/browse",
            element: <Browse />,
        },
    ]);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const {uid, email, displayName, photoURL} = user;
                dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL, }));
                
            } else {
                dispatch(removeUser());
                
            }
    });

    },);
    return (
        <div>
            <RouterProvider router={appRouter}/>
        </div>
    );
};

export default BodyA;
