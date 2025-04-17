// import { check, validationResult } from 'express-validator';
// import { isValid } from 'date-fns';

// export const validateProfile = [
//   // First Name Validation
//   check('firstName')
//     .trim()
//     .notEmpty().withMessage('First name is required')
//     .isLength({ max: 30 }).withMessage('First name cannot exceed 30 characters')
//     .matches(/^[a-zA-Z]+$/).withMessage('First name can only contain letters'),

//   // Last Name Validation  
//   check('lastName')
//     .trim()
//     .notEmpty().withMessage('Last name is required')
//     .isLength({ max: 30 }).withMessage('Last name cannot exceed 30 characters')
//     .matches(/^[a-zA-Z]+$/).withMessage('Last name can only contain letters'),

//   // Gender Validation
//   check('gender')
//     .isIn(['Male', 'Female', 'Other', 'Prefer not to say']).withMessage('Invalid gender value')
//     .toUpperCase(),

//   // Date of Birth Validation
//   check('dateOfBirth')
//     .isISO8601().withMessage('Invalid date format (use YYYY-MM-DD)')
//     .toDate()
//     .custom((dob) => {
//       if (!isValid(dob)) throw new Error('Invalid date value');
//       const today = new Date();
//       const minDate = new Date(
//         today.getFullYear() - 18,
//         today.getMonth(),
//         today.getDate()
//       );
//       if (dob > minDate) throw new Error('Must be at least 18 years old');
//       return true;
//     }),

//   // Lifestyle Tags Validation
//   check('lifestyleTags')
//     .optional()
//     .custom((value) => {
//       try {
//         const tags = JSON.parse(value);
//         if (!Array.isArray(tags)) throw new Error();
//         if (tags.length > 10) throw new Error('Maximum 10 tags allowed');
//         if (tags.some(tag => tag.length > 20)) throw new Error('Tags cannot exceed 20 characters');
//         return true;
//       } catch {
//         throw new Error('Invalid lifestyle tags format');
//       }
//     }),

//   // Validation Handler
//   (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({
//         success: false,
//         errors: errors.array().map(err => ({
//           field: err.param,
//           message: err.msg
//         }))
//       });
//     }
//     next();
//   }
// ];
