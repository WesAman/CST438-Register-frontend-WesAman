import React, { useState } from 'react';
import { SERVER_URL } from '../constants';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function AddStudent(props) {
    const [open, setOpen] = useState(false);
    const [student, setStudent] = useState({ name: '', email: '' });
    const [successMessage, setSuccessMessage] = useState('');

    const handleClickOpen = () => {
        setStudent({ name: '', email: '' });
        setSuccessMessage('');
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        props.onClose();
    };

    const handleChange = (event) => {
        setStudent({ ...student, [event.target.name]: event.target.value });
    };

    const addStudent = () => {
        fetch(`${SERVER_URL}/student`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(student),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message) {
                    setSuccessMessage(data.message); // Set success message received from the server
                } else {
                    setSuccessMessage('Student added successfully.'); // Default success message
                }
                // Close the dialog after adding the student
                handleClose();
            })
            .catch((error) => {
                console.error('Error adding student:', error);
                setSuccessMessage('Error adding student. Please try again.'); // Set error message if request fails
            });
    };

    return (
        <div>
            <Button id="addCourse" variant="outlined" color="primary" style={{ margin: 10 }} onClick={handleClickOpen}>
                Add Student
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Student</DialogTitle>
                <DialogContent style={{ paddingTop: 20 }}>
                    <TextField autoFocus fullWidth label="Name" name="name" onChange={handleChange} />
                    <TextField autoFocus fullWidth label="Email" name="email" onChange={handleChange} />
                    {successMessage && <div style={{ color: 'green', marginTop: '10px' }}>{successMessage}</div>}
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button id="AddStudentButton" color="primary" onClick={addStudent}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddStudent;
