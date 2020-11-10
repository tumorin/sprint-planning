import React, {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';
import {selectSprintPbis,selectSprint} from '../../redux/sprint/sprint.selectors';


const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

const SprintTable = (props) => {
    const classes = useStyles(); //delete

    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);


    const pbis = props.pbis;
    const sprint = props.sprint;
    if (!sprint.isDataUploaded || sprint.isFetching) {return null};
    const sprintDuration = Math.floor((sprint.endDate - sprint.startDate)/(60 * 60 * 24 * 1000));
    // prepare presentation object for the grid
    const pbiPresentation = [];
    pbis.map((pbi,pbiIndex) => {
        pbiPresentation.push({});
        pbiPresentation[pbiIndex].id = pbi.id;
        pbiPresentation[pbiIndex].description = pbi.description;
        pbiPresentation[pbiIndex].days = {};
        pbi.days.map((day,index) => {

            pbiPresentation[pbiIndex].days[index+1] = day;  
        })                
    })
    console.log(pbiPresentation);
    // preparing presentation array for PBIs
    const gridColumns = [];
    for (let i=0;i<sprintDuration;i++) {
        gridColumns.push(<AgGridColumn field={'days.'+(i+1)} key={i} width={120}></AgGridColumn>)
    }
    // for (let i=0;i<sprintDuration;i++) {
    //     pbiPresentation.push({dayName: new Date(sprint.startDate.getTime()+i*(60 * 60 * 24 * 1000)).toLocaleDateString()});
    // }
    
    const  gridOptions = {
        columnDefs: [
            { field:"id", headerName:"№", sortable: true , filter: true , width: 90, pinned:  'left' },
            { field: "PBI Description", sortable: true ,filter: true, width: 300, pinned: 'left' },
        ],
    }

    return (
        <div className="ag-theme-alpine" style={ { height: 400 } }>
           <AgGridReact 
                rowData={pbiPresentation}>
                <AgGridColumn field="id" headerName="№" sortable={true} filter={true} width={90} pinned = 'left'></AgGridColumn>
                <AgGridColumn field="description" sortable={true} filter={true} width={300} pinned = 'left'></AgGridColumn>
                {gridColumns}
            </AgGridReact>
         </div>










        // <TableContainer component={Paper}>
        //     <Table className={classes.table} aria-label="simple table" size="small">
        //         <TableHead>
        //             <TableRow>
        //                 <TableCell>№</TableCell>
        //                 <TableCell>PBI description</TableCell>
        //                 {/* Days of the sprint*/}
        //                 {pbiPresentation.map((day,index) => (
        //                 <TableCell align="center" key={index}>{day.dayName}</TableCell>
        //                 ))}
        //             </TableRow>
        //         </TableHead>
        //         <TableBody> 
        //             { (pbis) ? 
        //                 pbis.map((pbi) => (
        //                     <TableRow key={pbi.id}>
        //                         <TableCell component="th" scope="row">{pbi.id}</TableCell>
        //                         <TableCell> {pbi.description}</TableCell>
        //                         {
        //                           pbi.days.map((day,index) => (
        //                             <TableCell align="center" key={index}>{day}</TableCell>    
        //                           ))  
        //                         }
        //                     </TableRow>
        //                 )) 
        //                 : console.log('Information about PBIs is not found')
        //             }
        //             </TableBody>
        //     </Table>
        // </TableContainer>
    )
}

const mapStateToProps = createStructuredSelector({
    pbis: selectSprintPbis,
    sprint: selectSprint
})

export default connect(mapStateToProps)(SprintTable);