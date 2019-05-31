import React, { Component } from "react";
import "./appcontainer.css"

export default class AppContainer extends Component {
    renderRoutes = () => {
        const { children } = this.props;
        class Routes extends Component {
            render() {
                return (
                    <div>
                        {children}
                    </div>
                );
            }
        };
        return Routes;
    }

    render() {
        const RouteManifest = this.renderRoutes();
        return (
            <>
                <>
                    <div className={"app-title"}>Feedback.io</div>
                    <RouteManifest/>
                </>
            </>
        )
    }
}