import { Box, Typography, Button, Modal, TextField, Grid } from '@mui/material';
import { useEffect, useState } from 'react';

const EditAddressModal = ({ open, onClose, addressData, onSave }) => {
  const [formData, setFormData] = useState(addressData);
// console.log(addressData,formData,"EditeData")
useEffect(() => {

setFormData(addressData)
},[addressData])
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="edit-address-modal"
      aria-describedby="edit-address-details"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        height: '80%',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        overflowY: 'auto'
      }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Edit Address
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="firstName"
              label="First Name"
              value={formData?.firstName}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="lastName"
              label="Last Name"
              value={formData?.lastName}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="streetLine1"
              label="Street Address"
              value={formData?.streetLine1}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="streetLine2"
              label="Apartment/Unit/Flat"
              value={formData?.streetLine2}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="city"
              label="City"
              value={formData?.city}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="postalCode"
              label="Postal Code"
              value={formData?.postalCode}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="countryCode"
              label="Country Code"
              value={formData?.countryCode}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="phoneNumber"
              label="Phone Number"
              value={formData?.phoneNumber}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
        </Grid>
        <Button onClick={handleSave} variant="contained" sx={{ mt: 2, backgroundColor: 'red', '&:hover': { backgroundColor: 'darkred' } }}>
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default EditAddressModal;
