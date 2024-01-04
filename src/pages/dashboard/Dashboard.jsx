import Cards from "./cards/Cards";
import Graphs from "./graphs/Graphs";
import { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = import.meta.env.VITE_URL;
const getData = `${baseUrl}/api/dashboard_summary/`;


export default function Dashboard() {
  const [data, setData] = useState([]);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataResponse = await axios.get(getData);

        setData(dataResponse.data.success);
 
  
        console.log("data", dataResponse.data);
 
  
      } catch (error) {
        console.log(error);
      }
    };
  
      fetchData(); 
    }, []);
  return (
    <div className="db_container">
      <Cards 
       data={data}
      />
      <Graphs />
    </div>
  )
}
