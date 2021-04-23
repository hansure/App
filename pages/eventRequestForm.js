import React from 'react';
import clsx from 'clsx';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EventIcon from '@material-ui/icons/Event';
import {clearStorage} from "../util/general";
import {
    Backdrop,
    Button,
    createMuiTheme,
    Fab,
    Fade,
    InputLabel,
    Modal,
    TableCell,
    TableRow,
    Tooltip
} from "@material-ui/core";
import Router from "next/router";
import AddIcon from "@material-ui/icons/Add";
import jwt_decode from "jwt-decode";
import Checkout from "../components/Form/FormController";
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import RequestedEvents from "./requestedEvents";
import EditIcon from "@material-ui/icons/Edit";
import Transport from "../api/Transport";
import FileCopy from "@material-ui/icons/FileCopy";
import MUIDataTable, {ExpandButton} from "mui-datatables";
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import exceptionMenuEmails from "../util/exceptionMenuEmails";
import FormControl from "@material-ui/core/FormControl";
import fileDialog from "file-dialog";
import Snackbar from "@material-ui/core/Snackbar";
import {storageRef} from '../api/config';
import Alert from "./Alert";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        width: '25%',
        // height: '25%',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid gray',
        boxShadow: theme.shadows[1],
        padding: theme.spacing(2, 4, 3),
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

export default function eventRequestForm(props) {
    const classes = useStyles();
    const theme = useTheme();

    const [isLoading, setIsLoading] = React.useState(true)
    const [showComments, setShowComments] = React.useState(false)
    const [fileAdded, setFileAdded] = React.useState(false)
    const [data] = React.useState([])
    const [dataForApproval] = React.useState([])
    const [rejectedListID, setRejectedListID] = React.useState([])
    const [rowData, setRowData] = React.useState([])
    const options = {
        filterType: 'dropdown',
        selectableRows: false,
        downloadOptions: {filename: 'all-event-request.csv'},
        expandableRows: true,
        expandableRowsHeader: false,
        expandableRowsOnClick: false,
        rowsExpanded: [],
        renderExpandableRow: (rowData, rowMeta) => {
            const colSpan = rowData.length + 1;
            if (rowData[3].props.children === 'REJECTED'){
                return (
                    <TableRow>
                        <TableCell/>
                        <TableCell>
                            <b>COMMENT</b>
                        </TableCell>
                        <TableCell colSpan={colSpan}>
                            {rowData[7].props.children.props.children[2].props.message}
                        </TableCell>
                    </TableRow>
                );
            }
        }
    };

    const themes = createMuiTheme({
        overrides: {
            MUIDataTableSelectCell: {
                expandDisabled: {
                    // Soft hide the button.
                    visibility: 'hidden',
                },
            },
        },
    });

    const components = {
        ExpandButton: function(props, rowData) {
            // if (props.dataIndex){
            //     console.log(rowData)
            // }
            // if (props.dataIndex && rejectedListID.indexOf(props.dataIndex) >= 0)
            return <ExpandButton {...props} />;
            // return null;
        }
    };

    const columns = [{
        name: "",
        options: {
            customBodyRender: (value) => <div/>,
            sort: false,
            filter: false
        }
    }, {
        name: "ID", options: {
            filter: false,
        }
    }, {
        name: "Title"
    }, {
        name: "Status",
        options: {
            customBodyRender: (value) => {
                return (
                    <p style={{
                        color: value.toLowerCase() === "rejected" ? 'red' :
                            value.toLowerCase() === "approved" ? 'green' : "blue"
                    }}>{value}</p>
                )
            }
        }
    }, "Requested Date", {
        name: "Updated Date",
        options: {
            sortDirection: 'asc',
            sort: true
        }
    }, "Approved / Rejected Date", {
        name: 'Action',
        options: {
            filter: false,
            customBodyRender: (value, tableMeta) => {
    return (
    <>
    {
    // value.toLowerCase() === 'approved' ?
    //     <AttachFile onClick={() => {
    //         setRowData(tableMeta.rowData)
    //         setOpenModal(true)
    //     }}/>
    //     :

    value.toLowerCase() === "pending" ?
    <EditIcon onClick={() => {
    try {
    Transport.HTTP.getReqByID(tableMeta.rowData[1]).then(res => {
    if (res.data.success) {
    localStorage.setItem("tempData", JSON.stringify(res.data.data))
    localStorage.setItem("update", JSON.stringify(tableMeta.rowData[1]))
    }
    }).then(() =>
    setCurrentPage(1)
    ).catch(error => console.log(error.message))
    }catch (e) {}
    }}/>
    :
    value.toLowerCase() === "rejected" ?
    <>
    <div />
    <FileCopy color={'gray'} onClick={() => {
    Transport.HTTP.getReqByID(tableMeta.rowData[1]).then(res => {
    if (res.data.success) {
    localStorage.setItem("tempData", JSON.stringify(res.data.data))
    }
    }).then(() => {
    setCurrentPage(1)
    }).catch(error => console.log(error.message))
    }}/>
    <Snackbar
    anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'center',
    }}
    open={showComments}
    onClose={() => {
    setShowComments(false)
    }}
    message={JSON.stringify(tableMeta.rowData[0])}
    />
    </> :
    <div/>
    }

    </>
    );
    }
    }
    }];

    function guidGenerator() {
    const S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());

    }

    const [open, setOpen] = React.useState(true);
    const [openModal, setOpenModal] = React.useState(false);
    const handleDrawerOpen = () => {
    setOpen(true)
    };
    const handleDrawerClose = () => {
    setOpen(false)
    };
    const [isLoggedIn, setIsLoggedIn] = React.useState(false)
    const [currentPage, setCurrentPage] = React.useState(0)
    const [loading, setLoading] = React.useState(true)
    const [decoded, setDecoded] = React.useState(undefined)
    const {...rest} = props;


    function loadAllEvents() {
    let token = sessionStorage.getItem("token");
    let decodedValue = undefined
    try {
    decodedValue = jwt_decode(token);
    Transport.HTTP.getAllEventReq(decodedValue.email).then(res => {
    data.splice(0, data.length)
    dataForApproval.splice(0, dataForApproval.length)
    res.data.data.map((element, idx) => {
    if (element.requesterEmail === decodedValue.email){
    if (element.status.toString() === 'REJECTED'){
    rejectedListID.push(idx)
    }
    data.push([element.comment, element.id, element.name, element.status, new Date(element.createdAt).toLocaleDateString(),
    new Date(element.updatedAt).toLocaleDateString(), element.lastApprovedDate ? new Date(element.lastApprovedDate).toLocaleString() :
    element.lastRejectedDate ? new Date(element.lastRejectedDate).toLocaleString() : ' -- --', element.status])
    }
    if (element.status.toLowerCase() === 'pending' && (element.approverEmail === decodedValue.email)) {
    dataForApproval.push(["", element.id, element.name, element.requesterEmail, new Date(element.createdAt).toLocaleString(),
    new Date(element.updatedAt).toLocaleString(), null])
    }
    }).catch(error => console(error.message))

    }).finally(() => {
    // if (parseInt(window.location.href.split("?")[1])) {
    //     setCurrentPage(2)
    // }
    setIsLoading(false)
    }).catch(error => {})
    } catch (e) {}
    }

    React.useEffect(() => {
    let decodedValue = undefined
    try {
    let token = sessionStorage.getItem("token");
    decodedValue = jwt_decode(token);
    if (!decoded){
    setDecoded(jwt_decode(token))
    }
    } catch (e) {}
    if (decodedValue && decodedValue.picture && decodedValue.email) {
    // if (parseInt(window.location.href.split("?")[1])) {
    //     setTimeout(() => {
    //         // setCurrentPage(2)
    //         // setIsLoading(false)
    //     }, 5)
    // }
    setIsLoggedIn(true)
    }
    if (isLoading && data.length === 0) {
    loadAllEvents()
    }
    setLoading(false)
    });
    if (isLoggedIn) {
    return (
    <div className={classes.root}>
    <CssBaseline/>
    <AppBar
    position="fixed"
    className={clsx(classes.appBar, {
    [classes.appBarShift]: open,
    })}
    style={{backgroundColor: '#ab1414'}}>
    {
    <Modal
    aria-labelledby="transition-modal-title"
    aria-describedby="transition-modal-description"
    className={classes.modal}
    open={openModal}
    onClose={() => setOpenModal(false)}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
    timeout: 500,
    }}>
    <Fade in={openModal}>
    <div className={classes.paper}>
    <h3 id="transition-modal-title">{rowData[2]}</h3>
    <InputLabel className={classes.inputLabel}>
    Proforma *
    </InputLabel>
    <br/>
    <FormControl variant="outlined" fullWidth>
    <Button disabled={fileAdded} variant="contained" color={'primary'}
    onClick={() => {
    fileDialog()
        .then(file => {
            let fileExtension = data.name.substring(file[0].name.lastIndexOf('.') + 1, data.name.length)
            const uploadTask = storageRef.ref('eventRequestForm/').child(new Date().getTime().toString() + `.${fileExtension}`).put(data);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                },
                (error) => {
                    console.log("error:-", error)
                },
                () => {
                    const uniId = guidGenerator().toString();
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        setFileAdded(true)
                        console.log('File available at', downloadURL);
                        setOpenModal(false)
                    });
                }
            )
        })
    }}>
    Add Proforma File
    </Button>
    </FormControl>
    </div>
    </Fade>
    </Modal>
    }
    <Toolbar>
    <IconButton
    color="inherit"
    aria-label="open drawer"
    onClick={handleDrawerOpen}
    edge="start"
    className={clsx(classes.menuButton, open && classes.hide)}>
    <MenuIcon/>
    </IconButton>
    <div style={{display: 'flex', flex: 1, justifyContent: 'space-between'}}>
    <Typography variant="h6" noWrap>
    Event Request Form
    </Typography>
    <div style={{flex: .1}} onClick={() => {
    localStorage.clear()
    sessionStorage.clear()
    Router.replace("/login")
    }}>
    <p style={{fontSize: 20, paddingTop: 5, cursor: 'pointer'}}>Logout</p>
    </div>
    </div>
    </Toolbar>
    </AppBar>
    <Drawer
    className={classes.drawer}
    // variant="permanent"
    variant="persistent"
    anchor="left"
    open={open}
    classes={{
    paper: classes.drawerPaper,
    }}>
    <div className={classes.drawerHeader}>
    <IconButton onClick={handleDrawerClose}>
    {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
    </IconButton>
    </div>
    <Divider/>
    <List>
    <ListItem button onClick={() => {
    loadAllEvents()
    if (parseInt(window.location.href.split("?")[1])){
    Router.push("/eventRequestForm")
    }
    clearStorage("tempData")
    clearStorage("update")
    setCurrentPage(0)
    // handleDrawerClose()
    }} style={{
    backgroundColor: currentPage < 2 ? '#ab1414' : null,
    color: currentPage < 2 ? 'white' : null
    }}>
    <ListItemIcon><EventIcon
    style={{color: currentPage < 2 ? 'white' : null}}/></ListItemIcon>
    <ListItemText primary={"Events"}/>
    </ListItem>
    {
    decoded && exceptionMenuEmails.indexOf(decoded.email) >= 0 &&
    <ListItem button onClick={() => {
    loadAllEvents()
    if (parseInt(window.location.href.split("?")[1])){
    Router.push("/eventRequestForm")
    }
    clearStorage("tempData")
    clearStorage("update")
    setCurrentPage(2)

    // handleDrawerClose()
    }} style={{
    marginTop: 20,
    backgroundColor: currentPage > 1 && currentPage < 3 ? '#ab1414' : null,
    color: currentPage > 1 && currentPage < 3 ? 'white' : null
    }}>
    <ListItemIcon><PlaylistAddCheckIcon
    style={{color: currentPage > 1 && currentPage < 3 ? 'white' : null}}/></ListItemIcon>
    <ListItemText primary={"Approve"}/>
    </ListItem>
    }
    {/*{*/}
    {/*    decoded && exceptionMenuEmails.indexOf(decoded.email) >= 0 &&*/}
    {/*    <ListItem button onClick={() => {*/}
    {/*        setCurrentPage(3)*/}
    {/*        // Router.replace("/eventRequestForm")*/}
    {/*        // clearStorage("tempData")*/}
    {/*        // clearStorage("update")*/}
    {/*        // handleDrawerClose()*/}
    {/*    }} style={{*/}
    {/*        marginTop: 20,*/}
    {/*        backgroundColor: currentPage > 2 ? '#ab1414' : null,*/}
    {/*        color: currentPage > 2 ? 'white' : null*/}
    {/*    }}>*/}
    {/*        <ListItemIcon><NotificationsActiveIcon*/}
    {/*            style={{color: currentPage > 2 ? 'white' : null}}/></ListItemIcon>*/}
    {/*        <ListItemText primary={"Alert"}/>*/}
    {/*    </ListItem>*/}
    {/*}*/}
    </List>
    </Drawer>
    <main
    className={clsx(classes.content, {
    [classes.contentShift]: open,
    })}>
    <div className={classes.drawerHeader}/>
    {
    currentPage === 0 ?
    <div>
    <Tooltip title="Add New Event" aria-label="add" style={{
    display: 'flex',
    alignSelf: 'flex-end',
    bottom: 75,
    left: '90%',
    position: 'absolute'
    }} onClick={() => {
    setCurrentPage(1)
    localStorage.setItem("invalidFields", JSON.stringify([]))
    }}>
    <Fab color="primary" className={{}}>
    <AddIcon/>
    </Fab>
    </Tooltip>
    <div style={{paddingLeft: '10%', paddingRight: '10%'}}>
    <MUIDataTable
    title={"Events"}
    data={data}
    columns={columns}
    options={options}
    components={components} />
    </div>
    </div>
    : currentPage === 1 ? <Checkout edit={() => {loadAllEvents()
    setCurrentPage(0)}} reloadData={() => loadAllEvents()}/>
    : currentPage === 2 ? <RequestedEvents reloadData={() => {
    setCurrentPage(0)
    loadAllEvents()
    }} dataForApproval={dataForApproval} options={{
    filterType: 'dropdown',
    selectableRows: false,
    downloadOptions: {filename: 'all-event-request.csv'},
    }}/> : <Alert/>
    }
    </main>
    </div>
    )
    }
    else {
    if (loading) {
    return <div/>
    }
    // return (
    //     <div>
    //         {
    //             Router.push(`/login`)
    //         }
    //     </div>
    // )
    }
    }
