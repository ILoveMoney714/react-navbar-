import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

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
            <td className="table-cell">{user.id}</td>
            {editing ? (
                <>
                    <td className="table-cell">
                        <input value={editedName} onChange={e => setEditedName(e.target.value)} />
                    </td>
                    <td className="table-cell">
                        <input value={editedEmail} onChange={e => setEditedEmail(e.target.value)} />
                    </td>
                </>
            ) : (
                <>
                    <td className="table-cell">{user.name}</td>
                    <td className="table-cell">{user.email}</td>
                </>
            )}
            <td className="table-cell">{new Date(user.created_at).toLocaleDateString()}</td>
            <td className="table-cell">
                {editing ? (
                    <>
                        <button onClick={handleUpdate} className="save-button">Mentés</button>
                        <button onClick={() => setEditing(false)} className="cancel-button">Mégse</button>
                    </>
                ) : (
                    <>
                        <button onClick={() => setEditing(true)} className="edit-button">Szerkesztés</button>
                        <button onClick={handleDelete} className="delete-button">Törlés</button>
                    </>
                )}
            </td>
        </tr>
    );
}

export default UserRow;
