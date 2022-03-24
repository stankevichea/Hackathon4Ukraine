import InqDecComponent from "./InqDec_components";
import { Container } from '@mui/material';
import React from 'react';
import AdminToolbar from "./AdminToolbar";

const InqDec = () => {


    return (
        <>
            <AdminToolbar />
            <Container maxWidth="md" backgroundColor="primary.main" className="mainContainer" sx={{ p: 3, marginTop: "20px" }}>
                <InqDecComponent />
            </Container>
        </>
    )
}

export default InqDec;
