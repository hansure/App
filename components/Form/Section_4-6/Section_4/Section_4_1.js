import React from 'react';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {FormLabel, Paper, Radio, RadioGroup} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import GridItem from "../../../Grid/GridItem";
import {SaveDataToLocalStorage} from '../../../../util/general';


const useStyles = makeStyles((theme) => ({
    formControlLabel: {
        fontSize: 14, textAlign: 'left', marginTop: 10, marginBottom: 10
    },
    container: {
        justifyContent: 'space-between'
    }
}));

export default function Section_6(props) {

    const classes = useStyles();
    const [breakfastJSI, setBreakfastJSI] = React.useState("")
    const [breakfastNonJSI, setBreakfastNonJSI] = React.useState("")
    const [lunch, setLunch] = React.useState("")
    const [dinnerJSI, setDinnerJSI] = React.useState("")
    const [incidental, setIncidental] = React.useState("")
    const [lodging, setLodging] = React.useState("")
    const [transportAirTicket, setTransportAirTicket] = React.useState("")
    const [transportLocal, setTransportLocal] = React.useState("")
    const [headerCountTrainer, setHeaderCountTrainer] = React.useState(parseInt(JSON.parse(localStorage.getItem('tempData')).NonJSIAsTrainersCount) || 0)
    const [headerCountTrainee, setHeaderCountTrainee] = React.useState(parseInt(JSON.parse(localStorage.getItem('tempData')).totalTraineesCount) || 0)
    const [radioBreakfast] = React.useState([
        "Provided",
        "Reimbursable",
        "Not Provided/Not Reimbursable",
    ])


    React.useEffect(() => {
        setHeaderCountTrainer(parseInt(JSON.parse(localStorage.getItem('tempData')).NonJSIAsTrainersCount) || 0)
        setHeaderCountTrainee(parseInt(JSON.parse(localStorage.getItem('tempData')).totalTraineesCount) || 0)
    })


    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom/>
            <h5>{props.headerTitle + ' - '}{
                props.headerTitle === 'Trainees' ? headerCountTrainee : headerCountTrainer}</h5>
            <br/>
            <Grid container spacing={3} className={classes.container}>

                <Paper style={{width: '100%', padding: 10, paddingLeft: 25}} id="capture">
                    <Grid item style={{alignItems: 'flex-start'}}>
                        <h5>{props.headerTitle === 'Trainees' ? '(Flat Rate)' : '(JSI-Staff Rate)'}</h5>
                        <h5>Provided (By the event), Reimbursable (Will be paid based on M&IE calculation), Not
                            Provided/Not Reimbursable (Not provided by event and not paid)</h5>
                    </Grid>
                    <br/>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Grid item style={{alignItems: 'flex-start'}}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend"
                                           style={{textAlign: 'left', color: 'black'}}>Breakfast</FormLabel>
                                <RadioGroup aria-label="Institution/Agency" name="Institution/Agency"
                                            value={props.headerTitle !== 'Trainees' ?
                                                JSON.parse(localStorage.getItem('tempData')).eventExpense.breakfastProvided ? 'provided' :
                                                    // JSON.parse(localStorage.getItem('tempData')).perdiem.trainee.breakfast ?
                                                    //     JSON.parse(localStorage.getItem('tempData')).perdiem.trainee.breakfast.toLowerCase() :
                                                    breakfastJSI
                                                : breakfastJSI}
                                            onChange={(event, value) => {
                                                // if (props.headerTitle !== 'Trainees' && !JSON.parse(localStorage.getItem('tempData')).eventExpense.breakfastProvided) {
                                                setBreakfastJSI(value)
                                                SaveDataToLocalStorage({
                                                    name: 'breakfast',
                                                    type: props.headerTitle,
                                                    value: value
                                                }, "standardPerDiem")
                                                // }
                                            }}>
                                    {
                                        radioBreakfast.map((element, idx) => {
                                            return (
                                                <FormControlLabel value={element.toString().trim().toLowerCase()}
                                                                  control={<Radio/>}
                                                                  label={<Typography
                                                                      className={classes.formControlLabel}>
                                                                      {element}
                                                                  </Typography>}/>
                                            )
                                        })
                                    }
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        {/*<GridItem xs={12} sm={12} md={12}/>*/}
                        <Grid md={5} item style={{alignItems: 'flex-start'}}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend"
                                           style={{textAlign: 'left', color: 'black'}}>Lunch</FormLabel>
                                <RadioGroup aria-label="Institution/Agency" name="Institution/Agency"
                                            value={props.headerTitle !== 'Trainees' ? JSON.parse(localStorage.getItem('tempData')).eventExpense.lunchProvided ? 'provided'
                                                // : JSON.parse(localStorage.getItem('tempData')).perdiem.trainee.lunch ?
                                                //     JSON.parse(localStorage.getItem('tempData')).perdiem.trainee.lunch.toLowerCase()
                                                    : lunch : lunch}
                                            onChange={(event, value) => {
                                                // if (props.headerTitle !== 'Trainees' && !JSON.parse(localStorage.getItem('tempData')).eventExpense.lunchProvided) {
                                                setLunch(value)
                                                SaveDataToLocalStorage({
                                                    name: 'lunch',
                                                    type: props.headerTitle,
                                                    value: value
                                                }, "standardPerDiem")
                                                // }
                                            }}>
                                    {
                                        radioBreakfast.map((element, idx) => {
                                            return (
                                                <FormControlLabel value={element.toString().trim().toLowerCase()}
                                                                  control={<Radio/>}
                                                                  label={<Typography
                                                                      className={classes.formControlLabel}>
                                                                      {element}
                                                                  </Typography>}/>
                                            )
                                        })
                                    }
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </div>
                    <GridItem xs={12} sm={12} md={12}/>
                    <br/>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Grid item style={{alignItems: 'flex-start'}}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend"
                                           style={{textAlign: 'left', color: 'black'}}>Dinner</FormLabel>
                                <RadioGroup aria-label="Institution/Agency" name="Institution/Agency"
                                            value={props.headerTitle !== 'Trainees' ?
                                                JSON.parse(localStorage.getItem('tempData')).eventExpense.dinnerProvided ? 'provided' :
                                                    // JSON.parse(localStorage.getItem('tempData')).perdiem.trainee.dinner ?
                                                    //     JSON.parse(localStorage.getItem('tempData')).perdiem.trainee.dinner.toLowerCase() :
                                                        dinnerJSI : dinnerJSI}
                                            onChange={(event, value) => {
                                                // if (props.headerTitle !== 'Trainees' && !JSON.parse(localStorage.getItem('tempData')).eventExpense.dinnerProvided) {
                                                setDinnerJSI(value)
                                                SaveDataToLocalStorage({
                                                    name: 'dinner',
                                                    type: props.headerTitle,
                                                    value: value
                                                }, "standardPerDiem")
                                                // }
                                            }}>
                                    {
                                        radioBreakfast.map((element, idx) => {
                                            return (
                                                <FormControlLabel value={element.toString().trim().toLowerCase()}
                                                                  control={<Radio/>}
                                                                  label={<Typography
                                                                      className={classes.formControlLabel}>
                                                                      {element}
                                                                  </Typography>}/>
                                            )
                                        })
                                    }
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        {/*<GridItem xs={12} sm={12} md={12}/>*/}
                        <Grid md={5} item style={{alignItems: 'flex-start'}}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend"
                                           style={{textAlign: 'left', color: 'black'}}>Incidental</FormLabel>
                                <RadioGroup aria-label="Institution/Agency" name="Institution/Agency"
                                            value={JSON.parse(localStorage.getItem('tempData')).perdiem.trainee.incidentals ?
                                                incidental : incidental}
                                            onChange={(event, value) => {
                                                setIncidental(value)
                                                SaveDataToLocalStorage({
                                                    name: 'incidentals',
                                                    type: props.headerTitle,
                                                    value: value
                                                }, "standardPerDiem")
                                            }}>
                                    {
                                        radioBreakfast.map((element, idx) => {
                                            return (
                                                <FormControlLabel value={element.toString().trim().toLowerCase()}
                                                                  control={<Radio/>}
                                                                  label={<Typography
                                                                      className={classes.formControlLabel}>
                                                                      {element}
                                                                  </Typography>}/>
                                            )
                                        })
                                    }
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </div>
                </Paper>
                <GridItem xs={12} sm={12} md={12}/>

                <Paper style={{width: '100%', padding: 10, paddingLeft: 25}} id="capture">
                    <Grid item style={{alignItems: 'flex-start'}}>
                        <h5>Provided (By the event), Reimbursable (Based on receipt and transport authority's tariff),
                            Not Provided/Not Reimbursable (Not provided by event and not paid)</h5>
                    </Grid>
                    <br/>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Grid item style={{alignItems: 'flex-start'}}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend" style={{textAlign: 'left', color: 'black'}}>Transport -
                                    (Airplane Ticket)</FormLabel>
                                <RadioGroup aria-label="Institution/Agency" name="Institution/Agency"
                                            value={JSON.parse(localStorage.getItem('tempData')).perdiem.trainee.travelAir ?
                                                transportAirTicket : transportAirTicket}
                                            onChange={(event, value) => {
                                                setTransportAirTicket(value)
                                                SaveDataToLocalStorage({
                                                    name: 'travelAir',
                                                    type: props.headerTitle,
                                                    value: value
                                                }, "standardPerDiem")
                                            }}>
                                    {
                                        radioBreakfast.map((element, idx) => {
                                            return (
                                                <FormControlLabel value={element.toString().trim().toLowerCase()}
                                                                  control={<Radio/>}
                                                                  label={<Typography
                                                                      className={classes.formControlLabel}>
                                                                      {element}
                                                                  </Typography>}/>
                                            )
                                        })
                                    }
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid md={5} item style={{alignItems: 'flex-start'}}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend" style={{textAlign: 'left', color: 'black'}}>Transport -
                                    (Local transport)</FormLabel>
                                <RadioGroup aria-label="Institution/Agency" name="Institution/Agency"
                                            value={JSON.parse(localStorage.getItem('tempData')).perdiem.trainee.travelLocalTransport ?
                                                transportLocal : transportLocal}
                                            onChange={(event, value) => {
                                                setTransportLocal(value)
                                                SaveDataToLocalStorage({
                                                    name: 'travelLocalTransport',
                                                    type: props.headerTitle,
                                                    value: value
                                                }, "standardPerDiem")
                                            }}>
                                    {
                                        radioBreakfast.map((element, idx) => {
                                            return (
                                                <FormControlLabel value={element.toString().trim().toLowerCase()}
                                                                  control={<Radio/>}
                                                                  label={<Typography
                                                                      className={classes.formControlLabel}>
                                                                      {element}
                                                                  </Typography>}/>
                                            )
                                        })
                                    }
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </div>
                </Paper>
                <GridItem xs={12} sm={12} md={12}/>

                <Paper style={{width: '100%', padding: 10, paddingLeft: 25}} id="capture">
                    <Grid item style={{alignItems: 'flex-start'}}>
                        <h5>{props.headerTitle === 'Trainees' ? '(Flat Rate)' : '(JSI-Staff Rate)'}</h5>
                        {
                            props.headerTitle === 'Trainees' ?
                                <h5>Provided (By the event), Reimbursable (Based on flat-rate), Not Provided/Not
                                    Reimbursable (Not provided by event and not paid)</h5>
                                :
                                <h5>Provided (By the event), Reimbursable (Based on JSI-rate/receipt), Not Provided/Not
                                    Reimbursable (Not provided by event and not paid)</h5>
                        }
                    </Grid>
                    <br/>
                    <Grid item style={{alignItems: 'flex-start'}}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend"
                                       style={{textAlign: 'left', color: 'black'}}>Lodging</FormLabel>
                            <RadioGroup aria-label="Institution/Agency" name="Institution/Agency"
                                        value={props.headerTitle !== 'Trainees' ?
                                            JSON.parse(localStorage.getItem('tempData')).eventExpense.lodgingProvided ?
                                                'provided' :
                                                // JSON.parse(localStorage.getItem('tempData')).perdiem.trainee.lodging ?
                                                //     JSON.parse(localStorage.getItem('tempData')).perdiem.trainee.lodging.toLowerCase() :
                                                lodging : lodging}
                                        onChange={(event, value) => {
                                            setLodging(value)
                                            SaveDataToLocalStorage({
                                                name: 'lodging', type: props.headerTitle,
                                                value: value
                                            }, "standardPerDiem")
                                        }}>
                                {
                                    radioBreakfast.map((element, idx) => {
                                        return (
                                            <FormControlLabel value={element.toString().trim().toLowerCase()}
                                                              control={<Radio/>}
                                                              label={<Typography className={classes.formControlLabel}>
                                                                  {element}
                                                              </Typography>}/>
                                        )
                                    })
                                }
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                </Paper>
            </Grid>
        </React.Fragment>
    );
}