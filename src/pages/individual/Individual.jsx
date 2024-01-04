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
          <BsPersonPlus/>Add Users</button>
      </div>

     
    {selectedItem && (
      <Dialog  
      fullWidth
      maxWidth="lg"
      open={openDialog} onClose={handleCloseDialog}>
       <div className="flex">
       <div className="box_left">
        <div className="users_box_wrapper1">
          <div className="box box1">
               <img 
               src={`http://localhost:8000/${selectedItem.logo}`} 
               alt=""
               className="users_table_logo"
               onError={(e) => {
                e.target.onerror = null; // Prevent infinite loop
                e.target.src = testImage; // Replace with the path to your default image
              }}
              />
             <div className="mem_id">
                <p className="p1">Membership ID:</p> 
                <p className="p2">{selectedItem.number ?? "---"}</p>
             </div>
          </div>
          <div className="box box2 ">
             <span>
                <p className="p1">Prefix</p> 
                <p className="p2">{selectedItem.number ?? "---"}</p>
             </span>
             <span>
                <p className="p1">First Name</p> 
                <p className="p2">{selectedItem.name ?? "---"}</p>
             </span>

             <span>
                <p className="p1">Middle Name</p> 
                <p className="p2">{selectedItem.name ?? "---"}</p>
             </span>
             <span>
                <p className="p1">Last Name</p> 
                <p className="p2">{selectedItem.req_type ?? "---" }</p>
             </span>
             <span>
                <p className="p1">Suffix</p> 
                <p className="p2">{selectedItem.req_type ?? "---" }</p>
             </span>
             <span>
                <p className="p1">Nickname</p> 
                <p className="p2">{selectedItem.req_type ?? "---" }</p>
             </span>
          </div>
        </div>
        <div className="users_box_wrapper1 pt-6">
          <div className="box box3">
          <span>
                <p className="p1">Individual ID</p> 
                <p className="p2">{selectedItem.affiliation ?? "---"}</p>
             </span>
             <span>
                <p className="p1">Date Created</p> 
                <p className="p2">{selectedItem.name ?? "---"}</p>
             </span>
             <span>
                <p className="p1">Date Modified</p> 
                <p className="p2">{selectedItem.reg_date ?? "---" }</p>
             </span>
             <span>
                <p className="p1">Record Created By</p> 
                <p className="p2">{selectedItem.reg_number ?? "---" }</p>
             </span>
             <span>
                <p className="p1">Action</p> 
                <p className="p2">{selectedItem.application_date ?? "---" }</p>
             </span>
             
          </div>
        </div>
        </div>

        <div className="box_right">
          <div className="box_wrapper2">
          <div className="box4">
          <span>
                <p className="p1">Individual ID</p> 
                <p className="p2">{selectedItem.affiliation ?? "---"}</p>
             </span>
             <span>
                <p className="p1">Date Created</p> 
                <p className="p2">{selectedItem.name ?? "---"}</p>
             </span>
             <span>
                <p className="p1">Date Modified</p> 
                <p className="p2">{selectedItem.reg_date ?? "---" }</p>
             </span>
             <span>
                <p className="p1">Record Created By</p> 
                <p className="p2">{selectedItem.reg_number ?? "---" }</p>
             </span>
             <span>
                <p className="p1">Action</p> 
                <p className="p2">{selectedItem.application_date ?? "---" }</p>
             </span>
          </div>
          </div>

          <button className="dailog_btn_close" onClick={handleCloseDialog}>Close</button>
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
  <FormAdd />
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
                <div className="users_table_header">User ID</div>
              </TableCell>
              <TableCell>
                <div className="users_table_header">User Name</div>
              </TableCell>

              <TableCell>
                <div className="users_table_header">First Name</div>
              </TableCell>
              <TableCell>
                <div className="users_table_header">Last Name</div>
              </TableCell>
              <TableCell>
                <div className="users_table_header">Email Address</div>
              </TableCell>
              <TableCell>

                <div className="users_table_header">Individual ID</div>
              </TableCell>
              <TableCell>
                <div className="users_table_header">Date Created</div>
              </TableCell>
              <TableCell>
                <div className="users_table_header">Date Modified</div>
              </TableCell>
              <TableCell>
                <div className="users_table_header">Record Created By</div>
              </TableCell>
              <TableCell>
                <div className="users_table_header">Action</div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {renderTableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
              <TableRow key={index} onClick={() => handleOpenDialog(item)} style={{ cursor: "pointer" }}>
                  <TableCell><span>{item.id ?? "---"}</span></TableCell>
                  <TableCell><span>{item.username ?? "---"}</span></TableCell>
                  <TableCell><span>{item.first_name ?? "---"}</span></TableCell>
                  <TableCell><span>{item.last_name ?? "---"}</span></TableCell>
                  <TableCell><span>{item.email ?? "---"}</span></TableCell>
                  <TableCell><span>{item.user_id ?? "---"}</span></TableCell>
                  <TableCell><span>{item.created_at  ?? "---"}</span></TableCell>
                  <TableCell><span>{item.updated_at ?? "---"}</span></TableCell>
                  <TableCell><span>{item.created_by?? "---"}</span></TableCell>
                  <TableCell>
                    <div className="action_btn_wrapper">
                      <button   className="btn_update_users">
                        <FaRegEdit/>
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
