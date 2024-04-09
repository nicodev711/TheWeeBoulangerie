import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    let address = {
        street: '',
        city: '',
        postalCode: '',
        country: '',
    };

    // Check if user.address is an object before trying to access its properties
    if (typeof user.address === 'object' && user.address !== null) {
        address = {
            street: user.address.street || '',
            city: user.address.city || '',
            postalCode: user.address.postalCode || '',
            country: user.address.country || '',
        };
    }

    const payload = {
        userId: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        totalAmountSpent: user.totalAmountSpent,
        marketingEmailsConsent: user.marketingEmailsConsent,
        address: address
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
};



export const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};
