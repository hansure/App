import React from 'react';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {Checkbox, InputLabel} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import GridItem from "../../../Grid/GridItem";
import {SaveDataToLocalStorage} from '../../../../util/general';


const useStyles = makeStyles((theme) => ({
    formControlLabel: {
        fontSize: 14, textAlign: 'left', marginTop: 10, marginBottom: 10
    },
    inputLabel: {textAlign: 'left', color: 'black'}
}));

export default function Section_4_3() {
    const classes = useStyles();

    const [checkBoxProvided, setCheckBoxProvided] = React.useState(["Lunch provided", "Dinner provided", "Refreshment provided"])
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom/>
            <h5>Standard Per diem rules does not apply (per diem not paid, transport and lodging not applicable).
                Select/Check if any of the below will be provided by the event.</h5>
            <br/>

            <Grid container spacing={6}>
                {/*<GridItem xs={12} sm={12} md={6}>*/}
                {/*    <TextField*/}
                {/*        required*/}
                {/*        label="Non JSI Trainee / Trainer Treated As JSI"*/}
                {/*        helperText="number of non-JSI trainee / trainer treated as JSI"*/}
                {/*        fullWidth*/}
                {/*        value={noNonJSITrainee}*/}
                {/*        onChange={(element) => {*/}
                {/*            if (parseInt(element.target.value)) {*/}
                {/*                setNoNonJSITrainee(+element.target.value)*/}
                {/*                SaveDataToLocalStorage(parseInt(element.target.value), "nonJSITraineeTreatedAsJSI")*/}
                {/*            }*/}
                {/*        }}*/}
                {/*    />*/}
                {/*</GridItem>*/}
                <GridItem xs={12} sm={12} md={7}>
                    <InputLabel className={classes.inputLabel}>
                        Provided by event *
                    </InputLabel>
                    <br/>
                    <FormControl fullWidth>
                        {
                            checkBoxProvided.map((element, idx) => {
                                return (
                                    <FormControlLabel key={idx}
                                                      control={
                                                          <Checkbox
                                                              color="secondary"
                                                              name={element}
                                                              value={true}
                                                              onChange={(element) => {
                                                                  // setCheckBoxProvided({name: element.target.name, value: !element.target.value})
                                                                  SaveDataToLocalStorage({
                                                                      name: element.target.name.split(" ")[0].toLowerCase(),
                                                                      value: element.target.value ? "PROVIDED" : "NO"
                                                                  }, "standardPerDiem")
                                                              }}/>
                                                      }
                                                      label={element}/>
                                )
                            })
                        }
                    </FormControl>
                </GridItem>
            </Grid>
        </React.Fragment>
    );
}