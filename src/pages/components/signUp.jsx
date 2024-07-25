import { useState } from "react";
import axios from 'axios'
import Header from "../header/header";
import '../../styles/signUp.css'
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../fireBase/firebase";

const SignUp = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const navigate = useNavigate()

    const handleSignUp = async (e) => {
        e.preventDefault()

        if (!firstName && !email && !password && !confirmPassword) {
            alert('Please fill in required fields')
        }
        else {
            if (password !== confirmPassword) {
                alert('password and confirm password does not match')
            }
            else {

                try {
                    const response = await axios.post('https://voosh-be-2.onrender.com/user/signUp', {
                        firstName,
                        lastName,
                        email,
                        password,
                    })
                    console.log(response)
                    if (response.data.message === 'User Created') {
                        alert('User created successfully')
                        navigate('/')
                    } else if (response.data.message === 'User already exists') {
                        alert('User already exists')
                        navigate('/')
                    }

                } catch (error) {
                    console.log(error)
                    alert('Something went wrong')
                    navigate('/')
                }
            }

        }
    }

    const handleGoogleSignUp = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const idToken = await result.user.getIdToken();

            const response = await axios.post('https://voosh-be-2.onrender.com/user/googlelogin', { idToken });

            Cookies.set('token', response.data.token);
            navigate('/landingPage');
        } catch (error) {
            console.error("Error during Google sign-up:", error);
            alert('Error signing up with Google');
        }
    };

    const handleFirstNameChange = (e) => {
        const value = e.target.value;
        if (/^[A-Za-z]*$/.test(value)) {
            setFirstName(value);
        }
    };

    const handleLastNameChange = (e) => {
        const value = e.target.value;
        if (/^[A-Za-z]*$/.test(value)) {
            setLastName(value);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();

            if (e.target.name === "firstName") {
                document.querySelector("[name=lastName]").focus();
            } else if (e.target.name === "lastName") {
                document.querySelector("[name=email]").focus();
            } else if (e.target.name === "email") {
                document.querySelector("[name=password]").focus();
            }
            else if (e.target.name === "password") {
                document.querySelector("[name=confirmPassword]").focus();
            };
        }
    }

    return (
        <div className="login">
            <Header />
            <section className="flex justify-center items-center">
                <div style={{ width: '35%', marginTop: '20px' }}>
                    <h3 className="text-blue-600">Signup</h3>
                    <div className="p-3 rounded-md" style={{ border: '2px solid #2676C2' }}>
                        <form action="" onSubmit={handleSignUp}>
                            <input className="signUpInput" value={firstName} name="firstName" type="text" onChange={handleFirstNameChange} placeholder="First Name*" onKeyDown={handleKeyDown} required />
                            <br />
                            <input className="signUpInput" value={lastName} name="lastName" type="text" onChange={handleLastNameChange} placeholder="Last Name" onKeyDown={handleKeyDown} />
                            <br />
                            <input className="signUpInput" value={email} name="email" type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email*" onKeyDown={handleKeyDown} required />
                            <br />
                            <input className="signUpInput" value={password} name="password" type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password*" onKeyDown={handleKeyDown} required />
                            <br />
                            <input className="signUpInput" value={confirmPassword} name="confirmPassword" type="password" onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password*" onKeyDown={handleKeyDown} required />
                            <br />
                            <button className="signUpBtn">Signup</button>
                        </form>
                        <p className="text-center mb-3">Already have an account ? <Link className="no-underline" to='/'>Login</Link></p>
                        <div className="flex justify-center">
                            <button className="flex justify-center items-center border border-blue-600 bg-blue-600 text-white px-4 py-1 rounded mt-2"
                                onClick={handleGoogleSignUp}
                            >
                                Signup with <span className="font-bold ml-2">Google</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default SignUp;