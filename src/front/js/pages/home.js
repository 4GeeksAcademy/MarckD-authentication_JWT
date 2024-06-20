import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";


export const Home = () => {
	const { actions } = useContext(Context);
	const navigate = useNavigate();
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState("")

	const handleSubmit = async(e) => {
		e.preventDefault();
		try {
			const success = await actions.login(email, password)
			if(!success) {
				setError("Invalid email or password")
			} else {
				setError("")
				navigate("/private")
			}
		} catch (error) {
			setError("An error occurred while loggin in")
			console.error("Login error:", error)
		}
	}

	return (
		<>
			<header className="text-center">
				<h1>WELCOME!</h1>
			</header>

			<main>

				<form className="text-center" onSubmit={handleSubmit}>
					<fieldset>
						<div>
							<legend>Email</legend>
							<input 
								style={{"width":"360px", "height":"35px"}}
								type="email" 
								placeholder="Email" 
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								autoComplete="email"
							/>
						</div>

						<div>
							<legend>Password</legend>
							<input 
								style={{"width":"360px", "height":"35px"}}
								type="password" 
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								autoComplete="new-password"
							/>
						</div>

						{error && <p style={{"color":"red"}}>{error}</p>}

						<div className="py-3">
							<input 
								type="submit"
								value="Login"
							/>
						</div>
					</fieldset>
				</form>
			</main>

			<section className="text-center my-5">
				<p>Don't have an account?<button onClick={() => navigate("/signup")} type="button" className="btn btn-link">create it</button>
				</p>
			</section>
		</>
	);
};
