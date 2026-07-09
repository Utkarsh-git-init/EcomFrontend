import './register.css'
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [otpBoxOpen, setOtpBoxOpen] = useState(false)
    const [timer, setTimer] = useState(0);
    const [signUpButtonDisabled, setSignUpButtonDisabled] = useState(true);
    const navigate = useNavigate();
    const baseUrl=import.meta.env.VITE_API_BASE_URL;
    const sendOTP = async () => {
        if(timer>0){
            return;
        }
        setLoading(true);
        const response=await fetch(baseUrl+"/user/registerintent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: email
            })
        })
        const data=await response.text();
        setTimer(120);
        setLoading(false);
        setOtpBoxOpen(true)
        setSignUpButtonDisabled(false)
        console.log(data);
    }
    useEffect(() => {
        if (timer <= 0) return;

        const interval = setInterval(() => {
            setTimer(prev => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    const signup = async () => {
        const response=await fetch(baseUrl+"/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: email,
                password: password,
                otp:otp
            })
        })
        const data=await response.text();
        console.log(data);
        navigate("/login");

    }
    return (
        <>
            <div className="register-container">
                <div className="login-container">
                    <h1>Register</h1>
                    <p>Already have an account?</p>
                    <Link to={"/login"}>Login</Link>
                </div>
                <div className="register-inner-container">
                    <div className={"email-container"}>
                        <div className={"email-otp-button-container"}>
                            <input value={email} placeholder={"Email"} type={"email"}
                                   onChange={(e) => setEmail(e.target.value)}
                            />
                            {
                                loading ?
                                    <div className={"otp-loader"} role="status"></div>
                                    :
                                    <button onClick={sendOTP}>{
                                        timer>0?
                                            "Resend in "+timer
                                            :
                                            "Send OTP"
                                    }</button>
                            }
                        </div>
                        {
                            otpBoxOpen &&
                            <div className="otp-input">
                                <input value={otp} placeholder="OTP"
                                       onChange={(e) => setOtp(e.target.value)}/>
                            </div>
                        }
                    </div>
                    <input value={password} placeholder={"Password"} type={"password"}
                           onChange={(e) => setPassword(e.target.value)}/>
                    <input value={confirmPassword} placeholder={"Confirm Password"} type={"password"}
                           onChange={(e) => setConfirmPassword(e.target.value)}/>
                    <button disabled={signUpButtonDisabled} onClick={signup}>SignUp</button>
                </div>
            </div>
        </>
    )
}
export default Register;
