import MUIDataTable from "mui-datatables";


export default function Table(props) {
    const [isLoading, setIsLoading] = React.useState(true)
    const [data, setData] = React.useState([]);

    const options = {
        filterType: 'dropdown',
        selectableRows: false,
        responsive: 'scroll',
        downloadOptions: {filename: 'all-event-request.csv'}
    };

    return (
        <MUIDataTable
            title={"Events"}
            data={props.data}
            columns={props.columns}
            options={options}
        />
    )
}

