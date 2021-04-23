    import React from 'react';
    import Grid from '@material-ui/core/Grid';
    import TextField from '@material-ui/core/TextField';
    import {makeStyles} from "@material-ui/core/styles";
    import Typography from "@material-ui/core/Typography";
    import {InputLabel, MenuItem, Select} from "@material-ui/core";
    import FormControl from "@material-ui/core/FormControl";
    import GridItem from "../../Grid/GridItem";
    import {SaveDataToLocalStorage} from "../../../util/general";
    import Autocomplete from '@material-ui/lab/Autocomplete';

    const useStyles = makeStyles((theme) => ({
    formControlLabel: {
    fontSize: 14, textAlign: 'left', marginTop: 10, marginBottom: 10
    },
    inputLabel: {textAlign: 'left', color: 'black'},
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

    export default function Section_1(props) {
    const classes = useStyles();
    const [institution, setInstitution] = React.useState({
    id: 0,
    name: 'Loading ...'
    })
    const [invalidFields, setInvalidFields] = React.useState(localStorage.getItem("invalidFields"))
    const [title, setTitle] = React.useState("")
    const [summary, setSummary] = React.useState("")
    const [institutions, setInstitutions] = React.useState()
    const [projects, setProjects] = React.useState([])
    const [eventType, setEventType] = React.useState([])
    const [donorData, setDonorData] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [projectObjective, setProjectObjective] = React.useState("")
    const [objective, setObjective] = React.useState({
    id: 0,
    name: 'Loading ...'
    })
    const [host, setHost] = React.useState({
    id: '53c77c9c-8ce2-4367-a63b-7c3fff56ffae',
    name: 'John Snow Inc'
    })
    const [donor, setDonor] = React.useState({
    id: 0,
    name: 'Loading ...'
    })
    const [project, setProject] = React.useState({
    id: 0,
    name: 'Loading ...'
    })
    const [purpose, setPurpose] = React.useState({
    id: 0,
    name: 'Loading ...'
    })
    const [service, setService] = React.useState({
    id: 0,
    name: 'Loading ...'
    })
    const [activity, setActivity] = React.useState({
    id: 0,
    name: 'Loading ...',
    isProduct: "false"
    })
    const [subProduct, setSubProduct] = React.useState({
    id: 0,
    name: 'Loading ...'
    })
    const [product, setProduct] = React.useState({
    id: 0,
    name: 'Loading ...'
    })
    const [services, setServices] = React.useState([])
    const [hostInstitution, setHostInstitution] = React.useState([])
    const [activities, setActivities] = React.useState([])
    const [subProducts, setSubProducts] = React.useState([])
    const [products, setProducts] = React.useState([])
    const [objectives, setObjectives] = React.useState([])

    React.useEffect(() => {
    if (props.allData && isLoading) {
    setProjects(props.allData.projects && props.allData.projects.sort((a, b) => -b.name.localeCompare(a.name)))
    setInstitutions(props.allData.institutions && props.allData.institutions.sort((a, b) => -b.name.localeCompare(a.name)))
    setHostInstitution(props.allData.hostInstitution && props.allData.hostInstitution.sort((a, b) => -b.name.localeCompare(a.name)))
    setEventType(props.allData.eventTypes && props.allData.eventTypes.sort((a, b) => -b.name.localeCompare(a.name)))
    setDonorData(props.allData.funder && props.allData.funder.sort((a, b) => -b.name.localeCompare(a.name)))
    setObjectives(props.allData.workPlanObjective && props.allData.workPlanObjective.sort((a, b) => -b.name.localeCompare(a.name)))
    setServices(props.allData.workPlanService && props.allData.workPlanService.sort((a, b) => -b.name.localeCompare(a.name)))
    setActivities(props.allData.activites && props.allData.activites.sort((a, b) => -b.name.localeCompare(a.name)))
    setSubProducts(props.allData.subProduct && props.allData.subProduct.sort((a, b) => -b.name.localeCompare(a.name)))
    setProducts(props.allData.product && props.allData.product.sort((a, b) => -b.name.localeCompare(a.name)))
    if (JSON.stringify(props.allData) !== "[]") {
    setIsLoading(false)
    }
    }
    if ((!isLoading && (donor.id === 0)) || (isLoading && props.loadPreviousData)) {

    try {
    let data = JSON.parse(props.data)
    if (props.loadPreviousData) {
    data = JSON.parse(localStorage.getItem('tempData'))
    }
    for (let key in data) {
    if (data.hasOwnProperty(key)) {
    let val = data[key];
    switch (key) {
    case "workPlanService":
    val.id && val.id !== "" && setService(val)
    break;
    case "workPlanActivity":
    val.id && val.id !== "" && setActivity(val)
    break;
    case "subProduct":
    val.id && val.id !== "" && setSubProduct(val)
    break;
    case "workPlanObjective":
    val.id && val.id !== "" && setObjective(val)
    break;
    case "project":
    val.id && val.id !== "" && setProject(val)
    break;
    case "donor":
    val.id && val.id !== "" && setDonor(val)
    break;
    case "eventType":
    val.id && val.id !== "" && setPurpose(val)
    break;
    case "title":
    val !== "" && setTitle(val)
    break;
    case "summary":
    val !== "" && setSummary(val)
    break;
    case "objective":
    val !== "" && setProjectObjective(val)
    break;
    case "hostInstitution":
    val.id && val.id !== "" && setHost(val)
    break;
    case "institutionAgency":
    val.id && val.id !== "" && setInstitution(val)
    break;
    case "product":
    val.id && val.id !== "" && setProduct(val)
    break;
    }
    }
    }
    } catch (e) {
    console.info(e.message)
    }
    }
    });

    return (
    <React.Fragment>
    <Typography variant="h6" gutterBottom/>
    <h5>Event Request Form: to be filled by meeting requesters for meeting venue arrangement, transport
    arrangement and any other Event related requests for approval.</h5>
    <br/>
    <Grid container spacing={3}>
    <Grid item xs={12} md={6}>
        <TextField
            onChange={(event) => {
                setTitle(event.target.value)
                SaveDataToLocalStorage(event.target.value, 'title')
                // removeItemOnce(invalidFields, "title")
            }}
            required
            id="title"
            value={title}
            label="Title"
            helperText="Title should describe the Event in a short phrase"
            fullWidth
        />
    </Grid>
    <GridItem item xs={12} md={12}>
        <TextField
            onChange={(event) => {
                // if (summary.length < 100){
                setSummary(event.target.value)
                SaveDataToLocalStorage(event.target.value, 'summary')
                // }
            }}
            required
            id="summary"
            label="Summary"
            multiline
            value={summary}
            rows={3}
            variant="outlined"
            helperText={"must be less than 100 characters (" + summary.length + " of 100)"}
            fullWidth
            error={summary.length > 100}
        />
    </GridItem>
    {/*<GridItem item xs={12} md={12}>*/}
    {/*    <InputLabel className={classes.inputLabel}>*/}
    {/*        Proposal **/}
    {/*    </InputLabel>*/}
    {/*    <br/>*/}
    {/*    <FormControl variant="outlined" fullWidth>*/}
    {/*        <MUIRichTextEditor*/}
    {/*            style={{backgroundColor: 'white'}}*/}
    {/*            maxLength={500}*/}
    {/*            label="Start typing here..."*/}
    {/*            inlineToolbar={true}*/}
    {/*            onFocus={() => {}}*/}
    {/*            onSave={(data) => console.log(data)}/>*/}
    {/*    </FormControl>*/}
    {/*</GridItem>*/}
    {/*<GridItem item xs={12} md={12}/>*/}

    <GridItem item xs={12} md={12}>
    <TextField
    onChange={(event) => {
    setProjectObjective(event.target.value)
    SaveDataToLocalStorage(event.target.value, 'objective')
    }}
    required
    id="objective"
    label="Proposal Objective"
    multiline
    rows={5}
    variant="outlined"
    helperText={"must be minimum of 300 (" + projectObjective.length + ")"}
    value={projectObjective}
    fullWidth
    />
    </GridItem>
    <GridItem xs={12} sm={12} md={6}>
    <InputLabel className={classes.inputLabel}>
    Event Type *
    </InputLabel>
    <br/>
    <FormControl variant="outlined" fullWidth>
    <Autocomplete
    options={eventType}
    getOptionLabel={(option) => option.name}
    getOptionDisabled={(option) => option.name === "[LEGACY]" || option.name === "Unspecified"}
    onChange={(element, value) => {
        try {
            setPurpose({id: value.id, name: value.name})
            SaveDataToLocalStorage({id: value.id, name: value.name}, "eventType")
        } catch (e) {
        }
    }}
    renderInput={(params) => <TextField {...params}
    label={isLoading ? "Loading ..." : purpose.name !== 'Loading ...' ? purpose.name : 'Select Event Type'}
    variant="outlined"/>}
            />
        </FormControl>
    </GridItem>
    <GridItem item xs={12} md={12}/>
    <GridItem xs={12} sm={12} md={6}>
        <InputLabel className={classes.inputLabel}>
            Host Institution *
        </InputLabel>
        <br/>
        <FormControl variant="outlined" fullWidth>
            <Autocomplete
                options={hostInstitution}
                getOptionLabel={(option) => option.name}
                getOptionDisabled={(option) => option.name === "[LEGACY]" || option.name === "Unspecified"}
                onChange={(element, value) => {
                    try {
                        setHost({id: value.id, name: value.name})
                        SaveDataToLocalStorage({id: value.id, name: value.name}, "hostInstitution")
                    } catch (e) {
                    }
                }}
    renderInput={(params) => <TextField {...params}
                                label={isLoading ? "Loading ..." : host.name !== 'Loading ...' ? host.name : 'Select Host Institution'}
                                variant="outlined"/>}
    />
    </FormControl>
    </GridItem>
    <GridItem item xs={12} md={12}/>
    <Grid item style={{alignItems: 'flex-start'}} xs={12} md={6}>
    <InputLabel className={classes.inputLabel}>
    Institution/Agency *
    </InputLabel>
    <br/>
    <FormControl variant="outlined" fullWidth>
    <Autocomplete
    options={institutions}
    getOptionLabel={(option) => option.name}
    getOptionDisabled={(option) => option.name === "[LEGACY]" || option.name === "Unspecified"}
    onChange={(element, value) => {
    try {
    setInstitution({id: value.id, name: value.name})
    SaveDataToLocalStorage({id: value.id, name: value.name}, "institutionAgency")
    } catch (e) {
    }
    }}
    renderInput={(params) => <TextField {...params}
                                label={isLoading ? "Loading ..." : institution.name !== 'Loading ...' ? institution.name : 'Select Institution or Agency'}
                                variant="outlined"/>}
    />
        </FormControl>
    </Grid>
    <GridItem item xs={12} md={12}/>
    <GridItem xs={12} sm={12} md={6}>
        <InputLabel className={classes.inputLabel}>
            Donor *
        </InputLabel>
        <br/>
        <FormControl variant="outlined" fullWidth>
            <Autocomplete
                options={donorData}
                getOptionLabel={(option) => option.name}
                getOptionDisabled={(option) => option.name === "[LEGACY]" || option.name === "Unspecified"}
                onChange={(element, value) => {
                    try {
                        setDonor({id: value.id, name: value.name})
                        SaveDataToLocalStorage({id: value.id, name: value.name}, "donor")
                    } catch (e) {
                    }
                }}
                renderInput={(params) =>
                    <TextField {...params}
                                label={isLoading ? "Loading ..." : donor.name !== 'Loading ...' ? donor.name : 'Select Donor'}
                                variant="outlined"/>}
            />
        </FormControl>
    </GridItem>
    <GridItem item xs={12} md={12}/>
    {
    donor.id === 0 ? null :
    <>
    <GridItem xs={12} sm={12} md={6}>
    <InputLabel className={classes.inputLabel}>
    Project *
    </InputLabel>
    <br/>
    <FormControl variant="outlined" fullWidth>
    <Select
        style={{width: '100%', textAlign: 'left', color: 'gray'}}
        value={project.id + "__" + project.name}
        onChange={(element) => {
            setProject({
                name: element.target.value.split("__")[1],
                id: element.target.value.split("__")[0]
            })
            SaveDataToLocalStorage({
                    name: element.target.value.split("__")[1],
                    id: element.target.value.split("__")[0]
                }, "project"
            )
        }}>
        <MenuItem
            value={"0__Loading ..."}>{isLoading ? "Loading ..." : 'Select Project'}</MenuItem>
        {
            !isLoading ? projects.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)).map((element, idx) => {
                if (element.funder && element.funder.toString() === donor.id)
                    return (
                        <MenuItem key={idx}
                                    value={element.id + "__" + element.name}>{element.name}</MenuItem>
                    )
            }) : null
        }
    </Select>
    </FormControl>
    </GridItem>
    <GridItem item xs={12} md={12}/>
    </>
    }
    {
    project.id === 0 ? null :
    <>
    <GridItem xs={12} sm={12} md={6}>
    <InputLabel className={classes.inputLabel}>
    Work Plan Objective *
    </InputLabel>
    <br/>
    <FormControl variant="outlined" fullWidth>
    <Select
        style={{width: '100%', textAlign: 'left', color: 'gray'}}
        value={objective.id + "__" + objective.name}
        onChange={(element) => {
            setObjective({
                name: element.target.value.split("__")[1],
                id: element.target.value.split("__")[0]
            })
            SaveDataToLocalStorage({
                    name: element.target.value.split("__")[1],
                    id: element.target.value.split("__")[0]
                }, "workPlanObjective"
            )
        }}>
        <MenuItem
            value={"0__Loading ..."}>{isLoading ? "Loading ..." : 'Select Work Plan Objective'}</MenuItem>
        {
            !isLoading ? objectives.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)).map((element, idx) => {
                if (element.project && element.project.toString() === project.id)
            return (
                <MenuItem key={idx}
                            value={element.id + "__" + element.name}>{element.name}</MenuItem>
            )
                                }) : null
                            }
                        </Select>
                    </FormControl>
                </GridItem>
                <GridItem item xs={12} md={12}/>
            </>
    }

    <GridItem xs={12} md={6}>
        <InputLabel className={classes.inputLabel}>
            Product *
        </InputLabel>
        <br/>
        <FormControl variant="outlined" fullWidth>
            <Autocomplete
                options={products}
                getOptionLabel={(option) => option.name}
                getOptionDisabled={(option) => option.name === "[LEGACY]" || option.name === "Unspecified"}
                onChange={(element, value) => {
                    try {
                        setProduct({id: value.id, name: value.name})
                        SaveDataToLocalStorage({id: value.id, name: value.name}, "product")
                    } catch (e) {
                    }
                }}
    renderInput={(params) => <TextField {...params}
                                    label={isLoading ? "Loading ..." : product.name !== 'Loading ...' ? product.name : 'Select Product'}
                                    variant="outlined"/>}
    />
        </FormControl>
    </GridItem>
    <GridItem xs={12} md={12}/>
    {
        product.id !== 0 &&
        <>
            <GridItem xs={12} md={6}>
                <InputLabel className={classes.inputLabel}>
                    Sub Product *
                </InputLabel>
                <br/>
                <FormControl variant="outlined" fullWidth>
                    <Select
                        style={{width: '100%', textAlign: 'left', color: 'gray'}}
                        value={subProduct.id + "__" + subProduct.name}
                        onChange={(element) => {
                            setSubProduct({
                                name: element.target.value.split("__")[1],
                                id: element.target.value.split("__")[0]
                            })
                            SaveDataToLocalStorage(
                                {
                                    name: element.target.value.split("__")[1],
                                    id: element.target.value.split("__")[0]
                                },
                                "subProduct"
                            )
                        }}>
                        <MenuItem
                            value={"0__Loading ..."}>{isLoading ? "Loading ..." : 'Select Sub Product'}</MenuItem>
                        {
                            !isLoading ? subProducts.map((element, idx) => {
                                if (element.product && element.product === product.id)
                                    return (
                                        <MenuItem key={idx}
                                                    value={element.id + "__" + element.name}>{element.name}</MenuItem>
                                    )
                            }) : null
                        }
                    </Select>
                </FormControl>
            </GridItem>
            <GridItem xs={12} md={12}/>
        </>

    }
    {
        objective.id === 0 ? null :
            <GridItem>
                <InputLabel className={classes.inputLabel}>
                    Work Plan Product or Services *
                </InputLabel>
                <br/>
                <FormControl variant="outlined" fullWidth>
                    <Select
                        style={{width: '100%', textAlign: 'left', color: 'gray'}}
                        value={service.id + "__" + service.name}
                        onChange={(element) => {
                            setService({
                                name: element.target.value.split("__")[1],
                                id: element.target.value.split("__")[0]
                            })
                            SaveDataToLocalStorage(
                                {
                                    name: element.target.value.split("__")[1],
                                    id: element.target.value.split("__")[0]
                                },
                                "workPlanService"
                            )
                        }}>
                        <MenuItem
                            value={"0__Loading ..."}>{isLoading ? "Loading ..." : 'Select Work Plan Service'}</MenuItem>
                        {
                            !isLoading ? services.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)).map((element, idx) => {
                            if (element.workPlanObjective && element.workPlanObjective  === objective.id)
                                    return (
                                        <MenuItem key={idx}
                                                    value={element.id + "__" + element.name}>{element.name}</MenuItem>
                                    )
                            }) : null
                        }
                    </Select>
                </FormControl>
            </GridItem>
    }
    {
        service.id === 0 ? null :
            <GridItem>
                <InputLabel className={classes.inputLabel}>
                    Work Plan Activities *
                </InputLabel>
                <br/>
                <FormControl variant="outlined" fullWidth>
                    <Select
                        style={{width: '100%', textAlign: 'left', color: 'gray'}}
                        value={activity.id + "__" + activity.name + "___" + activity.isProduct}
                        onChange={(element) => {
                            setActivity({
                                name: element.target.value.split("__")[1],
                                id: element.target.value.split("__")[0],
                                isProduct: element.target.value.split("___")[1]
                            })
                            SaveDataToLocalStorage(
                                {
                                    name: element.target.value.split("__")[1],
                                    id: element.target.value.split("__")[0],
                                    isProduct: element.target.value.split("___")[1]
                                },
                                "workPlanActivity"
                            )
                        }}>
                        <MenuItem
                            value={"0__Loading ...___false"}>{isLoading ? "Loading ..." : 'Select  Plan Activity'}</MenuItem>
                        {
                            !isLoading ? activities.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)).map((element, idx) => {
                                if (element.workPlanService && element.workPlanService.toString() === service.id && element.name !== "[LEGACY]")
                                    return (
                                        <MenuItem key={idx}
                                                    value={element.id + "__" + element.name + "___" + element.isProduct}>{element.name}</MenuItem>
                                    )
                            }) : null
                        }
                    </Select>
                </FormControl>
            </GridItem>
    }
    </Grid>
    </React.Fragment>
    )
    }