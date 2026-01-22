import axios from "axios";
import { useState } from "react";
import {
  Container,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Grid,
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

function Login() {
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          email,
          password,
        }
      );

      const token = response.data.token;

      // Guardo el token en localStorage
      localStorage.setItem("token", token);

      window.location.reload();
      console.log("Usuario logeado ✅, token:", token);
      alert("✅ Usuario logeado con éxito");
    } catch (err) {
      alert("❌ Usuario o contraseña incorrectos/as.");
      console.error("Error al logear:", err);
      setError("No se pudo logear. Intenta de nuevo.");
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{ padding: "40px" }}
    >
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Iniciar sesión
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{ backgroundColor: "#bb00ff" }}
          >
            Sign In
          </Button>
          <Grid container style={{ marginTop: "20px" }}>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"No tienes cuenta? Registrate!"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
export default Login;
