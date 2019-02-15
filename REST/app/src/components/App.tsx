import * as React from "react";
import {Login} from "./login/Login";
import {Loading} from "./loading/Loading";
import {Redirect} from "react-router";
import auth from "./login/auth";
import {IdPersistence, utilPersistence} from "../utils/utilPersistence";
import {AuthContext, IAuthContext} from "../context/authContext";
import {Home} from "./home/Home";
interface IAppState {
    isAuthenticated?: boolean;
}
interface IAppProps extends IAppState{}

const initialState: IAppState = {
    isAuthenticated: undefined
};

export class App extends React.PureComponent<IAppProps> {
    public state: IAppState = initialState;
    static contextType = AuthContext;

    constructor (props: IAppProps) {
        super(props)
    }

    public render() {
        if (this.context.isAuthenticated) { // another way of accessing context (however seems deprecated)
            return <Home/>
        }
        return (
            <Login/>
        )
    }
}