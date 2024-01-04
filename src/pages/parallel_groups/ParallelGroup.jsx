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

const baseUrl = import.meta.env.VITE_URL;
const getParallelGroupsData = `${baseUrl}/api/parallel_group/`;

export default function ParallelGroups() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataResponse = await axios.get(getParallelGroupsData);
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

  return (
   <>
    <div className="pg_header_container">
        <div className="search_box">
            <input
              value={searchInput}
              onChange={handleSearchInputChange}
            />
 <button className="btn_search" onClick={handleFindClick}>
              <FiSearch />
          </button>
       
          <button className="btn_clear" onClick={handleClearSearch}>
           <IoRefresh/>
        </button>
         
        </div>
        <button className="btn_add_pl">
          <BsPersonPlus/>Add Parallel Group</button>
      </div>

      {error && (
        <div style={{ textAlign: "center", marginTop: "20px", color: "red" }}>
          <p>{error}</p>
        </div>
      )}
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
               src={`http://localhost:8000/${selectedItem.logo}`} 
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
                <p className="p2">{selectedItem.req_type ?? "---" }</p>
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
              <TableCell >
                <div className="table_header">Parallel Group Number</div>
              </TableCell>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {renderTableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
              <TableRow key={index} onClick={() => handleOpenDialog(item)} style={{ cursor: "pointer" }}>
                  <TableCell><span>{item.number ?? "---"}</span></TableCell>
                  <TableCell><span>{item.name ?? "---"}</span></TableCell>
                  <TableCell><span>{item.req_type ?? "---"}</span></TableCell>
                  <TableCell><span>{item.req_date ?? "---"}</span></TableCell>
                  <TableCell><span>{item.req_number ?? "---"}</span></TableCell>
                  <TableCell><span>{item.application_date ?? "---"}</span></TableCell>
                  <TableCell><span>{item.memship_type ?? "---"}</span></TableCell>
                  <TableCell><span>{item.memship_status ?? "---"}</span></TableCell>
                  <TableCell><span>{item.approved_date ?? "---"}</span></TableCell>
                  <TableCell><span>{item.closed_date ?? "---"}</span></TableCell>
                  <TableCell><span>{item.grp_type ?? "---"}</span></TableCell>
                  <TableCell><span>{item.affiliation ?? "---"}</span></TableCell>
                  <TableCell>
                    <img src={`http://localhost:8000/${item.logo}`} alt="" className="table_logo" />
                  </TableCell>
                  <TableCell><span>{item.region ?? "---"}</span></TableCell>
                  <TableCell><span>{item.province ?? "---"}</span></TableCell>
                  <TableCell><span>{item.district ?? "---"}</span></TableCell>
                  <TableCell><span>{item.municipality ?? "---"}</span></TableCell>
                  <TableCell><span>{item.barangay ?? "---"}</span></TableCell>
                  <TableCell><span>{item.bldg_name ?? "---"}</span></TableCell>
                  <TableCell><span>{item.street_number ?? "---"}</span></TableCell>
                  <TableCell><span>{item.street_name ?? "---"}</span></TableCell>

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
