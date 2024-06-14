import jwt from "jsonwebtoken";
import User from "../models/user";

export const checkPermission = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({
            message: "Bạn chưa đăng nhập",
        });
    }
    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, "123456", async (error, decoded) => {
        if (error === "JsonWebTokenError") {
            return res.json({
                message: "Token không hợp lệ",
            });
        }
        const user = await User.findById(decoded.id);
        if (user.role !== "admin") {
            return res.status(403).json({
                message: "Bạn không có quyền truy cập tài nguyên này",
            });
        }

        req.user = user;
        next();
    });
};

// B1: Kiểm tra đã đăng nhập chưa
// B2: Token gửi lên có hợp lệ không?
// B3: Dựa vào thông tin gửi lên, kiểm xem id đấy có quyền không?
// B4: Nếu có quyền thì next(), không thì trả về lỗi
