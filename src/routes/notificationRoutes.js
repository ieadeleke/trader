import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { admin } from "../middlewares/adminMiddleware.js";
import Notification from "../models/notificationModel.js";
import { ok, fail, created } from "../utils/response.js";

const router = express.Router();

// GET /api/notifications?limit=20&unread=true
router.get("/", protect, async (req, res) => {
  try {
    const { page = 1, limit = 20, unread } = req.query || {};
    const p = Math.max(1, Number(page) || 1);
    const l = Math.max(1, Math.min(100, Number(limit) || 20));
    const q = { user: req.user.id };
    if (String(unread) === "true") q.read = false;
    const total = await Notification.countDocuments(q);
    const items = await Notification.find(q).sort({ createdAt: -1 }).skip((p - 1) * l).limit(l);
    return ok(res, { items, total, page: p, pageSize: l }, "Notifications fetched");
  } catch (e) {
    console.error("[notifications/list]", e);
    return fail(res, { statusCode: 500, message: "Failed to fetch notifications", error: e });
  }
});

// PATCH /api/notifications/:id/read
router.patch("/:id/read", protect, async (req, res) => {
  try {
    const { id } = req.params;
    const n = await Notification.findById(id);
    if (!n || String(n.user) !== String(req.user.id)) {
      return fail(res, { statusCode: 404, message: "Not found", error: "Not Found" });
    }
    n.read = true;
    await n.save();
    return ok(res, n, "Notification marked as read");
  } catch (e) {
    console.error("[notifications/read]", e);
    return fail(res, { statusCode: 500, message: "Failed to update notification", error: e });
  }
});

// POST /api/notifications/read-all
router.post("/read-all", protect, async (req, res) => {
  try {
    await Notification.updateMany({ user: req.user.id, read: false }, { $set: { read: true } });
    return ok(res, { success: true }, "All notifications marked as read");
  } catch (e) {
    console.error("[notifications/read-all]", e);
    return fail(res, { statusCode: 500, message: "Failed to update notifications", error: e });
  }
});

// POST /api/notifications/admin/create
router.post("/admin/create", protect, admin, async (req, res) => {
  try {
    const { userId, type = "info", title, message, data } = req.body || {};
    if (!userId || !title) return fail(res, { statusCode: 400, message: "userId and title are required", error: "Validation" });
    const n = await Notification.create({ user: userId, type, title, message, data });
    return created(res, n, "Notification created");
  } catch (e) {
    console.error("[notifications/admin/create]", e);
    return fail(res, { statusCode: 500, message: "Failed to create notification", error: e });
  }
});

export default router;

