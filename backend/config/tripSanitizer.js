const { check } = require('express-validator');

const tripSanitizer = [
    check([
        'Flights.*.departure',
        'Flights.*.arrival',
        'Cars.*.rental',
        'Lodging.*.hotel',
        'Other.*.reservationName',
        'Expenses.*.expensePlace',
        'Itinerary.*.activities.*.activity'
    ])
        .notEmpty()
        .isAlpha()
        .trim(),
    check('Notes.*.note')
        .notEmpty()
        .trim()
        .escape(),
    check([
        'Itinerary.*.date',
        'Expenses.*.expenseDate',
    ])
        .notEmpty()
        .isDate({ format: 'YYYY/MM/DD'})
        .trim(),
    check('Expenses.*.expenseAmount')
        .notEmpty()
        .trim()
        .custom(value => {
            if(value < 0 ) throw new Error('Expense amount must be bigger that 0!')
            return true
        }),
    check('Flights.*.airline')
        .optional({ checkFalsy: true })
        .isAlpha()
        .trim(),
    check([
        'Flights.*.flightNotes',
        'Cars.*.carNotes',
        'Lodging.*.hotelNotes',
        'Other.*.otherNotes',
        'Expenses.*.expenseNotes'
    ])
        .optional({ checkFalsy: true })
        .trim()
        .escape(),
    check([
        'Flights.*.flightNumber',
        'Cars.*.pickupAddress',
        'Cars.*.dropoffAddress',
        'Lodging.*.hotelAddress',
    ])
        .optional({ checkFalsy: true })
        .trim()
        .escape()
        .isAlphanumeric(),
    check([
        'Flights.*.departureDate',
        'Flights.*.arrivalDate',
        'Cars.*.pickupDate',
        'Cars.*.dropoffDate',
        'Lodging.*.checkinDate',
        'Lodging.*.checkoutDate',
        'Other.*.otherDate',
        'Other.*.otherCheckoutDate',
    ])
        .optional({ checkFalsy: true })
        .trim()
        .isDate({ format: 'YYYY/MM/DD'}),
    check([
        'Flights.*.departureTime',
        'Flights.*.arrivalTime',
        'Cars.*.pickupTime',
        'Cars.*.dropoffTime',
        'Lodging.*.checkinTime',
        'Lodging.*.checkoutTime',
        'Other.*.otherTime',
        'Other.*.otherCheckoutTime',
        'Itinerary.*.activities.*.time'
    ])
        .optional({ checkFalsy: true })
        .trim()
        .custom( value => {
            let rgx = /([01][0-9]|[2][0-3]):[0-5][0-9]/
            const isValid = rgx.test(value)
            if(!isValid) throw new Error('Time entry is not valid')
            return true
        }),
];

module.exports = { tripSanitizer }