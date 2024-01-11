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
import FormAdd from "./FormAdd";
import { BsCardList } from "react-icons/bs";
import FormUpdate from "./UpdateForm";

const baseUrl = import.meta.env.VITE_URL;
const getUsersData = `${baseUrl}/api/individual/`;
const getCsrfTokenUrl = `${baseUrl}/api/csrf_cookie/`;

export default function Users() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState("");
  const [csrfToken, setCsrfToken] = useState('');
  const [deleteConfirmationDialogOpen, setDeleteConfirmationDialogOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [deleteUsername, setDeleteUsername] = useState(null);
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState("");
  const [addUsersDialogOpen, setAddUsersDialogOpen] = useState(false);
  const [updateFormOpen, setUpdateFormOpen] = useState(false);
  const [updateUserId, setUpdateUserId] = useState(null);

  const handleOpenUpdateForm = (userId) => {
    setUpdateUserId(userId);
    setUpdateFormOpen(true);
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
        const dataResponse = await axios.get(getUsersData);
        setData(dataResponse.data.success);
        console.log("Users", dataResponse.data);
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

  const renderTableData = searchResults.length > 0 ? searchResults : data;

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
          <BsPersonPlus/>Add Individual</button>
      </div>

      <Dialog
        open={updateFormOpen}
        onClose={handleCloseUpdateForm}
        TransitionComponent={Slide}
        fullWidth
        maxWidth="md"
      >
        {/* Pass the necessary props to the FormUpdate component */}
        <FormUpdate userId={updateUserId} onClose={handleCloseUpdateForm} csrfToken={csrfToken} baseUrl={baseUrl} />
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
                    src={`http://localhost:8000/${selectedItem.individual?.photo}`} 
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
                  <p>First Name</p>
                  <p>Middle Name</p>
                  <p>Last Name</p>
                  <p>Suffix</p>
                  <p>Nickname</p>
              </span>
              <span className="span2">
                  <p>{selectedItem.individual?.prefix_data?.desc ?? "---"}</p>
                  <p>{selectedItem.individual?.first_name ?? "---"}</p>
                  <p>{selectedItem.individual?.middle_name ?? "---"}</p>
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
      <TableContainer component={Paper} className="users_table_container">
        <Table>
        <TableHead >
            <TableRow >
              <TableCell >
                <div className="users_table_header">Membership ID</div>
              </TableCell>
              <TableCell>
                <div className="users_table_header">Prefix</div>
              </TableCell>

              <TableCell>
                <div className="users_table_header">First Name</div>
              </TableCell>
              <TableCell>
                <div className="users_table_header">Middle Name</div>
              </TableCell>
              <TableCell>
                <div className="users_table_header">Last Name</div>
              </TableCell>
              <TableCell>
                <div className="users_table_header">Suffix</div>
              </TableCell>
              <TableCell>
                <div className="users_table_header">Nickname</div>
              </TableCell>
              <TableCell>
                <div className="users_table_header">Mobile Number</div>
              </TableCell>
              <TableCell>
                <div className="users_table_header">Email Address</div>
              </TableCell>
              <TableCell>
                <div className="users_table_header">Accupation</div>
              </TableCell>
              <TableCell>
                <div className="users_table_header">Region</div>
              </TableCell>
              <TableCell>
                <div className="users_table_header">Province</div>
              </TableCell>
              <TableCell>
                <div className="users_table_header">District</div>
              </TableCell>
              <TableCell>
                <div className="users_table_header">City/Municipality</div>
              </TableCell>
              <TableCell>
                <div className="users_table_header">Barangay</div>
              </TableCell>
              <TableCell>
                <div className="users_table_header">Bldg.Number</div>
              </TableCell>
              <TableCell>
                <div className="users_table_header">Bldg.Name</div>
              </TableCell>
              <TableCell>
                <div className="users_table_header">Street Number</div>
              </TableCell>
              <TableCell>
                <div className="users_table_header">Street Name</div>
              </TableCell>
              <TableCell>
                <div className="users_table_header">Membership Type</div>
              </TableCell>
              <TableCell>
                <div className="users_table_header">Affiliation (Parallel Group)</div>
              </TableCell>
              <TableCell>
                <div className="users_table_header">Position in Parallel Group</div>
              </TableCell>
              <TableCell>
                <div className="users_table_header">Membership Date Application</div>
              </TableCell>
              <TableCell>
                <div className="users_table_header">Membership Date Approved</div>
              </TableCell>
              <TableCell>
                <div className="users_table_header">Membership Status</div>
              </TableCell>
              <TableCell>
                <div className="users_table_header">Membership Date Closed</div>
              </TableCell>
              <TableCell>
                <div className="users_table_header">ReferredBy</div>
              </TableCell>
              <TableCell>
                <div className="users_table_header">Photo</div>
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
                  <TableCell><span>{item.individual?.memship_id ?? "---"}</span></TableCell>
                  <TableCell><span>{item.individual?.prefix_data ? item.individual.prefix_data?.desc ?? "---" : "---"}</span></TableCell>
                  <TableCell><span>{item.individual?.first_name ?? "---"}</span></TableCell>
                  <TableCell><span>{item.individual?.middle_name ?? "---"}</span></TableCell>
                  <TableCell><span>{item.individual?.last_name ?? "---"}</span></TableCell>
                  <TableCell><span>{item.individual?.suffix_data ? item.individual.suffix_data?.desc ?? "---" : "---"}</span></TableCell>
                  <TableCell><span>{item.individual?.nickname ?? "---"}</span></TableCell>
                  <TableCell><span>{item.individual?.mobile_number ?? "---"}</span></TableCell>
                  <TableCell><span>{item.individual?.email ?? "---"}</span></TableCell>
                  <TableCell><span>{item.individual?.occupation_data ? item.individual.occupation_data?.desc ?? "---" : "---"}</span></TableCell>
                  <TableCell><span>{item.individual?.region_data ? item.individual.region_data?.desc ?? "---" : "---"}</span></TableCell>
                  <TableCell><span>{item.individual?.province_data ? item.individual.province_data?.desc ?? "---" : "---"}</span></TableCell>
                  <TableCell><span>{item.individual?.municipality_data ? item.individual.municipality_data?.legist_dist ?? "---" : "---"}</span></TableCell>
                  <TableCell><span>{item.individual?.municipality_data ? item.individual.municipality_data?.desc ?? "---" : "---"}</span></TableCell>
                  <TableCell><span>{item.individual?.barangay_data ? item.individual.barangay_data?.desc ?? "---" : "---"}</span></TableCell>
                  <TableCell><span>{item.individual?.bldg_number ?? "---"}</span></TableCell>
                  <TableCell><span>{item.individual?.bldg_name ?? "---"}</span></TableCell>
                  <TableCell><span>{item.individual?.street_number ?? "---"}</span></TableCell>
                  <TableCell><span>{item.individual?.street_name ?? "---"}</span></TableCell>
                  <TableCell><span>{item.individual?.memship_type_data ? item.individual.memship_type_data?.desc ?? "---" : "---"}</span></TableCell>
                  <TableCell><span>---</span></TableCell>
                  <TableCell><span>{item.individual?.position_data ? item.individual.position_data.desc ?? "---" : "---"}</span></TableCell>
                  <TableCell><span>{item.individual?.application_date ?? "---"}</span></TableCell>
                  <TableCell><span>{item.individual?.approved_date ?? "---"}</span></TableCell>
                  <TableCell><span>{item.individual?.memship_status_data ? item.individual.memship_status_data?.desc ?? "---" : "---"}</span></TableCell>
                  <TableCell><span>{item.individual?.closed_date ?? "---"}</span></TableCell>
                  <TableCell><span>---</span></TableCell>
                  <TableCell>
                  <img 
                      src={`http://localhost:8000/${item?.individual?.photo}`} 
                      alt=""
                      className="users_table_logo "
                      onError={(e) => {
                        e.target.onerror = null; // Prevent infinite loop
                        e.target.src = testImage; // Replace with the path to your default image
                      }}
                    />

                 </TableCell>
                
                 <TableCell sx={{position:"sticky", right:0,  bgcolor:"#f5f5f5cd",}}>
                    <div className="action_btn_wrapper ">
                    <button   className="btn_view_users" onClick={() => handleOpenDialog(item)} >
                        <BsCardList/>
                      </button>
                      <button className="btn_update_users" onClick={() => handleOpenUpdateForm(item.individual.user_id)}>
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
    </div>
   </>
  );
}
