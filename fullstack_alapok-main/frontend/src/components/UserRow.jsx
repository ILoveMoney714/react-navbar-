import React, { useState } from 'react';
import axios from 'axios';
import { tableCellStyle, saveButtonStyle, cancelButtonStyle, editButtonStyle, deleteButtonStyle } from './styles';

function UserRow({ user, onRefresh }) {
    const [editing, setEditing] = useState(false);
    const [editedName, setEditedName] = useState(user.name);
    const [editedEmail, setEditedEmail] = useState(user.email);

    const handleDelete = async () => {
        if (!window.confirm(`Biztosan törlöd a(z) ${user.id} ID-jű felhasználót?`)) return;
        await axios.delete(`http://localhost:3001/api/users/${user.id}`);
        onRefresh();
    };

    const handleUpdate = async () => {
        if (!editedName || !editedEmail) return alert("Név és email kötelező!");
        await axios.patch(`http://localhost:3001/api/users/${user.id}`, {
            name: editedName,
            email: editedEmail
        });
        setEditing(false);
        onRefresh();
    };

    return (
        <tr>
            <td style={tableCellStyle}>{user.id}</td>
            {editing ? (
                <>
                    <td style={tableCellStyle}>
                        <input value={editedName} onChange={e => setEditedName(e.target.value)} />
                    </td>
                    <td style={tableCellStyle}>
                        <input value={editedEmail} onChange={e => setEditedEmail(e.target.value)} />
                    </td>
                </>
            ) : (
                <>
                    <td style={tableCellStyle}>{user.name}</td>
                    <td style={tableCellStyle}>{user.email}</td>
                </>
            )}
            <td style={tableCellStyle}>{new Date(user.created_at).toLocaleDateString()}</td>
            <td style={tableCellStyle}>
                {editing ? (
                    <>
                        <button onClick={handleUpdate} style={saveButtonStyle}>Mentés</button>
                        <button onClick={() => setEditing(false)} style={cancelButtonStyle}>Mégse</button>
                    </>
                ) : (
                    <>
                        <button onClick={() => setEditing(true)} style={editButtonStyle}>Szerkesztés</button>
                        <button onClick={handleDelete} style={deleteButtonStyle}>Törlés</button>
                    </>
                )}
            </td>
        </tr>
    );
}

export default UserRow;
