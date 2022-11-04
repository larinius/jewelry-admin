import { createRoot } from "react-dom/client";

// third party
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

// auth
import { Auth0Provider } from "@auth0/auth0-react";

// project imports
import * as serviceWorker from "serviceWorker";
import App from "App";
import { store } from "store";

// style + assets
import "assets/scss/style.scss";
import config from "./config";

// ==============================|| REACT DOM RENDER  ||============================== //

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <Provider store={store}>
        <BrowserRouter basename={config.basename}>
            <Auth0Provider
                domain={process.env.REACT_APP_AUTH0_DOMAIN}
                clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
                redirectUri={window.location.origin}
            >
                <App />
            </Auth0Provider>
        </BrowserRouter>
    </Provider>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
