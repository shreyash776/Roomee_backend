import { check, validationResult } from 'express-validator';

export const validateProfile = [
  check('firstName')
    .trim()
    .notEmpty().withMessage('First name is required')
    .isLength({ max: 30 }).withMessage('First name cannot exceed 30 characters'),
  
  check('lastName')
    .trim()
    .notEmpty().withMessage('Last name is required')
    .isLength({ max: 30 }).withMessage('Last name cannot exceed 30 characters'),
  
  check('gender')
    .isIn(['Male', 'Female', 'Other']).withMessage('Invalid gender value'),
  
  check('dateOfBirth')
    .isISO8601().withMessage('Invalid date format (use YYYY-MM-DD)')
    .custom((value) => {
      const dob = new Date(value);
      const ageDiff = Date.now() - dob.getTime();
      const ageDate = new Date(ageDiff);
      const age = Math.abs(ageDate.getUTCFullYear() - 1970);
      if (age < 18) throw new Error('Must be at least 18 years old');
      return true;
    }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
