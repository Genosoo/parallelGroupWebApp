// apiUrls.js
export const baseUrl = import.meta.env.VITE_URL;

export const loginUrl = `${baseUrl}/api/login/`;
export const logoutUrl = `${baseUrl}/api/logout/`;
export const signupUrl = `${baseUrl}/api/signup/`;

export const apiAccount = `${baseUrl}/api/my_account/`;
export const apiUser = `${baseUrl}/api/individual/`;

export const apiDashboard = `${baseUrl}/api/dashboard_summary/`;
export const apiRoles = `${baseUrl}/api/roles/`;

export const apiBlog = `${baseUrl}/api/blogs/`;

export const getFileCsv = `${baseUrl}/api/individual/export/csv/`;
export const getFileExcel = `${baseUrl}/api/individual/export/excel/`;

export const getPrefix = `${baseUrl}/api/user_prefix/`;
export const getSuffix = `${baseUrl}/api/user_suffix/`;
export const getOccupation = `${baseUrl}/api/user_occupation/`;
export const getRegions = `${baseUrl}/api/region/`;
export const getProvince = `${baseUrl}/api/province/`;
export const getMunicipality = `${baseUrl}/api/municipality/`;
export const getBrgy = `${baseUrl}/api/barangay/`;
export const getMembershipType = `${baseUrl}/api/user_membership_type/`;
export const getPosition = `${baseUrl}/api/position/`;
export const getMembershipStatus = `${baseUrl}/api/parallel_group_membership_status/`;
export const getRegType =`${baseUrl}/api/parallel_group_registration_type/`


export const getparallerGroupType = `${baseUrl}/api/parallel_group_type/`;
export const getParallelGroup = `${baseUrl}/api/parallel_group/`;
export const apiParallelGroup = `${baseUrl}/api/parallel_group/`;
