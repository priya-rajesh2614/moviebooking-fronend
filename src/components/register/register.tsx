import { Box, Button, Container, Paper, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleClick = async (): Promise<void> => {
    setIsFormSubmitted(true);

    if (userName && email && password) {
      try {
        const response = await axios.post('http://localhost:8080/auth/register', {
          name: userName,
          email,
          password,
        });

        if (response.status === 200) {
          navigate('/login');
        } else {
          alert(`Registration failed: ${response.data}`);
        }
      } catch (error) {
        
        if (error instanceof Error) {
          console.error("Error during registration:", error);
          alert(`Error during registration: ${error.message}`);
        } else {
          console.error("Unknown error:", error);
          alert(`Error during registration: An unknown error occurred.`);
        }
      }
    } else {
     
      alert('Please fill in all the fields');
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
            Register Form
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
          />
          <br />

          <TextField
            error={isFormSubmitted && !email}
            type="email"
            label="Email"
            value={email}
            helperText={isFormSubmitted && !email ? "Please Enter Email" : ""}
            onChange={(event) => setEmail(event.target.value)}
            variant="outlined"
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
          />
          <br />

          <Button
            variant="contained"
            onClick={handleClick}
            sx={{ backgroundColor: "hwb(334 0% 66%)" }}
          >
            Submit
          </Button>
          <br />
        </Stack>
      </Container>
    </Box>
  );
}
