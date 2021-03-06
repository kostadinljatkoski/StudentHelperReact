import axios from '../custom-axios/axios';

const StaffService = {

    fetchStaffPaged: (pageNumber, pageSize, params) => {
        params.set("page", pageNumber);
        params.set("pageSize", pageSize);
        return axios.get("/api/staffs", {params: params});
    },

    changeStaffImage: (staffId, formData) => {
        return axios.patch(`api/Staff/ChangeImage/${staffId}`, formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
    },

    deleteStaff: (staffId) => {
        return axios.delete(`api/staffs/${staffId}`);
    },

    getStaff: (staffId) => {
        return axios.get(`api/staffs/${staffId}`);
    },

    updateStaff: (staffId, staffData) => {
        return axios.put(`api/staffs/${staffId}`, staffData);
    }

};

export default StaffService;
