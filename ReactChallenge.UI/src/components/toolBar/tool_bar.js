import React from "react";

export default ({ data, isSorted, initilData, update }) => {
  const sort = type => {
    const issorted = isSorted[type];

    let direction = issorted ? 1 : -1;

    let sorted = data.slice().sort((a, b) => {
      if (a[type] === b[type]) return 0;
      return a[type] > b[type] ? direction : direction * -1;
    });

    if (type === "Name") {
      const newSorted = Object.assign(
        {},
        { Name: !isSorted["Name"], Age: isSorted["Age"] }
      );
      update({
        activeUser: 0,
        data: sorted,
        isSorted: newSorted
      });
    }

    if (type === "Age") {
      const newSorted = Object.assign(
        {},
        { Name: isSorted["Name"], Age: !isSorted["Age"] }
      );
      update({
        activeUser: 0,
        data: sorted,
        isSorted: newSorted
      });
    }
  };

  return (
    <div className="container-fluid">
      <div className="row pl-3 mt-4 sorted-buttons">
        <button
          className="btn btn-default text-uppercase mb-2 sort-button-name"
          onClick={() => {
            sort("Name");
          }}
        >
          <i
            className={
              isSorted.Name ? "fa fa-sort-alpha-desc" : "fa fa-sort-alpha-asc"
            }
          />
          Sort Names
        </button>
        <button
          className="btn btn-default mr-2 text-uppercase sort-button-age"
          onClick={() => {
            sort("Age");
          }}
        >
          <i
            className={
              isSorted.Age
                ? "fa fa-sort-numeric-desc"
                : "fa fa-sort-numeric-asc"
            }
          />
          Sort Ages
        </button>
      </div>
    </div>
  );
};
