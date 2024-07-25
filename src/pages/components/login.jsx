import { useState } from "react";
import axios from 'axios'
import Header from "../header/header";
import '../../styles/login.css'
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();

        if (email && password) {
            try {
                const res = await axios.post('http://localhost:4000/user/login', { email, password });
                console.log(res.data);
                Cookies.set('token', res.data.token)
                if (res.data.message === 'User Found') {
                    navigate('/landingPage')
                    alert('Login successfully')
                }
                else if (res.data.message === 'User not found') {
                    alert('User Not Found')
                    navigate('/signUp')
                }


            } catch (error) {
                console.error(error);
                alert('Something went wrong')
                navigate('/')
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
    }


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
                            <button className="flex justify-center items-center border border-blue-600 bg-blue-600 text-white px-4 py-1 rounded mt-2">
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