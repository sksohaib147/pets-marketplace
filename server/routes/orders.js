const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const Pet = require('../models/Pet');
const auth = require('../middleware/auth');
const emailService = require('../utils/email');

// Get all orders (admin only)
router.get('/', auth, async (req, res) => {
  try {
    let orders;
    
    if (req.user.role === 'admin') {
      // Admin can see all orders
      orders = await Order.find()
        .populate('user', 'firstName lastName email')
        .populate('products.product', 'name images priceUSD')
        .populate('pets.pet', 'name type breed images')
        .sort({ createdAt: -1 });
    } else {
      // Regular users can only see their own orders
      orders = await Order.find({ user: req.user._id })
        .populate('products.product', 'name images priceUSD')
        .populate('pets.pet', 'name type breed images')
        .sort({ createdAt: -1 });
    }
    
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

// Get single order
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'firstName lastName email')
      .populate('products.product', 'name images priceUSD description')
      .populate('pets.pet', 'name type breed images description');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Check if user is authorized to view this order
    if (req.user.role !== 'admin' && order.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to view this order' });
    }
    
    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: 'Error fetching order' });
  }
});

// Create new order
router.post('/', auth, async (req, res) => {
  try {
    const { products, pets, shippingAddress, billingAddress, notes, paymentMethod } = req.body;
    
    if ((!products || products.length === 0) && (!pets || pets.length === 0)) {
      return res.status(400).json({ message: 'Order must contain at least one product or pet' });
    }
    
    let orderItems = [];
    let totalAmount = 0;
    
    // Process products
    if (products && products.length > 0) {
      for (const item of products) {
        const product = await Product.findById(item.productId);
        if (!product) {
          return res.status(404).json({ message: `Product ${item.productId} not found` });
        }
        
        if (product.stock < item.quantity) {
          return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
        }
        
        const itemTotal = product.priceUSD * item.quantity;
        totalAmount += itemTotal;
        
        orderItems.push({
          product: item.productId,
          quantity: item.quantity,
          price: product.priceUSD,
          total: itemTotal
        });
        
        // Update product stock
        await Product.findByIdAndUpdate(item.productId, {
          $inc: { stock: -item.quantity }
        });
      }
    }
    
    // Process pets
    if (pets && pets.length > 0) {
      for (const item of pets) {
        const pet = await Pet.findById(item.petId);
        if (!pet) {
          return res.status(404).json({ message: `Pet ${item.petId} not found` });
        }
        
        if (pet.status !== 'available') {
          return res.status(400).json({ message: `Pet ${pet.name} is not available` });
        }
        
        totalAmount += pet.price;
        
        orderItems.push({
          pet: item.petId,
          price: pet.price
        });
        
        // Update pet status
        await Pet.findByIdAndUpdate(item.petId, { status: 'pending' });
      }
    }
    
    // Calculate tax and shipping (simplified calculation)
    const tax = totalAmount * 0.15; // 15% tax
    const shipping = totalAmount > 100 ? 0 : 10; // Free shipping over $100
    const finalTotal = totalAmount + tax + shipping;
    
    const order = new Order({
      user: req.user._id,
      products: products ? orderItems.filter(item => item.product) : [],
      pets: pets ? orderItems.filter(item => item.pet) : [],
      subtotal: totalAmount,
      tax: tax,
      shipping: shipping,
      totalAmount: finalTotal,
      shippingAddress: shippingAddress,
      billingAddress: billingAddress || shippingAddress,
      notes: notes,
      paymentMethod: paymentMethod || 'stripe'
    });
    
    await order.save();
    
    // Send order confirmation email
    try {
      await emailService.sendOrderConfirmation(order, req.user);
    } catch (emailError) {
      console.error('Error sending order confirmation email:', emailError);
    }
    
    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Error creating order' });
  }
});

// Update order status (admin only)
router.patch('/:id/status', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can update order status' });
    }
    
    const { status } = req.body;
    const validStatuses = ['pending', 'confirmed', 'paid', 'shipped', 'delivered', 'cancelled', 'refunded'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Update status and add timestamp
    const updateData = { status };
    
    switch (status) {
      case 'shipped':
        updateData.shippedAt = new Date();
        updateData.estimatedDelivery = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
        break;
      case 'delivered':
        updateData.deliveredAt = new Date();
        break;
      case 'cancelled':
        updateData.cancelledAt = new Date();
        break;
      case 'refunded':
        updateData.refundedAt = new Date();
        break;
    }
    
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate('user', 'firstName lastName email');
    
    res.json(updatedOrder);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Error updating order status' });
  }
});

// Cancel order
router.post('/:id/cancel', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Check if user is authorized to cancel this order
    if (req.user.role !== 'admin' && order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to cancel this order' });
    }
    
    // Check if order can be cancelled
    if (!['pending', 'confirmed'].includes(order.status)) {
      return res.status(400).json({ message: 'Order cannot be cancelled in its current status' });
    }
    
    // Restore product stock
    if (order.products && order.products.length > 0) {
      for (const item of order.products) {
        await Product.findByIdAndUpdate(item.product, {
          $inc: { stock: item.quantity }
        });
      }
    }
    
    // Restore pet availability
    if (order.pets && order.pets.length > 0) {
      for (const item of order.pets) {
        await Pet.findByIdAndUpdate(item.pet, { status: 'available' });
      }
    }
    
    // Update order status
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status: 'cancelled',
        cancelledAt: new Date()
      },
      { new: true }
    );
    
    res.json(updatedOrder);
  } catch (error) {
    console.error('Error cancelling order:', error);
    res.status(500).json({ message: 'Error cancelling order' });
  }
});

// Get order statistics (admin only)
router.get('/stats/overview', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can view order statistics' });
    }
    
    const stats = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: '$totalAmount' },
          averageOrderValue: { $avg: '$totalAmount' }
        }
      }
    ]);
    
    const statusStats = await Order.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    
    const monthlyStats = await Order.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          orders: { $sum: 1 },
          revenue: { $sum: '$totalAmount' }
        }
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } },
      { $limit: 12 }
    ]);
    
    res.json({
      overview: stats[0] || { totalOrders: 0, totalRevenue: 0, averageOrderValue: 0 },
      statusBreakdown: statusStats,
      monthlyTrends: monthlyStats
    });
  } catch (error) {
    console.error('Error fetching order statistics:', error);
    res.status(500).json({ message: 'Error fetching order statistics' });
  }
});

module.exports = router; 