import React from "react";
import {makeStyles} from "@material-ui/core/styles";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import {GoogleLogin} from 'react-google-login';

// constants
// import {CLIENT_ID} from '../constants/constants'
import styles from "assets/jss/nextjs-material-kit/pages/loginPage.js";
import Router from "next/router";

import Snackbar from '@material-ui/core/Snackbar';
import {CLIENT_ID} from "../util/constants";
import jwt_decode from "jwt-decode";
import exceptionApprovalEmails from "../util/exceptionEmails";
import exceptionEmails from "../util/exceptionEmails";

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
    const [cardAnimation, setCardAnimation] = React.useState("cardHidden");
    setTimeout(function () {
        setCardAnimation("");
    }, 10);
    const classes = useStyles();
    const {...rest} = props;
    const [isVisible, setIsVisible] = React.useState(false);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const responseGoogle = (response) => {
        try {
            sessionStorage.setItem("token", response.tc.id_token)
            let token = sessionStorage.getItem("token");
            let decoded = undefined
            try {
                decoded = jwt_decode(token);
            } catch (e) {}
            if (decoded && decoded.email.endsWith("gmail.com") || exceptionEmails.indexOf(decoded.email) >= 0) {
                // if (window.location.href.split("?")[1]) {
                //     Router.replace(`/eventRequestForm?${window.location.href.split("?")[1]}`)
                // } else {
                    Router.push(`/eventRequestForm`)
                // }
                setIsVisible(false)
                // setIsLoggedIn(true)
            } else {
                setIsVisible(true)
            }
        } catch (e) {}
    }

    React.useEffect(() => {
        let token = sessionStorage.getItem("token");
        let decoded = undefined
        try {
            decoded = jwt_decode(token);
        } catch (e) {}
        if (!isLoggedIn && decoded) {
            if (decoded.email && decoded.name){
                // if (parseInt(window.location.href.split("?")[1])) {
                //     Router.push(`/eventRequestForm?${window.location.href.split("?")[1]}`)
                // } else {
                    Router.push(`/eventRequestForm`)
                // }
                setIsLoggedIn(true)
            } else {
                setIsLoggedIn(false)
                sessionStorage.clear()
            }
        }
    })
    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={isVisible}
                autoHideDuration={3500}
                onClose={() => {
                    setIsVisible(false)
                }}
                message="Please use JSI email to login!"
            />
            <div
                className={classes.pageHeader}
                style={{
                    // backgroundImage: "url(" + image + ")",
                    backgroundSize: "cover",
                    backgroundPosition: "top center"
                }}>
                <div className={classes.container}>
                    <GridContainer justify="center">
                        <GridItem xs={12} sm={6} md={12}>
                            <Card className={classes[cardAnimation]}>
                                <form className={classes.form}>
                                    <CardHeader/>
                                    <CardBody>
                                        <h5>{
                                            "Event Request Form: to be filled by meeting requesters for meeting venue arrangement, transport arrangement and any other Event related requests for approval."
                                        }</h5>
                                    </CardBody>
                                    <CardFooter className={classes.cardFooter}/>
                                </form>
                            </Card>
                        </GridItem>
                        <GridItem xs={12} sm={6} md={4}>
                            <Card className={classes[cardAnimation]}>
                                <form className={classes.form}>
                                    <CardHeader color="primary" className={classes.cardHeader}>
                                        <h4>JOps</h4>
                                    </CardHeader>
                                    <CardBody/>
                                    <CardFooter className={classes.cardFooter}>
                                        <GoogleLogin
                                            clientId={CLIENT_ID}
                                            buttonText="Sign in with JSI email"
                                            onSuccess={responseGoogle}
                                            onFailure={() => setIsVisible(true)}
                                            // hostedDomain={"jsi.com"}
                                            cookiePolicy={'single_host_origin'}
                                        />
                                    </CardFooter>
                                </form>
                            </Card>
                        </GridItem>
                    </GridContainer>
                </div>
            </div>
        </div>
    );
}
