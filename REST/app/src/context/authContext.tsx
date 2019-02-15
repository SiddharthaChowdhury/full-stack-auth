import * as React from "react";
import {PureComponent} from "react";

export interface IAuthContext {
    isAuthenticated?: boolean;
    changeAuth?: () => any;
    logout?: () => any;
}

export const initialAuthContext: IAuthContext = {
    isAuthenticated: false,
};
export const AuthContext = React.createContext(initialAuthContext);

export class AuthContextProvider extends PureComponent<IAuthContext> {
    public state: IAuthContext = initialAuthContext;

    render() {
        return(
            <AuthContext.Provider value={{
                ...this.state,
                changeAuth: this.login,
                logout: this.logout,
            }}>
                {this.props.children}
            </AuthContext.Provider>
        );
    }

    private login = () => {
        return this.setState({isAuthenticated: true})
    };
    private logout = () => this.setState({isAuthenticated: false});
}