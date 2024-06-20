import React from "react";

const Table = ({ tableHeading, children }) => {
  return (
    <div>
      <table>
        <thead>
          {tableHeading?.map((ele, index) => {
            return <th key={index}>{ele}</th>;
          })}
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default Table;
