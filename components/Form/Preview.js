import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Budget from "./Budgeting/Budget";
import {Paper} from "@material-ui/core";
import {
    Accordion,
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel
} from "react-accessible-accordion";
import Transport from "../../api/Transport";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from "axios";
import AttachFile from "@material-ui/icons/AttachFile";

const useStyles = makeStyles((theme) => ({
    accordionItemHeading: {
        backgroundColor: '#ab1414', padding: 10, color: 'white', fontWeight: 'bold', textAlign: 'left', marginTop: 20,
    },
    accordionItemPanel: {
        paddingTop: 25,
        backgroundColor: '#eee1'
    },
    paper: {
        marginTop: 25
    },
    section: {
        marginTop: 25,
        padding: 10,
        backgroundColor: '#eee'
    },
    listItem: {
        padding: theme.spacing(1, 0),
    },
    total: {
        fontWeight: 700,
    },
    title: {
        marginTop: theme.spacing(2),
    },
}));

export default function Preview(props) {
    const classes = useStyles();
    const [budget, setBudget] = React.useState({
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
    })
    const [section_1] = React.useState([])
    const [section_2] = React.useState([])
    const [section_3] = React.useState([])
    const [section_4] = React.useState([])
    const [section_4_1] = React.useState([])
    const [token, setToken] = React.useState('')
    const [section_5] = React.useState([])
    const [section_6, setSection_6] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [perdiemLevel, setPerdiemLevel] = React.useState(undefined)
    const [sectionInfo] = React.useState(['Project Information', 'Location Details', 'Event Expenses', ' Event Participants', 'Standard Per Diem - Trainer',
        'Standard Per Diem - Trainee', 'Required Documents'])
    const [data, setData] = React.useState(JSON.parse(localStorage.getItem('tempData')))
    const [accordion] = React.useState([
        {
            id: 1,
            title: 'BUDGET',
            content: (budget) => <Budget perdiem_trainee={budget}/>
        }, {
            id: 2,
            title: 'SUMMARY',
            content: (budget, data) =>
                <Paper className={classes.paper} id="capture">
                    {
                        data.map((element, idx) => {
                            if (element.length > 0) {
                                return (
                                    <div key={idx} style={{textAlign: 'center'}}>
                                        <Typography variant="h6" gutterBottom/>
                                        <h4 onClick={() => {
                                            if (!props.previewPage) {
                                                if (idx === 5 || idx === 6) {
                                                    props.edit(idx)
                                                } else {
                                                    props.edit(idx + 1)
                                                }
                                            }
                                        }} style={{cursor: 'pointer', fontWeight: 'bold'}}>{sectionInfo [idx]}</h4>
                                        <p>==========================================================================================================================================</p>
                                        {element}
                                        <p>==========================================================================================================================================</p>
                                    </div>
                                )
                            }
                        })
                    }
                </Paper>
        }])

    React.useEffect(() => {
        if (!props.previewPage && !perdiemLevel && isLoading) {
            props.allData.perdiemLevel.map((element, idx) => {
                if (element.cityLevel === data.cityLevel) {
                    setPerdiemLevel(element.trainerPaymentRate)
                    let totalDays = ((new Date(data.arrivalDate) - new Date(data.earliestArrivalDate)) / (1000 * 3600 * 24))

                    setBudget({
                        perdiem_trainer: parseInt(data.usgParticipantsCount * totalDays * element.trainerPaymentRate.mie),
                        hotel_trainer: parseInt(data.usgParticipantsCount * totalDays * element.trainerPaymentRate.lodging),
                        transport_trainer: parseInt(data.usgParticipantsCount * data.eventExpense.estimatedTransportCost),
                        perdiem_trainee: parseInt(data.totalTraineesCount * totalDays * element.traineePaymentRate.mie),
                        hotel_trainee: parseInt(data.totalTraineesCount * totalDays * element.traineePaymentRate.lodging),
                        transport_trainee: parseInt(data.totalTraineesCount * data.eventExpense.estimatedTransportCost),
                        venue: parseInt(data.eventExpense.venueCost),
                        stationary: parseInt(data.eventExpense.stationaryCost * data.totalParticipantsCount),
                        refreshment: parseInt(data.eventExpense.refreshmentCost * data.totalParticipantsCount),
                        ppe: parseInt(data.eventExpense.covidEquipment)
                    })

                    console.log({
                        perdiem_trainer: parseInt(data.usgParticipantsCount * totalDays * element.trainerPaymentRate.mie),
                        hotel_trainer: parseInt(data.usgParticipantsCount * totalDays * element.trainerPaymentRate.lodging),
                        transport_trainer: parseInt(data.usgParticipantsCount * data.eventExpense.estimatedTransportCost),
                        perdiem_trainee: parseInt(data.totalTraineesCount * totalDays * element.traineePaymentRate.mie),
                        hotel_trainee: parseInt(data.totalTraineesCount * totalDays * element.traineePaymentRate.lodging),
                        transport_trainee: parseInt(data.totalTraineesCount * data.eventExpense.estimatedTransportCost),
                        venue: parseInt(data.eventExpense.venueCost),
                        stationary: parseInt(data.eventExpense.stationaryCost * data.totalParticipantsCount),
                        refreshment: parseInt(data.eventExpense.refreshmentCost * data.totalParticipantsCount),
                        ppe: parseInt(data.eventExpense.covidEquipment)
                    })
                }
            })
            setIsLoading(false)
        } else if (props.previewPage) {
            if (isLoading && parseInt(window.location.href.split("?")[1])) {
                Transport.HTTP.getReqByID(parseInt(window.location.href.split("?")[1])).then((res) => {
                    if (res.data.success) {
                        localStorage.setItem("tempData", JSON.stringify(res.data.data))
                    }
                }).finally(() => {
                    Transport.HTTP.getAllData().then((res) => {
                        res.data.perdiemLevel.map((element, idx) => {
                            if (element.cityLevel === data.cityLevel) {
                                let data = JSON.parse(localStorage.getItem("tempData"))
                                setPerdiemLevel(element.trainerPaymentRate)
                                let totalDays = ((new Date(data.arrivalDate) - new Date(data.earliestArrivalDate)) / (1000 * 3600 * 24))
                                let trainingDays = ((new Date(data.endDate) - new Date(data.startDate)) / (1000 * 3600 * 24))
                                let earliestArrivalDays = ((new Date(data.startDate) - new Date(data.earliestArrivalDate)) / (1000 * 3600 * 24))
                                let arrivalDays = ((new Date(data.endDate) - new Date(data.arrivalDate)) / (1000 * 3600 * 24))
                                if (data) {
                                    let dataLocal = JSON.parse(localStorage.getItem("tempData"))
                                    setData(dataLocal)
                                    setBudget({
                                        perdiem_trainer: parseInt(data.usgParticipantsCount * totalDays * element.trainerPaymentRate.mie),
                                        hotel_trainer: parseInt(data.usgParticipantsCount * totalDays * element.trainerPaymentRate.lodging),
                                        transport_trainer: parseInt(data.usgParticipantsCount * data.eventExpense.estimatedTransportCost),
                                        perdiem_trainee: parseInt(data.totalTraineesCount * totalDays * element.traineePaymentRate.mie),
                                        hotel_trainee: parseInt(data.totalTraineesCount * totalDays * element.traineePaymentRate.lodging),
                                        transport_trainee: parseInt(data.totalTraineesCount * data.eventExpense.estimatedTransportCost),
                                        venue: parseInt(data.eventExpense.venueCost),
                                        stationary: parseInt(data.eventExpense.stationaryCost * data.totalParticipantsCount),
                                        refreshment: parseInt(data.eventExpense.refreshmentCost * data.totalParticipantsCount),
                                        ppe: parseInt(data.eventExpense.covidEquipment * data.totalParticipantsCount)
                                    })
                                    renderSection_1(dataLocal)
                                    renderSection_2(dataLocal)
                                    renderSection_3(dataLocal)
                                    renderSection_4(dataLocal)
                                    renderSection_5(dataLocal)
                                    renderSection_6(dataLocal)
                                }
                            }
                        })
                    }).catch(error => console.log(error.message))
                })
                setIsLoading(false)

            }
        }
    })

    function commonView(key, value) {
        return (
            <>
                <div
                    style={{display: 'flex', fle: 1, justifyContent: 'space-between', marginLeft: 50, marginRight: 10}}>
                    {/*<div style={{flex: .005}}/>*/}
                    <h6 style={{
                        fontWeight: 'bold',
                        flex: .3,
                        textAlign: 'left'
                    }}>{key.includes("Provided") ? key.toString().split("Provided")[0] + " PROVIDED" : key}</h6>
                    {
                        value && value.toString().includes("https://dev-cms.jopsethiopia.org") ||
                        value.toString().includes("https://squidex.k8s.sandboxaddis.com") ||
                        value.toString().includes('https://firebasestorage.googleapis.com/v0/b/devents-294606.appspot.com') ?
                            <a style={{
                                textAlign: 'left',
                                justifySelf: 'center',
                                flex: .6
                            }} href={value} target="_blank"><AttachFile/></a> :
                            <p style={{
                                textAlign: 'left',
                                justifySelf: 'center',
                                flex: .7
                            }}>{value.name ? value.name.replace('-', '') : value === 'true' ? 'Yes' : value === 'false' ? 'No' : value}</p>
                    }
                </div>
            </>
        )
    }

    function renderSection_1(data) {
        section_1.splice(0, section_1.length)
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                let val = data[key]
                switch (key) {
                    case "title":
                        section_1.push(commonView(key, val))
                        break;
                    case "donor":
                        section_1.push(commonView(key, val))
                        break;
                    case "project":
                        section_1.push(commonView(key, val))
                        break;
                    case "eventType":
                        section_1.push(commonView("Event Type", val))
                        break;
                    case "summary":
                        section_1.push(commonView(key, val))
                        break;
                    case "objective":
                        section_1.push(commonView(key, val))
                        break;
                    case "hostInstitution":
                        section_1.push(commonView("host Institution", val))
                        break;
                    case "institutionAgency":
                        section_1.push(commonView("institution / Agency", val))
                        break;
                    case "workPlanService":
                        section_1.push(commonView("work Plan Service", val))
                        break;
                    case "workPlanObjective":
                        section_1.push(commonView("work Plan Objective", val))
                        break;
                    case "workPlanActivity":
                        section_1.push(commonView("work Plan Activity", val))
                        break;
                }
            }
        }
        return section_1;
    }

    function renderSection_2(data) {
        section_2.splice(0, section_2.length)
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                let val = data[key]
                switch (key) {
                    case "region":
                        section_2.push(commonView(key, val))
                        break;
                    case "city":
                        section_2.push(commonView(key, val))
                        break;
                    case "anticipatedVenue":
                        section_2.push(commonView("anticipated Venue", val))
                        break;
                    case "earliestArrivalDate":
                        section_2.push(commonView("earliest Arrival Date", val))
                        break;
                    case "arrivalDate":
                        section_2.push(commonView("arrival Date", val))
                        break;
                    case "endDate":
                        section_2.push(commonView("end Date", val))
                        break;
                    case "startDate":
                        section_2.push(commonView("start Date", val))
                        break;
                }
            }
        }
        return section_2;
    }

    function renderSection_3(data) {
        section_3.splice(0, section_3.length)
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                let val = data[key]
                switch (key) {
                    case "eventExpense":
                        for (let key_2 in val) {
                            if (val.hasOwnProperty(key_2)) {
                                let val_2 = val[key_2]
                                switch (key_2) {
                                    case 'refreshmentCost':
                                        section_3.push(commonView('refreshment Cost', val_2.toString()))
                                        break;
                                    case 'covidEquipment':
                                        section_3.push(commonView('covid Equipment cost', val_2.toString()))
                                        break;
                                    case 'stationaryCost':
                                        section_3.push(commonView('stationary Cost', val_2.toString()))
                                        break;
                                    case 'venueCost':
                                        section_3.push(commonView('venue Cost', val_2.toString()))
                                        break;
                                    case 'estimatedTransportCost':
                                        section_3.push(commonView('estimated Transport Cost', val_2.toString()))
                                        break;
                                    default:
                                        section_3.push(commonView(key_2, val_2.toString()))
                                        break;
                                }
                            }
                        }
                        break;
                }
            }
        }
        return section_3;

    }

    function renderSection_4(data) {
        section_4.splice(0, section_4.length)
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                let val = data[key]
                switch (key) {
                    case "perdiem":
                        for (let key_2 in val) {
                            if (val.hasOwnProperty(key_2)) {
                                let val_2 = val[key_2]
                                switch (key_2) {
                                    case "standardPerdiem":
                                        section_4.push(commonView("standard Perdiem", val_2.toString()))
                                        break;
                                    case "NonJSIAsTrainersCount":
                                        val_2 &&
                                        section_4.push(
                                            commonView("NON JSI TRAINEE TREATED AS JSI", val_2)
                                        );
                                        break;
                                    case "regionalZoneExperts":
                                        val_2 &&
                                        section_4.push(
                                            commonView("Regional / Zone Experts", val_2)
                                        );
                                        break;
                                    // case "trainee":
                                    //     for (let key_3 in val_2) {
                                    //         if (val_2.hasOwnProperty(key_3)) {
                                    //             let val_3 = val_2[key_3]
                                    //             section_4.push(commonView(key_3 + " - trainee", val_3))
                                    //             switch (key_3) {
                                    //                 case "lunch":
                                    //                     section_4.push(commonView(key_3, val_3))
                                    //                     break;
                                    //                 case "refreshment ":
                                    //                     section_4.push(commonView(key_3, val_3))
                                    //                     break;
                                    //                 case "dinner":
                                    //                     section_4.push(commonView(key_3, val_3))
                                    //                     break;
                                    //             }
                                    //         }
                                    //     }
                                    //     break;
                                    case "trainer":
                                        for (let key_3 in val_2) {
                                            if (val_2.hasOwnProperty(key_3)) {
                                                let val_3 = val_2[key_3]
                                                section_4.push(commonView(key_3 + " - trainer", val_3))
                                            }
                                        }
                                        break;
                                }
                            }
                        }
                        break;
                }
            }
        }
        return section_4;
    }


    function renderSection_4_1(data) {
        section_4_1.splice(0, section_4.length)
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                let val = data[key]
                switch (key) {
                    case "perdiem":
                        for (let key_2 in val) {
                            if (val.hasOwnProperty(key_2)) {
                                let val_2 = val[key_2]
                                switch (key_2) {
                                    case "trainee":
                                        for (let key_3 in val_2) {
                                            if (val_2.hasOwnProperty(key_3)) {
                                                let val_3 = val_2[key_3]
                                                section_4_1.push(commonView(key_3 + " - trainee", val_3))
                                                switch (key_3) {
                                                    case "lunch":
                                                        section_4_1.push(commonView(key_3, val_3))
                                                        break;
                                                    case "refreshment ":
                                                        section_4_1.push(commonView(key_3, val_3))
                                                        break;
                                                    case "dinner":
                                                        section_4_1.push(commonView(key_3, val_3))
                                                        break;
                                                }
                                            }
                                        }
                                        break;
                                }
                            }
                        }
                        break;
                }
            }
        }
        return section_4_1;
    }

    function renderSection_5(data) {
        section_5.splice(0, section_5.length)
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                let val = data[key]
                switch (key) {
                    case "totalTraineesCount":
                        section_5.push(commonView("total Trainees Count", val))
                        break;
                    case "nonJSITraineeTreatedAsJSI":
                        section_5.push(commonView("Non JSI As Trainers Count", val))
                        break;
                    case "JSIParticipantsCount":
                        section_5.push(commonView("JSI Participants Count", val))
                        break;
                    case "totalParticipantsCount":
                        section_5.push(commonView("total Participants Count", val))
                        break;
                    case "usgParticipantsCount":
                        section_5.push(commonView("usg Participants Count", val))
                        break;
                }
            }
        }
        return section_5;

    }

    function renderSection_6(data) {
        section_6.splice(0, section_6.length)
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                let val = data[key]
                switch (key) {
                    case "requester":
                        section_6.push(commonView(key, val))
                        break;
                    case "approval":
                        section_6.push(commonView(key, val))
                        break;
                    case "meetingAssistant":
                        section_6.push(commonView("meeting Assistant", val))
                        break;
                    case "meetingManager":
                        section_6.push(commonView("meeting Manager", val))
                        break;
                    case "agenda":
                        section_6.push(commonView(key, val))
                        break;
                    case "financialProposal":
                        val !== null && section_6.push(commonView("Proposal", val))
                        break;
                    case "participantsList":
                        val !== null && section_6.push(commonView("participants List", val))
                        break;
                    case "requestLetter":
                        val !== null && section_6.push(commonView("request Letter", val))
                        break;
                    case "waiverFile":
                        val !== null && section_6.push(commonView("waiver File", val))
                        break;
                }
            }
        }
        return section_6;
    }

    function handlePayButtonClick() {
        let screenShoot = "";
        document.getElementById('body').style.transform = 'scale(.8)'
        html2canvas(document.getElementById("body"), {
            scrollX: -window.scrollX,
            scrollY: -window.scrollY
        }).then(function (canvas) {
            screenShoot = canvas.toDataURL("image/png");
            let paperFormatInMm = [255, 750];
            let pdf = new jsPDF('p', 'mm', paperFormatInMm);
            pdf.addImage(screenShoot, 'png', 0, 0);
            // pdf.save("eventRequest.pdf");
            const response = new FormData()
            response.append('file', pdf.output())
            response.append('name', 'pdfAttachment')
            Transport.HTTP.getToken()
                .then((res) => {
                    setToken(res.data.token)
                    axios('https://dev-cms.jopsethiopia.org/api/apps/dha-schemas/assets', {
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${res.data.token}`,
                            Accept: 'application/json',
                            'Content-Type': 'multipart/form-data',
                        },
                        data: response,
                    })
                        .then((res) => res.data)
                        .then((json) => {
                            let files = JSON.parse(localStorage.getItem("files")) || []
                            files[index] = 'https://dev-cms.jopsethiopia.org' + json._links['content/slug'].href
                            console.log(' ---- ' + json._links['content/slug'].href)
                        })
                        .catch((error) => {
                            console.log(error.message);
                        });
                })
                .catch((err) => {
                    alert('Error => Network Error');
                });
        })
    }

    return (
        <div style={{alignItems: 'center'}}>
            <Accordion allowMultipleExpanded={true} preExpanded={[1, 2]} id={"body"}>
                {
                    accordion.map((element, idx) => {
                        return (
                            <AccordionItem uuid={element.id} key={idx}>
                                <AccordionItemHeading className={classes.accordionItemHeading}>
                                    <AccordionItemButton>
                                        <i className={"fab fa-down"} style={{paddingRight: 20}}/>
                                        {element.title}
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel className={classes.accordionItemPanel}>
                                    {element.content(budget, [renderSection_1(data), renderSection_2(data), renderSection_3(data),
                                        renderSection_5(data), renderSection_4(data), renderSection_4_1(data), renderSection_6(data)])}
                                </AccordionItemPanel>
                            </AccordionItem>
                        )
                    })
                }
            </Accordion>
        </div>
    );
}