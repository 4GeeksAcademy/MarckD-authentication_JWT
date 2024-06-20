const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [],
			token: null,
			isAuthenticated: false
		},
		actions: {
			logout: () => {
				const store = getStore();
				setStore({
					isAuthenticated: false
				})

			},
			Signup: async (username, email, password) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/signup", {
						method:'POST',
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							"username": username,
							"email": email,
							"password": password
						})
					})
					
					const data = await resp.json();
					
					if (resp.ok) {
						return { success: true }
					} else {
						return { success: false, message: data.msg };
					}
				} catch (error) {
					console.error("No se pudo realizar el fetch desde flux", error)
				}
			},
			login: async(email,password) => {
				console.log("esto recibe", password, email)
				const store = getStore()
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/login", {
						method:'POST',
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							"email": email,
							"password":password
						})
					})

					const data = await resp.json()

					if(resp.ok) {
						setStore ({
							...store,
							token: data.access_token,
							isAuthenticated: true
						})
						localStorage.setItem("token", data.access_token)
						return true;
					} else {
						return false;
					}
				}catch (error) {
					console.error("There was an error logging in:", error)
					return false;
				}
			},
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
