import { Container } from "@mui/material";
import React from "react";
import AdminToolbar from "./AdminToolbar";
import OrganizationPage from "./organization_components";

const Organization = () => {
    return (
        <div>
            <AdminToolbar /><br></br>
            <Container maxWidth="md" backgroundColor="primary.main" className="mainContainer" sx={{ p: 3 }}>
                <OrganizationPage />
            </Container>
        </div>
    )
}

export default Organization;
