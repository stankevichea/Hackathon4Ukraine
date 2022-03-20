import * as React from 'react';
// import { useState, useEffect } from 'react';
import { Container } from '@mui/material'
import DeclarationSummary from './DeclarationSummary'
import Toolbar from './Toolbar'

// async function GetOrgData() {
    // console.log(id);
    // const [Orgs, fetchOrgs] = useState([])
    // console.log(1);
    // const getDatas = async () => {
    //     console.log("ewrfw"); 
    //     fetch('http://localhost:4000/api/inq/623621a2f0fa30fd06ae749d/')
    //         .then((res) => res.json())
    //         .then((res) => {
    //             fetchOrgs(res)
    //         })
    // }

    // useEffect(() => {
    //     getDatas()
    // }, [])

    // const Orgs = {inq:{_id:"623621a2f0fa30fd06ae749d",organizationid:"623616e3043706f4b02c199f",title:"tlumacz",category:"wolontariat",date:"2020-11-02T11:20:00.000Z",startquantity:1,actquantity:0,description:"poszukiwany tlumacz polsko-ukrainski",city:"lodz",location:"baluty",__v:0},"organization":{"_id":"623616e3043706f4b02c199f","name":"centrum pomocy uchodzcom","description":"pomagamy nie tylko Ukrainie","kontakt":"tel 456 674 874","mail":"jan.kowalski@gmail.com","password":"1234","__v":0}};
    // return (Orgs);
// }

const Declaration = () => {
    const data =  {inq:{_id:"623621a2f0fa30fd06ae749d",organizationid:"623616e3043706f4b02c199f",title:"tlumacz",category:"wolontariat",date:"2020-11-02T11:20:00.000Z",startquantity:10,actquantity:0,description:"poszukiwany tlumacz polsko-ukrainski",city:"lodz",location:"baluty",__v:0},organization:{_id:"623616e3043706f4b02c199f",name:"centrum pomocy uchodzcom",description:"pomagamy nie tylko Ukrainie",kontakt:"tel 456 674 874",mail:"jan.kowalski@gmail.com",password:"1234","__v":0}};
    if(data != undefined)
    // console.log(GetOrgData())
    // const inq = data.inq;
    // const org = data.organisation;
    return (
        <>
            <Toolbar />
            <br></br>
            <Container maxWidth="md" backgroundColor="primary.main" className="mainContainer" sx={{ p: 3 }}>
                <DeclarationSummary inq={data.inq} org={data.org} />
            </Container>
        </>
    )
    return null;
}

export default Declaration
