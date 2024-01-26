// useFormDataOptions.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  getMembershipType,
  getMembershipStatus,
  getparallerGroupType,
  getRegions,
  getProvince,
  getMunicipality,
  getBrgy,
  getRegType,
  apiBlog,
  apiAds,
  apiAccount,
} from '../api/api';

const useFormDataOptions = () => {
  const [loading, setLoading] = useState(true); // New loading state
  const [memTypeOptions, setMemTypeOptions] = useState([]);
  const [memStatusOptions, setMemStatusOptions] = useState([]);
  const [parallelGroupTypeOptions, setParallerGroupTypeOptions] = useState([]);
  const [regionsOptions, setRegionsOptions] = useState([]);
  const [provinceOptions, setProvinceOptions] = useState([]);
  const [municipalityOptions, setMunicipalityOptions] = useState([]);
  const [brgyOptions, setBrgyOptions] = useState([]);
  const [regTypeOptions, setRegTypeOptions] = useState([]);
  const [blogsData, setBlogsData] = useState([]);
  const [adsData, setAdsData] = useState([]);
  const [accountData, setAccountData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const memTypeResponse = await axios.get(getMembershipType);
        setMemTypeOptions(memTypeResponse.data.success);

        const memStatusResponse = await axios.get(getMembershipStatus);
        setMemStatusOptions(memStatusResponse.data.success);

        const parallelGroupTypeResponse = await axios.get(getparallerGroupType);
        setParallerGroupTypeOptions(parallelGroupTypeResponse.data.success);

        const regionsResponse = await axios.get(getRegions);
        setRegionsOptions(regionsResponse.data.success);

        const provinceResponse = await axios.get(getProvince);
        setProvinceOptions(provinceResponse.data.success);

        const municipalityResponse = await axios.get(getMunicipality);
        setMunicipalityOptions(municipalityResponse.data.success);

        const brgyResponse = await axios.get(getBrgy);
        setBrgyOptions(brgyResponse.data.success);

        const regTypeResponse = await axios.get(getRegType);
        setRegTypeOptions(regTypeResponse.data.success);

        const blogsResponse = await axios.get(apiBlog);
        setBlogsData(blogsResponse.data.success);

        const adsResponse = await axios.get(apiAds);
        setAdsData(adsResponse.data.success);

        const accountResponse = await axios.get(apiAccount);
        setAccountData(accountResponse.data.success);

        setLoading(false); // Update loading state after successful fetch
      } catch (error) {
        console.error('Error fetching options:', error);
        setLoading(false); // Update loading state in case of an error
      }
    };

    fetchData();
  }, [loading]);

  return {
    loading, // Expose loading state
    memTypeOptions,
    memStatusOptions,
    parallelGroupTypeOptions,
    regionsOptions,
    provinceOptions,
    municipalityOptions,
    brgyOptions,
    regTypeOptions,
    blogsData,
    adsData,
    accountData
  };
};

export default useFormDataOptions;
