import { apiAds, baseUrl, getCsrfTokenUrl } from '../../../../api/api';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AdsList() {
  const [adsData, setAdsData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAdId, setSelectedAdId] = useState(null);
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
        const adsResponse = await axios.get(apiAds);
        setAdsData(adsResponse.data.success);
        console.log(adsResponse.data.success);
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteAd = async (adId) => {
    setSelectedAdId(adId);
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(apiAds, {
        data: { id: selectedAdId },
        headers: {
          'X-CSRFToken': csrfToken,
        },
      });
      // Update state to reflect the deleted ad
      setAdsData((prevAds) => prevAds.filter((ad) => ad.id !== selectedAdId));
      setOpenDialog(false);
    } catch (error) {
      console.error('Failed to delete ad', error);
    }
  };

  const handleCancelDelete = () => {
    setSelectedAdId(null);
    setOpenDialog(false);
  };

  return (
    <div>
      <h3 className='font-manrope text-[2rem] font-bold text-gray-800'>Ads List</h3>
    <div className="h-[600px] overflow-y-auto">
      {adsData.map((item, index) => (
        <div key={index} className="">
          <a className='h-full w-full border' target='blank' key={index} href={item.url}>
            <img className='h-full w-[400px] p-1' src={`${baseUrl}${item.image}`} alt="" />
          </a>
          <div className="flex gap-3 font-manrope ">
          <button className='bg-red-400 text-white px-3 rounded-[5px]' onClick={() => handleDeleteAd(item.id)}>Delete</button>
          <p>{item.type}</p>
          </div>
        </div>
      ))}

      <Dialog open={openDialog} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this ad?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    </div>
  );
}
