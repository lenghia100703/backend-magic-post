function generateCode() {
    const today = new Date();
    const datePart = today.toISOString().slice(2, 10).replace(/-/g, '');

    const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();

    const packageCode = `${datePart}${randomPart}`;

    return packageCode;
}

module.exports = generateCode;
