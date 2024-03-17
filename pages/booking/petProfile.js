import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import React, { useState } from 'react';

const PetProfile = () => {
    const [medicalHistory, setMedicalHistory] = useState(null);

    const handleRadioChange = (event) => {
      setMedicalHistory(event.target.id);
    };

    return (
        <>
            <h1 style={{ textAlign: 'center' }}>Pet Profile</h1>

            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridPetName">
                        <Form.Label>Pet name</Form.Label>
                        <Form.Control placeholder="Enter pet name" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPetAge">
                        <Form.Label>Pet age</Form.Label>
                        <Form.Control type="number" placeholder="Enter pet age" min="0" />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridPetBreed">
                        <Form.Label>What is your pet breed? </Form.Label>
                        <Form.Select defaultValue="Choose...">
                            <option>Choose...</option>
                            <option>...</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPetWeight">
                        <Form.Label>Pet Weight</Form.Label>
                        <Form.Control type="number" placeholder="Pet Weight" />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridPetAggression">
                        <Form.Label>Is your pet aggressive or have a history of aggression with grooming?</Form.Label>
                        <Form.Check
                            type="radio"
                            label="Yes"
                            name="PetAggression"
                            id="yesAggression"
                        />
                        <Form.Check
                            type="radio"
                            label="No   "
                            name="PetAggression"
                            id="noAggression"
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                        <Form.Label>When was your pet last grooming appointment?</Form.Label>
                <Form.Group as={Col} controlId="formGridPetLastAppointment">
                <Form.Check
                            type="radio"
                            label="Less than 1 month ago"
                            name="petLastAppointment"
                            id="1monthAgo"
                        />
                        <Form.Check
                            type="radio"
                            label="Less than 6 months ago"
                            name="petLastAppointment"
                            id="6monthsAgo"
                        />
                        <Form.Check
                            type="radio"
                            label="First time grooming"
                            name="petLastAppointment"
                            id="firstTimeGrooming"
                        />

                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridPetLastAppointment">
                <Form.Check
                            type="radio"
                            label="Less than 3 month ago"
                            name="petLastAppointment"
                            id="3monthAgo"
                        />
                        <Form.Check
                            type="radio"
                            label="More than 6 months ago"
                            name="petLastAppointment"
                            id="moreThan6monthsAgo"
                        />

                    </Form.Group>
                    
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formMedicalHitory">
                        <Form.Label>Any medical history we should be aware of?</Form.Label>
                        <Form.Check
                            type="radio"
                            label="Yes"
                            name="medicalHistory"
                            id="yesHistory"
                            onChange={handleRadioChange}
                        />
                        <Form.Check
                            type="radio"
                            label="No"
                            name="medicalHistory"
                            id="noHistory"
                            onChange={handleRadioChange}
                        />
                         {medicalHistory === 'noHistory' && <Form.Control as="textarea" rows={3} />}
                    </Form.Group>
                </Row>

                <Button variant="primary" type="submit"> Submit </Button>
            </Form>

        </>
    );
}

export default PetProfile;