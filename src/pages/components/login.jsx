import { useState } from "react";
import axios from 'axios';
import Header from "../header/header";
import '../../styles/login.css';
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { auth, googleProvider } from '../../fireBase/firebase'
import { signInWithPopup } from "firebase/auth";

// const api = process.env.REACT_APP_API
const api = 'http://localhost:4000'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (email && password) {
            try {
                const userCredential = await auth.signInWithEmailAndPassword(email, password);
                const token = await userCredential.user.getIdToken();
                const res = await axios.post(`${api}/user/login`, { email, password, token });

                Cookies.set('token', res.data.token);
                console.log(res.data);
                if (res.data.message === 'User Found') {
                    navigate('/landingPage');
                    alert('Login successfully');
                } else if (res.data.message === 'User not found') {
                    alert('User Not Found');
                    navigate('/signUp');
                } else if (res.data.message === 'Wrong password') {
                    alert('Enter valid password');
                    setPassword('')
                }
            } catch (error) {
                console.error(error);
                alert('Something went wrong');
                navigate('/');
            }
        } else {
            alert('Please fill in all required details');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();

            if (e.target.name === "email") {
                document.querySelector("[name=password]").focus();
            }
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const idToken = await result.user.getIdToken();

            const response = await axios.post(`${api}/user/googlelogin`, { idToken });

            Cookies.set('token', response.data.token);
            navigate('/landingPage');
        } catch (error) {
            console.error("Error during Google sign-up:", error);
            alert('Error signing up with Google');
        }
    };

    return (
        <div className="login">
            <Header />

            <section className="flex justify-center items-center">
                <div style={{ width: '35%', marginTop: '5%' }}>
                    <h3 className="text-blue-600">Login</h3>
                    <div className="p-3 rounded-md" style={{ border: '2px solid #2676C2' }}>
                        <form onSubmit={handleLogin}>
                            <input
                                className="loginInput"
                                value={email}
                                type="email"
                                name="email"
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email*"
                                required
                                onKeyDown={handleKeyDown}
                            />
                            <br />
                            <input
                                className="loginInput"
                                value={password}
                                type="password"
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password*"
                                required
                                onKeyDown={handleKeyDown}
                            />
                            <br />
                            <button className="loginBtn" type="submit">Login</button>
                        </form>
                        <p className="text-center mb-3">
                            Don't have an account? <Link className="no-underline" to='signUp'>Signup</Link>
                        </p>
                        <div className="flex justify-center">
                            <button className="flex justify-center items-center border border-blue-600 bg-blue-600 text-white px-4 py-1 rounded mt-2"
                                onClick={handleGoogleLogin}
                            >
                                Login with <span className="font-bold ml-2">Google</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Login;
