import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import { searchEntities } from '../api/api.js' 

const SearchEntitiesForm = (props) => {
    const [entity, setEntity] = useState('');
    const [language, setLanguage] = useState('en');
    const [showAlert, setShowAlert] = useState(false);
    const [alertText, setAlertText] = useState('');

    const search = async () => {
        if (!entity) {
            setAlertText('Entity field cannot be empty!');
            setShowAlert(true);
        } else {
            setShowAlert(false);
            try {
                const result =  await searchEntities(entity, language);
                props.onSearch(result);
            } catch (error) {
                setAlertText(error.message);
                setShowAlert(true);
            }
        }
    };

    // Prevent enter from refreshing the page, make it search the entity instead.
    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            search();
        }
    };

    return (
        <div>
            <Alert color='danger' isOpen={showAlert} toggle={() => setShowAlert(false)}>{alertText}</Alert>
            <Form>
                <FormGroup>
                    <Label for='search'>Entity</Label>
                    <Input placeholder='What entity do you want to search for?' onChange={event => setEntity(event.target.value)} onKeyDown={handleKeyDown}></Input>
                </FormGroup>
                <FormGroup>
                    <Label for='language'>Language</Label>
                    <Input type='select' name='select' onChange={event => setLanguage(event.target.value)}>
                        <option>en</option>
                        <option>pl</option>
                    </Input>
                </FormGroup>
            </Form>
            <Button color='primary' onClick={search} block>Search</Button>
        </div>
    );
};

export default SearchEntitiesForm;