import { alertTitleClasses, Button, Container, FormControl, Grid, Slider, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function DeclarationSummary(props) {
    let { id } = useParams();
    const [name, setName] = useState()
    const [quantity, setQuantity] = useState((props.inq.startquantity - props.inq.actquantity) / 2)
    const [lastName, setLastName] = useState()
    const [email, setEmail] = useState()
    const [phone, setPhone] = useState()
    const [date, setDate] = useState()

    const navigate = useNavigate();

    const handleSubmit = () => {
        console.log(name, quantity, lastName, email, phone, date)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                inqid: id,
                quantity: quantity,
                kontakt: phone,
                mail: email,
                name: name,
                surname: lastName,
                date: date
            })
        };
        const getData = () => {
            fetch('http://localhost:4000/api/declaration_add/', requestOptions)
                .then(response => response.json())
        }
        getData()
        navigate('/')
    }

    return (
        <Container>
            <Typography variant='h5'>
                Cieszymy się, że chcesz nam pomóc!<br></br>
                <Box component="form" noValidate sx={{ mt: 1 }} className="declareHelp">
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="name"
                                label="Pomoc"
                                defaultValue={props.inq.name}
                                InputProps={{
                                    readOnly: false,
                                }}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography id="input-slider" gutterBottom>
                                Ilość ({props.inq.unit})
                            </Typography>
                            <Slider
                                aria-label="Ilość"
                                defaultValue={(props.inq.startquantity - props.inq.actquantity) / 2}
                                valueLabelDisplay="auto"
                                step={5}
                                marks
                                min={5}
                                max={props.inq.startquantity - props.inq.actquantity}
                                fullWidth
                                onChange={e => setQuantity(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="firstName"
                                label="Imię"
                                fullWidth
                                onInput={e => setName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="lastName"
                                label="Nazwisko"
                                fullWidth
                                onInput={e => setLastName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="email"
                                label="E-mail"
                                fullWidth
                                onInput={e => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="phone"
                                label="Numer telefonu"
                                fullWidth
                                onInput={e => setPhone(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                id="date"
                                label="Data dostarczenia"
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onInput={e => setDate(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Button onClick={handleSubmit} type="submit" fullWidth variant="contained" align="right" width={100} className="noUnderline" size="large" sx={{ minHeight: 55 }}>
                                Potwierdź pomoc
                            </Button>
                        </Grid>

                    </Grid>
                </Box>
            </Typography>
        </Container>
    )
}

export default DeclarationSummary
