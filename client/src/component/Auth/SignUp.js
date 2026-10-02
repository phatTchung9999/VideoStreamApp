import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';


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
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: {xs: '100%', sm: '50%'},
                height: '100vh',
            }}
        >
            <form 
                onSubmit={handleSubmit}
                style={{
                    width: '70%',
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                }}
            >
                <TextField
                    type='text'
                    name='lname'
                    placeholder='Last Name'
                />

                <TextField
                    type='text'
                    name='fname'
                    placeholder='First Name'
                />

                <TextField
                    type='email'
                    name='email'
                    placeholder='Email'
                />

                <TextField
                    type='password'
                    name='password'
                    placeholder='Password'
                />

                <Button 
                    type='submit'
                    variant='contained'
                >
                    Sign Up
                </Button>
                {errorMessage && (
                    <p>{errorMessage}</p>
                )}
            </form>
        </Box>
    );
}