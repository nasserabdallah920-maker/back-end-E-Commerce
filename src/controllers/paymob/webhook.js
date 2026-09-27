const paymobService = require("../../services/paymob/webhook.services");
const webhook = async (req, res, next) => {
  try {
    const obj = req.body.obj;
    const hmac = req.query.hmac;
    await paymobService.handleWebhook(obj, hmac);
    res.status(200).json({
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  webhook,
};
