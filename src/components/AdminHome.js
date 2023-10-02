import React, { useState, useEffect } from 'react';

const AdminHome = () => {
    // Define a state variable 'students' and a function 'setStudents' to update it.
    // Initialize 'students' with an empty array '[]'.
    const [students, setStudents] = useState([]);

    // Define a state variable 'newStudent' and a function 'setNewStudent' to update it.
    // Initialize 'newStudent' with an object containing 'name' and 'grade' properties, both initialized as empty strings.
    const [newStudent, setNewStudent] = useState({
        name: '',
        grade: '',
    });


    useEffect(() => {
        // called once after intial render
        fetchStudents();
        }, [] )


// Function to fetch the list of students from the backend API
    const fetchStudents = async () => {
		//TODO complete this method to fetch students and display list of students
        try {
            // Send a GET request to the '/api/students' endpoint (replace with your actual backend API endpoint)
            const response = await fetch('/api/students');

            // Check if the response status is OK (200)
            if (response.ok) {
                // If the response is successful, parse the JSON data from the response
                const data = await response.json();

                // Update the 'students' state with the received data
                setStudents(data);
            } else {
                // If the response status is not OK, log an error message
                console.error('Failed to fetch students');
            }
        } catch (error) {
            // Handle any errors that occur during the fetch operation
            console.error('Error fetching students:', error);
        }
    };

    // Function to add a new student to the backend API
    const addStudent = async () => {
        try {
            // Send a POST request to the '/api/students' endpoint with JSON data in the request body
            const response = await fetch('/api/students', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newStudent),
            });

            // Check if the response status is OK (200)
            if (response.ok) {
                // If the student is added successfully, fetch the updated list of students
                fetchStudents();

                // Reset the 'newStudent' state to clear the input fields
                setNewStudent({ name: '', grade: '' });
            } else {
                // If the response status is not OK, log an error message
                console.error('Failed to add student');
            }
        } catch (error) {
            // Handle any errors that occur during the addStudent operation
            console.error('Error adding student:', error);
        }
    };
    // Function to update an existing student's data in the backend API
    const updateStudent = async (studentId, updatedStudent) => {
        try {
            // Send a PUT request to the '/api/students/:studentId' endpoint with JSON data in the request body
            const response = await fetch(`/api/students/${studentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedStudent),
            });

            // Check if the response status is OK (200)
            if (response.ok) {
                // If the student is updated successfully, fetch the updated list of students
                fetchStudents();
            } else {
                // If the response status is not OK, log an error message
                console.error('Failed to update student');
            }
        } catch (error) {
            // Handle any errors that occur during the updateStudent operation
            console.error('Error updating student:', error);
        }
    };
    // Function to delete an existing student from the backend API
    const deleteStudent = async (studentId) => {
        try {
            // Send a DELETE request to the '/api/students/:studentId' endpoint
            const response = await fetch(`/api/students/${studentId}`, {
                method: 'DELETE',
            });

            // Check if the response status is OK (200)
            if (response.ok) {
                // If the student is deleted successfully, fetch the updated list of students
                fetchStudents();
            } else {
                // If the response status is not OK, log an error message
                console.error('Failed to delete student');
            }
        } catch (error) {
            // Handle any errors that occur during the deleteStudent operation
            console.error('Error deleting student:', error);
        }
    };


    return (
        <div>
            <div>
                <h3>Student List</h3>
                <ul>
                    {students.map((student) => (
                        <li key={student.id}>
                            {student.name} (Grade: {student.grade})
                            <button onClick={() => updateStudent(student.id, { ...student, grade: 'A' })}>Update</button>
                            <button onClick={() => deleteStudent(student.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>Add New Student</h3>
                <input
                    type="text"
                    placeholder="Name"
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Grade"
                    value={newStudent.grade}
                    onChange={(e) => setNewStudent({ ...newStudent, grade: e.target.value })}
                />
                <button onClick={addStudent}>Add Student</button>
            </div>
        </div>
    );
};

export default AdminHome;