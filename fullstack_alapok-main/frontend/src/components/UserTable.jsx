import React from 'react';
import UserRow from './UserRow';
import './styles.css';

function UserTable({ users, onRefresh }) {
    return (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
                <tr>
                    <th className="table-header">#ID</th>
                    <th className="table-header">Név</th>
                    <th className="table-header">Email</th>
                    <th className="table-header">Regisztráció</th>
                    <th className="table-header">Műveletek</th>
                </tr>
            </thead>
            <tbody>
                {users.length > 0 ? (
                    users.map(user => (
                        <UserRow key={user.id} user={user} onRefresh={onRefresh} />
                    ))
                ) : (
                    <tr>
                        <td colSpan="5" className="no-users-cell">Nincsenek felhasználók.</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default UserTable;
