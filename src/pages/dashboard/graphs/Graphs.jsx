import BarChart from "./charts/Barchart";
import DonutChart from "./charts/Donut";
import { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = import.meta.env.VITE_URL;
const getData = `${baseUrl}/api/dashboard_summary/`;



export default function Graphs() {

  const [dataList, setData] = useState([]);

  
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
    <div className="chart_container">
      <h2>Graphs</h2>
        <div className="chart_wrapper">
          <BarChart dataList={dataList} />
          <DonutChart dataList={dataList} />
        </div>
    </div>
  )
}




