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
import profile from "assets/img/faces/christian.jpg";

import styles from "assets/jss/nextjs-material-kit/pages/profilePage.js";
import Router from "next/router";
import AlertTable from "../components/Table/AlertTable";
import {Fab, Tooltip} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import {clearStorage} from "../util/general";
import Alert from "./Alert";

const useStyles = makeStyles(styles);

export default function Alerts(props) {
    const classes = useStyles();
    const [isLoggedIn, setIsLoggedIn] = React.useState(false)
    const [loading, setLoading] = React.useState(true)
    const {...rest} = props;
    const [decoded, setDecoded] = React.useState(undefined)

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
                <div
                    className={classNames(classes.main, window.innerWidth < 780 ? classes.mainForMobileRaised : classes.mainRaised)}>
                    <div>
                        <Tooltip title="Add New Alert" aria-label="add" style={{
                            display: 'flex',
                            alignSelf: 'flex-end',
                            bottom: 75,
                            left: '90%',
                            position: 'absolute'
                        }} onClick={() => {
                            clearStorage()
                            Router.push("/newAlert")
                        }}>
                            <Fab color="primary" className={{}}>
                                <AddIcon/>
                            </Fab>
                        </Tooltip>
                        <div className={classes.container}>
                            <GridContainer justify="center">
                                <GridItem xs={12} sm={12} md={4}>
                                    <div className={classes.profile}>
                                        <div>
                                            <img alt="..." style={{borderRadius: 200}}
                                                 src={localStorage.getItem("imageUrl") === null ? profile : localStorage.getItem("imageUrl")}/>
                                        </div>
                                        <div className={classes.name}>
                                            <h3 className={classes.title}>{localStorage.getItem("fullName")}</h3>
                                            <h5>{localStorage.getItem("email")}</h5>
                                        </div>
                                    </div>
                                </GridItem>
                            </GridContainer>
                            <AlertTable/>
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
                {!isLoggedIn ?
                    Router.push("/login") : null
                }
            </div>
        )
    }
}
