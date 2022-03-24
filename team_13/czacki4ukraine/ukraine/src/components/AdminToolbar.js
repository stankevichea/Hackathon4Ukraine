import React, { useState } from 'react'
import { Grid, Typography, Button, Container, AppBar, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import Filter from './Filter';
import { Link, useParams } from 'react-router-dom';

function AdminToolbar() {
    let { id } = useParams();

    return (
        <AppBar position="sticky">
            <Container maxWidth="md" >
                <Grid container>
                    <Grid item xs={12} md={8}>
                        <Link to={"/organization/" + id} className="noUnderline">
                            <Typography variant="h3" sx={{ m: 1 }} >
                                INQ
                            </Typography>
                        </Link>
                    </Grid>
                    <Grid item xs={12} md={4} fullWidth>
                        <Link to={"/organization/" + id + "/add_inq"} className="noUnderline">
                            <Button variant="contained" sx={{ backgroundColor: '#f2bf30', fontWeight: 600, height: 55, m: 1 }} size="large">
                                Dodaj zapotrzebowanie
                            </Button>
                        </Link>

                    </Grid>
                </Grid>
            </Container >
        </AppBar >
    )
}

export default AdminToolbar
