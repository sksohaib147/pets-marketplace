import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  Tooltip,
  Switch,
  FormControlLabel,
  Grid,
  Card,
  CardMedia,
  CardContent
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  CheckCircle as ApproveIcon,
  Block as RejectIcon,
  Add as AddIcon
} from '@mui/icons-material';
import api from '../../utils/api';

const ListingsManagement = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [products, setProducts] = useState([]);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    description: '',
    priceUSD: '',
    category: '',
    stock: '',
    status: 'available'
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');
      
      const [productsResponse, petsResponse] = await Promise.all([
        api.get('/products'),
        api.get('/pets')
      ]);
      
      setProducts(productsResponse);
      setPets(petsResponse);
    } catch (err) {
      setError('Failed to load listings');
      console.error('Error fetching listings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditItem = (item, type) => {
    setSelectedItem({ ...item, type });
    setEditForm({
      name: item.name,
      description: item.description,
      priceUSD: type === 'product' ? item.priceUSD : item.price,
      category: item.category || item.type,
      stock: type === 'product' ? item.stock : '',
      status: item.status
    });
    setEditDialogOpen(true);
  };

  const handleUpdateItem = async () => {
    try {
      setLoading(true);
      const endpoint = selectedItem.type === 'product' ? '/products' : '/pets';
      await api.put(`${endpoint}/${selectedItem._id}`, editForm);
      await fetchData();
      setEditDialogOpen(false);
      setSelectedItem(null);
    } catch (err) {
      setError('Failed to update listing');
      console.error('Error updating listing:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async () => {
    try {
      setLoading(true);
      const endpoint = selectedItem.type === 'product' ? '/products' : '/pets';
      await api.delete(`${endpoint}/${selectedItem._id}`);
      await fetchData();
      setDeleteDialogOpen(false);
      setSelectedItem(null);
    } catch (err) {
      setError('Failed to delete listing');
      console.error('Error deleting listing:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (item, newStatus, type) => {
    try {
      setLoading(true);
      const endpoint = type === 'product' ? '/products' : '/pets';
      await api.put(`${endpoint}/${item._id}`, { status: newStatus });
      await fetchData();
    } catch (err) {
      setError('Failed to update status');
      console.error('Error updating status:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'success';
      case 'pending':
        return 'warning';
      case 'sold':
        return 'error';
      default:
        return 'default';
    }
  };

  const renderProductsTable = () => (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Seller</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product._id}>
              <TableCell>
                <Box display="flex" alignItems="center">
                  <CardMedia
                    component="img"
                    sx={{ width: 50, height: 50, mr: 2, borderRadius: 1 }}
                    image={product.images[0] || '/placeholder.jpg'}
                    alt={product.name}
                  />
                  <Box>
                    <Typography variant="body2" fontWeight="medium">
                      {product.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {product.description.substring(0, 50)}...
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Chip label={product.category} size="small" />
              </TableCell>
              <TableCell>${product.priceUSD}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                <Chip
                  label={product.status}
                  color={getStatusColor(product.status)}
                  size="small"
                />
              </TableCell>
              <TableCell>
                {product.seller?.firstName} {product.seller?.lastName}
              </TableCell>
              <TableCell>
                <Tooltip title="View Details">
                  <IconButton size="small">
                    <ViewIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit Product">
                  <IconButton 
                    size="small"
                    onClick={() => handleEditItem(product, 'product')}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Approve">
                  <IconButton 
                    size="small"
                    onClick={() => handleStatusChange(product, 'available', 'product')}
                    disabled={loading || product.status === 'available'}
                  >
                    <ApproveIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Reject">
                  <IconButton 
                    size="small"
                    onClick={() => handleStatusChange(product, 'pending', 'product')}
                    disabled={loading || product.status === 'pending'}
                  >
                    <RejectIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete Product">
                  <IconButton 
                    size="small"
                    onClick={() => {
                      setSelectedItem({ ...product, type: 'product' });
                      setDeleteDialogOpen(true);
                    }}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderPetsTable = () => (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Pet</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Breed</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Seller</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pets.map((pet) => (
            <TableRow key={pet._id}>
              <TableCell>
                <Box display="flex" alignItems="center">
                  <CardMedia
                    component="img"
                    sx={{ width: 50, height: 50, mr: 2, borderRadius: 1 }}
                    image={pet.images[0] || '/placeholder.jpg'}
                    alt={pet.name}
                  />
                  <Box>
                    <Typography variant="body2" fontWeight="medium">
                      {pet.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {pet.description.substring(0, 50)}...
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Chip label={pet.type} size="small" />
              </TableCell>
              <TableCell>{pet.breed}</TableCell>
              <TableCell>{pet.age} years</TableCell>
              <TableCell>${pet.price}</TableCell>
              <TableCell>
                <Chip
                  label={pet.status}
                  color={getStatusColor(pet.status)}
                  size="small"
                />
              </TableCell>
              <TableCell>
                {pet.seller?.firstName} {pet.seller?.lastName}
              </TableCell>
              <TableCell>
                <Tooltip title="View Details">
                  <IconButton size="small">
                    <ViewIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit Pet">
                  <IconButton 
                    size="small"
                    onClick={() => handleEditItem(pet, 'pet')}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Approve">
                  <IconButton 
                    size="small"
                    onClick={() => handleStatusChange(pet, 'available', 'pet')}
                    disabled={loading || pet.status === 'available'}
                  >
                    <ApproveIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Reject">
                  <IconButton 
                    size="small"
                    onClick={() => handleStatusChange(pet, 'pending', 'pet')}
                    disabled={loading || pet.status === 'pending'}
                  >
                    <RejectIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete Pet">
                  <IconButton 
                    size="small"
                    onClick={() => {
                      setSelectedItem({ ...pet, type: 'pet' });
                      setDeleteDialogOpen(true);
                    }}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  if (loading && products.length === 0 && pets.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Listings Management
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
            <Tab label={`Products (${products.length})`} />
            <Tab label={`Pets (${pets.length})`} />
          </Tabs>
          <Button variant="contained" startIcon={<AddIcon />}>
            Add New {activeTab === 0 ? 'Product' : 'Pet'}
          </Button>
        </Box>

        {activeTab === 0 ? renderProductsTable() : renderPetsTable()}
      </Paper>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          Edit {selectedItem?.type === 'product' ? 'Product' : 'Pet'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={3}
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Price (USD)"
                  type="number"
                  value={editForm.priceUSD}
                  onChange={(e) => setEditForm({ ...editForm, priceUSD: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={editForm.category}
                    label="Category"
                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                  >
                    {selectedItem?.type === 'product' ? (
                      <>
                        <MenuItem value="Dogs">Dogs</MenuItem>
                        <MenuItem value="Cats">Cats</MenuItem>
                        <MenuItem value="Birds">Birds</MenuItem>
                        <MenuItem value="Fish">Fish</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </>
                    ) : (
                      <>
                        <MenuItem value="dog">Dog</MenuItem>
                        <MenuItem value="cat">Cat</MenuItem>
                        <MenuItem value="rabbit">Rabbit</MenuItem>
                      </>
                    )}
                  </Select>
                </FormControl>
              </Grid>
              {selectedItem?.type === 'product' && (
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Stock"
                    type="number"
                    value={editForm.stock}
                    onChange={(e) => setEditForm({ ...editForm, stock: e.target.value })}
                  />
                </Grid>
              )}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={editForm.status}
                    label="Status"
                    onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                  >
                    <MenuItem value="available">Available</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="sold">Sold</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleUpdateItem} variant="contained" disabled={loading}>
            {loading ? <CircularProgress size={20} /> : 'Update'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete {selectedItem?.type === 'product' ? 'Product' : 'Pet'}</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{selectedItem?.name}"? 
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteItem} color="error" variant="contained" disabled={loading}>
            {loading ? <CircularProgress size={20} /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ListingsManagement; 