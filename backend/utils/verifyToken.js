import jwt from 'jsonwebtoken';

// General Token Verification Middleware
export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
      console.error('Token not found in request');
      return res.status(401).json({ success: false, message: 'Authorization denied: No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
          console.error('Token verification failed:', err.message);
          return res.status(401).json({ success: false, message: 'Invalid token' });
      }
      console.log('Token verified. User data:', user);
      req.user = user; // Attach user data to the request
      next();
  });
};

// Verify User Middleware
export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
      if (!req.user) {
          return res.status(403).json({ success: false, message: 'Not Authenticated' });
      }
      next(); // User is authenticated
  });
};


// Verify Admin Middleware
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === 'admin') {
      next();
    } else {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }
  });
};
