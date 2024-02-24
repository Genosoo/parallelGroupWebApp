import Cards from "./cards/Cards";
import Graphs from "./graphs/Graphs";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiDashboard } from "../../api/api";
import './DashboardStyle.css'


export default function Dashboard() {
  const [data, setData] = useState([]);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataResponse = await axios.get(apiDashboard);
        setData(dataResponse.data.success);
        console.log("data", dataResponse.data.success);
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
