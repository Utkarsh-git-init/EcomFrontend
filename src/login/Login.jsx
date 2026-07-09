import {useState} from "react";
import './login.css'

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    function handleSubmit() {
        const baseUrl=import.meta.env.VITE_API_BASE_URL
        fetch(baseUrl+"/user/login", {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                'accept': 'application/text',
            },
            body: JSON.stringify({
                username: email,
                password: password
            })
        }).then(res => res.text())
            .then(res =>{
                console.log(res)
                const token = "Bearer " + res;
                localStorage.setItem('token', token);
            })
    }
    return (
        <>
            <div className="login-container">
                <h1>Login</h1>
                <div className="login-form">
                    <form onSubmit={handleSubmit}>
                        <input value={email} placeholder={"Email"} type={"email"}
                               onChange={(e) => setEmail(e.target.value)}
                        />
                        <br/>
                        <input value={password} placeholder={"Password"} type={"password"}
                               onChange={(e) => setPassword(e.target.value)}/>
                    </form>
                    <button onClick={handleSubmit}>Login</button>
                </div>
            </div>
        </>
    )
}
export default Login;