const jwt = require('jsonwebtoken');
const secret = 'mysecretsshhh';

const withAuth = function(req, res, next) {
  let token = 
      req.body.token ||
      req.query.token ||
      req.headers['x-access-token'] ||
      req.headers['authorization']
  console.log(token);

  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
  } else {
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        req.id = decoded.id
        next();
      }
    });
  }
}

module.exports = withAuth;