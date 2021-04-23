import React from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel
} from "react-accessible-accordion";
import {makeStyles} from "@material-ui/core/styles";
import Section_1 from "./Section_1";
import Section_2 from "./Section_2";
import Section_3 from "./Section_3";


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

export default function AddressForm(props) {

    const classes = useStyles();
    const [isLoading, setIsLoading] = React.useState(true)

    const [accordion] = React.useState([{
        id: 1,
        title: 'Project Information',
        content: (idx, allData, data) => <Section_1 loadPreviousData={props.loadPreviousData} allData={allData}
                                                    data={data} invalidFields={props.invalidFields}/>
    },
        // {
        //     id: 2,
        //     title: 'Work Plan',
        //     content: (idx, allData, data) => <Section_2 loadPreviousData={props.loadPreviousData} allData={allData} data={data}/>
        // },
        {
            id: 2,
            title: 'Location Details',
            content: (idx, allData, data) => <Section_2 loadPreviousData={props.loadPreviousData} allData={allData}
                                                        data={data}/>
        },
        {
            id: 3,
            title: 'Event Expenses',
            content: (idx, allData, data) => <Section_3 loadPreviousData={props.loadPreviousData} allData={allData}
                                                        data={data}/>
        },
    ])

    React.useEffect(() => {
        if (isLoading) {
            setTimeout(() => {
                setIsLoading(false)
            }, 50)
        }
    });
    return (
        <Accordion preExpanded={[props.active]}>
            {
                accordion.map((element, idx) => {
                    return (
                        <AccordionItem uuid={element.id} aria-expanded={true} key={idx}>
                            <AccordionItemHeading className={classes.accordionItemHeading}>
                                <AccordionItemButton>
                                    Section {element.id} of 6 - {element.title}
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel className={classes.accordionItemPanel}>
                                {element.content(element.id, props.allData, props.data)}
                            </AccordionItemPanel>
                        </AccordionItem>
                    )
                })
            }
        </Accordion>
    );
}