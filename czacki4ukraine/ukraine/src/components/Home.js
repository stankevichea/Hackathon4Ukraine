import React, { useEffect, useState } from 'react'
import RequestCard from './RequestCard'
import Container from '@mui/material/Container';
import Toolbar from './Toolbar';
import { Button, Grid, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

function GetOrgData(cats, cities) {
    if (cats == undefined) {
        cats = 'null'
    }
    if (cities == undefined) {
        cities = 'null'
    }
    console.log(cats, cities)

    const [Org, fetchOrg] = useState([])
    const getData = () => {
        fetch('http://localhost:4000/api/inqs/' + cities + '/' + cats)// + cats + '/' + cities)
            .then((res) => res.json())
            .then((res) => {
                fetchOrg(res)
            })
    }

    useEffect(() => {
        getData()
    }, [])
    return (Org);
}

function Home() {
    const data = GetOrgData(useParams().categories, useParams().cities)

    const [ca, setCategories] = useState([])
    const [miasto, setMiasto] = useState()

    if (data.length == 0) {
        return (
            <>
                <Toolbar cat={setCategories} mi={setMiasto} filter={GetOrgData} /><br></br>
                <Container maxWidth="md" backgroundColor="primary.main" className="mainContainer" sx={{ p: 3 }}>
                    <Typography variant='h5'>
                        Niestety nic nie zneleźliśmy
                    </Typography>
                </Container>
            </>
        )
    }

    return (
        <>
            <Toolbar cat={setCategories} mi={setMiasto} filter={GetOrgData} />
            <br></br>
            <Container maxWidth="md" backgroundColor="primary.main" className="mainContainer" sx={{ p: 3 }}>
                {data.map((e) => {
                    return (
                        <RequestCard id={e._id} name={e.title} place={e.city} date={e.date} needed={e.startquantity} collected={e.actquantity} unit={e.unit} shortDescrition={e.description} />
                    )
                })}
            </Container>
            <br></br>
        </>
    )
}

export default Home
