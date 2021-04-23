import React from 'react';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {InputLabel, MenuItem, Select, Snackbar} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Datetime from "react-datetime";
import GridItem from "../../Grid/GridItem";
import {SaveDataToLocalStorage} from "../../../util/general";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";


const useStyles = makeStyles((theme) => ({
    formControlLabel: {
        fontSize: 14, textAlign: 'left', marginTop: 10, marginBottom: 10
    },
    inputLabel: {textAlign: 'left', color: 'black'}
}));

export default function Section_2(props) {

    const classes = useStyles();
    const [isLoading, setIsLoading] = React.useState(true)
    const [message, setMessage] = React.useState("")
    const [perDiemLevel, setPerDiemLevel] = React.useState("Select PerDiem Level")
    const [visible, changeVisibility] = React.useState(true)
    const [startDate, setStartDate] = React.useState(' ')
    const [arrivalDate, setArrivalDate] = React.useState(' ')
    const [endDate, setEndDate] = React.useState(' ')
    const [arrivalBaseDate, setArrivalBaseDate] = React.useState(' ')
    const [city, setCity] = React.useState({
        id: 0,
        name: 'Loading ...',
        cityLevel: ''
    })
    const [duration, setDuration] = React.useState("Select Duration")
    const [region, setRegion] = React.useState({
        id: 0,
        name: 'Loading ...'
    })
    const [venue, setVenue] = React.useState({
        id: 0,
        name: 'Loading ...'
    })
    const [cities, setCities] = React.useState([])
    const [meetingVenue, setMeetingVenue] = React.useState([])
    const [meetingRegion, setMeetingRegion] = React.useState([])

    React.useEffect(() => {
        if (props.allData && isLoading) {
            setCities(props.allData.city && props.allData.city.sort((a, b) => -b.name.localeCompare(a.name)))
            setMeetingVenue(props.allData.meetingVenues)
            setMeetingRegion(props.allData.region)
            setDuration("Full day")
            SaveDataToLocalStorage("Full day", 'duration')
            if (JSON.stringify(props.allData) !== "[]") {
                setIsLoading(false)
            }
        }

        if ((!isLoading && (region.id === 0)) || (isLoading && props.loadPreviousData)) {
            try {
                let data = JSON.parse(props.data)
                if (props.loadPreviousData) {
                    data = JSON.parse(localStorage.getItem('tempData'))
                }
                for (let key in data) {
                    if (data.hasOwnProperty(key)) {
                        let val = data[key];
                        switch (key) {
                            case "region":
                                val.id && val.id !== "" && setRegion(val)
                                break;
                            case "city":
                                val.id && val.id !== "" && setCity(val)
                                break;
                            case "anticipatedVenue":
                                val.id && val.id !== "" && setVenue(val)
                                break;
                            case "duration":
                                val !== "" && setDuration(val)
                                break;
                            case "startDate":
                                val !== "" && setStartDate(val)
                                break;
                            case "endDate":
                                val !== "" && setEndDate(val)
                                break;
                            case "earliestArrivalDate":
                                val !== "" && setArrivalDate(val)
                                break;
                            case "arrivalDate":
                                val !== "" && setArrivalBaseDate(val)
                                break;
                        }
                    }
                }
            } catch (e) {
                console.info(e.message)
            }
        }
    });

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom/>
            <h5>Location, Venue and Date</h5>
            <br/>
            <Grid container spacing={6}>
                <Grid item style={{alignItems: 'flex-start'}} xs={12} md={6}>
                    <InputLabel className={classes.inputLabel}>
                        Expected to take place - Region *
                    </InputLabel>
                    <br/>
                    <FormControl variant="outlined" fullWidth>
                        <Select
                            style={{width: '100%', textAlign: 'left', color: 'gray'}}
                            value={region.id + "__" + region.name}
                            onChange={(element) => {
                                setRegion({
                                    id: element.target.value.split("__")[0],
                                    name: element.target.value.split("__")[1]
                                })
                                SaveDataToLocalStorage({
                                    id: element.target.value.split("__")[0],
                                    name: element.target.value.split("__")[1]
                                }, 'region')
                            }}>
                            <MenuItem value={'0__Loading ...'}>{isLoading ? "Loading ..." : 'Select Region'}</MenuItem>
                            {
                                !isLoading ? meetingRegion.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)).map((element, idx) => {
                                    return (
                                        <MenuItem key={idx}
                                                  value={element.id + '__' + element.name}>{element.name}</MenuItem>
                                    )
                                }) : null
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid md={12}/>
                {
                    region.id === 0 ? null :
                        <Grid item style={{alignItems: 'flex-start'}} xs={12} md={6}>
                            <InputLabel className={classes.inputLabel}>
                                Expected to take place - City *
                            </InputLabel>
                            <br/>
                            <FormControl variant="outlined" fullWidth>
                                <Autocomplete
                                    options={cities.filter(option => option.region === region.id)}
                                    getOptionLabel={(option) => option.name}
                                    getOptionDisabled={(option) => option.name === "[LEGACY]" || option.name === "Unspecified"}
                                    onChange={(element, value) => {
                                        try {
                                            setCity({id: value.id, name: value.name})
                                            SaveDataToLocalStorage({id: value.id, name: value.name}, "city")
                                            SaveDataToLocalStorage(value.cityLevel, 'cityLevel')
                                        } catch (e) {
                                        }
                                    }}
                                    renderInput={(params) =>
                                        <TextField {...params}
                                                   label={isLoading ? "Loading ..." : city.name !== 'Loading ...' ? city.name : 'Select City'}
                                                   variant="outlined"/>
                                    }/>
                            </FormControl>
                        </Grid>
                }
                <Grid md={12}/>
                {
                    city.id === 0 ? null :
                        <Grid item style={{alignItems: 'flex-start'}} xs={12} md={6}>
                            <InputLabel className={classes.inputLabel}>
                                Anticipated Venue *
                            </InputLabel>
                            <br/>
                            <FormControl variant="outlined" fullWidth>
                                <Autocomplete
                                    options={meetingVenue.filter(option => option.city === city.id)}
                                    getOptionLabel={(option) => option.name}
                                    getOptionDisabled={(option) => option.name === "[LEGACY]" || option.name === "Unspecified"}
                                    onChange={(element, value) => {
                                        try {
                                            setVenue({id: value.id, name: value.name})
                                            SaveDataToLocalStorage({id: value.id, name: value.name}, "anticipatedVenue")
                                            SaveDataToLocalStorage({
                                                type: 'cost',
                                                name: 'venueCost',
                                                value: parseInt(value.estimatedCost)
                                            }, 'eventExpense')
                                        } catch (e) {
                                        }
                                    }}
                                    renderInput={(params) =>
                                        <TextField {...params}
                                                   label={isLoading ? "Loading ..." : venue.name !== 'Loading ...' ? venue.name : 'Select City'}
                                                   variant="outlined"/>
                                    }/>
                            </FormControl>
                        </Grid>
                }
                <Grid md={12}/>
                <GridItem xs={12} sm={12} md={6}>
                    <InputLabel className={classes.inputLabel}>
                        Start Date *
                    </InputLabel>
                    <br/>
                    <FormControl fullWidth>
                        <Datetime
                            {...props}
                            closeOnSelect
                            timeFormat={false}
                            value={startDate}
                            inputProps={{placeholder: "Month / day / year"}}
                            onChange={(element) => {
                                let currentDate = new Date();
                                let selectedDate = new Date(element);

                                if (currentDate <= selectedDate) {
                                    setStartDate(new Date(element).toLocaleDateString())
                                    SaveDataToLocalStorage(new Date(element).toLocaleDateString(), 'startDate')
                                } else {
                                    setTimeout(() => {
                                        setMessage("`Start Date` can not be past")
                                        changeVisibility(true)
                                    }, 1)
                                }
                            }}
                        />
                    </FormControl>
                </GridItem>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={visible}
                    autoHideDuration={2500}
                    onClose={() => changeVisibility(false)}
                    message={message}
                />
                <Grid md={12}/>
                {
                    startDate === " " ? null :
                        <>
                            <GridItem xs={12} sm={12} md={6}>
                                <InputLabel className={classes.inputLabel}>
                                    Attendees' Earliest Arrival Date *
                                </InputLabel>
                                <br/>
                                <FormControl fullWidth>
                                    <Datetime
                                        closeOnSelect
                                        timeFormat={false}
                                        value={arrivalDate}
                                        inputProps={{placeholder: "Month / day / year"}}
                                        onChange={(element) => {
                                            let start = new Date(startDate);
                                            let maxDate = new Date();
                                            maxDate.setDate(start.getDate() - 4);
                                            let selectedDate = new Date(element);
                                            if (start >= selectedDate && selectedDate >= maxDate) {
                                                setArrivalDate(new Date(element).toLocaleDateString())
                                                SaveDataToLocalStorage(new Date(element).toLocaleDateString(), 'earliestArrivalDate')
                                            } else {
                                                setTimeout(() => {
                                                    setMessage("`Attendees' Earliest Arrival Date` can not be after `Start Date`")
                                                    changeVisibility(true)
                                                }, 1)
                                            }
                                        }}
                                    />
                                </FormControl>
                                <p style={{color: 'gray', fontSize: 12, padding: 5}}>`Attendees' Earliest Arrival Date`
                                    is between start date & 3 days before the event start date.</p>
                            </GridItem>
                            <Grid md={12}/>
                            <GridItem xs={12} sm={12} md={6}>
                                <InputLabel className={classes.inputLabel}>
                                    End Date *
                                </InputLabel>
                                <br/>
                                <FormControl fullWidth>
                                    <Datetime
                                        closeOnSelect
                                        timeFormat={false}
                                        value={endDate}
                                        inputProps={{placeholder: "Month / day / year"}}
                                        onChange={(element) => {
                                            let start = new Date(startDate);
                                            let selectedDate = new Date(element);

                                            if (start <= selectedDate) {
                                                setEndDate(new Date(element).toLocaleDateString())
                                                setArrivalBaseDate("")
                                                SaveDataToLocalStorage(new Date(element).toLocaleDateString(), 'endDate')
                                            } else {
                                                setTimeout(() => {
                                                    setMessage("`End Date` can not be less than start date")
                                                    changeVisibility(true)
                                                }, 1)
                                            }
                                        }}
                                    />
                                </FormControl>
                            </GridItem>
                            <Grid md={12}/>
                            {
                                endDate === " " ? null :
                                    <>
                                        <GridItem xs={12} sm={12} md={6}>
                                            <InputLabel className={classes.inputLabel}>
                                                Attendees' Arrival Date to Base Location *
                                            </InputLabel>
                                            <br/>
                                            <FormControl fullWidth>
                                                <Datetime
                                                    closeOnSelect
                                                    timeFormat={false}
                                                    value={arrivalBaseDate}
                                                    inputProps={{placeholder: "Month / day / year"}}
                                                    onChange={(element) => {
                                                        let end = new Date(endDate);
                                                        let selectedDate = new Date(element);
                                                        let maxDate = new Date(endDate);
                                                        maxDate.setDate(maxDate.getDate() + 4);
                                                        if (end <= selectedDate && maxDate > selectedDate) {
                                                            setArrivalBaseDate(new Date(element).toLocaleDateString())
                                                            SaveDataToLocalStorage(new Date(element).toLocaleDateString(), 'arrivalDate')
                                                        } else {
                                                            setTimeout(() => {
                                                                setMessage("`Attendees' Arrival Date to Base Location` can not be before `End Date`")
                                                                changeVisibility(true)
                                                            }, 1)
                                                        }
                                                    }}
                                                />
                                            </FormControl>
                                            <p style={{color: 'gray', fontSize: 12, paddingTop: 5}}>`Attendees' Arrival
                                                Date to Base Location` is between end date & 3 days after the
                                                end date.</p>
                                        </GridItem>
                                        <Grid md={12}/>
                                    </>
                            }
                        </>
                }
                <GridItem xs={12} sm={12} md={6}>
                    <InputLabel className={classes.inputLabel}>
                        Duration
                    </InputLabel>
                    <br/>
                    <FormControl variant="outlined" fullWidth>
                        <Select
                            style={{width: '100%', textAlign: 'left', color: 'gray'}}
                            value={duration}
                            onChange={(element) => {
                                setDuration(element.target.value)
                                SaveDataToLocalStorage(element.target.value, 'duration')
                            }}>
                            <MenuItem value={"Select Duration"}>Select Duration</MenuItem>
                            <MenuItem value={'Afternoon'}>Afternoon</MenuItem>
                            <MenuItem value={'Full day'}>Full day</MenuItem>
                            <MenuItem value={'Morning'}>Morning</MenuItem>
                        </Select>
                    </FormControl>
                </GridItem>

            </Grid>
        </React.Fragment>
    );
}