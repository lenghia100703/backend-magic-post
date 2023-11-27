function generateCode() {
    const today = new Date();
    const datePart = today.toISOString().slice(2, 10).replace(/-/g, ''); // Lấy ngày dưới định dạng YYMMDD

    const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase(); // Lấy 4 ký tự ngẫu nhiên và chuyển thành chữ in hoa

    const packageCode = `${datePart}${randomPart}`;

    return packageCode;
}

module.exports = generateCode;
