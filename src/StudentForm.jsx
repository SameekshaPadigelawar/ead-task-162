import React, { useState } from 'react';

function StudentForm() {
  const [formData, setFormData] = useState({
    name: '',
    rollno: '',
    gender: '',
    skills: []
  });

  const skillOptions = ['JavaScript', 'React', 'Node.js', 'Python', 'CSS'];

  const handleChange = e => {
    const { name, value, type, checked } = e.target;

    if (name === 'skills') {
      // For checkbox, update array of skills
      if (checked) {
        setFormData(prev => ({
          ...prev,
          skills: [...prev.skills, value]
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          skills: prev.skills.filter(skill => skill !== value)
        }));
      }
    } else {
      // For text inputs and radio buttons
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      alert(data.message || 'Form submitted successfully!');
      setFormData({ name: '', rollno: '', gender: '', skills: [] });
    } catch (error) {
      alert('Error submitting form');
      console.error(error);
    }
  };

  // Styles object (same as before, adjust or add as needed)
  const styles = {
    container: {
      maxWidth: '400px',
      margin: '40px auto',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: '#fff'
    },
    formGroup: {
      marginBottom: '15px',
    },
    label: {
      display: 'block',
      marginBottom: '6px',
      fontWeight: '600',
      color: '#333',
      fontSize: '14px',
    },
    input: {
      width: '100%',
      padding: '10px 12px',
      fontSize: '14px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      boxSizing: 'border-box',
      transition: 'border-color 0.2s ease',
    },
    radioGroup: {
      display: 'flex',
      gap: '15px',
      marginTop: '6px',
    },
    checkboxGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      marginTop: '6px',
    },
    button: {
      width: '100%',
      padding: '12px',
      fontSize: '16px',
      fontWeight: '600',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    }
  };

  const [btnHover, setBtnHover] = useState(false);

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit}>

        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="name">Name:</label>
          <input
            style={styles.input}
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="rollno">Roll No:</label>
          <input
            style={styles.input}
            type="text"
            name="rollno"
            id="rollno"
            value={formData.rollno}
            onChange={handleChange}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Gender:</label>
          <div style={styles.radioGroup}>
            {['Male', 'Female', 'Other'].map(g => (
              <label key={g}>
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={formData.gender === g}
                  onChange={handleChange}
                  required
                />{' '}
                {g}
              </label>
            ))}
          </div>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Skills:</label>
          <div style={styles.checkboxGroup}>
            {skillOptions.map(skill => (
              <label key={skill}>
                <input
                  type="checkbox"
                  name="skills"
                  value={skill}
                  checked={formData.skills.includes(skill)}
                  onChange={handleChange}
                />{' '}
                {skill}
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          style={btnHover ? { ...styles.button, ...styles.buttonHover } : styles.button}
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
        >
          Submit
        </button>

      </form>
    </div>
  );
}

export default StudentForm;
