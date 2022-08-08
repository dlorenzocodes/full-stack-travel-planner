const mongoose = require('mongoose');

const tripSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    tripTitle: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    dates: {
        startDate: { type: String, required: true },
        endDate: { type: String, required: true }
    },
    Flights: [{
        departure: { type: String, min: 3 },
        arrival: { type: String, min: 3 }, 
        airline: { type: String, min: 3 },
        flightNumber: { type: String },
        departureDate: { type: String },
        departureTime: { type: String },
        arrivalDate: { type: String },
        arrivalTime: { type: String },
        flightNotes: { type: String, min: 3 }
    }],
    Cars: [{
        rental: { type: String, min: 3 },
        pickupAddress: { type: String, min: 3 },
        dropoffAddress: { type: String, min: 3 },
        pickupDate: { type: String },
        pickupTime: { type: String },
        dropoffDate: { type: String },
        dropoffTime: { type: String },
        carNotes: { type: String, min: 3 }
    }],
    Lodging: [{
        hotel: { type: String, min: 3 },
        hotelAddress: { type: String, min: 3 },
        checkinDate: { type: String },
        checkinTime: { type: String },
        checkoutDate: { type: String },
        checkoutTime: { type: String },
        hotelNotes: { type: String, min: 3 }
    }],
    Other: [{
        reservationName: { type: String, min: 3 },
        otherDate: { type: String },
        otherTime: { type: String },
        otherCheckoutDate: { type: String },
        otherCheckoutTime: { type: String },
        otherNotes: { type: String, min: 3 }
    }],
    Notes: [{
        note: { type: String, min: 3 }
    }],
    itinerary: [{
        date: { type: String },
        activities: [{
            activity: { type: String, min: 3 },
            time: { type: String }
        }]
    }],
    expenses:[{
        expenseDate: { type: String },
        expensePlace: { type: String, min: 3 },
        expenseAmount: { type: String },
        expenseNotes: { type: String, min: 3 }
    }]
});

const Trip = mongoose.model('Trip', tripSchema)

module.exports = { Trip }
