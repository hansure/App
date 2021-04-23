import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Router from "next/router";
import jwt_decode from "jwt-decode";
import MUIDataTable from "mui-datatables";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Transport from "../api/Transport";
import Checkout from "../components/Form/FormController";

let decoded = undefined
try {
    let token = sessionStorage.getItem("token");
    decoded = jwt_decode(token);
} catch (e) {
}

const useStyles = makeStyles((theme) => ({}));

export default function RequestedEvents(props) {
    const classes = useStyles();
    const [isLoggedIn, setIsLoggedIn] = React.useState(false)
    const [loading, setLoading] = React.useState(true)
    const [view, changeView] = React.useState(0)
    const [data, setData] = React.useState([])
    const columns = [{
        name: "",
        options: {
            sort: false,
            filter: false
        }
    }, "ID", "Title", "Requested By", "Requested Date", {
        name: "Updated Date",
        options: {
            sortDirection: 'asc',
            sort: true
        }
    }, {
        name: 'Action',
        options: {
            filter: false,
            customBodyRender: (value, tableMeta) => {
                return (
                    <>
                        <VisibilityIcon onClick={() => {
                            Transport.HTTP.getReqByID(tableMeta.rowData[1]).then(res => {
                                if (res.data.success) {
                                    localStorage.setItem("tempData", JSON.stringify(res.data.data))
                                }
                            }).finally(() => {
                                Router.replace(`/eventRequestForm?${tableMeta.rowData[1]}`)
                                changeView(1)
                            }).catch(error => alert(error.message))
                        }}/>
                    </>
                );
            }
        }
    }];

    React.useEffect(() => {
        if (decoded && decoded.picture && decoded.email) {
            setIsLoggedIn(true)
        }
        if (window.location.href.split("?")[1]) {
            changeView(1)
            setLoading(false)
        } else {
            changeView(0)
            setLoading(false)
        }
    });
    if (isLoggedIn) {
        return (
            <div style={{paddingLeft: '10%', paddingRight: '10%'}}>
                {
                    view === 0 ? <MUIDataTable
                        title={"Requested events"}
                        data={props.dataForApproval}
                        columns={columns}
                        options={props.options}
                    /> : <Checkout previewPage={true} edit={() => {
                    }}/>
                }

            </div>
        )
    } else {
        if (loading) {
            return <div/>
        }
        return (
            <div>
                {
                    Router.replace("/login")
                }
            </div>
        )
    }
}
