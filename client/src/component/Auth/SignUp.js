import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';


export default function SignUp() {
    const [errorMessage, setErrorMessage] = useState('')
    let navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const form = {
        fullname : data.get('fname') +' '+ data.get('lname'),
        email: data.get('email'),
        password: data.get('password')
        };
        if (!form.fullname || !form.email || !form.password) {
            setErrorMessage('Please type in all required information!')
        }
        else {
            try {
                await axios.post("http://localhost:3000/api/v1/user/signup", form); 
                navigate('/')
            } catch (error) {
                setErrorMessage('Something went wrong');
            }
        }

    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                name='lname'
                placeholder='Last Name'
            />

            <input
                type='text'
                name='fname'
                placeholder='First Name'
            />

            <input
                type='email'
                name='email'
                placeholder='Email'
            />

            <input
                type='password'
                name='password'
                placeholder='Password'
            />

            <button type='submit'>
                Sign Up
            </button>
            {errorMessage && (
                <p>{errorMessage}</p>
            )}
        </form>
    );
}