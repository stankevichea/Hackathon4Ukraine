import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button, Card, CardContent, Grid, Container, LinearProgress, Typography } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import GroupsIcon from '@mui/icons-material/Groups'
import { IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CloseIcon from '@mui/icons-material/Close';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function GetOrgData() {
  const { id } = useParams();
  console.log(id);
  const [Org, fetchOrg] = useState([])
  const getData = () => {
    fetch('http://localhost:4000/api/inqs_for_organization/' + id.toString())
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

function GetInqData(props) {
  const [Inq, fetchInq] = useState([])
  const getData = () => {
    fetch('http://localhost:4000/api/inq_declarations/' + props._id.toString())
      .then((res) => res.json())
      .then((res) => {
        fetchInq(res)
      })
  }

  useEffect(() => {
    getData()
  }, [])
  return (Inq);
}

function deleteInq(props) {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: props._id })
  };
  fetch('http://localhost:4000/api/inq_remove ', requestOptions)
    .then(response => response.json())
}

function ParticipantTable(props) {
  const data = GetInqData(props.props.props).declarations
  if (data !== undefined)
    return (
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={{ fontSize: 25 }}>imie i nazwisko</TableCell>
              <TableCell align="left" sx={{ fontSize: 25 }}>ilość</TableCell>
              <TableCell align="left" sx={{ fontSize: 25 }}>mail</TableCell>
              <TableCell align="left" sx={{ fontSize: 25 }}>telefon</TableCell>
              <TableCell align="left" sx={{ fontSize: 25 }}>data</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((dataRow) => (
              <TableRow
              >
                <TableCell align="left" component="th" scope="row">
                  {dataRow.name + " " + dataRow.surname}
                </TableCell>
                <TableCell align="left">{dataRow.quantity}</TableCell>
                <TableCell align="left">{dataRow.mail}</TableCell>
                <TableCell align="left">{dataRow.kontakt}</TableCell>
                <TableCell align="left">{dataRow.data}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  return null;
}

//transition for the dialog popup

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


//header for page
function OrganizationHeader() {
  const data = GetOrgData();
  if (data !== undefined) {
    return (
      <Grid container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ marginTop: '0', marginBottom: '10px', fontFamily: 'helvetica' }}>
        <Typography variant="h3" component="div">
          {data.name}
        </Typography>
      </Grid>
    );
  }
  return null;
}

// manu bar component
function LongMenu(properties) {
  const { id } = useParams();
  console.log(useParams());
  const options = [
    ['Lista Członków', 0],
    ['Usuń', 1]
  ];
  const ITEM_HEIGHT = 45;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openPopUp, setPopUp] = React.useState(false);
  const navigate = useNavigate();

  const handlePopUpOpen = (event, prop) => {
    if (event.currentTarget.id === '0')
      setPopUp(true);
    if (event.currentTarget.id === '1') {
      deleteInq(prop.props);
      window.location.href = '/organization/' + id;
    }
  };

  const handlePopUpClose = () => {
    setPopUp(false);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} props={properties.id} id={option[1]} onClick={(event) => handlePopUpOpen(event, properties)}>
            {option[0]}
          </MenuItem>
        ))}
        <Dialog
          fullScreen
          open={openPopUp}
          onClose={handlePopUpClose}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handlePopUpClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Lista ludzi co się zgłosiła
              </Typography>
            </Toolbar>
            <ParticipantTable props={properties} />
          </AppBar>
        </Dialog>
      </Menu>
    </div>
  );
}


function RequestCard(props) {
  var date = new Date(props.date)
  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Grid container marginBottom={1}>
          <Grid item xs={6}>
            <Typography variant="h5">{props.title}</Typography>
          </Grid>
          <Grid item xs={6} align="right">
            <Typography marginBottom={-0.7} variant="caption" color="text.secondary" display="block">
              {date.toLocaleDateString("en-US")}
              <CalendarTodayIcon sx={{ fontSize: 12, marginLeft: 0.5, marginBottom: -0.2 }} />
            </Typography>
            <Typography marginBottom={-0.7} variant="caption" color="text.secondary" display="block">
              {props.city}
              <GroupsIcon sx={{ fontSize: 12, marginLeft: 0.5, marginBottom: -0.2 }} />
            </Typography>
            <Typography marginBottom={-0.7} variant="caption" color="text.secondary" display="block">
              {props.location}
              <PlaceIcon sx={{ fontSize: 12, marginLeft: 0.5, marginBottom: -0.2 }} />
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="body2" color="text.secondary">
          {props.descrition}
        </Typography>
        <LinearProgress sx={{ height: 12, marginTop: 1, marginBottom: 1 }} variant="determinate" value={props.actquantity / props.startquantity * 100} />
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h7" align="center">
              {props.actquantity} z {props.startquantity} {props.unit}
            </Typography>
          </Grid>
          <Grid container justifyContent="right" direction="row">
            <LongMenu props={props} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

function MainContainer() {
  const data = GetOrgData().inqs;
  if (data !== undefined)
    return (
      <Container style={{ width: "100%" }}
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center">
        {data.map((osoba) => {
          return (RequestCard(osoba))
        })}
      </Container>
    )
  return null;
}

export default function () {
  return (
    <div style={{ width: "100%" }}>
      <OrganizationHeader />
      <MainContainer />
    </div>
  )
}
