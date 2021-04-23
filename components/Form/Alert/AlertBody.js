import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {Button, Checkbox, Chip, InputLabel, MenuItem, Select} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import GridItem from "../../Grid/GridItem";
import Alert from "../../../api/Alert";
import Router from "next/router";
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 900,
            fontSize: 14,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        // marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            // marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
    formControlLabel: {
        fontSize: 14, textAlign: 'left', marginTop: 10, marginBottom: 10
    },
    inputLabel: {textAlign: 'left', color: 'black'}
}));

export default function AlertBody() {
    const classes = useStyles();
    const [recipientGroupList, setInstitutions] = React.useState()
    const [triggerList, setTriggerData] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)

    const [id, setAlertId] = React.useState();
    const [name, setName] = React.useState();
    const [action, setAction] = React.useState();
    const [template, setTemplate] = React.useState();
    const [recipientGroups, setRecipientGroup] = React.useState([]);
    const [triggers, setTrigger] = React.useState([]);
    const [alertId] = React.useState(Router.query.id);

    const handleSubmit = (evt) => {
        evt.preventDefault()
        const alert = {
            id: Router.query.id,
            name: name,
            action: action,
            templateId: template,
            taskTriggers: triggers,
            taskRecipientGroups: recipientGroups
        }

        if (alert.id > 0) {
            Alert.HTTP.update(alert).then((res) => {
                window.location.reload();
            }).catch(error => console.log(error.message));
        } else {
            Alert.HTTP.create(alert).then((res) => {
                Router.push({
                    pathname: "/updateAlert",
                    query: {id: res.data.response.id}
                })
            }).catch(error => console.log(error.message));
        }
    }

    const findArrayElementById = (array, id) => {
        return array.find((element) => {
            return element.id === id;
        })
    }

    React.useEffect(() => {
        if (isLoading) {
            Alert.HTTP.getAllTriggers().then((res) => {
                setTriggerData(res.data.response);
                Alert.HTTP.getAllRecipientGroups().then((res) => {
                    setInstitutions(res.data.response);
                    setIsLoading(false);
                    if (alertId) {
                        Alert.HTTP.getAlert(alertId).then((res) => {
                            console.log(res.data.response);
                            if (res.data.response) {
                                setAlertId(res.data.response.id);
                                setName(res.data.response.name);
                                setAction(res.data.response.action.detail);
                                setTemplate(res.data.response.templateId);
                                setTrigger(res.data.response.taskTriggers);
                                setRecipientGroup(res.data.response.taskRecipientGroups);
                            }
                        }).catch(error => console.log(error.message));
                    }
                }).catch(error => console.log(error.message));
            }).catch(error => console.log(error.message));
        }
    });

    if (alertId && !id) {
        return <Typography variant="h6" component="div">
            Loading...
        </Typography>;
    }

    return (
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography component="h1" variant="h4" align="center">
                    { alertId ? 'Update Alert Form' : 'Create Alert Form'}
                </Typography>
                <React.Fragment>
                    <Typography variant="h6" gutterBottom/>
                    <br/>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <GridItem item xs={12} md={6}>
                                <TextField
                                    required
                                    id="name"
                                    label="Name"
                                    multiline
                                    value={name}
                                    onChange={(event) => {
                                        setName(event.target.value);
                                    }}
                                    fullWidth
                                />
                            </GridItem>
                            <GridItem item xs={12} md={12}>
                                <TextField
                                    id="action"
                                    label="Action"
                                    multiline
                                    value={action}
                                    onChange={(event) => {
                                        setAction(event.target.value);
                                    }}
                                    fullWidth
                                />
                            </GridItem>
                            <GridItem item xs={12} md={12}>
                                <TextField
                                    id="template"
                                    label="Template"
                                    multiline
                                    value={template}
                                    onChange={(event) => {
                                        setTemplate(event.target.value);
                                    }}
                                    fullWidth
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12}>
                                <InputLabel className={classes.inputLabel}>
                                    Recipient Group *
                                </InputLabel>
                                <br/>
                                <FormControl variant="outlined" fullWidth>
                                    <Select
                                        required
                                        multiple
                                        style={{width: '100%', textAlign: 'left', color: 'gray'}}
                                        labelId="recipient-group-select-label"
                                        id="recipient-group-select"
                                        value={recipientGroups}
                                        onChange={(event) => {
                                            setRecipientGroup(event.target.value)
                                        }}
                                        renderValue={(selected) => (
                                            <div className={classes.chips}>
                                                {selected.map((value) => (
                                                <Chip key={value} label={findArrayElementById(recipientGroupList, value).name} className={classes.chip} />
                                                ))}
                                            </div>
                                        )}
                                        >
                                        {
                                            !isLoading ? recipientGroupList.map(element => {
                                                return (
                                                    <MenuItem key={ element.name } value={ element.id }>
                                                        <Checkbox checked={recipientGroups.indexOf(element.id) > -1} />
                                                        {element.name}
                                                    </MenuItem>
                                                )
                                            }) : null
                                        }
                                    </Select>
                                </FormControl>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12}>
                                <InputLabel className={classes.inputLabel}>
                                    Schedules *
                                </InputLabel>
                                <br/>
                                <FormControl variant="outlined" fullWidth>
                                    <Select
                                        required
                                        multiple
                                        style={{width: '100%', textAlign: 'left', color: 'gray'}}
                                        labelId="schedule-select-label"
                                        id="schedule-select"
                                        value={triggers}
                                        onChange={(event) => {
                                            setTrigger(event.target.value);
                                        }}
                                        renderValue={(selected) => (
                                            <div className={classes.chips}>
                                                {selected.map((value) => (
                                                <Chip key={value} label={findArrayElementById(triggerList, value).name} className={classes.chip} />
                                                ))}
                                            </div>
                                        )}
                                        >
                                        {
                                            !isLoading ? triggerList.map(element => {
                                                return (
                                                    <MenuItem key={ element.name } value={ element.id }>
                                                        <Checkbox checked={triggers.indexOf(element.id) > -1} />
                                                        {element.name}
                                                    </MenuItem>
                                                )
                                            }) : null
                                        }
                                    </Select>
                                </FormControl>
                            </GridItem>
                            
                            <GridItem>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}>
                                    Submit
                                </Button>
                            </GridItem>
                        </Grid>
                    </form>
                </React.Fragment>
            </Paper>
        </main>
    )
}