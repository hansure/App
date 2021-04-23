import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddressForm from './Section_1-3/AddressForm';
import PaymentForm from './Section_4-6/PaymentForm';
import Preview from './Preview';
import Transport from "../../api/Transport";
import {Popover, Snackbar} from "@material-ui/core";
import {clearStorage} from "../../util/general";
import jwt_decode from "jwt-decode";
import Router from "next/router";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 1200,
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
}));

const steps = ['Section 1 - 3', 'Section 4 - 6', 'Summary'];

export default function Checkout(props) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [message, setMessage] = React.useState("");
    const [comment, setComment] = React.useState("");
    const [isVisible, setIsVisible] = React.useState(false);
    const [rejectPopover, setRejectPopover] = React.useState(false);
    const [disableSubmit, setDisableSubmit] = React.useState(false);
    const [summary, setSummary] = React.useState(false);
    const [title, setTitle] = React.useState(false);
    const [objective, setObjective] = React.useState(false);
    const [loadPreviousData, setLoadPreviousData] = React.useState(false);
    const [loadPreviousData_2, setLoadPreviousData_2] = React.useState(false);
    const [SS, actionSS] = React.useState(false);
    const [data] = React.useState(localStorage.getItem("tempData"))
    const [invalidFields] = React.useState(localStorage.getItem("invalidFields"))
    const childRef = React.useRef();
    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    function arr_diff(a1, a2) {
        let a = [], diff = [];
        for (let i = 0; i < a1.length; i++) {
            a[a1[i]] = true;
        }
        for (let i = 0; i < a2.length; i++) {
            if (a[a2[i]]) {
                delete a[a2[i]];
            } else {
                a[a2[i]] = true;
            }
        }
        for (let k in a) {
            diff.push(k);
        }
        return diff;
    }

    const handlePage_1 = (section) => {
        try {
            let data = JSON.parse(localStorage.getItem("tempData"))
            if (data !== null) {
                if (Object.keys(data).length >= 23) {
                    for (let key in data) {
                        let val = data[key]
                        let isANumber = /^\d+$/.test(val);
                        switch (key) {
                            case "title":
                                if (isANumber) {
                                    setMessage(`TITLE can not be number only`)
                                    setTimeout(() => {
                                        setIsVisible(true)
                                        setTitle(false)
                                    }, 5)
                                } else {
                                    setTitle(true)
                                }
                                break
                            case "summary":
                                if (isANumber) {
                                    setMessage(`SUMMARY can not be number only`)
                                    setTimeout(() => {
                                        setIsVisible(true)
                                        setSummary(false)
                                    }, 5)
                                } else {
                                    if (val.toString().length > 100) {
                                        setMessage(`SUMMARY must be less than 100 characters`)
                                        setTimeout(() => {
                                            setIsVisible(true)
                                            setSummary(false)
                                        }, 5)
                                    } else {
                                        setSummary(true)
                                    }
                                }
                                break;
                            case "objective":
                                if (val.toString().length < 300) {
                                    setMessage(`Proposal Objective must be min of 300 characters`)
                                    setTimeout(() => {
                                        setIsVisible(true)
                                        setObjective(false)
                                    }, 5)
                                } else {
                                    setObjective(true)
                                }
                                break;
                        }
                    }
                    if (summary && objective && title) {
                        setActiveStep(activeStep + 1);
                    }
                } else {
                    let allKey = [
                        "workPlanActivity",
                        "workPlanObjective",
                        "workPlanService",
                        "eventExpense",
                        "cityLevel",
                        "requester",
                        "title",
                        "summary",
                        "objective",
                        "donor",
                        "project",
                        "eventType",
                        "hostInstitution",
                        "institutionAgency",
                        "region",
                        "city",
                        'product',
                        "anticipatedVenue",
                        "startDate",
                        "earliestArrivalDate",
                        "endDate",
                        "arrivalDate",
                        "duration"
                    ]
                    let currentKey = []
                    let ignoredName = ["subProduct"]
                    for (let key in data) {
                        if (ignoredName.indexOf(key) < 0) {
                            currentKey.push(key.toString())
                        }
                    }
                    let difKeys = arr_diff(allKey, currentKey)
                    difKeys.map((element, idx) => {
                        setMessage(`Please insert "${element.toString().toUpperCase()}" at 'SECTION ${section}'`)
                        setTimeout(() => {
                            setIsVisible(true)
                        }, 5)
                    })
                }
            } else {
                setMessage(`Please fill the form first`)
                setTimeout(() => {
                    setIsVisible(true)
                }, 5)
            }
        } catch (e) {
            console.log(e.message)
        }
    }

    const handlePage_2 = (section) => {
        try {
            let data = JSON.parse(localStorage.getItem("tempData"))
            if (data !== null) {
                if (Object.keys(data).length >= 35) {
                    setActiveStep(activeStep + 1);
                } else {
                    let allKey = [
                        "workPlanObjective",
                        "workPlanService",
                        "cityLevel",
                        "requester",
                        "title",
                        "summary",
                        "objective",
                        "donor",
                        "project",
                        "product",
                        "eventType",
                        "hostInstitution",
                        "institutionAgency",
                        "subProduct",
                        "region",
                        "city",
                        "anticipatedVenue",
                        "startDate",
                        "earliestArrivalDate",
                        "endDate",
                        "arrivalDate",
                        "duration",
                        "eventExpense",
                        "perdiem",
                        "totalParticipantsCount",
                        "JSIParticipantsCount",
                        "usgParticipantsCount",
                        "NonJSIAsTrainersCount",
                        "totalTraineesCount",
                        "approval",
                        "meetingManager",
                        "meetingAssistant",
                        "agenda",
                        "meetingManager",
                        "meetingAssistant",
                        "regionalZoneExperts"
                    ]
                    let currentKey = []
                    let ignoredName = ['workPlanActivity', 'financialProposal', "waiverFile", "requestLetter", "participantsList"]
                    for (let key in data) {
                        if (ignoredName.indexOf(key) < 0) {
                            currentKey.push(key.toString())
                        }
                    }
                    let difKeys = arr_diff(allKey, currentKey)
                    difKeys.map((element, idx) => {
                        setMessage(`Please insert "${element.toString().toUpperCase()}" at 'SECTION ${section}'`)
                        setTimeout(() => {
                            setIsVisible(true)
                        }, 5)
                    })
                }
            } else {
                setMessage(`Please fill the form first`)
                setTimeout(() => {
                    setIsVisible(true)
                }, 5)
            }
        } catch (e) {
            console.log(e.message)
        }
    }

    const handleBack = () => {
        if (activeStep === 1) {
            setLoadPreviousData(true)
        } else if (activeStep === 2) {
            setLoadPreviousData_2(true)
        }
        setActiveStep(activeStep - 1);
    };

    const [allData, setAllData] = React.useState([])
    const [accordion_1, setAccordion_1] = React.useState(1)
    const [accordion_2, setAccordion_2] = React.useState(4)

    function getStepContent(step, allData, invalidFields) {
        switch (step) {
            case 0:
                return <AddressForm reloadData={props.reloadData} loadPreviousData={loadPreviousData} allData={allData} active={accordion_1}
                                    data={data} invalidFields={invalidFields}/>;
            case 1:
                return <PaymentForm reloadData={props.reloadData} loadPreviousData_2={loadPreviousData_2} allData={allData} active={accordion_2}
                                    data={data}/>;
            case 2:
                return <Preview reloadData={props.reloadData} SS={SS} ref={childRef} previewPage={props.previewPage} data={data} allData={allData}
                                edit={(to) => {
                                    if (parseInt(to) < 4) {
                                        setAccordion_1(to)
                                        setTimeout(() => {
                                            setActiveStep(0)
                                        }, 5)
                                    } else {
                                        setAccordion_2(to)
                                        setTimeout(() => {
                                            setActiveStep(1)
                                        }, 5)
                                    }
                                }}/>;
            default:
                throw new Error('Unknown step');
        }
    }

    React.useEffect(() => {
        if (!props.previewPage && allData.length === 0) {
            Transport.HTTP.getAllData().then((res) => {
                setAllData(res.data)
            }).catch(error => console.log(error.message))
        } else if (props.previewPage) {
            setActiveStep(2)
        }
    });

    return (
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                {
                    !props.previewPage &&
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                }
                <React.Fragment>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Typography variant="h5" gutterBottom>
                                Event order Sent.
                            </Typography>
                            <br/>
                            <Typography variant="subtitle1">
                                Your event request has been sent. You will receive an email notification once the
                                event accepted.
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    props.edit()
                                }}
                                className={classes.button}> Back To Home Screen
                            </Button>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {getStepContent(activeStep, allData, invalidFields)}
                            <Snackbar
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                open={isVisible}
                                autoHideDuration={3500}
                                onClose={() => setIsVisible(false)}
                                message={message}
                            />
                            {
                                props.previewPage && <div className={classes.buttons}>
                                    <Button
                                        variant="contained"
                                        color={"secondary"}
                                        onClick={() => {
                                            setRejectPopover(true)
                                        }}
                                        className={classes.button}>
                                        Reject
                                    </Button>
                                    <Popover
                                        open={rejectPopover}
                                        anchorEl={null}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'center',
                                        }}
                                        transformOrigin={{
                                            vertical: 'center',
                                            horizontal: 'center',
                                        }}>
                                        <div style={{
                                            alignItems: 'center',
                                            width: '100%',
                                            display: 'flex',
                                            justifyContent: 'space-around',
                                            flexDirection: 'column'
                                        }}>
                                            <TextField
                                                onChange={(event) => {
                                                    setComment(event.target.value)
                                                }}
                                                style={{width: 700, margin: 50,}}
                                                multiline
                                                rows={10}
                                                value={comment}
                                                label="Reason"
                                                helperText="Please submit a reason for rejecting this form"
                                                // fullWidth
                                            />
                                            <div
                                                style={{display: 'flex', justifyContent: 'space-around', width: '40%'}}>
                                                <Button
                                                    variant="contained"
                                                    onClick={() => {
                                                        setRejectPopover(false)
                                                    }}>
                                                    Cancel
                                                </Button>
                                                <Button
                                                    disabled={comment.length < 10}
                                                    variant="contained"
                                                    onClick={() => {
                                                        setRejectPopover(false)
                                                        let token = sessionStorage.getItem("token");
                                                        let decoded = undefined
                                                        try {
                                                            decoded = jwt_decode(token);
                                                        } catch (e) {
                                                        }
                                                        if (decoded && decoded.email) {
                                                            Transport.HTTP.changeStatus(window.location.href.split('?')[1], 2, decoded.email, comment)
                                                                .then((res) => {
                                                                    alert('Event rejected')
                                                                }).finally(() => {
                                                                Router.replace(`/eventRequestForm`)
                                                            }).catch(err => alert(err.message))
                                                        } else {
                                                            alert('Error -> email not found')
                                                        }
                                                    }}>
                                                    Submit
                                                </Button>
                                            </div>
                                            <br/>
                                        </div>
                                    </Popover>
                                    <Button
                                        variant="contained"
                                        // color="primary"
                                        onClick={() => {
                                            let token = sessionStorage.getItem("token");
                                            let decoded = undefined
                                            try {
                                                decoded = jwt_decode(token);
                                            } catch (e) {}
                                            if (decoded && decoded.email) {
                                                Transport.HTTP.changeStatus(window.location.href.split('?')[1], 1, decoded.email, '')
                                                    .then(res => {
                                                        Router.replace(`/eventRequestForm`)
                                                    }).catch(err => console.log(err.message))
                                            } else {
                                                alert('Error -> email not found')
                                            }
                                        }}
                                        className={classes.button}>
                                        Accept
                                    </Button>
                                </div>
                            }
                            {
                                !props.previewPage && <div className={classes.buttons}>
                                    {activeStep !== 0 && (
                                        <Button onClick={handleBack} className={classes.button}>
                                            Back
                                        </Button>
                                    )}
                                    <Button
                                        disabled={disableSubmit}
                                        variant="contained"
                                        color="primary"
                                        onClick={() => {
                                            if (activeStep === steps.length - 1) {
                                                setDisableSubmit(true)
                                                let isUpdate = localStorage.getItem("update") || false
                                                let data = localStorage.getItem("tempData") || {}
                                                actionSS(true)
                                                if (isUpdate) {
                                                    Transport.HTTP.updateEventReq(isUpdate, data).then(res => {
                                                        res.data
                                                        // if (value.success){
                                                            clearStorage("tempData")
                                                            clearStorage("update")
                                                            setActiveStep(activeStep + 1);
                                                            setDisableSubmit(false)
                                                        // }
                                                        }).catch(error => alert(error.message))
                                                } else {
                                                    Transport.HTTP.createEventReq(data).then(res => {
                                                        clearStorage("tempData")
                                                        setActiveStep(activeStep + 1);
                                                    }).finally((value) => {
                                                        Router.replace('/eventRequestForm')
                                                        setDisableSubmit(false)
                                                    }).catch(error => console.log(error.message))
                                                }
                                            } else {
                                                if (activeStep === 0) {
                                                    handlePage_1("1 - 3")
                                                } else if (activeStep === 1) {
                                                    handlePage_2("4 - 6")
                                                } else if (activeStep === 2) {
                                                    handleNext()
                                                }
                                            }
                                        }}
                                        className={classes.button}>
                                        {activeStep === steps.length - 1 ? 'Submit' : 'Save & Next'}
                                    </Button>
                                </div>
                            }
                        </React.Fragment>
                    )}
                </React.Fragment>
            </Paper>
        </main>
    );
}