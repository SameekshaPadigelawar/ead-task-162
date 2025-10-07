import React, { useState } from "react";

const PasswordChecker = () => {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState('');

  const evaluateStrength = (password) => {
    if (password.length < 6) return 'Weak';
    if (/^(?=.[a-z])(?=.[A-Z])(?=.*\d).{8,}$/.test(password)) return 'Strong';
    return 'Moderate';
  };

  const handleChange = (e) => {
    const pwd = e.target.value;
    setPassword(pwd);
    setStrength(evaluateStrength(pwd));
  };

  // Inline CSS styles
  const styles = {
    container: {
      maxWidth: "400px",
      margin: "100px auto",
      padding: "30px",
      borderRadius: "15px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
      fontFamily: "Poppins, sans-serif",
      backgroundColor: "#f8f9fa",
    },
    input: {
      width: "90%",
      padding: "10px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      marginBottom: "15px",
      fontSize: "16px",
      outline: "none",
      transition: "border-color 0.3s ease",
    },
    strengthText: (strength) => ({
      fontWeight: "bold",
      color:
        strength === "Strong"
          ? "green"
          : strength === "Moderate"
          ? "orange"
          : "red",
    }),
  };

  return (
    <div style={styles.container}>
      <h2>Password Strength Checker 🔐</h2>
      <input
        type="password"
        value={password}
        onChange={handleChange}
        placeholder="Enter your password"
        style={styles.input}
      />
      <p style={styles.strengthText(strength)}>
        {strength ? "Password Strength : $ {strength}" : "Enter a password to check strength"}
      </p>
    </div>
  );
};

export default PasswordChecker;