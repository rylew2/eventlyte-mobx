import React, {Component} from 'react';
import {Card, Row, Col} from 'react-bootstrap';
import {EventModal} from './EventModal';

const pStyle = {fontSize:'12px'}

class MyCard extends Component{
    render() {
        let {data} = this.props;
        console.log(this.props.data)
        // debugger;
        if (this.props.data && this.props.data.length > 0) {
            // debugger;
            const cols = this.props.data.map(
                (item, idx) => (
                    // debugger;
                    <Col key={idx} className='MyCardCol' >
                        <Card style={{height:'500px'}}>
                            <Card.Img variant="top" src={item.logo}/>
                            <Card.Body>
                                <Card.Title>
                                    <a style={{cursor:'pointer !important'}} href={item.uri} target="_blank">{item.event}</a> <br />
                                    <br /><span style={pStyle}>Organizer: {item.organizer}</span>
                                    <br /><span style={pStyle}>Ticket Price: {item.minTicketPrice} - {item.maxticketPrice}</span>
                                    <br /><span style={pStyle}>Date: {item.startTime} </span>

                                </Card.Title>
                                <EventModal event={item} />
                            </Card.Body>
                        </Card>
                    </Col>
                )
            );

            const noRows = Math.ceil(this.props.data.length / 4);
            const rows =
                Array.from(Array(noRows)).map(
                (n, i) => (
                    <Row key={i} className='MyCardRow' style={{margin:'10px'}} >
                        {cols.slice(i * 4, (i + 1) * 4)}
                    </Row>
                )
            );
            return (
                rows
            );


        } else {
            return null
        }
    }


}

export default MyCard;