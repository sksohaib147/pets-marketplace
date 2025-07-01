# Performance Testing Guide for SRS Compliance

## 📊 **SRS Requirement: 95% interactions within 2 seconds**

This guide helps you verify that your application meets the SRS performance requirement.

## 🛠️ **Performance Monitoring Tools**

### 1. **Built-in Performance Dashboard**
- Click the ⏱️ button in the bottom-right corner of your app
- Real-time monitoring of interaction times
- SRS compliance percentage calculation
- Export performance data for analysis

### 2. **Using the Performance Monitor**

```javascript
import { usePerformanceMonitor } from './utils/performance';

function MyComponent() {
  const { measureInteraction } = usePerformanceMonitor();

  const handleSearch = async () => {
    await measureInteraction('Search Products', async () => {
      // Your search logic here
      const results = await searchProducts(query);
      return results;
    });
  };

  const handleAddToCart = () => {
    measureInteraction('Add to Cart', () => {
      // Your add to cart logic here
      addToCart(product);
    });
  };
}
```

## 📈 **Performance Testing Scenarios**

### **Test 1: Page Load Times**
```bash
# Test initial page load
npm run build
npm run preview
# Open browser dev tools > Network tab
# Measure First Contentful Paint (FCP) and Largest Contentful Paint (LCP)
```

**Target:** < 3 seconds (SRS requirement)

### **Test 2: User Interactions**
1. **Search Functionality**
   - Search for pets/products
   - Apply filters
   - Sort results

2. **Authentication**
   - User login
   - User registration
   - Password reset

3. **Shopping Cart**
   - Add items to cart
   - Remove items
   - Update quantities

4. **Checkout Process**
   - Payment processing
   - Order confirmation

### **Test 3: Concurrent Users**
```bash
# Install load testing tool
npm install -g artillery

# Create test scenario
artillery quick --count 100 --num 10 http://localhost:5173
```

## 📊 **Performance Metrics to Track**

### **Key Metrics:**
- **Interaction Response Time:** Time from user action to response
- **Page Load Time:** Initial page load duration
- **Bundle Size:** JavaScript bundle size (should be < 500KB)
- **Time to Interactive:** When page becomes interactive

### **SRS Compliance Checklist:**
- [ ] 95% of interactions complete within 2 seconds
- [ ] Page load times under 3 seconds
- [ ] Support for 10,000 concurrent users
- [ ] Bundle size optimized

## 🔧 **Performance Optimization Techniques**

### **1. Code Splitting (Already Implemented)**
- Vendor chunks separated
- Feature-based chunks
- Lazy loading for admin pages

### **2. Image Optimization**
```javascript
// Use next-gen formats
<img src="image.webp" alt="Pet" />

// Implement lazy loading
<img src="image.jpg" loading="lazy" alt="Pet" />
```

### **3. API Response Caching**
```javascript
// Implement caching for frequently accessed data
const cache = new Map();

const getCachedData = async (key, fetchFunction) => {
  if (cache.has(key)) {
    return cache.get(key);
  }
  const data = await fetchFunction();
  cache.set(key, data);
  return data;
};
```

### **4. Database Query Optimization**
- Index frequently queried fields
- Use pagination for large datasets
- Implement query result caching

## 📋 **Testing Checklist**

### **Manual Testing:**
- [ ] Test on different devices (mobile, tablet, desktop)
- [ ] Test with slow network conditions (3G simulation)
- [ ] Test with large datasets
- [ ] Test concurrent user scenarios

### **Automated Testing:**
- [ ] Lighthouse performance audit
- [ ] WebPageTest analysis
- [ ] Load testing with Artillery
- [ ] Bundle size monitoring

## 📈 **Performance Monitoring in Production**

### **1. Real User Monitoring (RUM)**
```javascript
// Add to your app for production monitoring
window.addEventListener('load', () => {
  const loadTime = performance.now();
  // Send to analytics service
  analytics.track('page_load_time', loadTime);
});
```

### **2. Error Tracking**
```javascript
// Monitor for performance-related errors
window.addEventListener('error', (event) => {
  if (event.error && event.error.message.includes('timeout')) {
    // Track timeout errors
    analytics.track('performance_error', 'timeout');
  }
});
```

## 🎯 **SRS Compliance Verification**

### **Step 1: Run Performance Tests**
1. Start the development server: `npm run dev`
2. Open the performance dashboard (⏱️ button)
3. Perform typical user interactions
4. Monitor the compliance percentage

### **Step 2: Analyze Results**
- **If ≥ 95%:** ✅ SRS requirement met
- **If < 95%:** ❌ Need optimization

### **Step 3: Optimization Actions**
1. **Bundle Size Issues:**
   - Implement dynamic imports
   - Remove unused dependencies
   - Optimize images

2. **API Response Issues:**
   - Add caching
   - Optimize database queries
   - Implement pagination

3. **UI Rendering Issues:**
   - Use React.memo for expensive components
   - Implement virtual scrolling for large lists
   - Optimize re-renders

## 📊 **Reporting**

Generate performance reports using:
```bash
# Export performance data
# Use the Export Data button in the Performance Dashboard

# Generate Lighthouse report
npx lighthouse http://localhost:5173 --output=json --output-path=./lighthouse-report.json
```

## 🚀 **Continuous Monitoring**

Set up automated performance monitoring:
1. **CI/CD Integration:** Add performance tests to your build pipeline
2. **Alerting:** Set up alerts for performance degradation
3. **Regular Audits:** Schedule weekly performance reviews

---

**Remember:** Performance is not a one-time optimization but an ongoing process. Regular monitoring and optimization are key to maintaining SRS compliance. 