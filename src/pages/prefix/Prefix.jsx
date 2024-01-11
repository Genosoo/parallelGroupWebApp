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

const baseUrl = import.meta.env.VITE_URL;
const getPrefix = `${baseUrl}/api/user_prefix/`;
const getCsrfTokenUrl = `${baseUrl}/api/csrf_cookie/`;

export default function Prefix() {
  const [data, setData] = useState([]);
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    const getTheCsrfToken = async () => {
      try {
        const response = await axios.get(getCsrfTokenUrl);
        setCsrfToken(response.data['csrf-token']);
      } catch (error) {
        console.log(error);
      }
    };

    getTheCsrfToken();
  }, []);

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
