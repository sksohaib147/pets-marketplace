import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Paper, Divider, CircularProgress, useTheme } from '@mui/material';
import { FaPaw, FaHeart, FaShieldAlt, FaUsers, FaShoppingBag, FaHandshake } from 'react-icons/fa';
import axios from 'axios';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionPaper = motion(Paper);

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await axios.get('/api/about');
        setAboutData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load about page content');
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  const features = [
    {
      icon: <FaPaw size={40} />,
      title: "Pet Adoption",
      description: "Find your perfect companion through our ethical pet adoption platform. We ensure all pets are healthy, vaccinated, and ready for their forever homes."
    },
    {
      icon: <FaHeart size={40} />,
      title: "Pet Care Products",
      description: "Browse our extensive collection of high-quality pet food, toys, and accessories for dogs, cats, and rabbits."
    },
    {
      icon: <FaShieldAlt size={40} />,
      title: "Secure Transactions",
      description: "Shop with confidence using our secure payment system. We protect your data and ensure safe transactions."
    },
    {
      icon: <FaUsers size={40} />,
      title: "Community",
      description: "Join our growing community of pet lovers. Share experiences, get advice, and connect with other pet owners."
    },
    {
      icon: <FaShoppingBag size={40} />,
      title: "Marketplace",
      description: "Buy and sell pets responsibly through our trusted marketplace. All listings are verified for authenticity."
    },
    {
      icon: <FaHandshake size={40} />,
      title: "Customer Support",
      description: "24/7 customer support to help you with any questions or concerns about your pets or orders."
    }
  ];

  return (
    <Box sx={{ 
      py: 8, 
      bgcolor: 'background.default',
      background: 'linear-gradient(180deg, #fff 0%, #f8f9fa 100%)'
    }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          sx={{ 
            textAlign: 'center', 
            mb: 8,
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -20,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100px',
              height: '4px',
              background: theme.palette.primary.main,
              borderRadius: '2px'
            }
          }}
        >
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold', 
              color: 'primary.main',
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
              mb: 3
            }}
          >
            {aboutData?.hero?.title || 'About Paws and Claws'}
          </Typography>
          <Typography 
            variant="h5" 
            color="text.secondary" 
            sx={{ 
              maxWidth: '800px', 
              mx: 'auto', 
              mb: 4,
              lineHeight: 1.6
            }}
          >
            {aboutData?.hero?.subtitle || 'Your trusted platform for pet adoption, care products, and community'}
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ 
              maxWidth: '800px', 
              mx: 'auto',
              fontSize: '1.1rem',
              lineHeight: 1.8
            }}
          >
            {aboutData?.hero?.description || 'Founded with a passion for connecting pets with loving homes, Paws and Claws has grown into Pakistan\'s leading pet marketplace. We\'re committed to promoting responsible pet ownership and providing quality products for your furry friends.'}
          </Typography>
        </MotionBox>

        {/* Mission & Vision */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          <Grid item xs={12} md={6}>
            <MotionPaper
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              elevation={0}
              sx={{ 
                p: 4, 
                height: '100%', 
                bgcolor: 'background.paper',
                borderRadius: 4,
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                border: '1px solid rgba(0,0,0,0.05)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)'
                }
              }}
            >
              <Typography 
                variant="h4" 
                gutterBottom 
                sx={{ 
                  color: 'primary.main', 
                  fontWeight: 'bold',
                  mb: 3
                }}
              >
                {aboutData?.mission?.title || 'Our Mission'}
              </Typography>
              <Typography 
                variant="body1" 
                color="text.secondary"
                sx={{ 
                  fontSize: '1.1rem',
                  lineHeight: 1.8
                }}
              >
                {aboutData?.mission?.description || 'To create a safe, ethical, and user-friendly platform that connects pets with loving homes while providing high-quality products and services for pet owners across Pakistan.'}
              </Typography>
            </MotionPaper>
          </Grid>
          <Grid item xs={12} md={6}>
            <MotionPaper
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              elevation={0}
              sx={{ 
                p: 4, 
                height: '100%', 
                bgcolor: 'background.paper',
                borderRadius: 4,
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                border: '1px solid rgba(0,0,0,0.05)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)'
                }
              }}
            >
              <Typography 
                variant="h4" 
                gutterBottom 
                sx={{ 
                  color: 'primary.main', 
                  fontWeight: 'bold',
                  mb: 3
                }}
              >
                {aboutData?.vision?.title || 'Our Vision'}
              </Typography>
              <Typography 
                variant="body1" 
                color="text.secondary"
                sx={{ 
                  fontSize: '1.1rem',
                  lineHeight: 1.8
                }}
              >
                {aboutData?.vision?.description || 'To become Pakistan\'s most trusted pet marketplace, promoting responsible pet ownership and animal welfare while building a supportive community of pet lovers.'}
              </Typography>
            </MotionPaper>
          </Grid>
        </Grid>

        {/* Features Grid */}
        <Box sx={{ mb: 8 }}>
          <Typography 
            variant="h3" 
            component="h2" 
            gutterBottom 
            sx={{ 
              textAlign: 'center', 
              mb: 6, 
              fontWeight: 'bold',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -10,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60px',
                height: '3px',
                background: theme.palette.primary.main,
                borderRadius: '2px'
              }
            }}
          >
            Why Choose Us
          </Typography>
          <Grid container spacing={4}>
            {(aboutData?.features || features).map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <MotionPaper
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  elevation={0}
                  sx={{ 
                    p: 4, 
                    height: '100%', 
                    bgcolor: 'background.paper',
                    borderRadius: 4,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    border: '1px solid rgba(0,0,0,0.05)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
                      '& .feature-icon': {
                        transform: 'scale(1.1)',
                        color: theme.palette.primary.main
                      }
                    }
                  }}
                >
                  <Box 
                    sx={{ 
                      color: 'primary.main', 
                      mb: 2,
                      display: 'flex',
                      justifyContent: 'center'
                    }}
                    className="feature-icon"
                  >
                    {feature.icon}
                  </Box>
                  <Typography 
                    variant="h5" 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 'bold',
                      textAlign: 'center',
                      mb: 2
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    color="text.secondary"
                    sx={{ 
                      textAlign: 'center',
                      lineHeight: 1.7
                    }}
                  >
                    {feature.description}
                  </Typography>
                </MotionPaper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Statistics */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          sx={{ 
            mt: 8, 
            textAlign: 'center',
            py: 6,
            px: 4,
            bgcolor: 'background.paper',
            borderRadius: 4,
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, #FF6B6B 0%, #4ECDC4 100%)'
            }
          }}
        >
          <Typography 
            variant="h3" 
            component="h2" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold',
              mb: 4
            }}
          >
            Our Impact
          </Typography>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={4}>
              <Typography 
                variant="h2" 
                sx={{ 
                  color: 'primary.main', 
                  fontWeight: 'bold',
                  mb: 1
                }}
              >
                {aboutData?.statistics?.petsAdopted || '1000+'}
              </Typography>
              <Typography 
                variant="h6"
                sx={{ 
                  color: 'text.secondary',
                  fontWeight: 500
                }}
              >
                Pets Adopted
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography 
                variant="h2" 
                sx={{ 
                  color: 'primary.main', 
                  fontWeight: 'bold',
                  mb: 1
                }}
              >
                {aboutData?.statistics?.happyCustomers || '5000+'}
              </Typography>
              <Typography 
                variant="h6"
                sx={{ 
                  color: 'text.secondary',
                  fontWeight: 500
                }}
              >
                Happy Customers
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography 
                variant="h2" 
                sx={{ 
                  color: 'primary.main', 
                  fontWeight: 'bold',
                  mb: 1
                }}
              >
                {aboutData?.statistics?.productsSold || '10000+'}
              </Typography>
              <Typography 
                variant="h6"
                sx={{ 
                  color: 'text.secondary',
                  fontWeight: 500
                }}
              >
                Products Sold
              </Typography>
            </Grid>
          </Grid>
        </MotionBox>

        {/* Contact Section */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          sx={{ 
            mt: 8, 
            textAlign: 'center',
            py: 6,
            px: 4,
            bgcolor: 'background.paper',
            borderRadius: 4,
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
          }}
        >
          <Typography 
            variant="h3" 
            component="h2" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold',
              mb: 3
            }}
          >
            Get in Touch
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ 
              maxWidth: '600px', 
              mx: 'auto', 
              mb: 4,
              fontSize: '1.1rem',
              lineHeight: 1.8
            }}
          >
            Have questions or feedback? We'd love to hear from you. Our team is always ready to help.
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'center',
            gap: 4
          }}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <FaHeart style={{ fontSize: '1.2rem' }} />
              {aboutData?.contact?.email || 'support@pawsandclaws.com'}
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <FaHandshake style={{ fontSize: '1.2rem' }} />
              {aboutData?.contact?.phone || '+92 316 882 5998'}
            </Typography>
          </Box>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default About; 