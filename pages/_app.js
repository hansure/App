import React from "react";
import ReactDOM from "react-dom";
import App from "next/app";
import Head from "next/head";
import Router from "next/router";
import PageChange from "components/PageChange/PageChange.js";
import "assets/scss/nextjs-material-kit.scss?v=1.1.0";
import "assets/scss/plugins/react-datetime.scss";

Router.events.on("routeChangeStart", url => {
    document.body.classList.add("body-page-transition");
    ReactDOM.render(
        <PageChange path={url}/>,
        document.getElementById("page-transition")
    );
});
Router.events.on("routeChangeComplete", () => {
    ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
    document.body.classList.remove("body-page-transition");
});
Router.events.on("routeChangeError", () => {
    ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
    document.body.classList.remove("body-page-transition");
});

export default class MyApp extends App {
    static async getInitialProps({appContext, Component, router, ctx}) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }
        return {
            pageProps
        };
    }

    componentDidMount() {
        let comment = document.createComment(``);
        document.insertBefore(comment, document.documentElement);
    }


    render() {
        const {Component, pageProps} = this.props;

        return (
            <React.Fragment>
                <Head>
                    <title>JOps</title>
                </Head>
                <Component {...pageProps} />
            </React.Fragment>
        );
    }
}
