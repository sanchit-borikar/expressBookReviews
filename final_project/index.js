const express = require('express');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const customerRoutes = require('./router/auth_users.js').authenticated;
const generalRoutes = require('./router/general.js').general;
const JWT_SECRET = require('./router/auth_users.js').JWT_SECRET;

const app = express();
app.use(express.json());

app.use('/customer', session({
  secret: process.env.SESSION_SECRET || 'fingerprint_customer_change_for_production',
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, sameSite: 'lax' }
}));

// Require a valid login session/JWT for protected review routes.
app.use('/customer/auth/*', (req, res, next) => {
  const token = req.session?.authorization?.accessToken;
  if (!token) return res.status(401).json({ message: 'User not logged in.' });
  jwt.verify(token, JWT_SECRET, (error, user) => {
    if (error) return res.status(403).json({ message: 'User authentication token is invalid or expired.' });
    req.user = user;
    return next();
  });
});

app.use('/customer', customerRoutes);
app.use('/', generalRoutes);
app.get('/health', (_req, res) => res.status(200).json({ status: 'ok' }));

const PORT = Number(process.env.PORT) || 5000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`Express Book Reviews server running at http://localhost:${PORT}`));
}
module.exports = app;
