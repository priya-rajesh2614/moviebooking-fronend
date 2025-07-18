import { Box, Button, Container, Paper, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

export default function LoginForm() {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);

  const handleClick = async (): Promise<void> => {
    setIsFormSubmitted(true);
    if (userName && password) {
      try {
        const response = await axios.post('http://localhost:8080/auth/login', {
          email: userName,
          password,
        });
        
        if (response.status === 200) {
          const token = response.data;  
          localStorage.setItem("authToken", token); 
          window.location.href='/home';
        } else {
          alert('Login failed');
        }
      } catch (error) {
        console.error("Login Error: ", error);
        alert('Invalid credentials');
      }
    } else {
      alert('Please enter both username and password');
    }
  };

  return (
    <Box sx={{ justifyContent: "center", display: "flex", flexDirection: "column", height: "300px" ,  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
      <Container
        component={Paper}
        sx={{ padding: "50px", background: "white", width: "400px" }}
      >
        <Stack>
          <Typography variant="h5" component="h6" sx={{ textAlign: "center" }}>
            Login
          </Typography>
          <br />
          <TextField
            error={isFormSubmitted && !userName}
            type="text"
            label="Email"
            value={userName}
            helperText={isFormSubmitted && !userName ? "Please Enter UserName" : ""}
            onChange={(event) => setUserName(event.target.value)}
            variant="outlined"
            fullWidth
          />
          <br />
          <TextField
            error={isFormSubmitted && !password}
            type="password"
            label="Password"
            value={password}
            helperText={isFormSubmitted && !password ? "Please Enter Password" : ""}
            onChange={(event) => setPassword(event.target.value)}
            variant="outlined"
            fullWidth
          />
          <br />
          <Button
            variant="contained"
            onClick={handleClick}
            sx={{ backgroundColor: "hwb(334 0% 66%)", width: "100%" }}
          >
            Login
          </Button>
          <br />
          <div>
           
          <Link
          to={'/register'}
          >
             Sign up
          </Link>
          </div>
        </Stack>
      </Container>
    </Box>
  );
}
