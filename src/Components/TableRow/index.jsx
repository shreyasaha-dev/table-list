import React from "react";
import "./tableRow.css";
import { MdOutlineEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { useNavigate } from "react-router-dom";
import moment from "moment";
const TableRow = ({ name, number, date, issue, doctor, id, deleteHandler }) => {
  const navigate = useNavigate();
  return (
    <tr className="total-row">
      <td data-tooltip-id="name" data-tooltip-content={name}>
        {name}
      </td>
      <td data-tooltip-id="number" data-tooltip-content={number}>
        {number}
      </td>
      <td data-tooltip-id="doctor" data-tooltip-content={doctor}>
        {doctor}
      </td>
      <td data-tooltip-id="date" data-tooltip-content={date}>
        {moment(date).format("DD-MM-YYYY")}
      </td>
      <td data-tooltip-id="comment" data-tooltip-content={issue}>
        {issue}
      </td>
      <td>
        <button
          className="edit"
          onClick={() => {
            navigate(`/edit/${id}`);
          }}
        >
          <MdOutlineEdit />
        </button>
        <button className="delete" onClick={deleteHandler}>
          <MdDeleteOutline />
        </button>
      </td>
      <ReactTooltip id="name" place="bottom" content={name} />
      <ReactTooltip id="number" place="bottom" content={number} />
      <ReactTooltip id="doctor" place="bottom" content={doctor} />
      <ReactTooltip id="date" place="bottom" content={date} />
      <ReactTooltip id="comment" place="bottom" content={issue} />
    </tr>
  );
};

export default TableRow;
