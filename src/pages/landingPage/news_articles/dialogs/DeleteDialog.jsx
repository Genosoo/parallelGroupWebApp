/* eslint-disable react/prop-types */
import { Dialog } from '@mui/material';

const DeleteDialog = ({ open, onClose, onConfirmDelete }) => {
  return (
    <Dialog maxWidth="sm" sx={{opacity:"0.5"}} open={open} onClose={onClose}>
      <div className="selected_news_delete">
        <p>Are you sure you want to delete?</p>
        <button className="yes" onClick={onConfirmDelete}>
          Yes
        </button>
        <button className="cancel" onClick={onClose}>
          Cancel
        </button>
      </div>
    </Dialog>
  );
};

export default DeleteDialog;
