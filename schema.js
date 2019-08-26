const joi = require('joi');

const schema = joi.object().keys({
	pincode: joi.number().min(100000).max(999999).required()
});

module.exports = {
	schema
};
