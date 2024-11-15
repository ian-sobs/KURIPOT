module.exports = (req, res, next) => {
    const method = req.method;
    const url = req.url;
    const timestamp = new Date().toISOString();
  
    // After response is sent
    res.on('finish', () => {
      const statusCode = res.statusCode;  // Capture response status code
      console.log(`[${timestamp}] ${method} request to ${url} - Status: ${statusCode}`);
    });
    next();
};
  