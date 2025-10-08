import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import session from "express-session";
import { insertReservationSchema } from "@shared/schema";
import multer from "multer";
import path from "path";
import fs from "fs";

// 업로드 디렉토리 생성
const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer 설정 - 사진 업로드
const upload = multer({
  storage: multer.diskStorage({
    destination: uploadsDir,
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

export async function registerRoutes(app: Express): Promise<Server> {
  // 세션 설정
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "seongbuk-beauty-secret-2024",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 24시간
      },
    })
  );

  // 정적 파일 제공 (업로드된 이미지)
  app.use("/uploads", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  });
  app.use("/uploads", require("express").static(uploadsDir));

  // 예약 생성 API
  app.post("/api/reservations", upload.single("photo"), async (req, res) => {
    try {
      const reservationData = {
        date: req.body.date,
        time: req.body.time,
        name: req.body.name,
        phone: req.body.phone,
        school: req.body.school,
        studentId: req.body.studentId,
        email: req.body.email,
        location: req.body.location,
        price: req.body.price,
        treatment: req.body.treatment,
        notes: req.body.notes || null,
        photoUrl: req.file ? `/uploads/${req.file.filename}` : null,
      };

      // Zod 검증
      const validated = insertReservationSchema.parse(reservationData);
      
      const reservation = await storage.createReservation(validated);
      res.status(201).json(reservation);
    } catch (error: any) {
      console.error("Reservation creation error:", error);
      res.status(400).json({ 
        message: error.message || "예약 생성 중 오류가 발생했습니다." 
      });
    }
  });

  // 모든 예약 조회 API (관리자 전용)
  app.get("/api/reservations", async (req, res) => {
    try {
      // 세션 확인
      if (!(req.session as any).isAdmin) {
        return res.status(401).json({ message: "인증이 필요합니다." });
      }

      const reservations = await storage.getAllReservations();
      res.json(reservations);
    } catch (error: any) {
      console.error("Get reservations error:", error);
      res.status(500).json({ 
        message: "예약 목록 조회 중 오류가 발생했습니다." 
      });
    }
  });

  // 관리자 로그인 API
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = req.body;

      // 하드코딩된 관리자 계정
      if (username === "admin" && password === "1234") {
        (req.session as any).isAdmin = true;
        res.json({ success: true });
      } else {
        res.status(401).json({ message: "아이디 또는 비밀번호가 올바르지 않습니다." });
      }
    } catch (error: any) {
      console.error("Admin login error:", error);
      res.status(500).json({ 
        message: "로그인 중 오류가 발생했습니다." 
      });
    }
  });

  // 관리자 로그아웃 API
  app.post("/api/admin/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "로그아웃 중 오류가 발생했습니다." });
      }
      res.json({ success: true });
    });
  });

  const httpServer = createServer(app);

  return httpServer;
}
