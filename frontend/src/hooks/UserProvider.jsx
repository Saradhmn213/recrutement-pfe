// src/providers/UserProvider.jsx
import { useState } from "react";
import PropTypes from "prop-types";
import { UserContext } from "./UserContext";

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	const login = async (email, password) => {
		return fetch("http://localhost:3000/api/auth/login", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});
	};

	return (
		<UserContext.Provider value={{ user, setUser, login }}>
			{children}
		</UserContext.Provider>
	);
};

UserProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
