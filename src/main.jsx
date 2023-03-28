import React, { Profiler } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import useShopping, { ShoppingProvider } from "./context/shopping-context";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<Profiler
		id="test"
		onRender={(...args) => {
			const {
				[0]: id,
				[1]: phase,
				[2]: actualDuraction,
				[3]: baseDuration,
				[4]: startTime,
			} = args;
			console.info({
				id,
				phase,
				actualDuraction,
				baseDuration,
				startTime,
			});
		}}
	>
		<ShoppingProvider>
			<App />
		</ShoppingProvider>
	</Profiler>
);
