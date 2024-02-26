import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { RiDeleteBack2Line } from "react-icons/ri";
import { BsPersonPlus } from "react-icons/bs";
import { apiRoles } from '../../api/api';
import { AddRoleDialog, DeleteRoleDialog } from './RolesDailog';
import { getCsrfTokenUrl } from '../../api/api';

export default function Roles() {
    const [data, setData] = useState([]);
    const [newRoleName, setNewRoleName] = useState('');
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isNewDialogOpen, setIsNewDialogOpen] = useState(false);
    const [roleToDelete, setRoleToDelete] = useState(null);
    const [csrfToken, setCsrfToken] = useState('');

    
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
  


  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(apiRoles);
          setData(response.data.success);
          console.log('Roles', response.data.success);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, [isNewDialogOpen]); // Include 'isNewDialogOpen' in the dependency array to refetch when new data is added
  
    const handleAddRole = async () => {
      try {
        const response = await axios.post(apiRoles, { name: newRoleName }, {
          headers: {
            'X-CSRFToken': csrfToken,
          },
        });
        setData([...data, response.data.success]);
        setNewRoleName('');
        closeNewDialog(); // Close the add role dialog
        console.log('Role added:', response.data.success);
      } catch (error) {
        console.error('Error adding role:', error);
      }
    };
  
    const handleDeleteRole = async () => {
      try {
        const response = await axios.delete(apiRoles, {
          data: { id: roleToDelete },
          headers: {
            'X-CSRFToken': csrfToken,
          },
        });
        setData(data.filter(item => item.id !== roleToDelete));
        console.log('Role deleted:', response.data.success);
        closeDeleteDialog();
      } catch (error) {
        console.error('Error deleting role:', error);
      }
    };
  
    const openDeleteDialog = (roleId) => {
      setRoleToDelete(roleId);
      setIsDeleteDialogOpen(true);
    };
  
    const closeDeleteDialog = () => {
      setRoleToDelete(null);
      setIsDeleteDialogOpen(false);
    };
  
    const openNewDialog = () => {
      setIsNewDialogOpen(true);
    };
  
    const closeNewDialog = () => {
      setIsNewDialogOpen(false);
    };
  
    return (
      <div className='w-[90%] flex flex-col gap-2 font-manrope'>
        <div className='flex w-full items-end  justify-end '>
        <button className='btn_add_users p-3 ' onClick={openNewDialog}>
         <BsPersonPlus />Add Role</button>
        </div>
  
        <TableContainer  component={Paper} className="users_table_container">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                <div className="users_table_header">Role Name</div>
                </TableCell>
                <TableCell>
                <div className="users_table_header">Action</div>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <button className="btn_delete_users" onClick={() => openDeleteDialog(item.id)}>
                    <RiDeleteBack2Line />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
  
      {/* Add Role Dialog */}
      <AddRoleDialog
        isOpen={isNewDialogOpen}
        onClose={closeNewDialog}
        onAddRole={handleAddRole}
        newRoleName={newRoleName}
        onNewRoleNameChange={(e) => setNewRoleName(e.target.value)}
      />

      {/* Delete Role Dialog */}
      <DeleteRoleDialog isOpen={isDeleteDialogOpen} onClose={closeDeleteDialog} onDeleteRole={handleDeleteRole} />

      </div>
    );
  }
