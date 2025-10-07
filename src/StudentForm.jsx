// import React, { useState } from 'react';

// function StudentForm() {
//   const [formData, setFormData] = useState({
//     name: '',
//     rollno: '',
//     gender: '',
//     skills: ''
//   });

//   const handleChange = e => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//  const handleSubmit = async e => {
//   e.preventDefault();

//   // Convert skills string to array
//   const skillsArray = formData.skills
//     .split(',')
//     .map(skill => skill.trim())
//     .filter(skill => skill.length > 0);  // Remove empty strings

//   try {
//     const response = await fetch('http://localhost:5000/students', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ ...formData, skills: skillsArray })  // Send skills as array
//     });

//     const data = await response.json();
//     alert(data.message || 'Form submitted successfully!');
//     setFormData({ name: '', rollno: '', gender: '', skills: '' }); // reset form
//   } catch (error) {
//     alert('Error submitting form');
//     console.error(error);
//   }
// };


//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>Name:</label><br />
//         <input type="text" name="name" value={formData.name} onChange={handleChange} required />
//       </div>

//       <div>
//         <label>Roll No:</label><br />
//         <input type="text" name="rollno" value={formData.rollno} onChange={handleChange} required />
//       </div>

//       <div>
//         <label>Gender:</label><br />
//         <select name="gender" value={formData.gender} onChange={handleChange} required>
//           <option value="">Select Gender</option>
//           <option value="Male">Male</option>
//           <option value="Female">Female</option>
//           <option value="Other">Other</option>
//         </select>
//       </div>

//       <div>
//         <label>Skills (comma separated):</label><br />
//         <input type="text" name="skills" value={formData.skills} onChange={handleChange} />
//       </div>

//       <button type="submit">Submit</button>
//     </form>
//   );
// }

// export default StudentForm;
import React, { useState } from 'react';

function StudentForm() {
  const [formData, setFormData] = useState({
    name: '',
    rollno: '',
    gender: '',
    skills: ''
  });

  const handleChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const skillsArray = formData.skills
      .split(',')
      .map(skill => skill.trim())
      .filter(skill => skill.length > 0);

    try {
      const response = await fetch('http://localhost:5000/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, skills: skillsArray })
      });

      const data = await response.json();
      alert(data.message || 'Form submitted successfully!');
      setFormData({ name: '', rollno: '', gender: '', skills: '' });
    } catch (error) {
      alert('Error submitting form');
      console.error(error);
    }
  };

  // Styles object
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
    inputFocus: {
      borderColor: '#007bff',
      outline: 'none',
    },
    select: {
      width: '100%',
      padding: '10px 12px',
      fontSize: '14px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      boxSizing: 'border-box',
      cursor: 'pointer',
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

  // Handle button hover state
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
          <label style={styles.label} htmlFor="gender">Gender:</label>
          <select
            style={styles.select}
            name="gender"
            id="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="skills">Skills (comma separated):</label>
          <input
            style={styles.input}
            type="text"
            name="skills"
            id="skills"
            value={formData.skills}
            onChange={handleChange}
          />
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
