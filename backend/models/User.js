import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define address schema
const addressSchema = new mongoose.Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true }
});

// Define user schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
    previousOrders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }], // Reference to previous orders
    totalAmountSpent: { type: Number, default: 0 }, // Total amount spent by the user
    marketingEmailsConsent: { type: Boolean, default: false }, // Marketing email consent
    address: { type: addressSchema } // Address details
});

// Password hashing middleware
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

// Instance method to check password
userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
