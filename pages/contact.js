import React from "react";
import { Container, Form, Button } from "react-bootstrap";

export default function Contact() {
  return (
    <Container>
      <h1>Contact Us</h1>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicSubject">
          <Form.Label>Subject</Form.Label>
          <Form.Control type="text" placeholder="Subject" />
        </Form.Group>

        <Form.Group controlId="formBasicMessage">
          <Form.Label>Message</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}
