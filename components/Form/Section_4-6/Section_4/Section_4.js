import React from 'react';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {InputLabel, Radio, RadioGroup} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import GridItem from "../../../Grid/GridItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {
    Accordion,
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel
} from "react-accessible-accordion";
import Section_4_1 from "./Section_4_1";
import Section_4_3 from "./Section_4_3";
import {SaveDataToLocalStorage} from "../../../../util/general";

const useStyles = makeStyles((theme) => ({
    inputLabel: {textAlign: 'left', color: 'black'}
    ,
    accordionItemHeading: {
        backgroundColor: '#ab1414', padding: 10, color: 'white', fontWeight: 'bold', textAlign: 'left', marginTop: 20,
    },
    accordionItemPanel: {
        padding: 25,
        backgroundColor: '#eee1',
        border: 'solid',
        borderWidth: .1,
        borderTopWidth: 0,
        borderColor: '#eee'
    }
}));

export default function Section_4(props) {
    const classes = useStyles();
    const [isLoading, setIsLoading] = React.useState(true)
    const [radioButton, setRadioButton] = React.useState(null)
    const [standard, setStandard] = React.useState('')
    const [headerCountTrainer, setHeaderCountTrainer] = React.useState(parseInt(JSON.parse(localStorage.getItem('tempData')).NonJSIAsTrainersCount) || 0)
    const [headerCountTrainee, setHeaderCountTrainee] = React.useState(parseInt(JSON.parse(localStorage.getItem('tempData')).totalTraineesCount) || 0)
    const [accordion] = React.useState([
        {
            id: 6,
            isVisible: standard,
            title: 'Standard Per Diem (Non-JSI Trainers)',
            content: (idx) => <Section_4_1 headerTitle={"Non-JSI Trainers"} headerCount={headerCountTrainer}
                                           sectionName={"section_6"}/>
        }, {
            id: 7,
            isVisible: !standard,
            title: 'Standard Per Diem (Trainees)',
            content: (idx) => <Section_4_1 headerTitle={"Trainees"} headerCount={headerCountTrainee}
                                           sectionName={"section_7"}/>
        }, {
            id: 8,
            isVisible: !standard,
            title: 'Non Standard Per Diem',
            content: (idx) => <Section_4_3/>
        },])


    React.useEffect(() => {
        if (isLoading || (isLoading && props.loadPreviousData_2)) {
            let data = JSON.parse(localStorage.getItem('tempData')).eventExpense
            for (let key in data) {
                if (data.hasOwnProperty(key)) {
                    let val = data[key];
                    switch (key) {
                        case "breakfastProvided":
                            val && SaveDataToLocalStorage({
                                name: 'breakfast',
                                type: 'Non-JSI Trainers',
                                value: 'PROVIDED'
                            }, "standardPerDiem")
                            break;

                        case "lunchProvided":
                            val && SaveDataToLocalStorage({
                                name: 'lunch',
                                type: 'Non-JSI Trainers',
                                value: 'PROVIDED'
                            }, "standardPerDiem")
                            break;

                        case "dinnerProvided":
                            val && SaveDataToLocalStorage({
                                name: 'dinner',
                                type: 'Non-JSI Trainers',
                                value: 'PROVIDED'
                            }, "standardPerDiem")
                            break;

                        case "lodgingProvided":
                            val && SaveDataToLocalStorage({
                                name: 'lodging',
                                type: 'Non-JSI Trainers',
                                value: 'PROVIDED'
                            }, "standardPerDiem")
                            break;
                    }
                }
            }

            if (JSON.parse(localStorage.getItem('tempData')).eventExpense.breakfastProvided &&
                JSON.parse(localStorage.getItem('tempData')).eventExpense.lunchProvided &&
                JSON.parse(localStorage.getItem('tempData')).eventExpense.dinnerProvided &&
                JSON.parse(localStorage.getItem('tempData')).eventExpense.lodgingProvided) {
                // setStandard(false)
                // setRadioButton('yes')
                // SaveDataToLocalStorage(true, "perDiem")
            }
            try {
                let data = JSON.parse(props.data)
                if (props.loadPreviousData_2) {
                    data = JSON.parse(localStorage.getItem('tempData'))
                }
                for (let key in data) {
                    if (data.hasOwnProperty(key)) {
                        let val = data[key];
                        switch (key) {
                            case "perdiem":
                                setStandard(val.standardPerdiem)
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
            <h5>Per diem arrangement for event</h5>
            <br/>
            <Grid container spacing={6}>

                <GridItem xs={12} sm={12} md={12}>
                    <InputLabel className={classes.inputLabel}>
                        Standard Per diem rules apply *
                    </InputLabel>
                    <br/>
                    <FormControl fullWidth>
                        <RadioGroup
                            value={radioButton}
                            aria-label="Institution/Agency" name="Institution/Agency"
                            onChange={(event, value) => {
                                setStandard(value === 'yes')
                                setRadioButton(value)
                                SaveDataToLocalStorage(value === 'yes', "perDiem")
                            }}>
                            <FormControlLabel value={"yes"} control={<Radio/>} label={<Typography
                                className={classes.formControlLabel}> Yes, (per diem rules like M&IE will be paid to the
                                trainees and trainers entered above) </Typography>}/>
                            <FormControlLabel value={"no"} control={<Radio/>} label={<Typography
                                className={classes.formControlLabel}> No, (no per diem will be paid)</Typography>}/>
                        </RadioGroup>
                    </FormControl>
                </GridItem>
            </Grid>

            <Accordion preExpanded={[6]}>
                {
                    standard === true ?
                        accordion.map((element, idx) => {
                            return (
                                element.id === 6 || element.id === 7 ?
                                    <AccordionItem uuid={element.id} key={idx}>
                                        <AccordionItemHeading className={classes.accordionItemHeading}>
                                            <AccordionItemButton>
                                                <i className={"fab fa-down"} style={{paddingRight: 20}}/>
                                                {element.title}
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel className={classes.accordionItemPanel}>
                                            {element.content(element.id, props.allData)}
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                    :
                                    null
                            )
                        })
                        :
                        null
                }
            </Accordion>
            <Accordion preExpanded={[8]}>
                {
                    standard === false ?
                        accordion.map((element, idx) => {
                            return (
                                element.id === 8 ?
                                    <AccordionItem uuid={element.id} key={idx}>
                                        <AccordionItemHeading className={classes.accordionItemHeading}>
                                            <AccordionItemButton>
                                                <i className={"fab fa-down"} style={{paddingRight: 20}}/>
                                                {element.title}
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel className={classes.accordionItemPanel}>
                                            {element.content(element.id, props.allData)}
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                    :
                                    null
                            )
                        })
                        :
                        null
                }
            </Accordion>

        </React.Fragment>
    );
}