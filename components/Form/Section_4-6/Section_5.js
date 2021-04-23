import React from 'react';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import GridItem from "../../Grid/GridItem";
import {SaveDataToLocalStorage} from "../../../util/general"
import {Snackbar} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    formControlLabel: {
        fontSize: 14, textAlign: 'left', marginTop: 10, marginBottom: 10
    }
}));


export default function Section_5(props) {
    const classes = useStyles();
    const [isLoading, setIsLoading] = React.useState(true)
    const [isVisible, setISVisible] = React.useState(false)
    const [totalPartcipantsCount, setTotalPartcipantsCount] = React.useState(0)
    const [jsiParticipantsCount, setJsiParticipantsCount] = React.useState(0)
    const [regionalZoneExperts, setRegionalZoneExperts] = React.useState(0)
    const [usgPartcipantsCount, setUsgPartcipantsCount] = React.useState(0)
    const [totalTraineesCount, setTotalTraineesCount] = React.useState(0)
    const [nonJsiAsTrainersCount, setNonJsiAsTrainersCount] = React.useState(0)

    function calculateTotalParticipants() {
        setTotalPartcipantsCount(+jsiParticipantsCount + +usgPartcipantsCount + +totalTraineesCount + +nonJsiAsTrainersCount + +regionalZoneExperts)
        SaveDataToLocalStorage(parseInt(totalPartcipantsCount), "totalParticipantsCount")
    }

    React.useEffect(() => {
        calculateTotalParticipants()
        if ((isLoading) || (isLoading && props.loadPreviousData_2)) {
            try {
                let data = JSON.parse(props.data)
                if (props.loadPreviousData_2) {
                    data = JSON.parse(localStorage.getItem('tempData'))
                }
                for (let key in data) {
                    if (data.hasOwnProperty(key)) {
                        let val = data[key];
                        switch (key) {
                            case "totalParticipantsCount":
                                setTotalPartcipantsCount(val.toString())
                                break;
                            case "JSIParticipantsCount":
                                setJsiParticipantsCount(val.toString())
                                break;
                            case "usgParticipantsCount":
                                setUsgPartcipantsCount(val.toString())
                                break;
                            case "NonJSIAsTrainersCount":
                                setNonJsiAsTrainersCount(val.toString())
                                break;
                            case "totalTraineesCount":
                                setTotalTraineesCount(val.toString())
                                break;
                            case "regionalZoneExperts":
                                setRegionalZoneExperts(val.toString())
                                break;


                        }
                    }
                }
            } catch (e) {
                console.info(e.message)
            }
        }
        setTimeout(() => {
            setIsLoading(false)
        }, 50)
    });

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom/>
            <h5>Participants information for JSI and non-jsi trainers and trainees.</h5>
            <br/>
            <Grid container spacing={4}>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={isVisible}
                    autoHideDuration={3500}
                    onClose={() => setISVisible(false)}
                    message={"Error : Allowed only Number"}
                />
                <GridItem xs={12} sm={12} md={6}>
                    <TextField
                        required
                        id="title"
                        label="No. of trainees "
                        helperText="(Participants that will be getting per diem as a trainee)"
                        fullWidth
                        value={totalTraineesCount}
                        onChange={(element) => {
                            setTotalTraineesCount(parseInt(element.target.value) ? +element.target.value : +0)
                            calculateTotalParticipants()
                            SaveDataToLocalStorage(parseInt(element.target.value) ? parseInt(+element.target.value) : +0, "totalTraineesCount")
                            if (element.target.value.length >0){
                                if (!parseInt(element.target.value)) {
                                    setISVisible(true)
                                }
                            }
                        }}
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                    <TextField
                        required
                        id="title"
                        label="Non JSI Trainer Treated As JSI"
                        helperText="No. of non-JSI trainers or trainees treated as non-JSI trainer"
                        fullWidth
                        value={nonJsiAsTrainersCount}
                        onChange={(element) => {
                            setNonJsiAsTrainersCount(parseInt(element.target.value) ? +element.target.value : +0)
                            calculateTotalParticipants()
                            SaveDataToLocalStorage(parseInt(element.target.value) ? parseInt(+element.target.value) : +0, "NonJSIAsTrainersCount")
                            if (element.target.value.length >0){
                                if (!parseInt(element.target.value)) {
                                    setISVisible(true)
                                }
                            }
                        }}
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                    <TextField
                        required
                        id="title"
                        label="No. of participants from JSI"
                        fullWidth
                        value={jsiParticipantsCount}
                        onChange={(element) => {
                            setJsiParticipantsCount(parseInt(element.target.value) ? +element.target.value : +0)
                            calculateTotalParticipants()
                            SaveDataToLocalStorage(parseInt(element.target.value) ? parseInt(+element.target.value) : +0, "JSIParticipantsCount")
                            if (element.target.value.length >0){
                                if (!parseInt(element.target.value)) {
                                    setISVisible(true)
                                }
                            }
                        }}
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                    <TextField
                        required
                        id="title"
                        label="No. of Non-JSI USG and other partners participants "
                        helperText="(participants that are from donor organizations or partner organizations or USG funded projects like DUP, Subcontractors like Dimagi, Intra-health,...)"
                        fullWidth
                        value={usgPartcipantsCount}
                        onChange={(element) => {
                            setUsgPartcipantsCount(parseInt(element.target.value) ? +element.target.value : +0)
                            calculateTotalParticipants()
                            SaveDataToLocalStorage(parseInt(element.target.value) ? parseInt(+element.target.value) : +0, "usgParticipantsCount")
                            if (element.target.value.length >0){
                                if (!parseInt(element.target.value)) {
                                    setISVisible(true)
                                }
                            }
                        }}
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                    <TextField
                        required
                        id="title"
                        label="No. of Regional / Zone Experts"
                        fullWidth
                        value={regionalZoneExperts}
                        onChange={(element) => {
                            setRegionalZoneExperts(parseInt(element.target.value) ? +element.target.value : +0)
                            calculateTotalParticipants()
                            SaveDataToLocalStorage(parseInt(element.target.value) ? parseInt(+element.target.value) : +0, "regionalZoneExperts")
                            if (element.target.value.length >0){
                                if (!parseInt(element.target.value)) {
                                    setISVisible(true)
                                }
                            }
                        }}
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}/>
                <GridItem xs={12} sm={12} md={6}>
                    <TextField
                        required
                        disabled
                        id="title"
                        label="Total No. of participants "
                        helperText="(All participants JSI and Non-JSI, should be the sum of the below participants No.)"
                        value={totalPartcipantsCount}
                        onChange={(element) => {
                            SaveDataToLocalStorage(parseInt(element.target.value) ? parseInt(+element.target.value) : +0, "totalParticipantsCount")
                        }}
                    />
                </GridItem>
            </Grid>
        </React.Fragment>
    );
}