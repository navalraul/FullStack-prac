
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from './ApiConfig';
import {toast} from 'react-hot-toast';
import { AuthContexts } from './Context/AuthContext';

const Register = () => {

    const [userData, setUserData] = useState({name: "", email: "", number: "", password: "", confirmPassword: "", role: "Buyer"});
    const router = useNavigate();

    const { state } = useContext(AuthContexts)


    const handleChange = (event) => {
        setUserData({ ...userData, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(userData.name && userData.email && userData.number && userData.password && userData.confirmPassword && userData.role) {
            if(userData.password === userData.confirmPassword) {
                try {
                    const response = await api.post("/register", {userData})
                    if(response.data.success) {
                        setUserData({name: "", email: "", number: "", password: "", confirmPassword: "", role: "Buyer"})
                        toast.success(response.data.message)
                        router("/login")
                    } else{
                        toast.error(response.data.message)
                    }
                } catch (error) {
                    toast.error(error.response.data.message)
                }
            } else {
                toast.error("Password and ConfirmPassword not matched")
            }
        }else {
            toast.error("Please fill all the fields!")
        }
    };


    useEffect(()=> {
        if(state?.currentUser?.name) {
            'router'('/')
        }
    },[state])

    const handleChangeForSelect = (event) => {
        setUserData({...userData, "role": event.target.value})
    }

    return (
        <div>
            <h2>Register</h2>
            <form onClick={handleSubmit}>
                <label>Name:</label><br />
                <input type='text' onChange={handleChange} name='name' value={userData.name} /><br />
                <label>Eamil:</label><br />
                <input type='email' onChange={handleChange} name='email' value={userData.email} /><br />
                <label>Contact Number:</label><br />
                <input type='number' onChange={handleChange} name='number' value={userData.number} /><br />
                <select onChange={handleChangeForSelect} >
                    <option value="Buyer">Buyer</option>
                    <option value="Seller">Seller</option>
                </select><br />
                <label>Password:</label><br />
                <input type='password' onChange={handleChange} name='password' value={userData.password} /><br />
                <label>Confirm Password:</label><br />
                <input type='password' onChange={handleChange} name='confirmPassword' value={userData.confirmPassword} /><br />
                <input type='submit' value='Register' /><br />
            </form>
            <button onClick={() => router('/login')}>Login</button>
        </div>
    )
}

export default Register
