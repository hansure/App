import React, {Component} from "react";
import Router from "next/router";
import jwt_decode from "jwt-decode";

export default class Index extends Component {
    componentDidMount = () => {
        let decoded = undefined
        try {
            let token = sessionStorage.getItem("token");
            decoded = jwt_decode(token);
        } catch (e) {
        }
        if (decoded && decoded.picture) {
            Router.push("/eventRequestForm");
        } else {
            // if (parseInt(window.location.href.split("?")[1])){
            //     Router.replace(`/login?${window.location.href.split("?")[1]}`);
            // }else {
            Router.push("/login");
            // }
        }
    };

    render() {
        return <div/>
    }
}
