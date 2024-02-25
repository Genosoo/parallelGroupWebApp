import { useState, useEffect } from "react";
import { getPoints } from "../../../api/api";
import axios from "axios";
import "./ActivityStyle.css";

export default function Activity() {
  const [points, setPoints] = useState([]);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const pointsResponse = await axios.get(getPoints);
        setPoints(pointsResponse.data.success);
        console.log("my Points", pointsResponse.data.success);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPoints();
  }, []);

  // Function to group points by day, month, and year
  const groupPointsByDate = () => {
    const groupedPoints = {};
    points.forEach((item) => {
      const createdAt = new Date(item.created_at);
      const dateKey = formatDate(createdAt);
      if (!groupedPoints[dateKey]) {
        groupedPoints[dateKey] = [];
      }
      groupedPoints[dateKey].push(item);
    });
    return groupedPoints;
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    const today = new Date();
    const isToday =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
    return isToday ? `today ●  ${formattedDate} ` : formattedDate;
  };

  let groupedPoints = groupPointsByDate();

  // Convert object to array of tuples and sort by date in descending order
  groupedPoints = Object.entries(groupedPoints).sort(([dateA], [dateB]) => {
    const dateObjA = new Date(dateA);
    const dateObjB = new Date(dateB);
    return dateObjB - dateObjA;
  });


  return (
    <div className="activityContainer1">
      {groupedPoints.map(([date, items], index) => (
        <div key={index} className="activityWrapper1">
          <h2 className="date1">{date}</h2>
          <ul className="activityBox1">
            {items.map((item, idx) => {
              const createdAt = new Date(item.created_at);
              const hours = createdAt.getHours();
              const amOrPm = hours >= 12 ? "PM" : "AM";
              const displayHours = hours % 12 || 12; // Convert to 12-hour format
              return (
                <li key={idx} className="activityDetail1">
                  <span>
                  <p className="time1">
                    {displayHours}:
                    {createdAt.getMinutes() < 10 ? "0" : ""}
                    {createdAt.getMinutes()} {amOrPm}
                  </p>
                  <p className="desc1">{item.point_type.desc}</p>
                  </span>
                  <p className="points1">+{item.point_type.score} Point</p>
                </li>
              );
            })}
          </ul>
         
        </div>
      ))}
    </div>
  );
}
