import { Button, Card, CardContent, Grid, Item, LinearProgress, Typography } from '@mui/material'
import PlaceIcon from '@mui/icons-material/Place'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import GroupsIcon from '@mui/icons-material/Groups'
import React from 'react'
import { Link } from 'react-router-dom'

function RequestCard(props) {
    var date = new Date(props.date);

    return (
        <Card sx={{ marginBottom: 2 }}>
            <CardContent>
                <Grid container marginBottom={1}>
                    <Grid item xs={6}>
                        <Typography variant="h5">{props.name}</Typography>
                    </Grid>
                    <Grid item xs={6} align="right">
                        <Typography marginBottom={-0.7} variant="caption" color="text.secondary" display="block">
                            {date.toLocaleDateString("en-US")}
                            <CalendarTodayIcon sx={{ fontSize: 12, marginLeft: 0.5, marginBottom: -0.2 }} />
                        </Typography>
                        <Typography marginBottom={-0.7} variant="caption" color="text.secondary" display="block">
                            {props.place}
                            <PlaceIcon sx={{ fontSize: 12, marginLeft: 0.5, marginBottom: -0.2 }} />
                        </Typography>
                    </Grid>
                </Grid>
                <Typography variant="body2" color="text.secondary">
                    {props.shortDescrition}
                </Typography>
                <LinearProgress sx={{ height: 12, borderRadius: 4, marginTop: 1, marginBottom: 1 }} borderRadius={15} variant="determinate" value={props.collected / props.needed * 100} />
                <Grid container>
                    <Grid item xs={6}>
                        <Typography variant="h7" align="center">
                            {props.collected} z {props.needed} {props.unit}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Link to={"/deklaracja/" + props.id} style={{ textDecoration: 'none' }}>
                            <Typography align="right">
                                <Button variant="contained" align="right" width={100} className="noUnderline">
                                    Zadeklaruj się
                                </Button>
                            </Typography>
                        </Link>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default RequestCard
