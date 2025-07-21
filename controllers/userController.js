// User controller
exports.login = (req, res) => {
  res.json({ message: 'Logged in successfully', user: req.user });
};

exports.profile = (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  res.json({ message: 'Profile data', user: req.user });
};

exports.createUser = (req, res) => {
  // Proceed with user creation logic (not implemented)
  res.status(201).json({ message: 'User validated and created!', user: req.validatedBody });
}; 