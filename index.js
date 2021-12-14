const express = require('express');
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');
const config = require('dotenv').config();
// Create Express Server
const app = express();

// Configuration
const PORT = 8899;
const HOST = "localhost";
const API_SERVICE_URL = "https://connect.runnode.com";
const API_KEY = process.env.API_KEY

// Logging
app.use(morgan('dev'));

// Info GET endpoint
app.get('/info', (req, res, next) => {
   res.send('This is a proxy service which proxies to Billing and Account APIs.');
});

// Proxy endpoints
app.use('*', createProxyMiddleware({
   target: API_SERVICE_URL,
   ws: true,
   changeOrigin: true,
   headers:{
   	'apiKey': API_KEY
   }
}));


// Start the Proxy
app.listen(PORT, HOST, () => {
   console.log(`Starting Proxy at ${HOST}:${PORT}`);
});