import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import Amina from "../../img/amina.png"


export const PrivateComponent =()=>{
    const {store, actions} = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
		if (!store.isAuthenticated) {
			navigate("/");
		}
	}, [store.isAuthenticated]);

	if (!store.isAuthenticated) {
		return null;
	}

    const handleLogout =()=> {
        actions.logout();
    }

    return(
        <>
            <header className="text-center">
                <h1>Profile</h1>
            </header>
            <navbar className="d-flex justify-content-around">
                <button className="btn btn-outline-secondary">Post</button>
                <button className="btn btn-outline-secondary">Settings</button>
                <button className="btn btn-outline-secondary">About</button>
                <button onClick={handleLogout} className="btn btn-outline-danger">Logout</button>            
            </navbar>
            <main className="d-flex justify-content-between">
                <section>
                    <img className="my-3" style={{"width":"400", "height":"300px"}} src={Amina} />
                </section>
                <aside>
                    <p className="m-3">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lobortis scelerisque fermentum dui faucibus in ornare quam. Fringilla urna porttitor rhoncus dolor purus non. Ornare aenean euismod elementum nisi quis eleifend quam adipiscing vitae. Enim tortor at auctor urna nunc id.
                        it amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lobortis scelerisque fermentum dui faucibus in ornare quam. Fringilla urna porttitor rhoncus dolor purus non. Ornare aenean euismod elementum nisi quis eleifend quam adipiscing vitae. Enim tortor at auctor urna nunc id.
                    </p>
                </aside> 
            </main>
        </>
    )
}