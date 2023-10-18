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

    const handleClickOpen = () => {
        setStudent({ name: '', email: '' });
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
        // Send a POST request to the '/api/students' endpoint with JSON data in the request body
        fetch(`${SERVER_URL}/student`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(student),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('data-message' + data.message);
                // Close the dialog after adding the student
                handleClose();
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
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button id="add" color="primary" onClick={addStudent}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddStudent;
