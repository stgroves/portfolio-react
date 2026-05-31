import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import {BrowserRouter} from "react-router-dom";
import App from './App';
import {initializeRegistryManager} from "./classes/registry-manager";

const root = document.getElementById('root');

function main(): void {
	if (!root)
		return;

	initializeRegistryManager();

	createRoot(root).render(
		<StrictMode>
			<BrowserRouter>
				<App/>
			</BrowserRouter>
		</StrictMode>,
	)
}

main();