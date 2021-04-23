import React from 'react';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {Button, InputLabel} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import GridItem from "../../Grid/GridItem";
import fileDialog from "file-dialog";
import Transport from "../../../api/Transport";
import {SaveDataToLocalStorage} from "../../../util/general";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import jwt_decode from "jwt-decode";
import {storageRef} from "../../../api/config";


const useStyles = makeStyles((theme) => ({
    formControlLabel: {
        fontSize: 14, textAlign: 'left', marginTop: 10, marginBottom: 10
    },

    inputLabel: {textAlign: 'left', color: 'black'}
}));

const Constants = {
    dataUploadURL: 'https://dev-cms.jopsethiopia.orgR/api/apps/dha-schemas/assets',
};

export default function Section_6(props) {

    const classes = useStyles();
    const [token, setToken] = React.useState("")

    const [openRequestLetter, setOpenRequestLetter] = React.useState(false)
    const [openParticipant, setOpenParticipant] = React.useState(false)
    const [openAgenda, setAgenda] = React.useState(false)
    const [openFinancialProposal, setFinancialProposal] = React.useState(false)
    const [openWaiver, setWaiver] = React.useState(false)

    const [isLoading, setIsLoading] = React.useState(true)
    const [requester, setRequester] = React.useState(0)
    const [approval, setApproval] = React.useState({
        id: 0,
        email: '___',
        name: "Loading ..."
    })
    const [meetingManager, setMeetingManager] = React.useState({
        id: 0,
        email: '___',
        name: "Loading ..."
    })
    const [meetingAssistant, setMeetingAssistant] = React.useState({
        id: 0,
        email: '___',
        name: "Loading ..."
    })

    const [assistant, setAssistant] = React.useState([])
    const [manager, setManager] = React.useState([])
    const [approvals, setApprovals] = React.useState([
        // {
        //     id: '8cb38adb-77cf-447f-b5c9-4529bb8206d9',
        //     email: 'al_shiferaw@et.jsi.com',
        //     fullName: 'Al Shiferaw'
        // }, {
        //     id: '6e4d9e13-e8a2-452a-99f7-440db08e58d6',
        //     email: 'rahel_abraham@et.jsi.com',
        //     fullName: 'Rahel Abraham Yitbarek'
        // },
        // {
        //     id: '43982257-ed94-49bf-a963-1771487ba807',
        //     email: 'loko_abraham@et.jsi.com',
        //     fullName: 'Dr. Loko Abraham Bongassie'
        // },
        // {
        //     id: '7e31f43a-b2c8-4d6a-9bc6-58027243e472',
        //     email: 'ruth_tesfaye@et.jsi.com',
        //     fullName: 'Ruth Tesfaye'
        // }
    ])
    React.useEffect(() => {
        if (token === "") {
            Transport.HTTP.getToken()
                .then((res) => {
                    setToken(res.data.token)
                })
                .catch((err) => {
                    alert('Error => Network Error');
                });
        }
        if (props.allData && isLoading) {
            setManager(props.allData.jsiEmployees && props.allData.jsiEmployees.sort((a, b) => -b.firstName.localeCompare(a.firstName)))
            setAssistant(props.allData.jsiEmployees && props.allData.jsiEmployees.sort((a, b) => -b.firstName.localeCompare(a.firstName)))
            let Approver = []
            props.allData.jsiEmployees && props.allData.jsiEmployees.map((element, idx) => {
                if (element.role === 'Approver') {
                    Approver.push(element)
                }
            })
            setApprovals(Approver.sort((a, b) => -b.firstName.localeCompare(a.firstName)))
            if (JSON.stringify(props.allData) !== "[]") {
                setIsLoading(false)
            }
        }
        if ((!isLoading && (approval.id === 0)) || (isLoading && props.loadPreviousData_2)) {
            try {
                let data = JSON.parse(props.data)
                if (props.loadPreviousData_2) {
                    data = JSON.parse(localStorage.getItem('tempData'))
                }
                for (let key in data) {
                    if (data.hasOwnProperty(key)) {
                        let val = data[key];
                        switch (key) {
                            case "approval":
                                setApproval(val)
                                break;
                            case "meetingManager":
                                setMeetingManager(val)
                                break;
                            case "meetingAssistant":
                                setMeetingAssistant(val)
                                break;
                        }
                    }
                }
            } catch (e) {
                console.info(e.message)
            }
        }
    });

    function uploadDocument(data, index) {
        let fileExtension = data.name.substring(data.name.lastIndexOf('.') + 1, data.name.length)
        const uploadTask = storageRef.ref('eventRequestForm/').child(new Date().getTime().toString() + `.${fileExtension}`).put(data);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },
            (error) => {
                console.log("error:-", error)
            },
            () => {
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    SaveDataToLocalStorage([downloadURL.toString()], index === 0 ? "agenda" :
                        index === 1 ? "requestLetter" :
                            index === 2 ? "participantsList" :
                                index === 3 ? "financialProposal" :
                                    index === 4 ? "waiverFile" : '')

                    switch (index) {
                        case 0:
                            setAgenda(true)
                            break;
                        case 1:
                            setOpenRequestLetter(true)
                            break;
                        case 2:
                            setOpenParticipant(true)
                            break;
                        case 3:
                            setFinancialProposal(true)
                            break;
                        case 4:
                            setWaiver(true)
                            break;
                    }
                });
            }
        )

        // axios(Constants.dataUploadURL, {
        //     method: 'POST',
        //     headers: {
        //         Authorization: `Bearer ${token}`,
        //         Accept: 'application/json',
        //         'Content-Type': 'multipart/form-data',
        //     },
        //     data: data,
        // })
        //     .then((res) => res.data)
        //     .then((json) => {
        //         let files = JSON.parse(localStorage.getItem("files")) || []
        //         files[index] = 'https://dev-cms.jopsethiopia.org' + json._links['content/slug'].href
        //
        //         SaveDataToLocalStorage(['https://dev-cms.jopsethiopia.org' + json._links['content/slug'].href], index === 0 ? "agenda" :
        //             index === 1 ? "requestLetter" :
        //                 index === 2 ? "participantsList" :
        //                     index === 3 ? "financialProposal" :
        //                         index === 4 ? "waiverFile" : '')
        //
        //         switch (index) {
        //             case 0:
        //                 setAgenda(true)
        //                 break;
        //             case 1:
        //                 setOpenRequestLetter(true)
        //                 break;
        //             case 2:
        //                 setOpenParticipant(true)
        //                 break;
        //             case 3:
        //                 setFinancialProposal(true)
        //                 break;
        //             case 4:
        //                 setWaiver(true)
        //                 break;
        //
        //         }
        //
        //     })
        //     .catch((error) => {
        //         alert(error.message);
        //     });
    }

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom/>
            <h5>Attach required documents for the event</h5>
            <br/>
            <Grid container spacing={3}>
                <GridItem xs={12} sm={12} md={6}>
                    <InputLabel className={classes.inputLabel}>
                        Agenda *
                    </InputLabel>
                    <br/>
                    <FormControl variant="outlined" fullWidth>
                        <Button disabled={openAgenda} variant="contained" onClick={() => {
                            fileDialog({accept: ['documents/pdf', 'documents/xls']})
                                .then(file => {
                                    const response = new FormData()
                                    response.append('file', file[0])
                                    response.append('name', 'Letter')
                                    uploadDocument(file[0], 0)
                                }).finally(() => {
                                setAgenda(true)
                            })
                        }}>
                            Add Agenda
                        </Button>
                    </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}/>

                {
                    parseInt(JSON.parse(localStorage.getItem('tempData')).nonJSITraineeTreatedAsJSI) > 0 &&
                    <>
                        <GridItem xs={12} sm={12} md={6}>
                            <InputLabel className={classes.inputLabel}>
                                Waiver File (Approval document for trainees/participants to be treated as JSI-staff) *
                            </InputLabel>
                            <br/>
                            <FormControl variant="outlined" fullWidth>
                                <Button disabled={openWaiver} variant="contained" onClick={() => {
                                    fileDialog()
                                        .then(file => {
                                            const response = new FormData()
                                            response.append('file', file[0])
                                            response.append('name', 'Letter')
                                            uploadDocument(file[0], 4)
                                        })
                                }}>
                                    Add Waiver File
                                </Button>
                            </FormControl>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}/>
                    </>
                }
                {/*<GridItem xs={12} sm={12} md={12}/>*/}
                {/*<GridItem xs={12} sm={12} md={6}>*/}
                {/*    <InputLabel className={classes.inputLabel}>*/}
                {/*        Proposal **/}
                {/*    </InputLabel>*/}
                {/*    <br/>*/}
                {/*    <FormControl variant="outlined" fullWidth>*/}
                {/*        <Button disabled={openFinancialProposal} variant="contained" onClick={() => {*/}
                {/*            fileDialog()*/}
                {/*                .then(file => {*/}
                {/*                    const response = new FormData()*/}
                {/*                    response.append('file', file[0])*/}
                {/*                    response.append('name', 'Letter')*/}

                {/*                    uploadDocument(file[0], 3)*/}
                {/*                })*/}
                {/*        }}>*/}
                {/*            Add Proposal*/}
                {/*        </Button>*/}
                {/*    </FormControl>*/}
                {/*</GridItem>*/}
                <GridItem xs={12} sm={12} md={6}>
                    <InputLabel className={classes.inputLabel}>
                        Agency Event Request Letter
                    </InputLabel>
                    <br/>
                    <FormControl variant="outlined" fullWidth>
                        <Button disabled={openRequestLetter} variant="contained" onClick={() => {
                            fileDialog()
                                .then(file => {
                                    const response = new FormData()
                                    response.append('file', file[0])
                                    response.append('name', 'Letter')
                                    uploadDocument(file[0], 1)
                                }).finally(() => {
                            })
                        }}>
                            Add Letter
                        </Button>
                    </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}/>
                <GridItem xs={12} sm={12} md={6}>
                    <InputLabel className={classes.inputLabel}>
                        Participants' list
                    </InputLabel>
                    <br/>
                    <FormControl variant="outlined" fullWidth>
                        <Button disabled={openParticipant} variant="contained" onClick={() => {
                            fileDialog()
                                .then(file => {
                                    const response = new FormData()
                                    response.append('file', file[0])
                                    response.append('name', 'Letter')

                                    uploadDocument(file[0], 2)
                                })
                        }}>
                            Add Participants' list
                        </Button>
                    </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}/>

                <GridItem xs={12} sm={12} md={6}>
                    <InputLabel className={classes.inputLabel}>
                        Approver Name *
                    </InputLabel>
                    <br/>
                    <FormControl variant="outlined" fullWidth>
                        <Autocomplete
                            options={approvals}
                            getOptionLabel={(option) => option.firstName + ' ' + option.lastName}
                            getOptionDisabled={(option) => option.firstName === "[LEGACY]" || option.firstName === "Unspecified"}
                            onChange={(element, value) => {
                                setApproval({
                                    id: value.id,
                                    name: value.firstName + ' ' + value.lastName,
                                    email: value.email
                                })
                                SaveDataToLocalStorage({
                                    id: value.id,
                                    name: value.firstName + ' ' + value.lastName,
                                    email: value.email
                                }, "approval")
                            }}
                            renderInput={(params) => <TextField {...params}
                                                                label={isLoading ? "Loading ..." : approval.name !== 'Loading ...' ? approval.name : 'Select Meeting Manager'}
                                                                variant="outlined"/>}
                        />
                    </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}/>
                {
                    !isLoading && manager && manager.map((element, idx) => {
                        let decoded = undefined
                        try {
                            let token = sessionStorage.getItem("token");
                            decoded = jwt_decode(token);
                        } catch (e) {
                        }
                        if (decoded && element.email === decoded.email) {
                            localStorage.setItem("id", element.id)
                        }
                    })
                }

                <GridItem xs={12} sm={12} md={6}>
                    <InputLabel className={classes.inputLabel}>
                        Meeting Manager Name *
                    </InputLabel>
                    <br/>
                    <FormControl variant="outlined" fullWidth>
                        <Autocomplete
                            options={manager}
                            getOptionLabel={(option) => option.firstName + ' ' + option.lastName}
                            getOptionDisabled={(option) => option.firstName === "[LEGACY]" || option.firstName === "Unspecified" || option.email === "-"}
                            onChange={(element, value) => {
                                setMeetingManager({
                                    id: value.id,
                                    name: value.firstName + ' ' + value.lastName,
                                    email: value.email
                                })
                                SaveDataToLocalStorage({
                                    id: value.id,
                                    name: value.firstName + ' ' + value.lastName,
                                    email: value.email
                                }, "meetingManager")
                            }}
                            renderInput={(params) => <TextField {...params}
                                                                label={isLoading ? "Loading ..." : meetingAssistant.name !== 'Loading ...' ?
                                                                    meetingAssistant.name : 'Select Meeting Manager'}
                                                                variant="outlined"/>}
                        />
                    </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}/>
                <GridItem xs={12} sm={12} md={6}>
                    <InputLabel className={classes.inputLabel}>
                        Meeting Assistant Name *
                    </InputLabel>
                    <br/>
                    <FormControl variant="outlined" fullWidth>
                        <Autocomplete
                            options={assistant}
                            getOptionLabel={(option) => option.firstName + ' ' + option.lastName}
                            getOptionDisabled={(option) => option.firstName === "[LEGACY]" || option.firstName === "Unspecified" || option.email === "-"}
                            onChange={(element, value) => {
                                setMeetingAssistant({
                                    id: value.id,
                                    name: value.firstName + ' ' + value.lastName,
                                    email: value.email
                                })
                                SaveDataToLocalStorage({
                                    id: value.id,
                                    name: value.firstName + ' ' + value.lastName,
                                    email: value.email
                                }, "meetingAssistant")
                            }}
                            renderInput={(params) => <TextField {...params}
                                                                label={isLoading ? "Loading ..." : meetingAssistant.name !== 'Loading ...' ? meetingAssistant.name.replace('-', '') : 'Select Meeting Assistant'}
                                                                variant="outlined"/>}
                        />
                    </FormControl>
                </GridItem>
            </Grid>
        </React.Fragment>
    );
}