import React from 'react';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {Checkbox, InputLabel} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import GridItem from "../../Grid/GridItem";
import {SaveDataToLocalStorage} from "../../../util/general";
import TextField from "@material-ui/core/TextField";


const useStyles = makeStyles((theme) => ({
    formControlLabel: {
        fontSize: 14, textAlign: 'left', marginTop: 10, marginBottom: 10
    },
    inputLabel: {textAlign: 'left', color: 'black'}
}));

export default function Section_3(props) {
    const classes = useStyles();
    const [isLoading, setIsLoading] = React.useState(true)
    const [estimatedTransportCost, setEstimatedTransportCost] = React.useState(0)
    const [venueCost, setVenueCost] = React.useState(1500)
    const [refreshmentCost, setRefreshmentCost] = React.useState(400)
    const [stationaryCost, setStationaryCost] = React.useState(50)
    const [covidEquipment, setCOVIDEquipment] = React.useState(900)
    const [venue, setVenue] = React.useState(false)
    const [refreshment, setRefreshment] = React.useState(false)
    const [stationaryMaterials, setStationaryMaterials] = React.useState(false)
    const [mask, setMask] = React.useState(false)
    const [breakfast, setBreakfast] = React.useState(false)
    const [lunch, setLunch] = React.useState(false)
    const [dinner, setDinner] = React.useState(false)
    const [lodging, setLodging] = React.useState(false)

    React.useEffect(() => {
        if (isLoading || (isLoading && props.loadPreviousData)) {
            try {
                let data = JSON.parse(props.data)
                if (props.loadPreviousData) {
                    data = JSON.parse(localStorage.getItem('tempData'))
                }
                for (let key in data) {
                    if (data.hasOwnProperty(key)) {
                        let val = data[key];
                        switch (key) {
                            case "eventExpense":
                                for (let key_2 in val) {
                                    let val_2 = val[key_2];
                                    switch (key_2) {
                                        case "covidEquipment":
                                            setCOVIDEquipment(parseInt(val_2))
                                            break;
                                        case "venueCost":
                                            parseInt(val_2) !== 0 && setVenueCost(val_2)
                                            break;
                                        case "refreshmentCost":
                                            setRefreshmentCost(parseInt(val_2))
                                            break;
                                        case "stationaryCost":
                                            setStationaryCost(parseInt(val_2))
                                            break;
                                        case "estimatedTransportCost":
                                            setEstimatedTransportCost(parseInt(val_2))
                                            break;
                                        case "venueProvided":
                                            setVenue(val_2)
                                            break;
                                        case "maskProvided":
                                            setMask(val_2)
                                            break;
                                        case "refreshmentProvided":
                                            setRefreshment(val_2)
                                            break;
                                        case "stationaryMaterialProvided":
                                            setStationaryMaterials(val_2)
                                            break;
                                        case "breakfastProvided":
                                            setBreakfast(val_2)
                                            break;
                                        case "lunchProvided":
                                            setLunch(val_2)
                                            break;
                                        case "dinnerProvided":
                                            setDinner(val_2)
                                            break;
                                        case "lodgingProvided":
                                            setLodging(val_2)
                                            break;
                                    }
                                }
                                break;
                        }
                    }
                }
                setTimeout(() => {
                    setIsLoading(false)
                }, 50)
            } catch (e) {
                console.info(e.message)
            }
        }
    });
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom/>
            <h5>All Expenses Provided by Event (Expenses Covered By )</h5>
            <br/>
            <Grid container spacing={4}>
                <GridItem xs={12} sm={12} md={6}>
                    <InputLabel className={classes.inputLabel}>
                        Event Provides
                    </InputLabel>
                    <br/>
                    <FormControl fullWidth>
                        <FormControlLabel control={
                            <Checkbox color="primary" name={"venue"}
                                      checked={venue}
                                // checked={JSON.parse(localStorage.getItem('tempData')) ?
                                //     JSON.parse(localStorage.getItem('tempData')).eventExpense.venueProvided : false}
                                      onChange={(element) => {
                                          setVenue(!venue)
                                          SaveDataToLocalStorage({
                                              name: element.target.name,
                                              value: !venue
                                          }, 'eventExpense')
                                      }}/>} label={"Venue"}/>
                        <FormControlLabel control={
                            <Checkbox color="primary" name={"refreshment"}
                                      checked={refreshment}
                                // checked={JSON.parse(localStorage.getItem('tempData')) ?
                                //     JSON.parse(localStorage.getItem('tempData')).eventExpense.refreshmentProvided : false}
                                      onChange={(element) => {
                                          setRefreshment(!refreshment)
                                          SaveDataToLocalStorage({
                                              name: element.target.name,
                                              value: !refreshment
                                          }, 'eventExpense')
                                      }}/>} label={"Refreshment"}/>

                        <FormControlLabel control={
                            <Checkbox color="primary" name={"stationaryMaterials"}
                                      checked={stationaryMaterials}
                                // checked={
                                //     JSON.parse(localStorage.getItem('tempData')) ?
                                //         JSON.parse(localStorage.getItem('tempData')).eventExpense.stationaryMaterialProvided : false}
                                      onChange={(element) => {
                                          setStationaryMaterials(!stationaryMaterials)
                                          SaveDataToLocalStorage({
                                              name: element.target.name,
                                              value: !stationaryMaterials
                                          }, 'eventExpense')
                                      }}/>} label={"Stationary Materials"}/>

                        <FormControlLabel control={
                            <Checkbox color="primary" name={"mask"}
                                      checked={mask}
                                      onChange={(element) => {
                                          setMask(!mask)
                                          SaveDataToLocalStorage({
                                              name: element.target.name,
                                              value: !mask
                                          }, 'eventExpense')
                                      }}/>} label={"PPE (Mask and Sanitizer)"}/>
                        {
                            ['Breakfast', 'Lunch', 'Dinner', 'Lodging'].map((element, idx) => {
                                return (
                                    <FormControlLabel
                                        key={idx} control={
                                        <Checkbox color="primary" name={element}
                                                  checked={idx === 0 ? breakfast : idx === 1 ? lunch : idx === 2 ? dinner : idx === 3 ? lodging : false}
                                                  onChange={(element_1) => {
                                                      switch (idx) {
                                                          case 0:
                                                              setBreakfast(!breakfast)
                                                              break;
                                                          case 1:
                                                              setLunch(!lunch)
                                                              break;
                                                          case 2:
                                                              setDinner(!dinner)
                                                              break;
                                                          case 3:
                                                              setLodging(!lodging)
                                                              break;
                                                      }
                                                      SaveDataToLocalStorage({
                                                          name: element_1.target.name,
                                                          value: idx === 0 ? !breakfast : idx === 1 ? !lunch : idx === 2 ? !dinner : !lodging
                                                      }, 'eventExpense')
                                                  }}/>} label={element}/>
                                )
                            })
                        }
                    </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                    <TextField
                        required
                        id="estimatedTransportCost"
                        label="Estimated transport cost/person"
                        fullWidth
                        autoComplete="cc-csc"
                        value={estimatedTransportCost}
                        onChange={(element) => {
                            // if (parseInt(element.target.value)) {
                            setEstimatedTransportCost(parseInt(element.target.value) ? +element.target.value : +0)
                            SaveDataToLocalStorage({
                                value: parseInt(element.target.value) ? parseInt(element.target.value) : 0,
                                name: 'estimatedTransportCost',
                                type: 'cost'
                            }, "eventExpense")
                            // } else {
                            // setISVisible(true)
                            // }
                        }}
                    />
                    <br/>
                    <br/>
                    <TextField
                        required
                        id="venue"
                        label="Venue estimated cost / day"
                        fullWidth
                        autoComplete="cc-csc"
                        value={venueCost}
                        disabled={!venue}
                        onChange={(element) => {
                            // if (parseFloat(element.target.value)) {
                            setVenueCost(parseInt(element.target.value) ? +element.target.value : +0)
                            SaveDataToLocalStorage({
                                value: parseInt(element.target.value) ? parseInt(element.target.value) : 0,
                                name: 'venueCost',
                                type: 'cost'
                            }, "eventExpense")
                            // } else {
                            // setISVisible(true)
                            // }
                        }}
                    />
                    <br/>
                    <br/>
                    <TextField
                        required
                        id="refreshmentCost"
                        label="Estimated refreshment cost/person"
                        fullWidth
                        autoComplete="cc-csc"
                        value={refreshmentCost}
                        disabled={!refreshment}
                        onChange={(element) => {
                            if (parseInt(element.target.value)) {
                                setRefreshmentCost(parseInt(element.target.value) ? +element.target.value : +0)
                                SaveDataToLocalStorage({
                                    value: parseInt(element.target.value) ? parseInt(element.target.value) : 0,
                                    name: 'refreshmentCost',
                                    type: 'cost'
                                }, "eventExpense")
                            } else {
                                // setISVisible(true)
                            }
                        }}
                    />
                    <br/>
                    <br/>
                    <TextField
                        required
                        label="Stationary cost/person"
                        fullWidth
                        autoComplete="cc-csc"
                        value={stationaryCost}
                        disabled={!stationaryMaterials}
                        onChange={(element) => {
                            setStationaryCost(parseInt(element.target.value) ? +element.target.value : +0)
                            SaveDataToLocalStorage({
                                value: parseInt(element.target.value) ? parseInt(element.target.value) : 0,
                                name: 'stationaryCost',
                                type: 'cost'
                            }, "eventExpense")
                            if (!parseInt(element.target.value)) {
                                // setISVisible(true)
                            }
                        }}
                    />
                    <br/>
                    <br/>
                    <TextField
                        required
                        label="Personal protection equipment cost"
                        fullWidth
                        value={covidEquipment}
                        disabled={!mask}
                        onChange={(element) => {
                            // if (parseInt(element.target.value)) {
                            setCOVIDEquipment(parseInt(element.target.value) ? +element.target.value : +0)
                            SaveDataToLocalStorage({
                                value: parseInt(element.target.value) ? parseInt(element.target.value) : 0,
                                name: 'covidEquipment',
                                type: 'cost'
                            }, "eventExpense")
                            // } else {
                            //     setISVisible(true)
                            // }
                        }}
                    />
                </GridItem>
            </Grid>
        </React.Fragment>
    );
}