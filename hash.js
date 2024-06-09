const { scryptSync, randomBytes, timingSafeEqual } = require('crypto');

// Simulating a database to store users
const users = [];

function signup(email, password) {
    const salt = randomBytes(16).toString('hex');
    const hashedPassword = scryptSync(password, salt, 64).toString('hex');
    const user = { email, password: `${salt}:${hashedPassword}` };
    users.push(user);
}

function login(email, password) {
    const user = users.find(u => u.email === email);

    if (!user) {
        return 'User not found!';
    }

    const [salt, key] = user.password.split(':');
    const hashedBuffer = scryptSync(password, salt, 64);

    const keyBuffer = Buffer.from(key, 'hex');
    const match = timingSafeEqual(hashedBuffer, keyBuffer);

    if (match) {
        return 'Login success!';
    } else {
        return 'Login failed!';
    }
}

