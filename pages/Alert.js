import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Router from "next/router";
import MUIDataTable from "mui-datatables";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Transport from "../api/Transport";
import Checkout from "../components/Form/FormController";

const useStyles = makeStyles((theme) => ({}));

export default function Alert(props) {
    const classes = useStyles();
    const [isLoggedIn] = React.useState(false)
    const [loading] = React.useState(true)
    const [view, changeView] = React.useState(0)
    const columns = ['Title', 'Triggers', {
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

    if (isLoggedIn) {
        return (
            <div style={{paddingLeft: '10%', paddingRight: '10%'}}>
                {
                    view === 0 ? <MUIDataTable
                        title={"Requested events"}
                        data={props.dataForApproval}
                        columns={columns}
                        options={props.options}
                    /> : <Checkout previewPage={true} edit={() => {}}/>
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
