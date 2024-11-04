import express from "express";

declare global {
  namespace Express {
    interface Request {
      userEmail?: Record<string>
    }
  }
}