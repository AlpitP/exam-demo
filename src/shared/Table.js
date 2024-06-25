import React from "react";

const Table = ({ tableHeadings, children }) => {
  return (
    <div>
      <table>
        <thead>
          {tableHeadings?.map((ele, index) => {
            return <th key={index}>{ele}</th>;
          })}
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default Table;
