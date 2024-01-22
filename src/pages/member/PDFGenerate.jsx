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


    doc.autoTable({
      html: tableRef.current,
      margin: { top: 10 },
      styles: {
        fontSize: 6, // set the font size here
      },
    });

    doc.save('table.pdf');
  };

  return (
    <div>
      <button className="btn_pdf" onClick={generatePDF}><BsFiletypePdf /></button>

      <div style={{ display: 'none' }}>
        <table ref={tableRef} id="my-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Mobile Number</th>
              <th>Email Address</th>
              <th>Occupation</th>,
              <th>Membership Type</th>,
              <th>Position in (Parallel Group)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item?.username ?? "---"}</td>
                <td>{item?.individual?.first_name ?? "---"}</td>
                <td>{item?.individual?.last_name ?? "---"}</td>
                <td>{item?.individual?.mobile_number ?? "---"}</td>
                <td>{item?.individual?.email ?? "---"}</td>
                <td>{item?.individual?.occupation_data?.desc ?? "---"}</td>
                <td>{item?.individual?.memship_type_data?.desc ?? "---"}</td>
                <td>{item?.individual?.position_data?.desc ?? "---"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PDFGenerator;
