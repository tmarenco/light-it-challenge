import { body } from 'express-validator';

export const patientValidationRules = [
  body('name')
    .notEmpty().withMessage('Name is required')
    .isAlpha('en-US', { ignore: ' ' }).withMessage('Name must contain only letters'),
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Email is invalid')
    .matches(/@gmail\.com$/).withMessage('Email must be @gmail.com'),
  body('address')
    .notEmpty().withMessage('Address is required'),
  body('phone')
    .notEmpty().withMessage('Phone is required')
    .isNumeric().withMessage('Phone must contain only numbers'),
  body('photo').custom((value, { req }) => {
    if (!req.file) {
      throw new Error('Photo is required');
    }
    return true;
  }),
];
