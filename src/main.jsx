import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import useShopping, { ShoppingProvider } from "./context/shopping-context";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ShoppingProvider>
			<App />
		</ShoppingProvider>
	</React.StrictMode>
);
