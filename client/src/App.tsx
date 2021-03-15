import { FC, useEffect, useState } from "react";

import "./App.css";
import { getMessage } from "./service";
import logo from "./logo.svg";

const App: FC = () => {
	const [message, setMessage] = useState("Loading...");

	useEffect(() => {
		getMessage().then(setMessage);
	}, []);

	return (
		<main role="main">
			<div>
				<img className="logo" data-testid="logo" src={logo} alt="Just the React logo" />
				<h1 className="message" data-testid="message">{message}</h1>
			</div>
		</main>
	);
};

export default App;
