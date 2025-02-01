import React from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Player {
  player_id: number;
  name: string;
  age: number;
  gender: string;
}

interface PlayerListProps {
  playerRecords: Player[];
  setPlayerRecords: React.Dispatch<React.SetStateAction<Player[]>>; // Function to update the player list
}

export const PlayerList: React.FC<PlayerListProps> = ({ playerRecords, setPlayerRecords }) => {
  const navigate = useNavigate();
  const { base_id } = useParams<{ base_id: string }>();
  const playerRecordsLength = playerRecords.length;

  const handleAddPlayerClick = () => {
    navigate(`/playerbases/${base_id}/players/add-player/${playerRecordsLength}`);
  };

  // Navigate to edit page with player ID
  const handleEditPlayerClick = (player_id: number) => () => {
    navigate(`/playerbases/${base_id}/players/edit/${player_id}`);
  };

  // Function to delete a player
  const handleDeletePlayerClick = (player_id: number) => () => {
    setPlayerRecords((prev) => prev.filter((player) => player.player_id !== player_id));
  };

  return (
    <div className="player-list-container">
      <h1 id="page-title" className="content__title">Player List</h1>
      <div className="player-list-buttons">
        <button onClick={handleAddPlayerClick} className="player-list-button">
          Add Player
        </button>
      </div>

      <table className="player-list-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {playerRecords.length > 0 ? (
            playerRecords.map((player) => (
              <tr key={player.player_id}>
                <td>{player.player_id}</td>
                <td>{player.name}</td>
                <td>{player.age}</td>
                <td>{player.gender}</td>
                <td>
                  <button
                    className="table-list-button"
                    onClick={handleEditPlayerClick(player.player_id)}
                  >
                    Edit
                  </button>
                  <button
                    className="table-list-button"
                    onClick={handleDeletePlayerClick(player.player_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>No players added yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
