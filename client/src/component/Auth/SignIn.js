import axios from 'axios';
import { useState } from 'react';
import { data, useNavigate } from 'react-router-dom';
import { Box, Button, TextField } from '@mui/material';

export default function SignIn({ setIsLoggedIn }) {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const form = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    try {
      const data = await axios.post(
        'http://localhost:3005/api/v1/user/signin',
        form
      );

      setIsLoggedIn(true);
      localStorage.setItem('token', data.token);
  
      navigate('/video');

    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(
          error.response?.data?.message ??
          (error.request
            ? 'Cannot connect to the sign-in server'
            : 'Sign in failed')
        );
      } else {
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
      {
        errorMessage && (
          <Box
            sx={{
              color: 'red',
              marginBottom: '16px',
            }}
          >
            {errorMessage}
          </Box>
        )
      }
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
          label="Email"
          name="email"
          type="email"
          required
        />

        <TextField
          label="Password"
          name="password"
          type="password"
          required
        />

        <Button 
          type="submit" 
          variant="contained"
        >
          Login
        </Button>
      </form>
    </Box>
  );
}