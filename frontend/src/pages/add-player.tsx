import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

interface Player {
  player_id: number;
  name: string;
  age: number;
  gender: string;
}

interface AddPlayerProps {
  addPlayer: (newPlayer: Player) => void;
}

export const AddPlayer: React.FC<AddPlayerProps> = ({ addPlayer }) => {
  const navigate = useNavigate();

  const { playerRecordsLength } = useParams<{ playerRecordsLength: string }>();

  const [form, setForm] = useState<Omit<Player, "player_id">>({
    name: "",
    age: 0,
    gender: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "age" ? Number(value) : value,
    }));
  };

  const handleSubmit = () => {
    const newPlayer: Player = { player_id: Number(playerRecordsLength), ...form }; // Generate unique ID
    addPlayer(newPlayer); // Call the parent function to update the state
    navigate("../players"); // Navigate back to the player list
  };

  return (
    <div className="add-player-container">
      <h1 id="page-title" className="content__title">Add Player</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleInputChange}
        />
        <select name="gender" value={form.gender} onChange={handleInputChange}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <button type="button" onClick={handleSubmit}>
          Add Player
        </button>
      </form>
    </div>
  );
};
