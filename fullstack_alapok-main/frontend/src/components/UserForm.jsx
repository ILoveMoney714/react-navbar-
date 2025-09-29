import React, { useState } from 'react';
import axios from 'axios';

function UserForm({ onUserAdded }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email) return alert("Név és email kötelező!");
        try {
            await axios.post('http://localhost:3001/api/users', { name, email });
            setName('');
            setEmail('');
            onUserAdded();
        } catch (err) {
            alert("Hiba történt a hozzáadáskor.");
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '30px', border: '1px solid #ccc', padding: '15px' }}>
            <h2>Új felhasználó hozzáadása</h2>
            <input type="text" placeholder="Név" value={name} onChange={e => setName(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <button type="submit">Hozzáadás</button>
        </form>
    );
}

export default UserForm;
