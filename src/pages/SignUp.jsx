import axios from "axios";
import { useState } from "react";
import {
  Container, Box, Avatar, Typography,
  TextField, Button, FormControlLabel, Checkbox
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function SignUp() {

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    try {
      const response = await axios.post("http://localhost:8080/api/auth/register", {
        email,
        password,
        nombre : data.get("nombre"),
        apellido : data.get("apellido"),
        codigoPostal : data.get("codigoPostal"),
        localidad : data.get("localidad"),
        direccion : data.get("direccion")
      });

      const token = response.data.token;

      // Usamos la función login de nuestro AuthContext
      login(token);

      console.log("Usuario registrado ✅");
      alert("✅ Usuario registrado con éxito");
      navigate("/"); 

    } catch (err) {
      if (err.response && err.response.status === 400) {
        alert("⚠️ El usuario ya está registrado");
      } else {
        alert("❌ Error al registrar. Intentalo de nuevo.");
        console.error("Error al registrar:", err);
        setError("No se pudo registrar. Intenta de nuevo.");
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs" style={{ padding: "40px" }}>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'darkslateblue' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Crear cuenta
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="nombre"
            label="Nombre"
            name="nombre"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="apellido"
            label="Apellidos"
            name="apellido"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="codigoPostal"
            label="Código Postal"
            name="codigoPostal"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="localidad"
            label="Localidad"
            name="localidad"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="direccion"
            label="Dirección"
            name="direccion"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{ backgroundColor: "darkslateblue" }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUp;
