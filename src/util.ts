import * as moment from 'moment';

export const generateOTP = (n: number): string => {
    const digits = '0123456789';
    let otp = '';

    for (let i = 0; i < n; i++) {
        otp += digits[Math.floor(Math.random() * digits.length)];
    }

    return otp;
};

export const getExpiry = () => {
    const createdAt = new Date();
    const expiresAt = moment(createdAt).add(5, 'minutes').toDate();
    return expiresAt;
};

export function isTokenExpired(expiry: string): boolean {
    const expirationDate = new Date(expiry);
    const currentDate = new Date();
    return expirationDate.getTime() <= currentDate.getTime();
}
