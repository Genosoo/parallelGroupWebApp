import { useState, useEffect } from 'react';
import { apiIncident, baseUrl } from '../../../api/api';
import axios from 'axios';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

export default function ReportTracker() {
  const [incidentData, setIncidentData] = useState([]);
  
  useEffect(() => {
    const fetchIncident = async () => {
      try {
        const incidentResponse = await axios.get(apiIncident);
        setIncidentData(incidentResponse.data.success);
        console.log("Incident", incidentResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchIncident();
  }, []);

  return (
    <div className="h-full flex flex-col items-center font-montserrat  bg-[#EBF4FD] pt-10">
      <div className="w-[80%] px-5">
        <h2 className="text-[#298BD9] text-[2rem] font-extrabold py-20">Report Tracker</h2>
        <Table>
          <TableHead>
            <TableRow>
            <TableCell><b>Type</b></TableCell>
            <TableCell><b>Incident Details</b></TableCell>
            <TableCell><b>Incident Address</b></TableCell>
            <TableCell><b>Incident Image</b></TableCell>
            <TableCell><b>Reporter Address</b></TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {incidentData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.type_details.type_name}</TableCell>
                <TableCell>{item?.incident_details ?? "--"}</TableCell>
                <TableCell>{item.address_incident}</TableCell>
                <TableCell><img src={`${baseUrl}${item.incident_image}`} alt="" /></TableCell>
                <TableCell>{item.address_reported}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
