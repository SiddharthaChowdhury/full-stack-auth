import * as React from "react";
import auth from "./auth";
import {IAuthRequest} from "../../utils/api";
import {Redirect, Route} from "react-router";
import {Home} from "../home/Home";
import {AuthContext} from "../../context/authContext";

interface ILoginState {
    user?: string;
    password?: string;
    message?: string;
    redirectHome?: boolean;
}

interface ILoginProps extends ILoginState{}

const initialState: ILoginState = {user: "", password: "", message: "", redirectHome: false};

export class Login extends React.PureComponent<ILoginProps> {
    public state: ILoginState = initialState;
    static contextType = AuthContext;
    constructor (props: ILoginProps) {
        super(props);
    }
    public render() {
        return (
            <React.Fragment>
                <h3>{this.state.message}</h3>
                <div>
                    <label>Username </label>
                    <input onChange={this.handleChange} type="text" name="user" value={this.state.user}/>
                </div>
                <br/>
                <div>
                    <label>Password </label>
                    <input onChange={this.handleChange} type="password" name="password" value={this.state.password}/>
                </div>
                <button onClick={this.makeLogin}>Login</button>
            </React.Fragment>
        )
    }

    private handleChange = (e: any) => {
        const target = e.target;
        this.setState({
            [target.name]: target.value
        });
    };

    private makeLogin = () => {
        const {user, password} = this.state;
        const authInfo: IAuthRequest = {
            email: this.state.user!,
            password: this.state.password!,
        };
        auth.login(authInfo, (err, msg) => {
            if(err){
                console.log("IS error")
                this.setState({message: err.toString()});
                return;
            }
            this.context.changeAuth();
        })
    }
}
