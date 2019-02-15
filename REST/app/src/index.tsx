import * as React from 'react';
import * as ReactDOM from "react-dom";
import {App} from "./components/App";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import {AuthContext, AuthContextProvider, initialAuthContext} from "./context/authContext";

ReactDOM.render(
    <Router>
        <AuthContextProvider>
            <Route exact path="/" component={App} />
        </AuthContextProvider>
    </Router>,
    document.getElementById("root")
);