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
import { FiSearch } from "react-icons/fi";
import { IoRefresh } from "react-icons/io5";
import { BsPersonPlus } from "react-icons/bs";
import { RiDeleteBack2Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import Slide from '@mui/material/Slide';
import { BsCardList } from "react-icons/bs";
import FormAdd from "./FormAdd";
import FormUpdate from "./FormUpdate";
import { FaFileCsv } from "react-icons/fa";
import { SiMicrosoftexcel } from "react-icons/si";
import PDFGenerator from "./PDFGenerate";
import { apiUser, baseUrl, getFileCsvMember, getFileExcelMember, getMemberStatus,
  getCsrfTokenUrl  } from "../../api/api";


export default function Users() {
  const [csrfToken, setCsrfToken] = useState('');
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState("");
  const [deleteConfirmationDialogOpen, setDeleteConfirmationDialogOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [deleteUsername, setDeleteUsername] = useState(null);
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState("");
  const [addUsersDialogOpen, setAddUsersDialogOpen] = useState(false);
  const [updateFormOpen, setUpdateFormOpen] = useState(false);
  const [updateData, setUpdateData] = useState(null);

  const [status, setStatus] = useState([]);
  const [statusMessage, setStatusMessage] = useState(null)
  
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCsrfTokenUrl]);




  
  const handleOpenUpdateForm = (data, index, page) => {
    
    const dataIndex = (page * rowsPerPage) + index
    setUpdateData(data[dataIndex]);
    setUpdateFormOpen(true);
    console.log('dataIndex',dataIndex )
  };

  const handleCloseUpdateForm = () => {
    setUpdateFormOpen(false);
  };

  const handleAddUsersDialogOpen = () => {
    setAddUsersDialogOpen(true);
  };
  
  const handleAddUsersDialogClose = () => {
    setAddUsersDialogOpen(false);
  };

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



  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataResponse = await axios.get(apiUser);
        const filteredData = dataResponse.data.success.filter((user) => {
          // Check if the user has the role "Parallel Group Administrator"
          return (
            !user.roles.some((role) =>
              role.toLowerCase() === "parallel group administrator"
            )
          );
        });
  
        // Sort the data by date created in descending order
        const sortedData = filteredData.sort((a, b) =>
          new Date(b.date_created) - new Date(a.date_created)
        );
  
        setData(sortedData);
        console.log("Users", sortedData);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchMemberStatus = async () => {
      try {
        const statusResponse = await axios.get(getMemberStatus);
  
        setStatus(statusResponse.data.success);
        console.log("status", statusResponse);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
    fetchMemberStatus();
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



// Modify the handleDelete function
const handleDelete = (userId,username, event) => {
  // Stop event propagation to prevent opening the dialog
  event.stopPropagation();

  // Set the userId to be deleted and open the confirmation dialog
  setDeleteUserId(userId);
  setDeleteUsername(username);
  setDeleteConfirmationDialogOpen(true);
};

const handleDeleteConfirmed = async () => {
  try {
    // Make an API request to delete the item with CSRF token in the header
    await axios.delete(`${baseUrl}/api/individual/`, {
      data: { id: deleteUserId },
      headers: {
        'X-CSRFToken': csrfToken,
      },
    });

    // Remove the deleted item from the state
    const updatedData = data.filter(item => item.id !== deleteUserId);
    setData(updatedData);

    // Display success message
    setDeleteSuccessMessage(`User ${deleteUsername} successfully deleted.`);

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

  
  

const handleFindClick = () => {
  const results = data.filter((item) => {
    // Check if any value (including nested values) contains the search input
    const hasMatch = Object.values(item).some((value) => {
      if (value !== null && value !== undefined) {
        // If the value is an object, check its nested properties
        if (typeof value === 'object') {
          return Object.values(value).some((nestedValue) =>
            nestedValue !== null &&
            nestedValue !== undefined &&
            nestedValue.toString().toLowerCase().includes(searchInput.toLowerCase())
          );
        } else {
          // If it's a primitive value, check it directly
          return value.toString().toLowerCase().includes(searchInput.toLowerCase());
        }
      }
      return false;
    });

    return hasMatch;
  });

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

  const handleExportCsv = async () => {
    try {
      // Make an API request to get the CSV file
      const response = await axios.get(getFileCsvMember, {
        responseType: 'blob', // Set responseType to blob to handle binary data
      });

      // Create a link element to download the file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'member.csv');
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
      const response = await axios.get(getFileExcelMember, {
        responseType: 'blob', // Set responseType to blob to handle binary data
      });

      // Create a link element to download the file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'member.xlsx');
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting Excel:", error);
    }
  };


  const renderTableData = searchResults.length > 0 ? searchResults : data;

  const getStatusColorClass = (status) => {
    switch (status) {
      case 1:
        return "active-status";
      case 2:
        return "inactive-status";
      case '':
      default:
        return "pending-status";
    }
  };
  
  const handleStatusChange = async (userId, newStatus) => {
    try {
      // Make an API request to update the status with CSRF token in the header
      await axios.put(apiUser, {
        individual:{
          user_id: userId,
           memship_status: newStatus
        },
      }, {
        headers: {
          'X-CSRFToken': csrfToken,
        },
      });
  
      // Update the status in the state
      const updatedData = data.map(item => {
        if (item.id === userId) {
          return {
            ...item,
            individual: {
              ...item.individual,
              memship_status: {
                ...item.individual.memship_status,
                desc: newStatus
              }
            }
          };
        }
        return item;
      });
      setData(updatedData);
        setStatusMessage('Successfully Status Changed!');
        setTimeout(() => {
          setStatusMessage(null);
        }, 1000);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  

  return (
   <>
   

    <div className="users_header_container">
        <div className="search_box">
            <input
              value={searchInput}
              onChange={handleSearchInputChange}
            />
              <button className="users_btn_search" onClick={handleFindClick}>
              <FiSearch />
          </button>
       
          <button className="users_btn_clear" onClick={handleClearSearch}>
           <IoRefresh/>
        </button>
         
        </div>
        <button className="btn_add_users" onClick={handleAddUsersDialogOpen}>
          <BsPersonPlus/>Add Member</button>
      </div>

      <Dialog
        open={updateFormOpen}
        onClose={handleCloseUpdateForm}
        TransitionComponent={Slide}
        fullWidth
        maxWidth="sm"
      >
        {/* Pass the necessary props to the FormUpdate component */}
        <FormUpdate  
          onClose={handleCloseUpdateForm} 
          apiEndpoint={apiUser} 
          data={updateData} 
          csrfToken={csrfToken}
       />
      </Dialog>


     
    {selectedItem && (
      <Dialog  
      fullWidth
      maxWidth="md"
      open={openDialog} onClose={handleCloseDialog}>
       <div className="user_dialog_container">
         <div className="user_box_wrapper1">
           <div className="user_flex">
           <div className="user_box_1">
            <img 
                    src={`${baseUrl}${selectedItem.individual?.photo}`} 
                    alt=""
                    className="users_table_logo"
                    onError={(e) => {
                      e.target.onerror = null; // Prevent infinite loop
                      e.target.src = testImage; // Replace with the path to your default image
                    }} 
                  />
              <span>Membership ID:</span>
              <h3>{selectedItem.individual?.memship_id ?? "---"}</h3>
            </div>
            <div className="user_box_2">
              <span className="span1">
                <p>Prefix</p>
                  <p>Username</p>
                  <p>First Name</p>
                  <p>Last Name</p>
                  <p>Suffix</p>
                  <p>Nickname</p>
              </span>
              <span className="span2">
                  <p>{selectedItem.individual?.prefix_data?.desc ?? "---"}</p>
                  <p>{selectedItem.username ?? "---"}</p>
                  <p>{selectedItem.individual?.first_name ?? "---"}</p>
                  <p>{selectedItem.individual?.last_name ?? "---"}</p>
                  <p>{selectedItem.individual?.suffix_data?.desc ?? "---"}</p>
                  <p>{selectedItem.individual?.nickname ?? "---"}</p>
                
              </span>
            </div>
           </div>

            <div className="user_box_3">
              <span className="span1">
                <p>Region</p>
                <p>Province</p>
                <p>District</p>
                <p>City/Municipality</p>
                <p>Barangay</p>
                <p>Bldg. Number</p>
                <p>Bldg. Name</p>
                <p>Street Number</p>
                <p>Street Name</p>
              </span>
              <span className="span2">
              <p>{selectedItem.individual?.region_data?.desc ?? "---"}</p>
              <p>{selectedItem.individual?.province_data?.desc ?? "---"}</p>
              <p>{selectedItem.individual?.municipality_data?.legist_dist ?? "---"}</p>
              <p>{selectedItem.individual?.municipality_data?.desc ?? "---"}</p>
              <p>{selectedItem.individual?.barangay_data?.desc ?? "---"}</p>
              <p>{selectedItem.individual?.bldg_number ?? "---"}</p>
              <p>{selectedItem.individual?.bldg_name ?? "---"}</p>
              <p>{selectedItem.individual?.street_number ?? "---"}</p>
              <p>{selectedItem.individual?.street_name ?? "---"}</p>
               
              </span>
            </div>
         </div>

         <div className="user_box_wrapper2">
             <div className="user_box_4">
                 <span className="span1">
                    <p>Mobile Number</p>
                    <p>Email Address</p>
                    <p>Occupation</p>
                 </span>

                 <span className="span2">
                   <p>{selectedItem.individual?.mobile_number ?? "---"}</p>
                   <p>{selectedItem.individual?.email ?? "---"}</p>
                   <p>{selectedItem.individual?.occupation_data?.desc ?? "---"}</p>
                 </span>

              
             </div>

             <div className="user_box_5">
             <span className="span1">
                     <p>Membership Type</p>
                     <p>Affilication (Parallel Group)</p>
                     <p>Position in (Parallel Group)</p>
                     <p>Membership Date Application</p>
                     <p>Membership Date Approved</p>
                     <p>Membership Status</p>
                     <p>Membership Date Closed</p>
                     <p>ReferredBy</p>
                 </span>
                 <span className="span2">
                 <p>{selectedItem.individual?.memship_type_data?.desc ?? "---"}</p>
                 <p>---</p>
                 <p>{selectedItem.individual?.position_data?.desc ?? "---"}</p>
                 <p>{selectedItem.individual?.application_date ?? "---"}</p>
                 <p>{selectedItem.individual?.approved_date ?? "---"}</p>
                 <p>{selectedItem.individual?.memship_status_data?.desc ?? "---"}</p>
                 <p>{selectedItem.individual?.closed_date ?? "---"}</p>
                 <p>---</p>
                 </span>

             </div>

             <button className="user_dailog_btn_close" onClick={handleCloseDialog}>Close</button>

         </div>
       </div>
      </Dialog>
    )}

<Dialog
  open={deleteConfirmationDialogOpen}
  onClose={handleDeleteCancelled}
  maxWidth="sm"
  fullWidth
>
  <div className="dailog_delete_box">
    <p>Are you sure you want to delete {deleteUsername}?</p>
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
  open={addUsersDialogOpen}
  TransitionComponent={Slide}
  onClose={handleAddUsersDialogClose}
  fullWidth
  maxWidth="md"
>
  <FormAdd  onClose={handleAddUsersDialogClose} />
</Dialog>

    <div className="users_table_wrapper">
    {error && (
        <div className="message_error">
          <p>{error}</p>
        </div>
      )}

{deleteSuccessMessage && (
  <div className="message_success">
    <p>{deleteSuccessMessage}</p>
  </div>
)}
{statusMessage && <p className="statusMessage">{statusMessage}</p>}
      <TableContainer component={Paper} className="users_table_container">
        <Table>
        <TableHead >
            <TableRow >
              <TableCell>
                <div className="users_table_header">First Name</div>
              </TableCell>
              <TableCell>
                <div className="users_table_header">Last Name</div>
              </TableCell>
              <TableCell>
                <div className="users_table_header">Mobile Number</div>
              </TableCell>
              <TableCell>
                <div className="users_table_header">Email Address</div>
              </TableCell>
            
              <TableCell>
                <div className="users_table_header">Photo</div>
              </TableCell>

              <TableCell>
                <div className="users_table_header">Status</div>
              </TableCell>

              <TableCell >
                <div className="users_table_header ">Action</div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {renderTableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
              <TableRow key={index} style={{ cursor: "pointer" }}>
                  <TableCell><span>{item.individual?.first_name ?? "---"}</span></TableCell>
                  <TableCell><span>{item.individual?.last_name ?? "---"}</span></TableCell>
                  <TableCell><span>{item.individual?.mobile_number ?? "---"}</span></TableCell>
                  <TableCell><span>{item.individual?.email ?? "---"}</span></TableCell>
                  <TableCell>
                  <img 
                      src={`${baseUrl}${item?.individual?.photo}`} 
                      alt=""
                      className="users_table_logo "
                      onError={(e) => {
                        e.target.onerror = null; // Prevent infinite loop
                        e.target.src = testImage; // Replace with the path to your default image
                      }}
                    />

                 </TableCell>

                 <TableCell>
                      <select
                        value={item.individual?.memship_status || ""}
                        onChange={(e) => handleStatusChange(item.id, e.target.value)}
                        className={`statusBox ${getStatusColorClass(item.individual?.memship_status)}`}
                      
                      >
                                <option value={""} >Pending</option>
                        {status.map((item, index) => (
                                <option value={item.id} key={index}>{item.desc}</option>
                            ))}
                        
                      </select>
                      </TableCell>
                
                 <TableCell >
                    <div className="action_btn_wrapper ">
                    <button   className="btn_view_users" onClick={() => handleOpenDialog(item)} >
                        <BsCardList/>
                      </button>
                      <button className="btn_update_users" onClick={() => handleOpenUpdateForm(data, index, page)}>
                      <FaRegEdit />
                    </button>
                      <button className="btn_delete_users" onClick={(event) => handleDelete(item.id, item.username, event)}>
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

        <PDFGenerator data={data}/>
      </div>
    </div>
   </>
  );
}
