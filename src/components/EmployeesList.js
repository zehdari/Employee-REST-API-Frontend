import React, { useState, useEffect, Fragment } from "react";
import EmployeeDataService from "../services/EmployeeService";
import { HomeHeading } from "./Headings/HomeHeading";
import Pagination from "@material-ui/lab/Pagination";

const EmployeesList = () => {
  const [employees, setEmployees] = useState([]);
  const [currentEmployee, setCurrentEmployee] = useState(null);

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const getRequestParams = (searchName, page, pageSize) => {
    let params = {};

    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  };

  const retrieveEmployees = () => {
    EmployeeDataService.list()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    retrieveEmployees()
  }, [])

  const refreshList = () => {
    retrieveEmployees();
    setCurrentEmployee(null);
  };

  const updateStatus = status => {

    let data = {
      id: status.id,
      name: status.name,
      email: status.email,
      phone: status.phone,
      address: status.address,
      status: 'Inactive'
    };

    status.status === 'Active' ?
      EmployeeDataService.deactivate(data.id, data)
        .then(response => {
          setCurrentEmployee({ ...currentEmployee, status: status });
          console.log(response.data);
          refreshList()
        })
        .catch(e => {
          console.log(e);
        })
      :
      EmployeeDataService.activate(data.id, data)
        .then(response => {
          setCurrentEmployee({ ...currentEmployee, status: status });
          console.log(response.data);
          refreshList()
        })
        .catch(e => {
          console.log(e);
        });
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Fragment>
      <HomeHeading />
      <div>
                    <Pagination
                      className="my-3"
                      count={5}
                      page={1}
                      siblingCount={1}
                      boundaryCount={1}
                      variant="outlined"
                      shape="rounded"
                      onChange={handlePageChange}
                    />
                  </div>
      <div className="mt-3 container-fluid">
        <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="align-middle inline-block min-w-full shadow-md overflow-hidden sm:rounded-lg border-b border-gray-200">
            {employees.length > 0 ?
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Name
                </th>
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Email
                </th>
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Phone
                </th>
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Address
                </th>
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Status
                </th>
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
                  </tr>
                </thead>
                <Fragment>
                  {employees.map(employee => (
                    <tbody key={employee.id} className="bg-white">
                      <tr >
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                          {employee.name}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                          {employee.email}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                          {employee.phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                          {employee.address}
                        </td>
                        {employee.status === 'Active' ?
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-blue-500">
                            Active
                              </td>
                          :
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                            Inactive
                              </td>
                        }
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                          {employee.status === 'Active' ?
                            <button onClick={() => { if (window.confirm('Are you sure you want to deactivate this employee?')) updateStatus(employee) }} className="whitespace-no-wrap bd-gray-300 hover:bg-gray-200 text-gray-800 font-semibold mr-3 py-2 px-2 rounded-full inline-flex items-center align-middle focus:outline-none">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff4d4d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus-circle"><circle cx="12" cy="12" r="10"></circle><line x1="8" y1="8" x2="16" y2="16"></line><line x1="8" y1="16" x2="16" y2="8"></line></svg>
                            </button>
                            :
                            <button onClick={() => updateStatus(employee)} className="bd-gray-300 hover:bg-gray-200 text-gray-800 font-semibold mr-3 py-2 px-2 rounded-full inline-flex items-center align-middle focus:outline-none">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0A3ACA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                            </button>
                          }
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </Fragment>
              </table> : <p className="text-center bg-gray-100 text-gray-500 py-5">No data</p>}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EmployeesList;
