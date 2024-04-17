import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TableRow from "../../Components/TableRow";
import "./doctorList.css";
import Swal from "sweetalert2";
import { actions } from "../../Store/ScheduleReducer";
import ReactPaginate from "react-paginate";

const DoctorList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const createData = useSelector((state) => state.createData);
  const [patientData, setPatientData] = useState([]);
  const patientsPerPage = 6;
  const pagesVisited = pageNumber * patientsPerPage;

  const displayPatients = patientData
    .slice(pagesVisited, pagesVisited + patientsPerPage)
    .map((item) => {
      return (
        <TableRow
          key={item.id}
          name={item.patient}
          number={item.phone}
          date={item.date}
          issue={item.message}
          doctor={item.doctor}
          id={item.id}
          deleteHandler={() => deleteHandler(item)}
        />
      );
    });

  const pageCount = Math.ceil(patientData.length / patientsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const deleteHandler = (item) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          icon: "success",
        });
        dispatch(actions.deleteData(item.id));
      }
    });
  };

  useEffect(() => {
    if (searchValue !== "") {
      setPatientData(
        createData.filter((item) =>
          item.patient.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    } else {
      setPatientData(createData);
    }
  }, [searchValue, createData]);

  return (
    <div className="total-list">
      <div className="list-middle-section">
        <div className="list-header">
          <button
            onClick={() => {
              navigate("/create");
            }}
          >
            + Add Schedule
          </button>
          <input
            placeholder="Search Patient Name"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className="table-section">
          <table>
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Phone Number</th>
                <th>Doctor's Name</th>
                <th>Date</th>
                <th>Issue</th>
                <th colSpan="2">Actions</th>
              </tr>
            </thead>
            <tbody>{displayPatients}</tbody>
          </table>
          {createData.length === 0 && (
            <div className="no-data-container">
              <p className="no-data">No Data Yet</p>
            </div>
          )}
          <ReactPaginate
            pageCount={pageCount}
            onPageChange={changePage}
            previousLabel={"◄"}
            nextLabel={"►"}
            containerClassName={"pagination"}
            previousLinkClassName={"pagination-arrow"}
            nextLinkClassName={"pagination-arrow"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
          />
        </div>
      </div>
    </div>
  );
};

export default DoctorList;
