import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Paper} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: 10,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    hrLine: {
        "border-top": "1px solid lightgray",
        padding: '0px',
        margin: '0px',
    },
    hrLineHeader: {
        "border-top": "1px solid lightgray"
    },
    grandTotal: {
        height: '60px',
        border: "2px solid #868686",
        "margin-top": "25px",
        'font-size': '1.1rem'
    },
    detailElements: {
        'display': 'flex',
        'font-weight': '400'
    }
}));

function formatMoney(amount, decimalCount = 0, decimal = ".", thousands = ",") {
    try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;

        return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
        console.log(e)
    }
}

export default function Budget(props) {
    // Remove the local prop after copying the model
    var props = props.perdiem_trainee ?? {
        perdiem_trainer: 0,
        hotel_trainer: 0,
        transport_trainer: 0,
        perdiem_trainee: 0,
        hotel_trainee: 0,
        transport_trainee: 0,
        venue: 0,
        stationary: 0,
        refreshment: 0,
        ppe: 0
    }
    var calProp = {
        trainer_total: props.perdiem_trainer + props.hotel_trainer + props.transport_trainer,
        trainee_total: props.perdiem_trainee + props.hotel_trainee + props.transport_trainee,
        other_total: props.venue + props.stationary + props.refreshment + props.ppe
    }
    const classes = useStyles();

    const perdiem_trainer = !!props.perdiem_trainer ?
        <Grid
            container
            spacing={3}
            direction="row"
            justify="space-between"
            alignItems="center"
            item xs={12}>
            <Grid
                className={classes.detailElements}
                item xs={6}>
                Per diem - Trainers
            </Grid>
            <Grid
                item
                xs={1}>
                {props.perdiem_trainer}
            </Grid>
        </Grid> : null;

    const hotel_trainer = !!props.hotel_trainer ?
        <Grid
            container
            spacing={3}
            direction="row"
            justify="space-between"
            alignItems="center"
            item xs={12}>
            <Grid
                className={classes.detailElements}
                item xs={6}>
                Hotel for Trainers
            </Grid>
            <Grid
                item
                xs={1}>
                {props.hotel_trainer}
            </Grid>
        </Grid> : null;

    const transport_trainer = !!props.transport_trainer ?
        <Grid
            container
            spacing={3}
            direction="row"
            justify="space-between"
            alignItems="center"
            item xs={12}>
            <Grid
                className={classes.detailElements}
                item xs={6}>
                Transport for Trainers
            </Grid>
            <Grid
                item
                xs={1}>
                {props.transport_trainer}
            </Grid>
        </Grid> : null;


    const perdiem_trainee = !!props.perdiem_trainee ?
        <Grid
            container
            spacing={3}
            direction="row"
            justify="space-between"
            alignItems="center"
            item xs={12}>
            <Grid
                className={classes.detailElements}
                item xs={6}>
                Per diem - Trainees
            </Grid>
            <Grid
                item
                xs={1}>
                {props.perdiem_trainee}
            </Grid>
        </Grid> : null;

    const hotel_trainee = !!props.hotel_trainee ?
        <Grid
            container
            spacing={3}
            direction="row"
            justify="space-between"
            alignItems="center"
            item xs={12}>
            <Grid
                className={classes.detailElements}
                item xs={6}>
                Hotel for Trainees
            </Grid>
            <Grid
                item
                xs={1}>
                {props.hotel_trainee}
            </Grid>
        </Grid> : null;

    const transport_trainee = !!props.transport_trainee ?
        <Grid
            container
            spacing={3}
            direction="row"
            justify="space-between"
            alignItems="center"
            item xs={12}>
            <Grid
                className={classes.detailElements}
                item xs={6}>
                Transport for Trainees
            </Grid>
            <Grid
                item
                xs={1}>
                {props.transport_trainee}
            </Grid>
        </Grid> : null;

    const venue = !!props.venue ?
        <Grid
            container
            spacing={3}
            direction="row"
            justify="space-between"
            alignItems="center"
            item xs={12}>
            <Grid
                className={classes.detailElements}
                item xs={6}>
                Venue
            </Grid>
            <Grid
                item
                xs={1}>
                {formatMoney(props.venue)}
            </Grid>
        </Grid> : null;

    const stationary = !!props.stationary ?
        <Grid
            container
            spacing={3}
            direction="row"
            justify="space-between"
            alignItems="center"
            item xs={12}>
            <Grid
                className={classes.detailElements}
                item xs={6}>
                Stationary
            </Grid>
            <Grid
                item
                xs={1}>
                {props.stationary}
            </Grid>
        </Grid> : null;

    const refreshment = !!props.refreshment ?
        <Grid
            container
            spacing={3}
            direction="row"
            justify="space-between"
            alignItems="center"
            item xs={12}>
            <Grid
                className={classes.detailElements}
                item xs={6}>
                Refreshment
            </Grid>
            <Grid
                item
                xs={1}>
                {props.refreshment}
            </Grid>
        </Grid> : null;

    const ppe = !!props.ppe ?
        <Grid
            container
            spacing={3}
            direction="row"
            justify="space-between"
            alignItems="center"
            item xs={12}>
            <Grid
                className={classes.detailElements}
                item xs={6}>
                Personal protective Equipment
            </Grid>
            <Grid
                item
                xs={1}>
                {props.ppe}
            </Grid>
        </Grid> : null;

    return (
        <React.Fragment>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <b>
                            Venue/Other
                        </b>
                        <hr className={classes.hrLineHeader}/>

                        <Grid
                            container
                            spacing={1}
                            direction="row"
                            justify="space-between"
                            alignItems="center"
                        >

                            {venue}

                            {stationary}

                            {refreshment}

                            {ppe}

                            <Grid item xs={12}>
                                <hr className={classes.hrLine}/>
                            </Grid>
                            <Grid className={classes.detailElements} item xs={6}>
                                <b>
                                    Total
                                </b>
                            </Grid>
                            <Grid item xs={2}>
                                <b>
                                    {formatMoney(calProp.other_total)}
                                </b>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs>
                    <Paper className={classes.paper}>
                        <b>
                            Total Non-DHA: Coordinators/Trainers cost
                        </b>
                        <hr className={classes.hrLineHeader}/>
                        <Grid
                            container
                            spacing={3}
                            direction="row"
                            justify="space-between"
                            alignItems="center"
                        >
                            {perdiem_trainer}

                            {hotel_trainer}

                            {transport_trainer}

                            <Grid item xs={12}>
                                <hr className={classes.hrLine}/>
                            </Grid>

                            <Grid
                                container
                                spacing={3}
                                direction="row"
                                justify="space-between"
                                alignItems="center"
                                item xs={12}>

                                <Grid className={classes.detailElements} item xs={6}>
                                    <b>
                                        Total
                                    </b>
                                </Grid>
                                <Grid item xs={2}>
                                    <b>
                                        {formatMoney(calProp.trainer_total)}
                                    </b>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs>
                    <Paper className={classes.paper}>
                        <b>
                            Trainees
                        </b>
                        <hr className={classes.hrLineHeader}/>
                        <Grid
                            container
                            spacing={3}
                            direction="row"
                            justify="space-between"
                            alignItems="center"
                        >
                            {perdiem_trainee}

                            {hotel_trainee}

                            {transport_trainee}

                            <Grid item xs={12}>
                                <hr className={classes.hrLine}/>
                            </Grid>
                            <Grid className={classes.detailElements} item xs={6}>
                                <b>
                                    Total
                                </b>
                            </Grid>
                            <Grid item xs={2}>
                                <b>
                                    {formatMoney(calProp.trainee_total)}
                                </b>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                    item xs={12}
                    className={classes.grandTotal}>
                    <Grid item xs={2} style={{paddingLeft: 45}}>
                        <b>
                            Total
                        </b>
                    </Grid>
                    <Grid item xs={2}>
                        <b>
                            {formatMoney((calProp.trainer_total + calProp.trainee_total + calProp.other_total), 2)} Birr
                        </b>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}