import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const {actions} = useContext(Context);
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setError("");

        try {
            const result = await actions.Signup(username, email, password)
            if(result.success) {
               navigate("/")
            } else {
                setError(result.message)
            }
        } catch (error) {
            console.error("something is wrong", error)
            setError("An unexpected error occurred")
        }
    }

    return(
        <>
            <header>
                <h1 className="text-center my-3">Please enter your details</h1>
            </header>

            <main className="text-center">
                <form onSubmit={handleSubmit}>
                    <fieldset>
                    {error && (<p style={{ color: "red" }}>{error}</p> )}
                        <div>
                            <legend>Username</legend>
                            <input 
                                style={{"width":"360px", "height":"35px"}}
                                type="text" 
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)} 
                            />
                        </div>

                        <div>
                            <legend>Email</legend>
                            <input 
                                style={{"width":"360px", "height":"35px"}}
                                type="email" 
                                placeholder="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} 
                            />
                        </div>

                        <div>
                            <legend>Password</legend>
                            <input 
                                style={{"width":"360px", "height":"35px"}}
                                type="password" 
                                placeholder="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                        </div>

                        <div className="py-3">
							<input 
								type="submit"
								value="Create"
							/>
						</div>
                    </fieldset>
                </form>
            </main>
        </>
    )
}