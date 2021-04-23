import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "components/Header/Header.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";
import styles from "assets/jss/nextjs-material-kit/pages/profilePage.js";
import AlertBody from "../components/Form/Alert/AlertBody";
import Router from "next/router";
import jwt_decode from "jwt-decode";

const useStyles = makeStyles(styles);

export default function newAlertForm(props) {
    const classes = useStyles();
    const [isLoggedIn, setIsLoggedIn] = React.useState(false)
    const [loading, setLoading] = React.useState(true)
    const [decoded, setDecoded] = React.useState(undefined)
    const {...rest} = props;

    React.useEffect(() => {
        let decodedValue = undefined
        try {
            let token = sessionStorage.getItem("token");
            decodedValue = jwt_decode(token);
            if (!decoded){
                setDecoded(jwt_decode(token))
            }
        } catch (e) {}
        if (decodedValue && decodedValue.picture && decodedValue.email) {
            setIsLoggedIn(true)
        }
        setLoading(false)
    });

    if (!loading) {
        return (
            <div>
                <Header
                    color="transparent"
                    brand="JOps"
                    fixed
                    changeColorOnScroll={{
                        height: 50,
                        color: "white"
                    }}
                    {...rest}
                />
                <Parallax small filter image={require("assets/img/profile-bg.jpg")}/>
                <div className={classNames(classes.main, window.innerWidth < 1038 ? classes.mainForMobileRaised : classes.mainRaised)}>
                    <div>
                        <div className={classes.container}>
                            <GridContainer justify="center">
                                <GridItem xs={12} sm={12} md={12} className={classes.navWrapper}>
                                    <AlertBody/>
                                </GridItem>
                            </GridContainer>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        if (loading) {
            return <div/>
        }
        return (
            <div>
                {
                    Router.push("/login")
                }
            </div>
        )
    }
}
