import Form from 'react-bootstrap/Form';

function SwitchExample() {
  return (
    <Form>
      <Form.Check 
        type="switch"
        id="custom-switch"
      />
    </Form>
  );
}

export default SwitchExample;