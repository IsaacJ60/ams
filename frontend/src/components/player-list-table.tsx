import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PageLayout } from "./page-layout";

interface Player {
    player_id: number;
    name: string;
    age: number;
    gender: string;
}

export const PlayerListTable: React.FC = () => {
    const { base_id } = useParams<{ base_id: string }>();
    console.log("BASE_ID:", base_id);

    const navigate = useNavigate();

    // Initialize state as an array of Player objects
    const [data, setData] = useState<Player[]>([
        // Example dummy data

    ]);

    const handleEditPlayer = (player_id: number) => {
        console.log("Edit Player with ID:", player_id);
        // Navigate to edit page or perform edit functionality
    };

    const handleDeletePlayer = (player_id: number) => {
        console.log("Delete Player with ID:", player_id);
        // Update the state to remove the player
        setData(data.filter((player) => player.player_id !== player_id));
    };

    return (
    <table className="player-list-table">
        <thead>
            <tr>
                <th>Player ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {data.length > 0 ? (
                data.map((val) => (
                    <tr className="table-row" key={val.player_id}>
                        <td>{val.player_id}</td>
                        <td>{val.name}</td>
                        <td>{val.age}</td>
                        <td>{val.gender}</td>
                        <td>
                            <button
                                className="table-list-button"
                                onClick={() =>
                                    handleEditPlayer(val.player_id)
                                }
                            >
                                Edit
                            </button>
                            <button
                                className="table-list-button"
                                onClick={() =>
                                    handleDeletePlayer(val.player_id)
                                }
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={5}>No players found.</td>
                </tr>
            )}
        </tbody>
    </table>
    );
};
