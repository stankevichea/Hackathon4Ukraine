import { Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography } from '@mui/material'
import { Box, shadows } from '@mui/system'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Toolbar from './Toolbar'

function Login() {
    const [email, setEmail] = useState()
    const [pass, setPass] = useState()
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mail: email, password: pass })
        };
        const getData = () => {
            fetch('https://reqres.in/api/articles', requestOptions)
                .then(response => response.json())
        }
        getData()
    };

    function Mailto({ email, subject, body, ...props }) {
        return (
            <a href={`mailto:${email}?subject=${subject || ""}&body=${body || ""}`}>
                {props.children}
            </a>
        );
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box className="shadowedBox" sx={{
                marginTop: 12,
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: '#2e8dd1',
                maxWidth: 500,
                borderRadius: 3,
                color: 'white',
                boxShadow: 3
            }}>
                <Typography variant="h5">
                    Zaloguj się
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="E-mail"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onInput={e => setEmail(e.target.value)}
                        sx={{ color: 'white' }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Hasło"
                        type="password"
                        id="password"
                        onInput={e => setPass(e.target.value)}
                        autoComplete="current-password"
                    />
                    <Button
                        onClick={handleSubmit}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Zaloguj
                    </Button>
                    <Grid container>
                        <Grid item xs align="center">
                            Jesteś organizacją a nie masz konta?<br></br>
                            <Mailto email="adamowski137@gmail.com" subject="Zgłoszenie organizacji" body="Dzień dobry">Napisz do nas!</Mailto>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}

export default Login
