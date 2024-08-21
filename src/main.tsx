import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ShoppingProvider } from './libs/context/shopping-provider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ShoppingProvider>
			<App />
		</ShoppingProvider>
	</React.StrictMode>,
);
