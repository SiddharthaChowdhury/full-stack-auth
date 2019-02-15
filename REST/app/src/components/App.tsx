import * as React from "react";
import {Login} from "./login/Login";
import {AuthContext} from "../context/authContext";
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
    constructor (props: IAppProps) {
        super(props)
    }

    public render() {
        return (
            <AuthContext.Consumer>
                {(context) => {
                    if (context.isAuthenticated) {
                        return <Home/>
                    }
                    return (
                        <Login/>
                    )
                }}
            </AuthContext.Consumer>
        );
    }
}