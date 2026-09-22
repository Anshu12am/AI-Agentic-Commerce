module.exports.merchantOnly = (req, res, next) => {
  if (req.user.role !== "merchant") {
    return res.status(403).json({
      message: "Access denied. Merchant only.",
    });
  }

  next();
};