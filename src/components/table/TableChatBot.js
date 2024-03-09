import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChatHistory = () => {
    const [chatHistory, setChatHistory] = useState([]);
    const [page, setPage] = useState(1); // Número de página actual
    const [searchTerm, setSearchTerm] = useState(''); // Término de búsqueda
    const pageSize = 5; // Tamaño de la página

    const fetchChatHistory = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/GetAllPreguntas/GetAll?page=${page}&pageSize=${pageSize}&search=${searchTerm}`);
            setChatHistory(response.data);
        } catch (error) {
            console.error('Error fetching chat history:', error);
        }
    };

    useEffect(() => {
        fetchChatHistory();
    }, [page, searchTerm]); // Ejecutar fetchChatHistory cuando cambie la página o el término de búsqueda

    const handleNextPage = () => {
        setPage(page + 1);
    };

    const handlePrevPage = () => {
        setPage(Math.max(page - 1, 1)); // Asegurarse de que la página no sea menor que 1
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div>
            <h2 className="text-lg font-medium">Chat Historial</h2>
            <div>
                <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Buscar..." />
            </div>
            {chatHistory.map((chat, index) => (
                <div className="table-flex d-flex mb-3" key={index}>
                    <div className="p-2 w-100">{chat.pregunta}</div>
                    <div className="p-2 flex-shrink-1">
                        <button className="btn" size="small">Responder</button>
                    </div>
                </div>
            ))}
            <button className='btn btn-sm btn-dark me-2' onClick={handlePrevPage} disabled={page === 1}>Anterior</button>
            <button className='btn btn-sm btn-dark' onClick={handleNextPage}>Siguiente</button>
        </div>
    );
};

export default ChatHistory;
