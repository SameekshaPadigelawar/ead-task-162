 import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // Import the CSS

export default function App() {
  const [form, setForm] = useState({
    name: "",
    roll: "",
    gender: "",
    skills: [],
  });

  const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({
        ...prev,
        skills: checked
          ? [...prev.skills, value]
          : prev.skills.filter((s) => s !== value),
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/api/students`, form);
      alert("Saved ✅");
      setForm({ name: "", roll: "", gender: "", skills: [] });
    } catch (err) {
      console.error(err);
      alert("Error saving — check console.");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Student Form</h2>

        <label>
          Name
          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
        </label>

        <label>
          Roll Number
          <input
            type="text"
            name="roll"
            required
            value={form.roll}
            onChange={handleChange}
            placeholder="Enter roll number"
          />
        </label>

        <div className="gender-group">
          <label>Gender</label>
          <div className="radio-group">
            {["Male", "Female", "Other"].map((g) => (
              <label key={g}>
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={form.gender === g}
                  onChange={handleChange}
                />
                {g}
              </label>
            ))}
          </div>
        </div>

        <div className="skills-group">
          <label>Skills</label>
          <div className="checkbox-group">
            {["React", "Node", "MongoDB", "CSS"].map((s) => (
              <label key={s}>
                <input
                  type="checkbox"
                  value={s}
                  checked={form.skills.includes(s)}
                  onChange={handleChange}
                />
                {s}
              </label>
            ))}
          </div>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
