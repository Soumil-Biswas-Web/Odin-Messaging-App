import jwt from 'jsonwebtoken';

// Middleware to verify token
export const authJWToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from 'Bearer <token>'
  
    if (!token) {
      console.error('No token provided');
      return res.status(401).json({ message: 'Token is required' });
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
            console.error('Token expired:', err);
            return res.status(401).json({ message: 'Token has expired. Please log in again.' });
        } else if (err.name === 'JsonWebTokenError') {
            console.error('Invalid token:', err);
            return res.status(403).json({ message: 'Invalid token. Access denied.' });
        } else {
            console.error('Token verification error:', err);
            return res.status(403).json({ message: 'Could not verify token.' });
        }
      }
      // console.log('Decoded JWT:', user);
      // console.log(user);
      req.user = user; // Attach user payload to request
      next();
    });
};

// Middleware to verify refresh Token
export const authRefreshToken = (req, res, next) => {
    // Destructuring refreshToken from cookie
    const refreshToken = req.cookies.jwt;
  
    if (!refreshToken) {
      console.error('No refresh token provided');
      return res.status(401).json({ message: 'Refresh Token is required' });
    }
  
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
            console.error('Refresh Token expired:', err);
            return res.status(401).json({ message: 'Refresh Token has expired. Please log in again.' });
        } else if (err.name === 'JsonWebTokenError') {
            console.error('Invalid refresh token:', err);
            return res.status(403).json({ message: 'Invalid refresh token. Access denied.' });
        } else {
            console.error('Refresh Token verification error:', err);
            return res.status(403).json({ message: 'Could not verify refresh token.' });
        }
      }
      console.log('Decoded JWT:', user); 
      req.user = user; // Attach user payload to request
      next();
    });
};