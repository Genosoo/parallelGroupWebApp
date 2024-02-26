export const baseUrl = import.meta.env.VITE_URL;

// AUTH API
export const loginUrl = `${baseUrl}/api/login/`;
export const logoutUrl = `${baseUrl}/api/logout/`;
export const signupUrl = `${baseUrl}/api/signup/`;
export const getCsrfTokenUrl = `${baseUrl}/api/csrf_cookie/`;



// BLOG AND ADVERTISEMENT
export const apiBlog = `${baseUrl}/api/blogs/`;
export const apiAds= `${baseUrl}/api/ads/`;

// FORM API
export const getOccupation = `${baseUrl}/api/user_occupation/`;
export const getRegions = `${baseUrl}/api/region/`;
export const getProvince = `${baseUrl}/api/province/`;
export const getMunicipality = `${baseUrl}/api/municipality/`;
export const getBrgy = `${baseUrl}/api/barangay/`;
export const getPosition = `${baseUrl}/api/position/`;


// USER API
export const apiDashboard = `${baseUrl}/api/dashboard_summary/`;
export const apiAccount = `${baseUrl}/api/my_account/`;
export const apiUser = `${baseUrl}/api/individual/`;
export const apiRoles = `${baseUrl}/api/roles/`;
export const getPoints = `${baseUrl}/api/my_activity_points/`
export const getMembershipType = `${baseUrl}/api/user_membership_type/`;
export const getMemberStatus = `${baseUrl}/api/user_membership_status/`
export const getPrefix = `${baseUrl}/api/user_prefix/`;
export const getSuffix = `${baseUrl}/api/user_suffix/`;
export const getFileCsvMember = `${baseUrl}/api/individual/export/csv/`;
export const getFileExcelMember = `${baseUrl}/api/individual/export/excel/`;



// PARALLEL GROUP API
export const getFileCsvParallel = `${baseUrl}/api/parallel_group/export/csv/`;
export const getFileExcelParallel = `${baseUrl}/api/parallel_group/export/excel/`;
export const getMembershipStatus = `${baseUrl}/api/parallel_group_membership_status/`;
export const getparallerGroupType = `${baseUrl}/api/parallel_group_type/`;
export const getParallelGroup = `${baseUrl}/api/parallel_group/`;
export const apiParallelGroup = `${baseUrl}/api/parallel_group/`;
export const getRegType =`${baseUrl}/api/parallel_group_registration_type/`




// NOTIFICATION API
export const getNotification = `${baseUrl}/api/notifications/`
export const apiNotificationMark = `${baseUrl}/api/notifications/mark_all_as_read`


// INCIDENT API
export const apiIncident = `${baseUrl}/api/incident/`
export const apiIncidentSeverity = `${baseUrl}/api/incident_severity/`
export const apiIncidentType = `${baseUrl}/api/incident_type/`
export const apiIncidentStatus = `${baseUrl}/api/incident_status/`


export const getqrCode =`${baseUrl}/api/qr_code/generate/Individual`

// WATCH NOW API
// URL:[BASE_URL]/api/player/[VIEWER_CODE_ID]/
export const apiWatchNow =`${baseUrl}/api/player/`