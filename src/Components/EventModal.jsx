import React, {Component, Fragment, useState } from 'react';
import {Button, Modal} from 'react-bootstrap';


export function EventModal(props) {

    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        // window.location.reload();
    }
    const handleShow = () => setShow(true);


    const [name, setName ] = useState('')


    const handleSave =(e) =>{
        e.preventDefault()
        // debugger;
        console.log(e.target[0].value)
        const val = e.target[0].value;
        fetch('http://api.my-events.site/api/v1/events/' + props.event.eventId + '/', {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': 'Token 934845d84fdd7b5c3ecf4129e2d8b774d6c84c87',
            },
            body: JSON.stringify({"name": val})
        })
            .then(res=>res.json())
            .then(res => console.log(res))
            .then( n => window.location.reload())
            .catch(e=>console.log(e))
    }

    return (
        <Fragment>
            <Button variant="primary" onClick={handleShow}>
                Edit Event
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={e=>handleSave(e)} >
                        <label>New Event Name: </label>
                        <input style={{width:'100%'}} value={name} onChange={e=>setName(e.target.value)}/>
                        <Button type="submit" variant="primary">
                            Save Event
                        </Button>
                    </form>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
}

