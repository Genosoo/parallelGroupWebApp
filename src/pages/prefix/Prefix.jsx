import { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
// import { useCsrfToken } from '../../context/CsrfTokenContext';

const baseUrl = import.meta.env.VITE_URL;
const getPrefix = `${baseUrl}/api/user_prefix/`;

export default function Prefix() {
  const [data, setData] = useState([]);
  // const {csrfToken} = useCsrfToken();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataResponse = await axios.get(getPrefix);
        setData(dataResponse.data.success);
        console.log("Prefix", dataResponse.data.success);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.desc}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
