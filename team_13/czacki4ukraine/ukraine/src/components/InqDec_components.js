import { Button, Container, FormControl, Grid, Select, Slider, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import categories from '../utils';
import MenuItem from '@mui/material/MenuItem';
import { Checkbox } from '@mui/material';
import { ListItemText } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

function InqDecComponent(props) {
    const [name, setName] = useState()
    const [quantity, setQuantity] = useState();
    const [unit, setUnit] = useState();
    const [city, setCity] = useState();
    const [description, setDescription] = useState();
    const [date, setDate] = useState();
    const [category, setCategory] = useState([]);
    const [location, setLocation] = useState();

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;

    const navigate = useNavigate();

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
                color: 'black'
            },
        },
    };

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setCategory(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const { id } = useParams();

    const HandleSubmit = () => {
        console.log(id, name, category, date, city, quantity, 0, unit, description, location)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ organizationid: id, title: name, category: category[0], date: date, city: city, startquantity: quantity, actquantity: 0, unit: unit, description: description, location: location })
        };
        console.log(requestOptions)
        const getData = () => {
            fetch('http://localhost:4000/api/inq_add/', requestOptions)
                .then(response => response.json())

        }
        getData();
        navigate('/organization/' + id.toString());
    }

    return (
        <Container>
            <Typography variant='h5'>
                Utwórz nowe zapotrzebowanie<br></br>

            </Typography><br></br>
            <Typography variant='h5'>
                Podaj zasoby których ci brakuje:<br></br>

                <Box component="form" onSubmit={() => HandleSubmit()} noValidate sx={{ mt: 1 }} className="declareHelp">
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="name"
                                label="Pomoc"
                                defaultValue=""
                                InputProps={{
                                    readOnly: false,
                                }}
                                fullWidth
                                onChange={e => setName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Select
                                id="category-checkbox"
                                label="kategoria"
                                value={category}
                                onChange={handleChange}
                                renderValue={(selected) => selected.join(', ')}
                                MenuProps={MenuProps}
                                fullWidth
                            >
                                {categories.map((name) => {
                                    return (
                                        <MenuItem key={name} value={name}>
                                            <Checkbox checked={category.indexOf(name) > -1} />
                                            <ListItemText primary={name} />
                                        </MenuItem>
                                    )
                                })}
                            </Select>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Ilość"
                                defaultValue=""
                                InputProps={{
                                    readOnly: false,
                                }}
                                fullWidth
                                onChange={e => setQuantity(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Jednostka"
                                defaultValue=""
                                InputProps={{
                                    readOnly: false,
                                }}
                                fullWidth
                                onChange={e => setUnit(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Miasto"
                                defaultValue=""
                                InputProps={{
                                    readOnly: false,
                                }}
                                fullWidth
                                onChange={e => setCity(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Adres"
                                defaultValue=""
                                InputProps={{
                                    readOnly: false,
                                }}
                                fullWidth
                                onChange={e => setLocation(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField
                                label="Opis"
                                defaultValue=""
                                InputProps={{
                                    readOnly: false,
                                }}
                                fullWidth
                                onChange={e => setDescription(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                id="date"
                                label="Data zakończenia zbiórki"
                                type="date"
                                defaultValue=""
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onInput={e => setDate(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Button type="submit" fullWidth variant="contained" align="right" width={100} className="noUnderline" size="large" sx={{ minHeight: 55 }}>
                                Potwierdź zapotrzebowanie
                            </Button>
                        </Grid>

                    </Grid>
                </Box>
            </Typography>
        </Container>
    )
}

export default InqDecComponent
