
import { useEffect, useState } from 'react';
import axios from 'axios';

type Headers = {
    Authorization: string;
};

type TasksProps = {
    headers: Headers;
};

export function Tasks({ headers }: TasksProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startAt, setStartAt] = useState('');
    const [endAt, setEndAt] = useState('');
    const [priority, setPriority] = useState('');

    useEffect(() => {
        console.log('Headers:', headers);
    }, [headers]);

    const formatDateTime = (date: string) => {
        const formattedDate = new Date(date);
        const year = formattedDate.getFullYear();
        const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0');
        const day = formattedDate.getDate().toString().padStart(2, '0');
        const hours = formattedDate.getHours().toString().padStart(2, '0');
        const minutes = formattedDate.getMinutes().toString().padStart(2, '0');
        const seconds = formattedDate.getSeconds().toString().padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    };

    const handleLogin = async () => {
        try {
            const formattedStartAt = formatDateTime(startAt);
            const formattedEndAt = formatDateTime(endAt);

            const body = {
                "title": title,
                "description": description,
                "startAt": formattedStartAt,
                "endAt": formattedEndAt,
                "priority": priority
            }

            const response = await axios.post('http://localhost:8080/tasks/', body, {
                headers: headers
            });

            console.log('Response data:', response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <div className="inputData">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label htmlFor="description">Description</label>
                <input
                    type="text"
                    name="description"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <label htmlFor="startAt">Start Date</label>
                <input
                    type="datetime-local"
                    name="startAt"
                    id="startAt"
                    value={startAt}
                    onChange={(e) => setStartAt(e.target.value)}
                />
                <label htmlFor="endAt">End Date</label>
                <input
                    type="datetime-local"
                    name="endAt"
                    id="endAt"
                    value={endAt}
                    onChange={(e) => setEndAt(e.target.value)}
                />
                <label htmlFor="priority">Priority</label>
                <select
                    name="priority"
                    id="priority"
                    onChange={(e) => setPriority(e.target.value)}
                    value={priority}
                >
                    <option value=""></option>
                    <option value="Baixa">Baixa</option>
                    <option value="Média">Média</option>
                    <option value="Alta">Alta</option>
                </select>
            </div>
            <div className="connectButton">
                <button onClick={handleLogin}>Register</button>
            </div>
        </>
    );
}