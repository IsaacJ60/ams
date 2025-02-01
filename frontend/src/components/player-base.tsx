import React from "react";
import { useNavigate } from "react-router-dom";

export const PlayerBase: React.FC = () => {
    const base_data = [
        { title: "Player Base 1", base_id: 1 },
        { title: "Player Base 2", base_id: 2 },
        { title: "Player Base 3", base_id: 3 },
    ];

    const navigate = useNavigate(); // Hook to programmatically navigate

    const handleClick = (base_id: number) => {
        navigate(`/playerbases/${base_id}`); // Navigate to the appropriate route
    };

    return (
        <div className="project-grid">
            {base_data.map((item) => (
                <button
                    onClick={() => handleClick(item.base_id)} // Navigate with the id
                    className="project-card"
                    key={item.base_id}
                >
                    <h3>{item.title}</h3>
                    <p>base_id: {item.base_id}</p>
                </button>
            ))}
        </div>
    );
};
