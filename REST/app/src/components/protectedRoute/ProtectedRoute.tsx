import * as React from "react";
import {Redirect, Route} from "react-router";
import auth from "../login/auth";
import {IdPersistence, utilPersistence} from "../../utils/utilPersistence";

interface IProtectedRouteProps{
    component: typeof React.PureComponent | typeof React.Component,
    path: string,
}

export const ProtectedRoute: React.FC <IProtectedRouteProps> = ({component: ProtectedComponent, ...rest}) => {
    const {token} = utilPersistence.getValue(IdPersistence.auth);
    if (!token) {
        return <Redirect to={"/"}/>
    }
    return (
        <Route {...rest} render={(props) => {
            return (
                auth.isAuthenticated(token)
                    .then(() => <ProtectedComponent {...props} />)
                    .catch(() => <Redirect to={"/"}/>)
            )
        }} />
    );
}

interface IProtectedRouteState {
    canAccess?: boolean;
}
