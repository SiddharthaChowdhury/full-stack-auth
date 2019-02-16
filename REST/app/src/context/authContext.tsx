import * as React from "react";
import {PureComponent} from "react";

export interface IAuthContext {
    isAuthenticated?: boolean;
    authorize?: () => any;
    unAuthorize?: () => any;
}

export const initialAuthContext: IAuthContext = {
    isAuthenticated: undefined,
};
export const AuthContext = React.createContext(initialAuthContext);

export class AuthContextProvider extends PureComponent<IAuthContext> {
    public state: IAuthContext = initialAuthContext;

    render() {
        return(
            <AuthContext.Provider value={{
                ...this.state,
                authorize: this.authorize,
                unAuthorize: this.unAuthorize,
            }}>
                {this.props.children}
            </AuthContext.Provider>
        );
    }

    private authorize = () => {
        return this.setState({isAuthenticated: true})
    };
    private unAuthorize = () => this.setState({isAuthenticated: false});
}