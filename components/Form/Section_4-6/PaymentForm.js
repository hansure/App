import React from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel
} from "react-accessible-accordion";
import {makeStyles} from "@material-ui/core/styles";
import Section_4 from "./Section_4/Section_4";
import Section_5 from "./Section_5";
import Section_6 from "./Section_6";


const useStyles = makeStyles((theme) => ({
    accordionItemHeading: {
        backgroundColor: '#ab1414', padding: 10, color: 'white', fontWeight: 'bold', textAlign: 'left', marginTop: 20,
    },
    accordionItemPanel: {
        padding: 25,
        backgroundColor: '#eeea',
        border: 'solid',
        borderWidth: .1,
        borderTopWidth: 0,
        borderColor: '#eee'
    }
}));

export default function PaymentForm(props) {

    const classes = useStyles();
    const [active, setActive] = React.useState(1)
    const [isStandardPerdiem, setIsStandardPerdiem] = React.useState(true)
    const [accordion, setAccordion] = React.useState([
        {
            id: 4,
            isVisible: true,
            title: 'Event Participants',
            content: (idx, allData, data) => <Section_5 loadPreviousData_2={props.loadPreviousData_2} allData={allData}
                                                        data={data}/>
        }, {
            id: 5,
            isVisible: true,
            title: 'Per Diem Information',
            content: (idx, allData, data) => <Section_4 loadPreviousData_2={props.loadPreviousData_2}
                                                        togglePerdiemVisibility={togglePerdiemVisibility}
                                                        allData={allData} data={data}/>
        },
        {
            id: 6,
            isVisible: true,
            title: 'Required Documents',
            content: (idx, allData, data) => <Section_6 loadPreviousData_2={props.loadPreviousData_2} allData={allData}
                                                        data={data}/>
        },])

    function togglePerdiemVisibility(isStandard) {
        setIsStandardPerdiem(false);
    }

    return (
        <Accordion preExpanded={[props.active]}>
            {
                accordion.map((element, idx) => {

                    return (
                        element.isVisible ?
                            <AccordionItem uuid={element.id} key={idx}>
                                <AccordionItemHeading className={classes.accordionItemHeading}>
                                    <AccordionItemButton>
                                        <i className={"fab fa-down"} style={{paddingRight: 20}}/>
                                        Section {element.id} of 6 - {element.title}
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel className={classes.accordionItemPanel}>
                                    {element.content(element.id, props.allData, props.data)}
                                </AccordionItemPanel>
                            </AccordionItem>
                            :
                            <br/>
                    )
                })
            }
        </Accordion>
    );
}