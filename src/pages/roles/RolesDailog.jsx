/* eslint-disable react/prop-types */
// RolesDialog.js
import { Button, Dialog, DialogActions, DialogContent, TextField } from '@mui/material';

const AddRoleDialog = ({ isOpen, onClose, onAddRole, newRoleName, onNewRoleNameChange }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} aria-labelledby="new-dialog-title" aria-describedby="new-dialog-description">
      <DialogContent>
        <TextField label="Add Role" type="text" value={newRoleName} onChange={onNewRoleNameChange} />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={onAddRole} autoFocus>
          Add Role
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const DeleteRoleDialog = ({ isOpen, onClose, onDeleteRole }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <div className="dailog_delete_box">
        <p>Are you sure you want to delete?</p>
        <div>
          <button className="yes" onClick={onDeleteRole} autoFocus>
            Yes
          </button>
          <button className="no" onClick={onClose}>
            No
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export { AddRoleDialog, DeleteRoleDialog };
