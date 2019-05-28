import "./index.css";
import { MicroModule } from "react-redux-patch";
import AppContainer from "@AppContainer/AppContainer";
import routes from "@routes/index";
import reducers from "@reducers/index";
import * as serviceWorker from "./serviceWorker";

const microModule = new MicroModule("feedback-io", routes, reducers, AppContainer, "root");

if (module.hot) {
    module.hot.accept("@routes/index", () => {
        microModule._render(routes);
    });
}

// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();