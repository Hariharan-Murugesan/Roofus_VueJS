import http from "../http-common";
//import axios from "axios";

class authService {

  register(data) {
    return http.post("/admin/register", data);
  }

  login(data) {
    return http.post("/admin/login", data);
  }

  getHouseList() {
    return http.get("/houses/list");
  }

  getPropertyList() {
    return http.get("/property/getproperties");
  }

  getUserList() {
    return http.get("/user/list");
  }

  addUser(data) {
    return http.post("user/register", data);
  }
  addUserByHouseId(data) {
    return http.post("user/register", data);
  }

  addProperty(data) {
    return http.post("/property/addProperty", data);
  }

  addHouse(data) {
    return http.post("/houses/add", data);
  }

  getUserById(id) {
    return http.get(`/getUserById/${id}`);
  }

  updateUser(data) {
    return http.put(`/user/updateUser`, data);
  }

  deleteUser(id) {
    return http.delete(`/user/delete/${id}`);
  }

  getHouseById(id) {
    return http.get(`/houses/detail/${id}`);
  }

  updateHouse(data, id) {
    return http.put(`/houses/book/${id}`, data);
  }

  deleteHouse(id) {
    return http.delete(`/houses/delete/${id}`);
  }

  getPropertyById(id) {
    return http.get(`/property/getProperty/${id}`);
  }

  updateProperty(data, id) {
    return http.put(`/property/updateProperty/${id}`, data);
  }

  deleteProperty(id) {
    return http.delete(`/property/deleteProperty/${id}`);
  }

  addUserToHouse(id, data) {
    return http.post(`/houses/book/${id}`, data);
  }
  removeUserToHouse(id, data) {
    return http.put(`/houses/unbook/${id}`, data);
  }

  getHouseListById(id) {
    return http.post(`/houses/book/${id}`);
  }

  getUserListByHouseId(houseId) {
    return http.put(`/houses/book/${houseId}`);
  }
  getHouseListByPropertyId(propertyId) {
    return http.get(`/property/detail/${propertyId}`);
  }
}

export default new authService();