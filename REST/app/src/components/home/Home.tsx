import * as React from "react";

interface IHomeProps {}

export class Home extends React.PureComponent<IHomeProps> {
    public render() {
        return (
            <React.Fragment>
                <h1>Home</h1>
                <div>is where we define protected routes</div>
            </React.Fragment>
        );
    }
}