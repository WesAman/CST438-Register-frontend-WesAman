import React, { useState, useEffect } from 'react';
import AddStudent from './AddStudent';
import EditStudent from './EditStudent';
import {SERVER_URL} from '../constants';
// import editStudent from "./EditStudent";

function setMessage(s) {
    console.log("hello")
}

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
    const fetchStudents = () => {
        // //TODO complete this method to fetch students and display list of students
        fetch(`${SERVER_URL}/student`).then((response)=>response.json())
            .then((data)=>setStudents(data))
        //go to url -> give me json -> turn me into data, then with this data -> take info (react hook) and update this variable w/ this setter

            .catch((err) =>  { console.log("fetch error "+err); } );
        //use this to catch any errors found within accessing the data when updating variables
        console.log("students have been fetched");
    };

    useEffect(fetchStudents, []);


    const refreshStudents = () => {
        setMessage('');
        fetchStudents();
    }
    const deleteStudent = (event) => {
        const row_id = event.target.parentNode.parentNode.rowIndex - 1;
        console.log("deleteStudent " + row_id);
        const studentId = students[row_id].studentId;
        console.log("student_id " + studentId);

        // Trigger the built-in browser confirmation dialog
        const confirmation = window.confirm('Are you sure you want to delete this student?');
        if (confirmation) {
            fetch(`${SERVER_URL}/student/${studentId}`, {
                method: 'DELETE',
            })
                .then((response) => {
                    if (response.ok) {
                        setMessage('Student deleted.');
                        fetchStudents();
                    }
                })
                .catch((err) =>  { setMessage('Error. ' + err) } );
        }
    }




    const headers = ['ID', 'NAME', 'EMAIL', 'STATUSCODE', 'STATUS'];
    // fix add and edit student objects
    // prof wants me to have my fetch methods in add student for add students, and edit students in the edit_students.js
    return (
        <div>
            <div>
                <h3>Student List</h3>
                <table className="Center">
                    <thead>
                    <tr>
                        {headers.map((s, idx) => (<th key={idx}>{s}</th>))}
                    </tr>
                    </thead>
                    <tbody>
                    {students.map((row, idx) => (
                        <tr key={idx}>
                            <td>{row.studentId}</td>
                            <td>{row.name}</td>
                            <td>{row.email}</td>
                            <td>{row.statusCode}</td>
                            <td>{row.status}</td>
                            <td>
                                <button id="DeleteStudentButton" type="button" margin="auto" onClick={deleteStudent}>
                                    Delete
                                </button>
                            </td>
                            <td>
                                <EditStudent student={students[idx]} onClose={fetchStudents} />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
               {/* component file: (like an object)*/}

               <AddStudent onClose = {fetchStudents}/>

            </div>

        </div>
    );
};

export default AdminHome;



// Function to delete an existing student from the backend API