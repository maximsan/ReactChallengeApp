import React from 'react';
import UserData from '../userData/user_data'

const UserList = ({ data, update, quantity }) => {

    if (!data) {
        return <div>Loading...</div>
    }

    const users = data.map((user, index) => {
        return (
            <UserData data={data} user={user} index={index} update={update} key={`user - ${index}`} />
        )
    });

    return (
        <table className="user-list table table-striped mr-2">
            <thead>
                <tr>
                    <td>Image</td>
                    <td>Name</td>
                    <td>Age</td>
                    <td>Phone</td>
                </tr>
            </thead>
            <tbody>
                {users}
            </tbody>
        </table>
    );
};


export default UserList;