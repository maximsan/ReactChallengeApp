import React from "react";

import deleteUser from "../../actions/delete";

const baseUrl = "http://localhost:52481";

const ToolBar = ({ user, index, update, data }) => {
  const { Image, Name, Age, Phone } = user;

  const handleDeleteUser = e => {
    e.preventDefault();
    const name = e.target.value;
    const user = data.find(u => {
      // eslint-disable-next-line
      return u.Name == name;
    });
    const newData = data;
    newData.splice(index, 1);
    deleteUser(`${baseUrl}/api/users/${index + 1}`, user)
      .then(result => {
        if (result != undefined || result != null) {
          update({
            data: newData
          });
        }
      })
      .catch(error => console.error("Error:", error))
      .then(response => console.log("Success:", response));
  };

  return (
    <tr onClick={() => update({ activeUser: index })}>
      <td className="image-value">
        <img src={`images/${Image}.svg`} alt={Image} />
      </td>
      <td className="name-value">
        <h4>{Name}</h4>
      </td>
      <td className="age-value">{Age}</td>
      <td className="phone-value">8 {Phone}</td>
      <td>
        <button
          value={Name}
          className="btn btn-warning"
          onClick={e => handleDeleteUser(e)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ToolBar;
