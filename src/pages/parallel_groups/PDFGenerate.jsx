/* eslint-disable react/prop-types */
// PdfGenerator.js
import { useRef } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { BsFiletypePdf } from "react-icons/bs";

const PDFGenerator = ({ data }) => {
  const tableRef = useRef();

  const generatePDF = () => {
    const doc = new jsPDF({
      orientation: "landscape",
    });

    const columns = [
      "Parallel Group Name",
      "Registration Type",
      "Registration Date",
      "Registration Number",
      "Membership Date Application",
      "Membership Type",
      "Membership Status",
      "Membership Date Approved",
      "Membership Date Closed",
      "Parallel Group Type",
      "Parallel Group Affiliation",
      "Parallel Group Logo",
      "Region",
      "Province",
      "District",
      "City/Municipality",
      "Barangay",
      "Bldg.Name",
      "Street Number",
      "Street Name",
    ];

    // Set the fixed width for each column
    const columnStyles = columns.reduce((styles, column) => {
      styles[column] = { columnWidth: 400 };
      return styles;
    }, {});

    doc.autoTable({
      html: tableRef.current,
      columnStyles: columnStyles,
      margin: { top: 10 },
    });

    doc.save('parallel_group.pdf');
  };

  return (
    <div>
      <button className="btn_pdf" onClick={generatePDF}><BsFiletypePdf /></button>

      <div style={{ display: 'none' }}>
        <table ref={tableRef} id="my-table">
          <thead>
            <tr>
              <th>Parallel Group Name</th>
              <th>Parallel Group Type</th>
              <th>Registration Type</th>
              <th>Membership Type</th>
              <th>Membership Status</th>
              <th>Region</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.grp_type_data?.desc ?? "---"}</td>
                <td>{item.reg_type_data?.desc ?? "---"}</td>
                <td>{item.memship_type_data?.desc ?? "---"}</td>
                <td>{item.memship_status_data?.desc ?? "---"}</td>
                <td>{item.region_data?.desc ?? "---"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PDFGenerator;
