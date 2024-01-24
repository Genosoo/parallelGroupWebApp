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
} from '../api/api';

const useFormDataOptions = () => {
  const [memTypeOptions, setMemTypeOptions] = useState([]);
  const [memStatusOptions, setMemStatusOptions] = useState([]);
  const [parallelGroupTypeOptions, setParallerGroupTypeOptions] = useState([]);
  const [regionsOptions, setRegionsOptions] = useState([]);
  const [provinceOptions, setProvinceOptions] = useState([]);
  const [municipalityOptions, setMunicipalityOptions] = useState([]);
  const [brgyOptions, setBrgyOptions] = useState([]);
  const [regTypeOptions, setRegTypeOptions] = useState([]);

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
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };

    fetchData();
  }, []);

  return {
    memTypeOptions,
    memStatusOptions,
    parallelGroupTypeOptions,
    regionsOptions,
    provinceOptions,
    municipalityOptions,
    brgyOptions,
    regTypeOptions,
  };
};

export default useFormDataOptions;
