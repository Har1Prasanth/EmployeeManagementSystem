import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/employees";

export const listEmployee = () => {
  return axios.get(REST_API_BASE_URL);
};

export const createEmployee = (employee) => {
  return axios.post(REST_API_BASE_URL, employee);
};

export const getEmployee = (employeeId) => {
  return axios.get(REST_API_BASE_URL + "/" + employeeId);
};

export const updateEmployee = (employeeId, employee) => {
  return axios.put(REST_API_BASE_URL + "/" + employeeId, employee);
};

export const deleteEmployee = (employeeId) => {
  return axios.delete(REST_API_BASE_URL + "/" + employeeId);
};
