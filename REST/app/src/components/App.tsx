import * as React from "react";
import {Login} from "./login/Login";
import {AuthContext} from "../context/authContext";
import {Home} from "./home/Home";
import {Loading} from "./loading/Loading";
import auth from "./login/auth";
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
        return (
            // just another way of using context
            <AuthContext.Consumer>
                {(context) => {
                    switch(context.isAuthenticated) {
                        case false:
                            return <Login/>;
                        case true:
                            return <Home/>;
                        default:
                            return <Loading/>;
                    }
                }}
            </AuthContext.Consumer>
        );
    }

    public componentDidMount(): void {
        auth.verifyAuth((err, data) => {
            if (err){
                this.context.unAuthorize();
                return;
            }

            this.context.authorize();
            return;
        })
    }
}