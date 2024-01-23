import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Dialog,
} from "@mui/material";
import testImage from '../../assets/test_logo.png';

import { BsCardList } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBack2Line } from "react-icons/ri";
import Search from "./Search";
import ButtonAdd from "./ButtonAdd";
import FormAdd from "./FormAdd";
import FormUpdate from "./FormUpdate";
import { FaFileCsv } from "react-icons/fa";
import { SiMicrosoftexcel } from "react-icons/si";
import PDFGenerator from "./PDFGenerate";
import { useCsrfToken } from "../../context/CsrfTokenContext";
import { getParallelGroup, getFileCsv, getFileExcel, baseUrl } from "../../api/api";

export default function ParallelGroups() {
  const {csrfToken} = useCsrfToken();
  const [data, setData] = useState([]);
  const [updateData, setUpdateData] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState("");
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openFormAdd, setOpenFormAdd] = useState(false);
  const [deleteConfirmationDialogOpen, setDeleteConfirmationDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState("");


 


  useEffect(() => {
    let timeoutId;

    // Reset the success message after 5 seconds
    if (deleteSuccessMessage) {
      timeoutId = setTimeout(() => {
        setDeleteSuccessMessage("");
      }, 3000);
    }

       // Reset the success message after 5 seconds
       if (error) {
        timeoutId = setTimeout(() => {
          setError("");
        }, 3000);
      }

    return () => {
      // Clear the timeout when the component unmounts or when success message changes
      clearTimeout(timeoutId);
    };
  }, [deleteSuccessMessage, error]);

  
// Modify the handleDelete function
const handleDelete = (id, event) => {
  // Stop event propagation to prevent opening the dialog
  event.stopPropagation();

  // Set the idd to be deleted and open the confirmation dialog
  setDeleteId(id);
  setDeleteConfirmationDialogOpen(true);
};

const handleDeleteConfirmed = async () => {
  try {
    // Make an API request to delete the item with CSRF token in the header
    await axios.delete(getParallelGroup, {
      data: { id: deleteId },
      headers: {
        'X-CSRFToken': csrfToken,
      },
    });

    // Remove the deleted item from the state
    const updatedData = data.filter(item => item.id !== deleteId);
    setData(updatedData);

    // Display success message
    setDeleteSuccessMessage(`Parallel Group successfully deleted.`);

    // Close the confirmation dialog
    setDeleteConfirmationDialogOpen(false);
  } catch (error) {
    console.error("Error deleting item:", error);
  }
};

const handleDeleteCancelled = () => {
  // Close the confirmation dialog
  setDeleteConfirmationDialogOpen(false);
  // Reset the success message
  setDeleteSuccessMessage("");
};

  
  

  const handleOpenFormAdd = () => {
    setOpenFormAdd(true);
  };
  
  const handleCloseFormAdd = () => {
    setOpenFormAdd(false);
  };
  

  const handleOpenUpdateDialog = (data, index, page) => {
    const dataIndex = (page * rowsPerPage) + index
    setOpenUpdateDialog(true);
    setUpdateData(data[dataIndex]);
    console.log('dataIndex',dataIndex )
    
  };
  
  const handleCloseUpdateDialog = () => {
    setOpenUpdateDialog(false);
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataResponse = await axios.get(getParallelGroup);
        setData(dataResponse.data.success);
        console.log("Parallel Groups", dataResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleOpenDialog = (item) => {
    setSelectedItem(item);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleFindClick = () => {
    const results = data.filter((item) =>
      Object.values(item).some((value) => {
        if (value !== null && value !== undefined) {
          return value.toString().toLowerCase().includes(searchInput.toLowerCase());
        }
        return false;
      })
    );
    setSearchResults(results);

    // Check if there are no search results
    if (results.length === 0) {
      setError("No results found.");
    } else {
      setError("");
    }
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setSearchResults([]);
    setError("");
  };

  

  const renderTableData = searchResults.length > 0 ? searchResults : data;

  const handleExportCsv = async () => {
    try {
      // Make an API request to get the CSV file
      const response = await axios.get(getFileCsv, {
        responseType: 'blob', // Set responseType to blob to handle binary data
      });

      // Create a link element to download the file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'data.csv');
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting CSV:", error);
    }
  };

  const handleExportExcel = async () => {
    try {
      // Make an API request to get the Excel file
      const response = await axios.get(getFileExcel, {
        responseType: 'blob', // Set responseType to blob to handle binary data
      });

      // Create a link element to download the file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'data.xlsx');
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting Excel:", error);
    }
  };


  

  return (
   <>
    <div className="pg_header_container">
      <Search 
        searchInput={searchInput}
        handleSearchInputChange={handleSearchInputChange}
        handleFindClick={handleFindClick}
        handleClearSearch={handleClearSearch}
       />
       <ButtonAdd handleOpenFormAdd={handleOpenFormAdd}/>
      </div>

      {error && (
        <div style={{ textAlign: "center", marginTop: "20px", color: "red" }}>
          <p>{error}</p>
        </div>
      )}
      
      {deleteSuccessMessage && (
  <div className="message_success">
    <p>{deleteSuccessMessage}</p>
  </div>
)}
<Dialog
  open={deleteConfirmationDialogOpen}
  onClose={handleDeleteCancelled}
  maxWidth="sm"
  fullWidth
>
  <div className="dailog_delete_box">
    <p>Are you sure you want to delete?</p>
    <div>
      <button className="yes" onClick={handleDeleteConfirmed}>
        Yes
      </button>
      <button className="no" onClick={handleDeleteCancelled}>
        No
      </button>
    </div>
  </div>
</Dialog>


<Dialog  
    fullWidth
    maxWidth="sm"
    open={openFormAdd}
    onClose={handleCloseFormAdd}
  >
   <FormAdd />
  </Dialog>

  <Dialog
        fullWidth
        maxWidth="sm"
        open={openUpdateDialog}
        onClose={handleCloseUpdateDialog}
      >
        {updateData && (
          <div>
            <FormUpdate 
            apiEndpoint={getParallelGroup} 
            data={updateData} 
            csrfToken={csrfToken}
            />
          </div>
        )}
      </Dialog>

    {selectedItem && (
      <Dialog  
      fullWidth
      maxWidth="lg"
      open={openDialog} onClose={handleCloseDialog}>
       <div className="box_wrapper_container">
       <div className="box_left">
        <div className="box_wrapper1">
          <div className="box box1">
               <img 
               src={`${baseUrl}${selectedItem.logo}`} 
               alt=""
               className="table_logo"
               onError={(e) => {
                e.target.onerror = null; // Prevent infinite loop
                e.target.src = testImage; // Replace with the path to your default image
              }}
              />
          </div>
          <div className="box box2 ">
             <span>
                <p className="p1">Parallel Group Number</p> 
                <p className="p2">{selectedItem.number ?? "---"}</p>
             </span>
             <span>
                <p className="p1">Parallel Group Name</p> 
                <p className="p2">{selectedItem.name ?? "---"}</p>
             </span>
             <span>
                <p className="p1">Parallel Group Type</p> 
                <p className="p2">{selectedItem.reg_type ?? "---" }</p>
             </span>
          </div>
        </div>
        <div className="box_wrapper1 pt-6">
          <div className="box box3">
          <span>
                <p className="p1">Parallel Group Affiliation Number</p> 
                <p className="p2">{selectedItem.affiliation ?? "---"}</p>
             </span>
             <span>
                <p className="p1">Registration Type</p> 
                <p className="p2">{selectedItem.name ?? "---"}</p>
             </span>
             <span>
                <p className="p1">Registration Date</p> 
                <p className="p2">{selectedItem.reg_date ?? "---" }</p>
             </span>
             <span>
                <p className="p1">Registration Number</p> 
                <p className="p2">{selectedItem.reg_number ?? "---" }</p>
             </span>
             <span>
                <p className="p1">Membership Date Application</p> 
                <p className="p2">{selectedItem.application_date ?? "---" }</p>
             </span>
             <span>
                <p className="p1">Membership Type</p> 
                <p className="p2">{selectedItem.memship_type_data?.desc ?? "---" }</p>
             </span>
             <span>
                <p className="p1">Membership Status</p> 
                <p className="p2">{selectedItem.memship_status ?? "---" }</p>
             </span>
             <span>
                <p className="p1">Membership Date Approved</p> 
                <p className="p2">{selectedItem.approved_date ?? "---" }</p>
             </span>
             <span>
                <p className="p1">Membership Date Closed</p> 
                <p className="p2">{selectedItem.closed_date ?? "---" }</p>
             </span>
          </div>
        </div>
        </div>

        <div className="box_right">
          <div className="box_wrapper2">
          <div className="box4">
          <span>
                <p className="p1">Region</p> 
                <p className="p2">{selectedItem.region_data?.desc ?? "---"}</p>
             </span>
             <span>
                <p className="p1">Province</p> 
                <p className="p2">{selectedItem.province_data?.desc ?? "---"}</p>
             </span>
             <span>
                <p className="p1">District</p> 
                <p className="p2">{selectedItem.district ?? "---" }</p>
             </span>
             <span>
                <p className="p1">City/Municipality</p> 
                <p className="p2">{selectedItem.municipality_data?.desc ?? "---" }</p>
             </span>
             <span>
                <p className="p1">Barangay</p> 
                <p className="p2">{selectedItem.barangay_data?.desc ?? "---" }</p>
             </span>
             <span>
                <p className="p1">Bldg. Number</p> 
                <p className="p2">{selectedItem.bldg_number ?? "---" }</p>
             </span>
             <span>
                <p className="p1">Bldg. Name</p> 
                <p className="p2">{selectedItem.bldg_name ?? "---" }</p>
             </span>
             <span>
                <p className="p1">Street Number</p> 
                <p className="p2">{selectedItem.street_number ?? "---" }</p>
             </span>
             <span>
                <p className="p1">Street Name</p> 
                <p className="p2">{selectedItem.street_name ?? "---" }</p>
             </span>
          </div>
          </div>

          <button className="dailog_btn_close" onClick={handleCloseDialog}>Close</button>
        </div>
       </div>
      </Dialog>
    )}



    <div className="table_wrapper">
      <TableContainer component={Paper} className="table_container">
        <Table>
          <TableHead >
            <TableRow >
            
              <TableCell>
                <div className="table_header">Parallel Group Name</div>
              </TableCell>
              <TableCell>
                <div className="table_header">Registration Type</div>
              </TableCell>
              <TableCell>
                <div className="table_header">Registration Date</div>
              </TableCell>
              <TableCell>
                <div className="table_header">Registration Number</div>
              </TableCell>
              <TableCell>
                <div className="table_header">Membership Date Application</div>
              </TableCell>
              <TableCell>
                <div className="table_header">Membership Type</div>
              </TableCell>
              <TableCell>
                <div className="table_header">Membership Status</div>
              </TableCell>
              <TableCell>
                <div className="table_header">Membership Date Approved</div>
              </TableCell>
              <TableCell>
                <div className="table_header">Membership Date Closed</div>
              </TableCell>
              <TableCell>
                <div className="table_header">Parallel Group Type</div>
              </TableCell>
              <TableCell>
                <div className="table_header">Parallel Group Affiliation</div>
              </TableCell>
              <TableCell>
                <div className="table_header">Parallel Group Logo</div>
              </TableCell>
              <TableCell>
                <div className="table_header">Region</div>
              </TableCell>
              <TableCell>
                <div className="table_header">Province</div>
              </TableCell>
              <TableCell>
                <div className="table_header">District</div>
              </TableCell>
              <TableCell>
                <div className="table_header">City/Municipality</div>
              </TableCell>
              <TableCell>
                <div className="table_header">Barangay</div>
              </TableCell>
              <TableCell>
                <div className="table_header">Bldg.Name</div>
              </TableCell>
              <TableCell>
                <div className="table_header">Street Number</div>
              </TableCell>
              <TableCell>
                <div className="table_header">Street Name</div>
              </TableCell>

              <TableCell  sx={{
                position:"sticky", 
                right:0, 
                bgcolor:"#f5f5f5cd",
                }}>
                <div className="users_table_header ">Action</div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {renderTableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
              <TableRow key={index} style={{ cursor: "pointer" }}>
                  <TableCell><span>{item.name ?? "---"}</span></TableCell>
                  <TableCell><span>{item.reg_type_data?.desc ?? "---"}</span></TableCell>
                  <TableCell><span>{item.reg_date ?? "---"}</span></TableCell>
                  <TableCell><span>{item.reg_number ?? "---"}</span></TableCell>
                  <TableCell><span>{item.application_date ?? "---"}</span></TableCell>
                  <TableCell><span>{item.memship_type_data?.desc ?? "---"}</span></TableCell>
                  <TableCell><span>{item.memship_status_data?.desc ?? "---"}</span></TableCell>
                  <TableCell><span>{item.approved_date ?? "---"}</span></TableCell>
                  <TableCell><span>{item.closed_date ?? "---"}</span></TableCell>
                  <TableCell><span>{item.grp_type_data?.desc ?? "---"}</span></TableCell>
                  <TableCell><span>{item.affiliation ?? "---"}</span></TableCell>
                  <TableCell>
                    <img src={`${baseUrl}${item.logo}`} alt="" className="table_logo" />
                  </TableCell>
                  <TableCell><span>{item.region_data?.desc ?? "---"}</span></TableCell>
                  <TableCell><span>{item.province_data?.desc ?? "---"}</span></TableCell>
                  <TableCell><span>{item.district ?? "---"}</span></TableCell>
                  <TableCell><span>{item.municipality_data?.desc ?? "---"}</span></TableCell>
                  <TableCell><span>{item.barangay_data?.desc ?? "---"}</span></TableCell>
                  <TableCell><span>{item.bldg_name ?? "---"}</span></TableCell>
                  <TableCell><span>{item.street_number ?? "---"}</span></TableCell>
                  <TableCell><span>{item.street_name ?? "---"}</span></TableCell>
                  <TableCell sx={{position:"sticky", right:0,  bgcolor:"#f5f5f5cd",}}>
                    <div className="action_btn_wrapper ">
                    <button   className="btn_view_users" onClick={() => handleOpenDialog(item)}  >
                        <BsCardList/>
                      </button>
                      <button className="btn_update_users" onClick={() => handleOpenUpdateDialog(data, index, page)}>
                      <FaRegEdit />
                    </button>
                    <button className="btn_delete_users" onClick={(event) => handleDelete(item.id, event)}>
                  <RiDeleteBack2Line />
                </button>

                    </div>
                  </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={renderTableData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
        <div className="export_box">
        <span>Export</span>
        <button className="btn_csv" onClick={handleExportCsv}>
          <FaFileCsv />
        </button>
        <button className="btn_excel" onClick={handleExportExcel}>
          <SiMicrosoftexcel />
        </button>
      <PDFGenerator data={data} />
     
      </div>
    </div>
   </>
  );
}
