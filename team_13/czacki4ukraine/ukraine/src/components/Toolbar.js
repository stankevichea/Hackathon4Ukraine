import React, { useState } from 'react'
import { Grid, Typography, Button, Container, AppBar, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import Filter from './Filter';
import { Link } from 'react-router-dom';

function Toolbar(props) {
    return (
        <AppBar position="sticky">
            <Container maxWidth="md" >
                <Grid container>
                    <Typography onClick={() => window.location.href = "/home/"} className="noUnderline">
                        <Grid item xs={4}>
                            <Typography variant="h3" sx={{ mt: 1 }} >
                                INQ
                            </Typography>
                        </Grid>
                    </Typography>
                    <Grid item xs={12} sm={8}>
                        <Filter cat={props.cat} mi={props.mi} filter={props.filter} />
                    </Grid>
                </Grid>
            </Container>
        </AppBar >
    )
}

export default Toolbar
