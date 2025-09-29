import React from 'react';
import UserRow from './UserRow';
import { tableHeaderStyle, tableCellStyle, noUsersCellStyle } from './styles';

function UserTable({ users, onRefresh }) {
    return (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
                <tr>
                    <th style={tableHeaderStyle}>#ID</th>
                    <th style={tableHeaderStyle}>Név</th>
                    <th style={tableHeaderStyle}>Email</th>
                    <th style={tableHeaderStyle}>Regisztráció</th>
                    <th style={tableHeaderStyle}>Műveletek</th>
                </tr>
            </thead>
            <tbody>
                {users.length > 0 ? (
                    users.map(user => (
                        <UserRow key={user.id} user={user} onRefresh={onRefresh} />
                    ))
                ) : (
                    <tr>
                        <td colSpan="5" style={noUsersCellStyle}>Nincsenek felhasználók.</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default UserTable;
