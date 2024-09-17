// src/App.js
import React, { useState } from 'react';
import { Button } from '@mui/material';
import PopupDialog from './components/Popup';

const App = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [schemas, setSchemas] = useState([]);
  const [segmentName, setSegmentName] = useState('');

  const schemaOptions = [
    { label: 'First Name', value: 'first_name' },
    { label: 'Last Name', value: 'last_name' },
    { label: 'Gender', value: 'gender' },
    { label: 'Age', value: 'age' },
    { label: 'Account Name', value: 'account_name' },
    { label: 'City', value: 'city' },
    { label: 'State', value: 'state' }
  ];

  const handleSaveSegment = () => {
    setIsPopupOpen(true);
  };

  const handlePopupSave = (name, newSchemas) => {
    setIsPopupOpen(false);
    setSegmentName(name);
    setSchemas(newSchemas);
    console.log({
      segment_name: name,
      schema: newSchemas
    });

    try {
      fetch('https://webhook.site/fa1c739c-a4aa-4af6-b598-f5f494de5a7f', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          segment_name: name,
          schema: newSchemas
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => console.log('Response Data:', data))
      .catch(error => console.error('Error sending data:', error));
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSaveSegment}
      >
        Save Segment
      </Button>
      {isPopupOpen && (
        <PopupDialog
          open={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          onSave={handlePopupSave}
        />
      )}
    </div>
  );
};

export default App;
