import http from "../http-common";

const list = (params) => {
  return http.get("/employees/", { params });
};

const create = data => {
  return http.post("/employees/", data);
};

const activate = (id, data) => {
  return http.patch(`/employees/${id}/`, data);
};

const deactivate = id => {
  return http.delete(`/employees/${id}/`);
};

export default {
  list,
  create,
  activate,
  deactivate
};
