import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import { PersistGate } from "redux-persist/lib/integration/react";

import App from "./App";

import "./styles.scss";
import "antd/dist/antd.css";

ReactDOM.render(
	<Provider store={store}>
		<PersistGate loading={<div>Loading...</div>} persistor={persistor}>
			<App />
		</PersistGate>
	</Provider>,
	document.getElementById("root")
);
