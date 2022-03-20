import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import categories from '../utils';
import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, Button, Grid, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const cities = [
    "Warszawa",
    "Poznań",
    "Przemyśl",
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
            color: 'black'
        },
    },
};

function Filter(props) {
    const [category, setCategory] = useState([])
    const [city, setCity] = useState('null')

    const [cat, setCat] = useState('null');

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setCat(value)
        setCategory(
            typeof value === 'string' ? value.split(',') : value,
        );
        if (value[0] == undefined) {
            setCat('null');
        }
    };
    console.log(city);
    console.log(cat);

    const handleCityChange = (event, val) => {
        setCity(val);
        if (city == undefined || city.len == 0) {
            setCity('null');
        }
    };


    return (
        <div>
            <FormControl sx={{ m: 1.4 }} fullWidth>
                <Grid container spacing={1}>
                    <Grid item xs={11} md={5}>
                        <InputLabel id="category-label">Jak możesz pomóc?</InputLabel>
                        <Select
                            labelId="category-checkbox-label"
                            id="category-checkbox"
                            multiple
                            value={category}
                            displayEmpty
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
                    <Grid item xs={9} md={5}>
                        <Autocomplete
                            displayEmpty
                            id="combo-box-demo"
                            options={cities}
                            onInputChange={handleCityChange}
                            renderInput={(params) => <TextField {...params} label="Miasto" />}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Typography onClick={() => window.location.href = "/home/" + cat + "/" + city}>
                            <Button
                                variant="contained"
                                sx={{ backgroundColor: '#f2bf30', height: 55, ml: 2 }}
                                size="large"
                            >
                                <SearchIcon />
                            </Button>
                        </Typography>
                    </Grid>
                </Grid>
            </FormControl>
        </div >
    );
}

export default Filter
