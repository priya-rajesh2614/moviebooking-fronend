import { Box, Button, Container, Link, Paper, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function LoginForm() {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  const navigate = useNavigate();

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
          localStorage.setItem("auth_token", token); 
          navigate('/Home'); 
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
    <Box sx={{ justifyContent: "center", display: "flex", flexDirection: "column", height: "100vh" }}>
      <Container
        component={Paper}
        sx={{ padding: "50px", background: "white", width: "400px", height: "60%" }}
      >
        <Stack>
          <Typography variant="h5" component="h6" sx={{ textAlign: "center" }}>
            Login
          </Typography>
          <br />
          <TextField
            error={isFormSubmitted && !userName}
            type="text"
            label="UserName"
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
          <Link
            sx={{ color: "var(--theme-color)", cursor: "pointer", textAlign: "center", display: "block" }}
            onClick={() => {
              console.info("Redirecting to forgot password page...");
            }}
          >
            Forgot password?
          </Link>
        </Stack>
      </Container>
    </Box>
  );
}
