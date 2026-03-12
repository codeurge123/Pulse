import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>


        <Auth0Provider
          domain="dev-83i2gu87lkqeektj.us.auth0.com"
          clientId="fO0AZa8ZxdudKdX2eOPZxK8UzWAOExGh"
          authorizationParams={{
            redirect_uri: window.location.origin,
            audience: "https://pulse-api",
            scope: "openid profile email"
          }}
        >
          <App />
        </Auth0Provider>

      </PersistGate>
    </Provider>
  </React.StrictMode>
);