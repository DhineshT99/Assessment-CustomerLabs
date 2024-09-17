import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';

const schemaOptions = [
  { label: 'First Name', value: 'first_name' },
  { label: 'Last Name', value: 'last_name' },
  { label: 'Gender', value: 'gender' },
  { label: 'Age', value: 'age' },
  { label: 'Account Name', value: 'account_name' },
  { label: 'City', value: 'city' },
  { label: 'State', value: 'state' },
];

const PopupDialog = ({ open, onClose, onSave }) => {
  const [segmentName, setSegmentName] = useState('');
  const [selectedSchema, setSelectedSchema] = useState('');
  const [schemas, setSchemas] = useState([]);
  const [availableSchemas, setAvailableSchemas] = useState(schemaOptions);

  const handleSaveSegment = async () => {
    const data = {
      segment_name: segmentName,
      schema: schemas
    };

    console.log('Saving segment data:', data);

    try {
      await axios.post('https://webhook.site/fa1c739c-a4aa-4af6-b598-f5f494de5a7f',
         data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Segment saved successfully!');
      alert('Segment saved successfully!');
      onSave(segmentName, schemas);
    } catch (error) {
      console.error('Error saving segment:', error);
      alert('Failed to save segment');
    }

    onClose();
  };

  const handleAddSchema = () => {
    const schema = schemaOptions.find(option => option.value === selectedSchema);
    if (schema) {
      setSchemas(prevSchemas => {
        const updatedSchemas = [...prevSchemas, schema];
        setAvailableSchemas(schemaOptions.filter(option => !updatedSchemas.some(s => s.value === option.value)));
        return updatedSchemas;
      });
      setSelectedSchema(''); // Clear the selected schema after adding
    } else {
      console.log('No schema selected to add.');
    }
  };

  const handleChangeSchema = (index, newValue) => {
    setSchemas(prevSchemas => {
      const updatedSchemas = prevSchemas.map((schema, i) => (i === index ? newValue : schema));
      setAvailableSchemas(schemaOptions.filter(option => !updatedSchemas.some(schema => schema.value === option.value)));
      return updatedSchemas;
    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Save Segment</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Segment Name"
          type="text"
          fullWidth
          variant="outlined"
          value={segmentName}
          onChange={(e) => setSegmentName(e.target.value)}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel>Add schema to segment</InputLabel>
          <Select
            value={selectedSchema}
            onChange={(e) => setSelectedSchema(e.target.value)}
            label="Add schema to segment"
          >
            {availableSchemas.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="outlined" onClick={handleAddSchema}>
          + Add New Schema
        </Button>
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#e3f2fd', borderRadius: '4px' }}>
          {schemas.map((schema, index) => (
            <FormControl fullWidth margin="dense" key={index}>
              <InputLabel>Schema</InputLabel>
              <Select
                value={schema.value}
                onChange={(e) => {
                  const schema = schemaOptions.find(option => option.value === e.target.value);
                  handleChangeSchema(index, schema);
                }}
              >
                {schemaOptions
                  .filter(option => !schemas.some(s => s.value === option.value))
                  .map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          ))}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSaveSegment} color="primary">
          Save Segment
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopupDialog;
