import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import UserForm from './components/UserForm';
import UserTable from './components/UserTable';
import './App.css';

function App() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:3001/api/users');
            setUsers(response.data);
            setError(null);
        } catch (err) {
            setError("Nem sikerült betölteni az adatokat.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return <div className="App"><p>Adatok betöltése...</p></div>;
    if (error) return <div className="App"><p style={{ color: 'red' }}>{error}</p></div>;

    return (
        <div className="App">
            <Navbar />
            <h1>Felhasználókezelő (Full-Stack CRUD)</h1>
            <div id="add-user">
                <UserForm onUserAdded={fetchData} />
            </div>
            <hr />
            <div id="list-users">
                <UserTable users={users} onRefresh={fetchData} />
            </div>
        </div>
    );
}

export default App;
