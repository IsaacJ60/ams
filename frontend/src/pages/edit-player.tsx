import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Player {
  player_id: number;
  name: string;
  age: number;
  gender: string;
}

interface EditPlayerProps {
  data: Player[];
  updatePlayer: (updatedPlayer: Player) => void;
}

export const EditPlayer: React.FC<EditPlayerProps> = ({ data, updatePlayer }) => {
  const { player_id } = useParams<{ player_id: string }>();
  const navigate = useNavigate();

  // Find the player to edit
  const existingPlayer = data.find((player) => player.player_id === Number(player_id));

  // State for player form
  const [player, setPlayer] = useState<Player | null>(null);

  // Populate the form when the component mounts
  useEffect(() => {
    if (existingPlayer) {
      setPlayer(existingPlayer);
    }
  }, [existingPlayer]);

  if (!player) {
    return <h2>Player not found!</h2>;
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePlayer(player); // Update the player data
    navigate(-1); // Go back to the player list
  };

  return (
    <div>
      <h2>Edit Player</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={player.name}
            onChange={(e) => setPlayer({ ...player, name: e.target.value })}
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            value={player.age}
            onChange={(e) => setPlayer({ ...player, age: Number(e.target.value) })}
          />
        </label>
        <label>
          Gender:
          <select
            value={player.gender}
            onChange={(e) => setPlayer({ ...player, gender: e.target.value })}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </label>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};
