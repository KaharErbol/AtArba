import { useState } from "react";
import { useLoginMutation } from "./store/authApi";
import { useNavigate } from "react-router-dom";


function LoginForm() {

    const [containerClass, setContainerClass] = useState('');

    function handleSignUpClick() {
        setContainerClass('right-panel-active');
    }

    function handleSignInClick() {
        setContainerClass('');
    }

    // login info
    const navigate = useNavigate();
    const [login, result] = useLoginMutation();
    const [err, setError] = useState('');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleUsername = e => {
        setUsername(e.target.value);
    }
    const handlePassword = e => {
        setPassword(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        login({username, password});
    }

    if (result.isSuccess) {
        navigate('/items');
    } else if (result.isError) {
        setError(result.error);
    }

    // Sing Up
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [zip, setZip] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');


    return (
        <>
        <div className="body-login">
        <div className={`container ${containerClass}`} id="container">
            <div className="form-container sign-up-container">
                <form action="#">
                    <h1>Create Account</h1>
                    {/* <div className="social-container">
                        <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                        <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                    </div> */}
                    <span>input your info for registration</span>
                    <input type="text" placeholder="First Name" />
                    <input type="text" placeholder="Last Name" />
                    <input type="text" placeholder="Username" />
                    <input type="email" placeholder="Email" />
                    <input type="text" placeholder="Phone" />
                    <input type="text" placeholder="Zip Code" />
                    <input type="password" placeholder="Password" />
                    <input type="text" placeholder="Avatar Url" />
                    <button>Sign Up</button>
                </form>
	        </div>
            <div className="form-container sign-in-container">
                <form action="#">
                    <h1>Sign in</h1>
                    <div className="social-container">
                        <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                        <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                    <span>or use your account</span>
                    <input type="text" placeholder="Username" />
                    <input type="text" placeholder="Password" />
                    <a href="#">Forgot your password?</a>
                    <button>Sign In</button>
                </form>
	        </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <p>To keep connected with us please login with your personal info</p>
                        <button className="ghost" id="signIn" onClick={handleSignInClick}>Sign In</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>Hello, Friend!</h1>
                        <p>Enter your personal details and start journey with us</p>
                        <button className="ghost" id="signUp" onClick={handleSignUpClick}>Sign Up</button>
                    </div>
                </div>
	        </div>
        </div>
        </div>
        {/* <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                name="username"
                id="username"
                placeholder="username"
                required
                value={username}
                onChange={handleUsername}
            />
            <input 
                type="text"
                name="password"
                id="password"
                placeholder="password"
                required
                value={password}
                onChange={handlePassword}
            />
            <button className="button-24" >Login</button>
        </form> */}
        </>
    );
}

export default LoginForm;