import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import RouteIndex from "./router/RouteIndex";
import { authService } from "src/services/authService";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        authService.restoreSession(dispatch).then(r => console.log(r));
    }, [dispatch]);

    return (
        <React.Fragment>
            <RouteIndex />
        </React.Fragment>
    );
};

export default App;
