import React, { useState, useEffect, FormEvent } from "react";
import { createRoot } from "react-dom/client";
import { createClient } from "@supabase/supabase-js";

// --- CONFIGURAÇÃO DO SUPABASE ---
const SUPABASE_URL = "https://gozdmpjiyzjknmwozxjr.supabase.co";
// IMPORTANTE: Chave Anon fornecida
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvemRtcGppeXpqa25td296eGpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyNDE3NDksImV4cCI6MjA4MDgxNzc0OX0.K97oGp1XBtiPM-2eA_dnVQDfoLv_fOJKSRXxVsAtEoA";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/* --- ICONS --- */
const Icons = {
  Users: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
  Trophy: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 1 0-5H18"></path><path d="M4 22h16"></path><path d="M12 2v7"></path><path d="M12 2a5 5 0 0 0-5 5v2a7 7 0 0 0 14 0V7a5 5 0 0 0-5-5z"></path><path d="M8 22v-3a4 4 0 0 1 8 0v3"></path></svg>,
  Gift: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path></svg>,
  Dice: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 8h.01"></path><path d="M8 8h.01"></path><path d="M8 16h.01"></path><path d="M16 16h.01"></path><path d="M12 12h.01"></path></svg>,
  Filter: () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>,
  Search: () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>,
  Eye: () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>,
  Download: () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>,
  Check: () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>,
  Close: () => <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
  UserPlus: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>,
  Signal: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M23 12h-2"></path><path d="M1 12h2"></path><path d="M12 23v-2"></path><path d="M12 1v2"></path><path d="M20.24 4.24l-1.41 1.41"></path><path d="M5.17 19.31l-1.41 1.41"></path><path d="M19.31 5.17l1.41-1.41"></path><path d="M4.24 20.24l1.41-1.41"></path><circle cx="12" cy="12" r="3"></circle></svg>,
  Play: () => <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>,
  Stop: () => <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h12v12H6z"/></svg>,
  Dollar: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>,
  GripHorizontal: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 16h6"></path><path d="M9 12h6"></path><path d="M9 8h6"></path></svg>,
  CheckCircle: () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"></path></svg>,
  Shield: () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>,
  UserCheck: () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>,
  User: () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>,
  Smartphone: () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>,
  Gamepad: () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="6" y1="12" x2="10" y2="12"></line><line x1="8" y1="10" x2="8" y2="14"></line><line x1="15" y1="13" x2="15.01" y2="13"></line><line x1="18" y1="11" x2="18.01" y2="11"></line><rect x="2" y="6" width="20" height="12" rx="2"></rect></svg>,
  Hash: () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="4" y1="9" x2="20" y2="9"></line><line x1="4" y1="15" x2="20" y2="15"></line><line x1="10" y1="3" x2="8" y2="21"></line><line x1="16" y1="3" x2="14" y2="21"></line></svg>,
  CreditCard: () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>,
  Crown: () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"></path></svg>
};

const styles = `
:root {
  --bg: #050814;
  --card: #0b1022;
  --card-hover: #151b33;
  --accent: #facc15; /* dourado */
  --accent-soft: rgba(250, 204, 21, 0.15);
  --success: #22c55e;
  --success-soft: rgba(34, 197, 94, 0.15);
  --danger: #ef4444;
  --text: #f5f5f5;
  --text-secondary: #9ca3af;
  --border: rgba(148, 163, 184, 0.2);
  --radius-lg: 24px;
  --radius-md: 12px;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
}

body {
  background: #020617; /* Fallback */
  color: var(--text);
  min-height: 100vh;
  overflow-x: hidden;
  position: relative;
}

/* CASINO BACKGROUND FX */
.casino-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0; /* Base level */
  pointer-events: none;
  background: 
    radial-gradient(circle at 50% -20%, rgba(239, 68, 68, 0.15), transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(250, 204, 21, 0.08), transparent 40%),
    #020617; /* Main background color */
  overflow: hidden;
}

/* Ensure content sits on top of background */
.page-container, .signup-wrapper, .dev-toggle {
  position: relative;
  z-index: 2;
}

.dev-toggle {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
  padding: 12px 24px;
  background: var(--accent);
  color: #000;
  border: none;
  border-radius: 99px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: transform 0.2s;
}

.dev-toggle:hover {
  transform: scale(1.05);
}

.floating-item {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  opacity: 0;
  top: 110%; /* Start just below screen */
  animation: floatUp linear infinite;
  box-shadow: 0 4px 20px rgba(0,0,0,0.5);
  font-family: serif; /* For the suit symbol */
  
  /* Defaults */
  --opacity: 0.6;
  --scale: 1;
}

.chip-gold {
  width: 30px; height: 30px;
  background: radial-gradient(circle at 30% 30%, #facc15, #b45309);
  border: 2px dashed #fef08a;
  color: #78350f;
  font-weight: 800;
  font-size: 16px;
}

.chip-red {
  width: 40px; height: 40px;
  background: radial-gradient(circle at 30% 30%, #ef4444, #991b1b);
  border: 2px dashed #fecaca;
  color: #450a0a;
  font-weight: 800;
  font-size: 20px;
}

.chip-black {
  width: 36px; height: 36px;
  background: radial-gradient(circle at 30% 30%, #374151, #000);
  border: 2px dashed #9ca3af;
  color: #fff;
  font-weight: 800;
  font-size: 18px;
}

@keyframes floatUp {
  0% {
    transform: translateY(0) scale(var(--scale)) rotate(0deg);
    opacity: 0;
  }
  10% { opacity: var(--opacity); }
  90% { opacity: var(--opacity); }
  100% {
    transform: translateY(-120vh) scale(var(--scale)) rotate(720deg);
    opacity: 0;
  }
}

/* --- SHARED UTILS --- */
.page-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px;
  width: 100%;
}

.hidden { display: none !important; }

/* --- ADMIN DASHBOARD STYLES --- */
.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 20px;
}

.live-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.live-badge {
  background: var(--danger);
  color: white;
  font-size: 10px;
  font-weight: 800;
  padding: 2px 6px;
  border-radius: 4px;
  text-transform: uppercase;
}
.live-badge.off {
  background: var(--text-secondary);
}

.live-title {
  font-size: 24px;
  font-weight: 700;
  line-height: 1.2;
}

.live-id {
  color: var(--text-secondary);
  font-size: 14px;
  margin-left: 8px;
  font-weight: 400;
}

.admin-subtitle {
  color: var(--text-secondary);
  font-size: 14px;
  margin-top: 4px;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 24px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
  border: none;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;
}

.btn::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transform: translateX(-150%) skewX(-20deg);
  animation: sheen 3.5s infinite;
  pointer-events: none;
}

@keyframes sheen {
  0% { transform: translateX(-150%) skewX(-20deg); }
  15% { transform: translateX(150%) skewX(-20deg); }
  100% { transform: translateX(150%) skewX(-20deg); }
}

.btn:active { transform: scale(0.96); }

.btn-primary {
  background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
  color: #020617;
  box-shadow: 0 0 20px rgba(74, 222, 128, 0.25);
  border: 1px solid rgba(74, 222, 128, 0.5);
  text-shadow: 0 1px 0 rgba(255,255,255,0.2);
}

.btn-primary:hover {
  box-shadow: 0 0 30px rgba(74, 222, 128, 0.5);
  transform: translateY(-2px);
  filter: brightness(1.05);
}

.btn-secondary {
  background: var(--accent);
  color: #020617;
  box-shadow: 0 0 15px rgba(250, 204, 21, 0.4);
}

.btn-danger {
  background: linear-gradient(135deg, #ef4444 0%, #b91c1c 100%);
  color: #ffffff;
  box-shadow: 0 0 20px rgba(239, 68, 68, 0.3);
  border: 1px solid rgba(239, 68, 68, 0.5);
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
}

.btn-danger:hover {
  box-shadow: 0 0 30px rgba(239, 68, 68, 0.6);
  transform: translateY(-2px);
  filter: brightness(1.1);
}

.btn-outline {
  background: rgba(255,255,255,0.05);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  text-transform: none;
}

.btn-full {
  width: 100%;
  justify-content: center;
}

/* KPI CARDS */
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.kpi-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 20px;
  position: relative;
  overflow: hidden;
}

.kpi-card::before {
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
}

.kpi-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.kpi-title {
  font-size: 12px;
  color: var(--text-secondary);
  font-weight: 600;
}

.kpi-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.kpi-icon.purple { background: rgba(168, 85, 247, 0.15); color: #a855f7; }
.kpi-icon.yellow { background: var(--accent-soft); color: var(--accent); }
.kpi-icon.green { background: var(--success-soft); color: var(--success); }

.kpi-value {
  font-size: 28px;
  font-weight: 700;
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.kpi-delta {
  font-size: 11px;
  color: var(--success);
  font-weight: 600;
  background: rgba(34, 197, 94, 0.1);
  padding: 2px 6px;
  border-radius: 99px;
}

/* LIVE STATUS BAR */
.live-status-card {
  background: linear-gradient(180deg, #0f1426 0%, #050814 100%);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 20px 24px;
  margin-bottom: 24px;
}

.live-status-header {
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 16px;
  display: block;
}

.live-status-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  gap: 16px;
}

.status-item-label {
  font-size: 10px;
  color: var(--text-secondary);
  text-transform: uppercase;
  margin-bottom: 4px;
  letter-spacing: 0.5px;
}

.status-item-value {
  font-size: 15px;
  font-weight: 600;
  color: #fff;
}

.status-item-value.highlight { color: var(--success); }
.status-item-value.warning { color: var(--accent); }

/* TABLE CONTROLS */
.table-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  gap: 16px;
  flex-wrap: wrap;
}

.search-bar {
  flex: 1;
  max-width: 500px;
  position: relative;
}

.search-bar svg {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
}

.search-input {
  width: 100%;
  background: #0f121e;
  border: 1px solid var(--border);
  padding: 10px 12px 10px 36px;
  border-radius: 8px;
  color: #fff;
  font-size: 13px;
  outline: none;
}

.search-input:focus {
  border-color: var(--accent);
}

.filter-group {
  display: flex;
  gap: 8px;
}

.dropdown-select {
  background: #0f121e;
  border: 1px solid var(--border);
  color: #fff;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 13px;
  outline: none;
  cursor: pointer;
}

/* DATA TABLE */
.table-container {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.table-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border);
  background: #0d111e;
}

.table-title {
  font-size: 15px;
  font-weight: 700;
}

.table-title span { color: var(--text-secondary); font-weight: 400; margin-left: 4px; }

.table-actions {
  display: flex;
  gap: 10px;
}

.btn-small {
  padding: 6px 12px;
  font-size: 11px;
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(255,255,255,0.05);
  border: 1px solid var(--border);
  color: var(--text);
  cursor: pointer;
}
.btn-small:hover { background: rgba(255,255,255,0.1); }
.btn-small.active { background: var(--accent-soft); color: var(--accent); border-color: var(--accent); }

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th {
  text-align: left;
  padding: 12px 20px;
  font-size: 11px;
  color: var(--text-secondary);
  text-transform: uppercase;
  border-bottom: 1px solid var(--border);
  font-weight: 600;
}

.data-table td {
  padding: 14px 20px;
  font-size: 13px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.05);
  color: #e2e8f0;
}

.data-table tr:hover {
  background: rgba(255,255,255,0.02);
}

.user-cell {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar {
  width: 28px;
  height: 28px;
  border-radius: 99px;
  background: linear-gradient(135deg, #374151, #1f2937);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
  color: var(--text-secondary);
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--success);
}
.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 99px;
  background: var(--success);
  box-shadow: 0 0 8px var(--success);
}

.live-tag {
  background: #1e1b10;
  color: #fbbf24;
  border: 1px solid rgba(251, 191, 36, 0.2);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
}

/* --- SETUP & ROULETTE OVERLAY STYLES --- */
.roulette-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(2, 6, 23, 0.95);
  backdrop-filter: blur(8px);
  z-index: 10000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

/* --- 3D WHEEL STYLES --- */
.casino-stage {
  perspective: 1200px;
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 700px; /* Taller to fit controls */
  background: radial-gradient(circle at center, #2e0202 0%, #000 70%);
  border-radius: 20px;
  box-shadow: 0 0 50px #000 inset, 0 0 20px rgba(250, 204, 21, 0.2);
  position: relative;
  margin-bottom: 20px;
  padding-top: 50px;
}

/* Ambient lights */
.casino-stage::before {
  content: "";
  position: absolute;
  top: -50%; left: -50%; width: 200%; height: 200%;
  background: radial-gradient(circle, rgba(239, 68, 68, 0.1) 0%, transparent 60%);
  z-index: 1;
  pointer-events: none;
}

.wheel-container {
  width: 360px;
  height: 360px;
  position: relative;
  border-radius: 50%;
  transform-style: preserve-3d;
  box-shadow: 
    0 0 0 12px #0f0f0f,
    0 0 0 15px #d4af37,
    0 0 60px rgba(0,0,0,0.8),
    0 20px 40px rgba(0,0,0,0.6);
  z-index: 5;
  margin-bottom: 30px;
  flex-shrink: 0;
}

.wheel-core {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  position: relative;
  transform: rotate(0deg); /* Animates */
  transition: transform 6s cubic-bezier(0.1, 0, 0.2, 1); 
  background: #111;
  overflow: hidden;
  border: 4px solid #d4af37;
}

@keyframes wheelPulse {
  0% { transform: scale(1); filter: brightness(1); }
  50% { transform: scale(1.02); filter: brightness(1.3) drop-shadow(0 0 20px rgba(250, 204, 21, 0.6)); }
  100% { transform: scale(1); filter: brightness(1); }
}

.wheel-hit-effect {
  animation: wheelPulse 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.wheel-center-knob {
  position: absolute;
  top: 50%; left: 50%;
  width: 50px; height: 50px;
  background: radial-gradient(circle at 30% 30%, #ffd700, #b8860b, #5e4304);
  transform: translate(-50%, -50%);
  border-radius: 50%;
  z-index: 20;
  box-shadow: 0 4px 10px rgba(0,0,0,0.8);
  border: 2px solid rgba(255,255,255,0.2);
}

.wheel-center-knob::after {
  content: "";
  position: absolute;
  top: 50%; left: 50%;
  width: 16px; height: 16px;
  background: #333;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 2px solid #b8860b;
}

.wheel-plate {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  border-radius: 50%;
}

.wheel-text-ring {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  pointer-events: none;
}

.wheel-label {
  position: absolute;
  top: 50%; left: 50%;
  height: 50%; 
  width: 40px;
  transform-origin: top center; 
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 15px;
  color: #fff;
  font-size: 11px;
  font-weight: 800;
  text-shadow: 0 1px 2px rgba(0,0,0,0.8);
}
.wheel-label span {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  max-height: 100px;
  overflow: hidden;
}

.wheel-marker {
  position: absolute;
  top: 25px;
  left: 50%;
  transform: translateX(-50%);
  width: 0; height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-top: 30px solid #ef4444; 
  filter: drop-shadow(0 4px 4px rgba(0,0,0,0.5));
  z-index: 30;
}
.wheel-marker::after {
  content: "";
  position: absolute;
  top: -35px; left: -8px;
  width: 16px; height: 16px;
  background: #fff;
  border-radius: 50%;
  border: 3px solid #ef4444;
}

/* Neon Glows around the stage */
.neon-ring {
  position: absolute;
  top: 230px; /* Adjusted manually */
  left: 50%;
  transform: translate(-50%, -50%);
  width: 440px; height: 440px;
  border-radius: 50%;
  border: 2px solid rgba(250, 204, 21, 0.3);
  box-shadow: 0 0 20px rgba(250, 204, 21, 0.1);
  pointer-events: none;
}

/* ROULETTE CONTROLS PANEL */
.roulette-controls {
  width: 100%;
  max-width: 500px;
  background: rgba(11, 16, 34, 0.8);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255,255,255,0.1);
  padding: 20px;
  border-radius: 20px 20px 0 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index: 40;
  position: absolute;
  bottom: 0;
}

.control-section-title {
    font-size: 11px;
    text-transform: uppercase;
    color: var(--text-secondary);
    font-weight: 700;
    margin-bottom: 8px;
    letter-spacing: 0.5px;
    text-align: center;
}

.prize-control {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.prize-header {
  display: flex;
  justify-content: space-between;
  color: var(--text-secondary);
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 700;
}

.prize-value-display {
  font-size: 24px;
  font-weight: 800;
  color: var(--accent);
  text-align: center;
  text-shadow: 0 0 10px rgba(250, 204, 21, 0.3);
}

/* Custom Range Slider */
.prize-slider-container {
  position: relative;
  height: 50px;
  display: flex;
  align-items: center;
}
.prize-slider {
  -webkit-appearance: none;
  width: 100%;
  height: 8px;
  background: #1f2937;
  border-radius: 5px;
  outline: none;
  border: 1px solid rgba(255,255,255,0.1);
}
.prize-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 44px; /* Larger handle */
  height: 44px;
  border-radius: 50%;
  background-color: var(--accent);
  /* Arrows icon */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23020617' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M15 18l6-6-6-6'/%3E%3Cpath d='M9 6l-6 6 6 6'/%3E%3C/svg%3E");
  background-size: 24px;
  background-position: center;
  background-repeat: no-repeat;
  cursor: grab;
  box-shadow: 0 0 20px rgba(250, 204, 21, 0.6);
  border: 3px solid #fff; /* Thicker border */
  position: relative;
  z-index: 2;
  transition: transform 0.1s, box-shadow 0.2s;
}
.prize-slider::-webkit-slider-thumb:hover {
    transform: scale(1.1);
    box-shadow: 0 0 25px rgba(250, 204, 21, 0.8);
}
.prize-slider::-webkit-slider-thumb:active {
    transform: scale(0.95);
    cursor: grabbing;
}
/* Firefox */
.prize-slider::-moz-range-thumb {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: var(--accent);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23020617' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M15 18l6-6-6-6'/%3E%3Cpath d='M9 6l-6 6 6 6'/%3E%3C/svg%3E");
  background-size: 24px;
  background-position: center;
  background-repeat: no-repeat;
  cursor: grab;
  box-shadow: 0 0 20px rgba(250, 204, 21, 0.6);
  border: 3px solid #fff;
  transition: transform 0.1s;
}

.filter-pills {
  display: flex;
  gap: 8px;
  justify-content: center;
}
.filter-pill {
  padding: 8px 16px;
  border-radius: 99px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  color: var(--text-secondary);
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
}
.filter-pill.active {
  background: var(--accent-soft);
  border-color: var(--accent);
  color: var(--accent);
}

.spin-btn-large {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #facc15, #ca8a04);
  color: #000;
  font-weight: 900;
  font-size: 18px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 0 20px rgba(250, 204, 21, 0.4);
  transition: transform 0.1s;
}
.spin-btn-large:active { transform: scale(0.98); }
.spin-btn-large:disabled { opacity: 0.5; cursor: not-allowed; filter: grayscale(1); }

.winner-display-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.85);
  z-index: 50;
  animation: fadeIn 0.5s ease-out;
  border-radius: 20px;
}

.winner-card-big {
  background: linear-gradient(135deg, #1e1b4b 0%, #000 100%);
  padding: 40px;
  border-radius: 20px;
  border: 2px solid #facc15;
  box-shadow: 0 0 50px rgba(250, 204, 21, 0.3);
  text-align: center;
  transform: scale(0.9);
  animation: popIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

.close-roulette {
  margin-top: 32px;
  background: transparent;
  border: 1px solid var(--text-secondary);
  color: var(--text-secondary);
  padding: 8px 16px;
  border-radius: 99px;
  cursor: pointer;
}
.close-roulette:hover { border-color: #fff; color: #fff; }

/* --- SIGNUP PAGE SPECIFIC --- */
.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: start;
  position: relative;
  z-index: 10;
  padding: 40px 0;
}

.hero-left {
  padding-top: 20px;
}

.premium-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 999px;
  background: rgba(250, 204, 21, 0.1);
  border: 1px solid rgba(250, 204, 21, 0.3);
  color: #facc15;
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 16px;
  box-shadow: 0 0 15px rgba(250, 204, 21, 0.15);
}

.hero-title {
  font-size: 42px;
  line-height: 1.1;
  margin-bottom: 12px;
  font-weight: 800;
  letter-spacing: -1px;
  color: #fff;
}

.hero-subtitle {
  font-size: 15px;
  color: var(--text-secondary);
  margin-bottom: 32px;
  line-height: 1.5;
  max-width: 90%;
}

.benefit-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 32px;
}

.benefit-item {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 14px;
  color: #e2e8f0;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 16px 20px;
  border-radius: 16px;
  transition: transform 0.2s, background 0.2s;
}

.benefit-item:hover {
  background: rgba(255, 255, 255, 0.06);
  transform: translateX(4px);
  border-color: rgba(250, 204, 21, 0.2);
}

.benefit-icon {
  color: #facc15;
  background: rgba(250, 204, 21, 0.1);
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.hero-right {
  position: relative;
  padding: 32px;
  border-radius: 24px;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.05) inset;
}

/* Glass shine effect */
.hero-right::after {
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
}

.form-header {
  margin-bottom: 24px;
}

.form-title {
  font-size: 20px;
  font-weight: 800;
  margin-bottom: 6px;
  color: #fff;
}

.form-subtitle {
  font-size: 13px;
  color: var(--text-secondary);
}

form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--text-secondary);
  letter-spacing: 0.5px;
  margin-left: 4px;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 16px;
  color: var(--text-secondary);
  pointer-events: none;
  display: flex;
}

.required {
  color: var(--accent);
  margin-left: 2px;
}

input[type="text"],
input[type="tel"],
input[type="password"] {
  height: 48px;
  width: 100%;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0 16px 0 48px; /* Added padding left for icon */
  font-size: 14px;
  color: #fff;
  outline: none;
  transition: all 0.2s;
}

input::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

input:focus {
  border-color: var(--accent);
  background: rgba(0, 0, 0, 0.5);
  box-shadow: 0 0 0 4px rgba(250, 204, 21, 0.1);
}

input:focus + .input-icon {
  color: var(--accent);
}

.checkbox-row {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-top: 4px;
  padding: 0 4px;
}

.checkbox-row input {
  margin-top: 3px;
  accent-color: var(--accent);
  width: 16px;
  height: 16px;
  padding: 0;
}

.checkbox-row span {
  font-size: 12px;
  color: var(--text-secondary);
  line-height: 1.5;
}

.checkbox-row a {
  color: var(--accent);
  text-decoration: none;
  border-bottom: 1px dashed rgba(250, 204, 21, 0.5);
}

.btn-submit {
  margin-top: 12px;
  height: 52px;
  border-radius: 14px;
  border: none;
  background: linear-gradient(135deg, #facc15 0%, #ca8a04 100%);
  color: #020617;
  font-weight: 800;
  font-size: 15px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 20px rgba(250, 204, 21, 0.25);
  transition: all 0.2s;
  position: relative;
  overflow: hidden;
}

.btn-submit::before {
  content: "";
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: linear-gradient(rgba(255,255,255,0.2), transparent);
  opacity: 0;
  transition: opacity 0.2s;
}

.btn-submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(250, 204, 21, 0.4);
}
.btn-submit:hover::before { opacity: 1; }

.btn-submit:active {
  transform: translateY(0);
}

.btn-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  filter: grayscale(0.5);
}

.form-footer {
  margin-top: 20px;
  font-size: 11px;
  color: var(--text-secondary);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.badge-age {
  padding: 4px 10px;
  border-radius: 6px;
  background: rgba(0,0,0,0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 10px;
  font-weight: 600;
  color: #94a3b8;
}

.steps {
  margin-top: 60px;
  padding: 0;
  background: transparent;
  border: none;
}
.steps::before { display: none; }

.steps-header {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.steps-title {
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 10px;
}
.steps-title svg { color: var(--accent); }

.steps-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

/* Redesigned Step Cards to match reference */
.step-card {
  padding: 20px;
  border-radius: 16px;
  background: #0f121e; /* Darker bg */
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.step-number {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: rgba(250, 204, 21, 0.1);
  border: 1px solid rgba(250, 204, 21, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: var(--accent);
  margin-bottom: 0;
}

.step-title {
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 4px;
  color: #fff;
}

.step-text {
  font-size: 12px;
  color: #9ca3af;
  line-height: 1.5;
}

.toggle-text {
  font-size: 13px;
  color: var(--text-secondary);
  margin-top: 4px;
}

.toggle-text a {
  color: var(--accent);
  text-decoration: none;
  font-weight: 700;
  cursor: pointer;
  margin-left: 4px;
}
.toggle-text a:hover {
  text-decoration: underline;
}

.tag-live {
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(250, 204, 21, 0.1);
  color: #facc15;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border: 1px solid rgba(250, 204, 21, 0.2);
  box-shadow: 0 0 10px rgba(250, 204, 21, 0.1);
}

.pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(148, 163, 184, 0.2);
  font-size: 12px;
  color: var(--text-secondary);
  margin-bottom: 24px;
}

.pill-dot {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: #22c55e;
  box-shadow: 0 0 8px #22c55e;
}

.hero-badges {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}

.hero-metrics {
  display: flex;
  gap: 16px;
  margin-top: 12px;
  flex-wrap: wrap;
}

.metric {
  flex: 1;
  min-width: 140px;
  padding: 16px;
  border-radius: 16px;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.metric-label {
  font-size: 11px;
  color: var(--text-secondary);
  text-transform: uppercase;
  margin-bottom: 4px;
}

.metric-value {
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 4px;
}

.metric-tag {
  font-size: 10px;
  color: var(--accent);
  display: flex;
  align-items: center;
  gap: 4px;
}
.metric-tag::before {
  content: "";
  display: block;
  width: 4px; height: 4px;
  background: currentColor;
  border-radius: 50%;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-logo {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(135deg, #facc15, #b45309);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 20px;
  color: #111;
  box-shadow: 0 0 15px rgba(250, 204, 21, 0.3);
}

.brand-text-title {
  font-weight: 700;
  font-size: 16px;
  color: #fff;
}

.brand-text-handle {
  font-size: 12px;
  color: var(--text-secondary);
}

/* --- CONFETTI FX --- */
.confetti-container {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 45;
}
.confetti-piece {
  position: absolute;
  width: 10px; height: 10px;
  background: #facc15;
  animation: fall linear forwards;
}

@keyframes fall {
  0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
  100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
}

@media (max-width: 900px) {
  .hero { grid-template-columns: minmax(0, 1fr); gap: 40px; }
  .live-status-grid { grid-template-columns: 1fr 1fr; gap: 20px; }
  .steps-grid { grid-template-columns: 1fr; }
  .hero-right { padding: 24px; }
  .hero-title { font-size: 32px; }
}

/* MOBILE OPTIMIZATIONS */
@media (max-width: 600px) {
  .page-container {
    padding: 16px;
  }

  header {
    align-items: center; /* Centered header */
    gap: 12px;
  }
  
  .brand {
    flex-direction: column;
    text-align: center;
  }

  .tag-live {
    font-size: 10px;
    padding: 4px 10px;
  }

  .hero {
    display: flex;
    flex-direction: column;
    padding: 10px 0;
    gap: 20px;
  }
  
  /* Hide standard hero left content on mobile, we will show specific parts */
  .hero-left {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding-top: 10px;
  }
  
  .benefit-list, .hero-metrics, .pill {
    display: none; /* Simplify top section on mobile to match reference */
  }

  .hero-title {
    font-size: 28px;
    margin-bottom: 8px;
  }
  
  .hero-subtitle {
    font-size: 14px;
    margin-bottom: 24px;
    max-width: 100%;
  }

  .hero-right {
    padding: 24px 20px;
    border-radius: 20px;
    width: 100%;
  }
  
  .form-title {
    font-size: 18px;
  }
  
  /* Steps section styling for mobile list view */
  .steps {
    padding: 10px;
    margin-top: 30px;
  }
  
  .steps-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  .step-card {
    flex-direction: row; /* Horizontal layout for step cards on mobile */
    align-items: center;
    padding: 16px;
  }
  
  .step-number {
    width: 40px;
    height: 40px;
    flex-shrink: 0;
    margin-bottom: 0;
  }
  
  .step-content {
    text-align: left;
  }
  
  .step-title {
    margin-bottom: 2px;
    font-size: 13px;
  }
  
  .step-text {
    font-size: 11px;
    line-height: 1.3;
  }

  /* Better touch targets and prevent iOS zoom */
  input[type="text"],
  input[type="tel"],
  input[type="password"] {
    font-size: 16px; 
    height: 50px;
  }
  
  .btn-submit {
    height: 56px;
  }

  /* Adjust casino background items for performance/visibility on mobile */
  .floating-item {
    --scale: 0.5; /* Force smaller items */
  }
}
`;

// --- DATA TYPES ---
interface Participant {
  id: string;
  name: string;
  whatsapp: string;
  platformId: string;
  cpf: string;
  date: string;
  live: string;
  status: 'eligible' | 'disqualified';
  isNew?: boolean;
  attended?: boolean;
  hasWon?: boolean;
  participationCount: number; // New Field
}

// Function to map DB data to our frontend Interface
const mapSupabaseDataToParticipant = (data: any[]): Participant[] => {
  return data.map(item => ({
    id: item.id,
    name: item.name,
    whatsapp: item.whatsapp,
    platformId: item.platform_id,
    cpf: item.cpf,
    date: new Date(item.created_at).toLocaleString('pt-BR'),
    live: 'Live Oficial',
    status: 'eligible', // Default status or add to DB
    isNew: item.is_new,
    attended: item.attended,
    hasWon: item.has_won,
    participationCount: item.participation_count
  }));
};

// --- COMPONENTS ---

// New Casino Background Component
function CasinoBackground() {
  const items = Array.from({ length: 50 }).map((_, i) => {
    const types = ['chip-gold', 'chip-red', 'chip-black'];
    const type = types[Math.floor(Math.random() * types.length)];
    const left = Math.floor(Math.random() * 100) + '%';
    const delay = (Math.random() * -40).toFixed(2) + 's';
    const duration = (Math.random() * 20 + 10).toFixed(2) + 's';
    const opacity = (Math.random() * 0.5 + 0.2).toFixed(2);
    const scale = (Math.random() * 0.6 + 0.4).toFixed(2);
    
    return (
      <div 
        key={i} 
        className={`floating-item ${type}`}
        style={{ 
          left, 
          animationDelay: delay, 
          animationDuration: duration,
          '--opacity': opacity,
          '--scale': scale,
        } as React.CSSProperties}
      >
        ♦
      </div>
    );
  });

  return <div className="casino-bg">{items}</div>;
}

function Confetti() {
  const pieces = Array.from({ length: 100 }).map((_, i) => {
    const left = Math.random() * 100 + '%';
    const delay = Math.random() * 1 + 's';
    const duration = Math.random() * 2 + 2 + 's';
    const bg = ['#facc15', '#ef4444', '#fff', '#22c55e'][Math.floor(Math.random() * 4)];
    
    return (
      <div 
        key={i} 
        className="confetti-piece"
        style={{
          left,
          animationDelay: delay,
          animationDuration: duration,
          backgroundColor: bg
        }}
      />
    );
  });
  return <div className="confetti-container">{pieces}</div>;
}

type FilterType = 'all' | 'new' | 'attended';

// 3D CASINO WHEEL COMPONENT
function RouletteModal({ data, onClose }: { data: Participant[]; onClose: () => void }) {
  const [winner, setWinner] = useState<Participant | null>(null);
  const [rotation, setRotation] = useState(0);
  const [wheelSegments, setWheelSegments] = useState<Participant[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [prizeValue, setPrizeValue] = useState(100);
  const [hasStarted, setHasStarted] = useState(false);
  const [spinFinished, setSpinFinished] = useState(false);
  const [hitEffect, setHitEffect] = useState(false);
  
  const SEGMENTS_COUNT = 16; 
  const SPIN_ROUNDS = 5; 
  const DURATION = 6; 

  useEffect(() => {
    generateSegments(data);
  }, [data]);

  const generateSegments = (sourceData: Participant[]) => {
      const segments: Participant[] = [];
      if (sourceData.length === 0) return;
      for (let i = 0; i < SEGMENTS_COUNT; i++) {
        const randomP = sourceData[Math.floor(Math.random() * sourceData.length)];
        segments.push(randomP);
      }
      setWheelSegments(segments);
  };

  const getFilteredData = () => {
    let result = data;
    if (filter === 'new') result = data.filter(p => p.isNew);
    if (filter === 'attended') result = data.filter(p => p.attended);
    // Important: Filter out people who already won
    result = result.filter(p => !p.hasWon);
    return result;
  };

  const handleSpin = async () => {
    if (hasStarted) return; 

    const eligibleData = getFilteredData();
    if (eligibleData.length === 0) {
        alert("Nenhum participante elegível encontrado com este filtro!");
        return;
    }

    setHasStarted(true);
    const randomIndex = Math.floor(Math.random() * eligibleData.length);
    const selectedWinner = eligibleData[randomIndex];
    setWinner(selectedWinner);
    
    // UPDATE DB IMMEDIATELY TO PREVENT DOUBLE WINS
    if (supabase) {
      await supabase.from('participants').update({ has_won: true }).eq('id', selectedWinner.id);
    }

    const segments: Participant[] = [];
    const winnerSegmentIndex = Math.floor(Math.random() * SEGMENTS_COUNT);
    // Fill segments with eligible players
    const fillerData = eligibleData.length < SEGMENTS_COUNT ? data : eligibleData;

    for (let i = 0; i < SEGMENTS_COUNT; i++) {
        if (i === winnerSegmentIndex) {
            segments.push(selectedWinner);
        } else {
            const randomP = fillerData[Math.floor(Math.random() * fillerData.length)];
            segments.push(randomP);
        }
    }
    setWheelSegments(segments);

    const segmentSize = 360 / SEGMENTS_COUNT;
    // Align center of the winner segment to the top (marker)
    const targetAngle = (winnerSegmentIndex * segmentSize) + (segmentSize / 2);
    // Add small random jitter for realism within the segment (+/- 40% of segment size)
    const jitter = (Math.random() * segmentSize * 0.8) - (segmentSize * 0.4);

    const adjustment = (360 - targetAngle) + jitter; 
    const totalRotation = (SPIN_ROUNDS * 360) + adjustment;

    setTimeout(() => {
       setRotation(totalRotation);
       
       // Trigger hit effect right after rotation finishes
       setTimeout(() => {
         setHitEffect(true);
       }, DURATION * 1000);

       // Show modal shortly after hit effect
       setTimeout(() => {
         setSpinFinished(true);
       }, DURATION * 1000 + 1000);
    }, 100);
  };

  const generateConicGradient = () => {
      let str = 'conic-gradient(';
      const degPerSeg = 360 / SEGMENTS_COUNT;
      for (let i=0; i<SEGMENTS_COUNT; i++) {
          const color = i % 2 === 0 ? '#ef4444' : '#111827'; 
          const start = i * degPerSeg;
          const end = (i+1) * degPerSeg;
          str += `${color} ${start}deg ${end}deg,`;
      }
      str = str.slice(0, -1) + ')';
      return str;
  }

  const eligibleCount = getFilteredData().length;

  return (
    <div className="roulette-overlay">
       {spinFinished && <Confetti />}
       <div className="casino-stage">
            <div className="neon-ring"></div>
            <div className="wheel-marker"></div>
            <div className={`wheel-container ${hitEffect ? 'wheel-hit-effect' : ''}`}>
                <div 
                    className="wheel-core"
                    style={{ 
                        transform: `rotate(${rotation}deg)`,
                        transition: `transform ${DURATION}s cubic-bezier(0.1, 1, 0.2, 1)` // Smooth deceleration
                    }}
                >
                    <div className="wheel-plate" style={{ background: generateConicGradient() }}></div>
                    <div className="wheel-text-ring">
                        {wheelSegments.map((p, i) => {
                            const degPerSeg = 360 / SEGMENTS_COUNT;
                            const angle = (i * degPerSeg) + (degPerSeg / 2);
                            return (
                                <div 
                                    key={i} 
                                    className="wheel-label"
                                    style={{ transform: `translate(-50%, -50%) rotate(${angle}deg) translate(0, -50%)`, top: '50%', left: '50%', transformOrigin: 'center' }}
                                >
                                    <span>{p.name.split(' ')[0]}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="wheel-center-knob"></div>
            </div>

            {!hasStarted && (
                <div className="roulette-controls">
                    <div className="filter-section">
                        <div className="control-section-title">Filtrar Participantes</div>
                        <div className="filter-pills">
                            <div className={`filter-pill ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}><Icons.Users /> Todos</div>
                            <div className={`filter-pill ${filter === 'new' ? 'active' : ''}`} onClick={() => setFilter('new')}><Icons.UserPlus /> Novos</div>
                            <div className={`filter-pill ${filter === 'attended' ? 'active' : ''}`} onClick={() => setFilter('attended')}><Icons.Signal /> Presentes</div>
                        </div>
                    </div>

                    <div className="prize-control">
                        <div className="control-section-title" style={{ marginTop: '10px' }}>Definir Prêmio</div>
                        <div className="prize-header"><span>Valor do Sorteio</span></div>
                        <div className="prize-value-display">R$ {prizeValue},00</div>
                        <div className="prize-slider-container">
                             <input type="range" min="10" max="1000" step="10" value={prizeValue} onChange={(e) => setPrizeValue(Number(e.target.value))} className="prize-slider"/>
                        </div>
                    </div>

                    <button className="spin-btn-large" onClick={handleSpin} disabled={eligibleCount === 0}>
                        {eligibleCount > 0 ? 'GIRAR ROLETA' : 'NINGUÉM ELEGÍVEL'}
                    </button>
                    <div style={{textAlign: 'center', fontSize: '11px', color: 'var(--text-secondary)'}}>
                        {eligibleCount} participantes elegíveis
                    </div>
                    <div style={{textAlign: 'center', marginTop: '-10px'}}>
                         <button onClick={onClose} style={{background:'transparent', border:'none', color:'var(--text-secondary)', fontSize:'12px', cursor:'pointer', textDecoration:'underline'}}>Cancelar</button>
                    </div>
                </div>
            )}

            {spinFinished && winner && (
                <div className="winner-display-overlay">
                    <div className="winner-card-big">
                        <div style={{ fontSize: '40px', marginBottom: '10px' }}>🎉</div>
                        <div className="winner-title" style={{ color: '#facc15', fontSize: '18px', letterSpacing: '4px' }}>VENCEDOR</div>
                        <div className="winner-name" style={{ fontSize: '36px', color: '#fff' }}>{winner.name}</div>
                        
                        <div style={{ background: 'rgba(250, 204, 21, 0.1)', padding: '10px 20px', borderRadius: '12px', margin: '15px 0', border: '1px solid rgba(250, 204, 21, 0.3)' }}>
                            <div style={{ fontSize: '12px', color: '#facc15', textTransform: 'uppercase', fontWeight: 700 }}>Prêmio</div>
                            <div style={{ fontSize: '24px', fontWeight: 800, color: '#fff' }}>R$ {prizeValue},00</div>
                        </div>

                        <div className="winner-id">ID: {winner.platformId}</div>
                        <div className="winner-id">CPF: {winner.cpf.substring(0,3)}...</div>
                        
                        <button className="close-roulette" onClick={onClose} style={{ marginTop: '30px', borderColor: '#facc15', color: '#facc15' }}>
                            <Icons.Check /> Confirmar e Fechar
                        </button>
                    </div>
                </div>
            )}
       </div>
    </div>
  );
}

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!supabase) {
        setError("Erro de configuração do Supabase.");
        setLoading(false);
        return;
    }

    const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        setError(error.message);
    } else {
        // Auth state change will handle the redirect in App component
    }
    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', position: 'relative', zIndex: 10 }}>
      <section className="hero-right" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="form-header">
           <div className="form-title" style={{ textAlign: 'center', fontSize: '20px' }}>🔒 Acesso Restrito</div>
           <div className="form-subtitle" style={{ textAlign: 'center' }}>Painel Administrativo do Mimoso</div>
        </div>
        
        <form onSubmit={handleLogin}>
          <div className="field-group">
            <label>Email</label>
            <div className="input-wrapper">
              <span className="input-icon"><Icons.User /></span>
              <input 
                type="text" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="admin@exemplo.com"
                required 
              />
            </div>
          </div>
          
          <div className="field-group">
            <label>Senha</label>
            <div className="input-wrapper">
              <span className="input-icon"><Icons.Shield /></span>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Senha"
                required 
              />
            </div>
          </div>

          {error && <div className="form-feedback error">{error}</div>}

          <button type="submit" className="btn-submit" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
            <span>{loading ? "Entrando..." : "Acessar Painel"}</span>
          </button>
        </form>
      </section>
    </div>
  );
}

function AdminDashboard({ data, onLogout }: { data: Participant[], onLogout: () => void }) {
  const [showSensitive, setShowSensitive] = useState(false);
  const [rouletteState, setRouletteState] = useState<'closed' | 'spinning'>('closed');
  const [liveActive, setLiveActive] = useState(true);
  const [totalLives, setTotalLives] = useState(128); 
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const today = new Date();
    setCurrentDate(today.toLocaleDateString('pt-BR'));
  }, []);

  const toggleLive = () => {
    if (liveActive) {
      setLiveActive(false);
    } else {
      setLiveActive(true);
      setTotalLives(prev => prev + 1);
    }
  };

  const formatSensitive = (value: string, type: 'phone' | 'cpf') => {
    if (showSensitive) {
      if (type === 'phone') {
        return `(${value.substring(0,2)}) ${value.substring(2,7)}-${value.substring(7)}`;
      }
      return `${value.substring(0,3)}.${value.substring(3,6)}.${value.substring(6,9)}-${value.substring(9)}`;
    }
    
    if (type === 'phone') {
      return `(${value.substring(0,2)}) *****-${value.substring(7)}`;
    }
    return `${value.substring(0,3)}.${value.substring(3,6)}.***-**`;
  };

  const handleExportCSV = () => {
    const headers = ["ID", "Nome", "WhatsApp", "ID Plataforma", "CPF", "Data", "Live", "Status", "Novo", "Compareceu", "Ganhou", "Total Participações"];
    const rows = data.map(user => [
      user.id,
      `"${user.name}"`, 
      user.whatsapp,
      user.platformId,
      user.cpf,
      user.date,
      user.live,
      user.status,
      user.isNew ? "Sim" : "Não",
      user.attended ? "Sim" : "Não",
      user.hasWon ? "Sim" : "Não",
      user.participationCount.toString()
    ]);

    const csvContent = "\uFEFF" + [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `participantes_sorteio_${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalParticipantes = data.length; 
  const totalElegiveis = data.filter(p => !p.hasWon).length; 
  const totalPremiados = data.filter(p => p.hasWon).length; 

  return (
    <div className="page-container">
      {rouletteState === 'spinning' && (
         <RouletteModal 
            data={data} 
            onClose={() => setRouletteState('closed')} 
         />
      )}
      
      {/* HEADER */}
      <header className="admin-header">
        <div>
          <div className="live-indicator">
            <span className={`live-badge ${liveActive ? '' : 'off'}`}>
                {liveActive ? 'AO VIVO' : 'OFFLINE'}
            </span>
            <span className="live-id">Live ({currentDate})</span>
          </div>
          <h1 className="live-title">Sorteio {liveActive ? 'Em Andamento' : 'Pausado'}</h1>
          <p className="admin-subtitle">
             {liveActive 
               ? "Em andamento - Clique em (realizar sorteio) para sortear os usuários cadastrados." 
               : "Live encerrada. Inicie uma nova live para habilitar os sorteios."}
          </p>
        </div>
        <div className="header-actions">
           <button className="btn btn-outline" onClick={onLogout}>
              Sair
           </button>
          <button 
             className={`btn ${liveActive ? 'btn-danger' : 'btn-primary'}`} 
             onClick={toggleLive}
          >
            {liveActive ? <Icons.Stop /> : <Icons.Play />}
            {liveActive ? 'ENCERRAR LIVE' : 'INICIAR LIVE'}
          </button>

          <button className="btn btn-primary" onClick={() => setRouletteState('spinning')} disabled={!liveActive} style={{ opacity: liveActive ? 1 : 0.5 }}>
            <Icons.Dice />
            REALIZAR SORTEIO
          </button>
        </div>
      </header>

      {/* KPI CARDS */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Total de Participantes</span>
            <div className="kpi-icon green"><Icons.Users /></div>
          </div>
          <div className="kpi-value">
            {totalParticipantes.toLocaleString()}
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Elegíveis para Sorteio</span>
            <div className="kpi-icon purple"><Icons.Check /></div>
          </div>
          <div className="kpi-value">{totalElegiveis.toLocaleString()}</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Já foram Premiados</span>
            <div className="kpi-icon yellow"><Icons.Trophy /></div>
          </div>
          <div className="kpi-value">{totalPremiados}</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Total de Lives</span>
            <div className="kpi-icon purple"><Icons.Gift /></div>
          </div>
          <div className="kpi-value">{totalLives}</div>
        </div>
      </div>

      {/* DETALHES DA LIVE SELECIONADA */}
      <div className="live-status-card">
        <span className="live-status-header">Estatísticas da Live Selecionada</span>
        <div className="live-status-grid">
          <div>
            <div className="status-item-label">Live</div>
            <div className="status-item-value">Live ({currentDate})</div>
          </div>
          <div>
            <div className="status-item-label">Status</div>
            <div className={`status-item-value ${liveActive ? 'highlight' : 'warning'}`}>
                {liveActive ? 'Ao Vivo' : 'Encerrada'}
            </div>
          </div>
          <div>
            <div className="status-item-label">Elegíveis (Hoje)</div>
            <div className="status-item-value highlight">{data.length}</div>
          </div>
          <div>
            <div className="status-item-label">Novos (Hoje)</div>
            <div className="status-item-value warning">{data.filter(x => x.isNew).length}</div>
          </div>
        </div>
      </div>

      {/* TABELA E CONTROLES */}
      <div>
        <div className="table-toolbar">
          <select className="dropdown-select" style={{ minWidth: '280px' }}>
            <option>Live atual ({currentDate}) - {data.length} participantes</option>
            <option>Live anterior - 500 participantes</option>
          </select>

          <div className="search-bar">
            <Icons.Search />
            <input type="text" className="search-input" placeholder="Buscar por nome, WhatsApp, CPF ou ID..." />
          </div>

          <div className="filter-group">
            <select className="dropdown-select">
              <option>Todos os Status</option>
              <option>Elegíveis</option>
              <option>Desclassificados</option>
            </select>
            <select className="dropdown-select">
              <option>Mais Recentes Primeiro</option>
              <option>Mais Antigos Primeiro</option>
            </select>
          </div>
        </div>

        <div className="table-container">
          <div className="table-header-row">
            <div className="table-title">Cadastros <span>({data.length})</span></div>
            <div className="table-actions">
              <button className="btn-small" onClick={handleExportCSV}>
                <Icons.Download /> Exportar CSV
              </button>
              <button 
                className={`btn-small ${showSensitive ? 'active' : ''}`} 
                onClick={() => setShowSensitive(!showSensitive)}
              >
                <Icons.Eye /> Mostrar Dados
              </button>
            </div>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Whatsapp</th>
                <th>ID Plataforma</th>
                <th>CPF</th>
                <th>Data de Cadastro</th>
                <th>Participou de</th>
                <th>Status de Prêmio</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="user-cell">
                      <div className="avatar">
                        {user.name.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase()}
                      </div>
                      <span style={{ fontWeight: 600 }}>{user.name}</span>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontFamily: 'monospace', color: showSensitive ? '#fff' : 'inherit' }}>
                      {formatSensitive(user.whatsapp, 'phone')}
                    </span>
                  </td>
                  <td>{user.platformId}</td>
                  <td>
                    <span style={{ fontFamily: 'monospace', color: showSensitive ? '#fff' : 'inherit' }}>
                      {formatSensitive(user.cpf, 'cpf')}
                    </span>
                  </td>
                  <td>{user.date}</td>
                  <td>
                    <div style={{display:'flex', flexDirection:'column', gap:'4px'}}>
                       <span className="live-tag">🏆 {user.participationCount} {user.participationCount === 1 ? 'live' : 'lives'}</span>
                    </div>
                  </td>
                  <td>
                    <span className="status-badge">
                      <span className="status-dot"></span>
                      {user.hasWon ? <span style={{color: 'var(--accent)'}}>PREMIADO</span> : 'Elegível'}
                    </span>
                  </td>
                  <td>
                    <button className="btn-small" style={{ border: 'none', background: 'transparent' }}>...</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// --- SIGNUP COMPONENT (UPDATED) ---
interface SignupViewProps {
  onSignup: (data: any) => Promise<{success: boolean, message: string}>;
  onCheckIn: (data: any) => Promise<{success: boolean, message: string}>;
}

function SignupView({ onSignup, onCheckIn }: SignupViewProps) {
    const [isLoginMode, setIsLoginMode] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [feedback, setFeedback] = useState({ text: "", type: "" });
    const [participantes] = useState(15551); 

    const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFeedback({ text: "", type: "" });
        const form = e.currentTarget;
        const formData = new FormData(form);
        
        if (!formData.get("nome")) {
          setFeedback({ text: "Preencha todos os campos obrigatórios.", type: "error" });
          return;
        }

        setIsSubmitting(true);
        
        const payload = {
          nome: formData.get("nome") as string,
          whatsapp: formData.get("whatsapp") as string,
          idPlataforma: formData.get("idPlataforma") as string,
          cpf: formData.get("cpf") as string,
        };

        const result = await onSignup(payload);
        
        if (result.success) {
            setFeedback({ text: result.message, type: "success" });
            form.reset();
        } else {
            setFeedback({ text: result.message, type: "error" });
        }
        
        setIsSubmitting(false);
    };

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFeedback({ text: "", type: "" });
        const form = e.currentTarget;
        const formData = new FormData(form);
        
        const cpf = formData.get("cpf-login") as string;
        const nome = formData.get("nome-login") as string;
        
        if (!cpf || !nome) {
            setFeedback({ text: "Preencha o CPF e o Nome para marcar presença.", type: "error" });
            return;
        }
        
        setIsSubmitting(true);
        
        const result = await onCheckIn({ cpf, nome });
        if (result.success) {
            setFeedback({ text: result.message, type: "success" });
            form.reset();
        } else {
            setFeedback({ text: result.message, type: "error" });
        }
        setIsSubmitting(false);
    };

    const localToggle = (e: React.MouseEvent, mode: 'login' | 'signup') => {
        e.preventDefault();
        setIsLoginMode(mode === 'login');
        setFeedback({ text: "", type: "" });
    }

    return (
        <div className="signup-wrapper">
            <div className="page page-signup">
                <header>
                    <div className="brand">
                        <div className="brand-logo"><span>M</span></div>
                        <div>
                            <div className="brand-text-title">Sorteios do Mimoso</div>
                            <div className="brand-text-handle">@mimoso.gameplay</div>
                        </div>
                    </div>
                    <div className="tag-live">Painel oficial dos sorteios ao vivo</div>
                </header>

                <main className="hero">
                    <section className="hero-left">
                        <div className="premium-pill"><Icons.Crown /> Sorteio Premium</div>
                        <h1 className="hero-title">Cadastre-se e entre na lista oficial dos sorteios do Mimoso.</h1>
                        <p className="hero-subtitle">Preencha seus dados uma única vez e participe dos sorteios que o Mimoso fizer ao vivo, de forma segura, organizada e transparente.</p>
                        
                        <div className="benefit-list">
                          <div className="benefit-item">
                            <div className="benefit-icon"><Icons.CheckCircle /></div>
                            <span>Sorteio 100% aleatório e auditável</span>
                          </div>
                          <div className="benefit-item">
                            <div className="benefit-icon"><Icons.Shield /></div>
                            <span>Seus dados protegidos com criptografia</span>
                          </div>
                          <div className="benefit-item">
                            <div className="benefit-icon"><Icons.UserCheck /></div>
                            <span>Apenas 1 cadastro por pessoa (CPF)</span>
                          </div>
                        </div>

                        <div className="hero-metrics">
                            <div className="metric"><div className="metric-label">Participantes</div><div className="metric-value">{participantes}</div><div className="metric-tag">Atualiza em tempo real</div></div>
                            <div className="metric"><div className="metric-label">Prêmios de hoje</div><div className="metric-value">Bancas, PIX, brindes</div><div className="metric-tag">Definidos pelo Mimoso</div></div>
                        </div>
                    </section>
                    <section className="hero-right">
                        {!isLoginMode && (
                          <div className="form-header">
                            <div className="form-title">Cadastrar-se no sorteio</div>
                            <div className="form-subtitle">Preencha com atenção. Usaremos esses dados para validar o ganhador.</div>
                          </div>
                        )}
                        {!isLoginMode ? (
                          <form onSubmit={handleSignup}>
                            <div className="field-group">
                                <label>Nome completo<span className="required">*</span></label>
                                <div className="input-wrapper">
                                    <span className="input-icon"><Icons.User /></span>
                                    <input name="nome" type="text" placeholder="Seu nome completo" required />
                                </div>
                            </div>
                            
                            <div className="field-group">
                                <label>WhatsApp (com DDD)<span className="required">*</span></label>
                                <div className="input-wrapper">
                                    <span className="input-icon"><Icons.Smartphone /></span>
                                    <input name="whatsapp" type="tel" placeholder="(11) 99999-9999" required />
                                </div>
                            </div>
                            
                            <div className="field-group">
                                <label>ID / Usuário da plataforma<span className="required">*</span></label>
                                <div className="input-wrapper">
                                    <span className="input-icon"><Icons.Gamepad /></span>
                                    <input name="idPlataforma" type="text" placeholder="Seu ID na plataforma" required />
                                </div>
                            </div>
                            
                            <div className="field-group">
                                <label>CPF<span className="required">*</span></label>
                                <div className="input-wrapper">
                                    <span className="input-icon"><Icons.Hash /></span>
                                    <input name="cpf" type="text" placeholder="000.000.000-00" required />
                                </div>
                            </div>

                            <div className="checkbox-row"><input type="checkbox" required /><span>Li e aceito os termos do sorteio e autorizo o uso dos meus dados apenas para fins de validação do prêmio. <a href="#">Ver termos</a>.</span></div>
                            <button type="submit" className="btn-submit" disabled={isSubmitting}>{isSubmitting ? <span>Enviando...</span> : <span>Participar do sorteio</span>}</button>
                            <div className="toggle-text" style={{ marginTop: "8px", textAlign: 'center' }}>
                              Já tem cadastro? <a href="#" onClick={(e) => localToggle(e, 'login')}>Clique aqui para entrar</a>.
                            </div>
                          </form>
                        ) : (
                          <form onSubmit={handleLogin}>
                             <div className="form-header">
                                <div className="form-title">Marcar Presença</div>
                                <div className="form-subtitle">Confirme seus dados para entrar no sorteio de hoje.</div>
                             </div>
                             
                             <div className="field-group"><label>CPF (Apenas números)<span className="required">*</span></label><div className="input-wrapper"><span className="input-icon"><Icons.Hash /></span><input name="cpf-login" type="text" placeholder="000.000.000-00" required /></div></div>
                             <div className="field-group"><label>Nome cadastrado<span className="required">*</span></label><div className="input-wrapper"><span className="input-icon"><Icons.User /></span><input name="nome-login" type="text" placeholder="Ex: João da Silva" required /></div></div>
                             
                             <button type="submit" className="btn-submit" disabled={isSubmitting}>{isSubmitting ? <span>Verificando...</span> : <span>Entrar na Live de Hoje</span>}</button>
                             
                             <div className="toggle-text" style={{ marginTop: "12px", textAlign: 'center' }}>Não tem cadastro? <a href="#" onClick={(e) => localToggle(e, 'signup')}>Clique aqui para cadastrar</a>.</div>
                          </form>
                        )}
                        <div className={`form-feedback ${feedback.type}`}>{feedback.text}</div>
                        <div className="form-footer"><span>Seus dados são armazenados com segurança.</span><span className="badge-age">Jogue com responsabilidade • 18+ • Ganhos não são garantidos</span></div>
                    </section>
                </main>
                <section className="steps">
                  <div className="steps-header"><div><div className="steps-title"><Icons.Trophy /> Como Funciona?</div></div></div>
                  <div className="steps-grid">
                    <article className="step-card">
                        <div className="step-number">1</div>
                        <div className="step-content">
                            <div className="step-title">Participe da Live</div>
                            <p className="step-text">Assista a transmissão ao vivo e cadastre-se para concorrer automaticamente.</p>
                        </div>
                    </article>
                    <article className="step-card">
                        <div className="step-number">2</div>
                        <div className="step-content">
                             <div className="step-title">Sorteio Transparente</div>
                             <p className="step-text">Sistema aleatório e justo! Todos os participantes têm chances iguais.</p>
                        </div>
                    </article>
                    <article className="step-card">
                        <div className="step-number">3</div>
                        <div className="step-content">
                            <div className="step-title">Confiabilidade & Segurança</div>
                            <p className="step-text">Por garantia e segurança, pedimos seu CPF para validar sua identidade.</p>
                        </div>
                    </article>
                  </div>
                </section>
            </div>
        </div>
    );
}

function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [participantsData, setParticipantsData] = useState<Participant[]>([]);
  
  // Initialize view based on URL params
  const [view, setView] = useState<'admin' | 'user'>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.has('admin') ? 'admin' : 'user';
  });

  // Check Auth State
  useEffect(() => {
    if(!supabase) return;
    
    supabase.auth.getSession().then(({ data: { session } }) => {
        setIsAdminLoggedIn(!!session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setIsAdminLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch Participants from Supabase
  const fetchParticipants = async () => {
    if (!supabase) return;
    const { data } = await supabase
        .from('participants')
        .select('*')
        .order('created_at', { ascending: false });
    
    if (data) {
        setParticipantsData(mapSupabaseDataToParticipant(data));
    }
  };

  useEffect(() => {
     fetchParticipants();

     // Optional: Subscribe to changes for realtime updates
     if (supabase) {
         const channel = supabase
            .channel('public:participants')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'participants' }, () => {
                // Simplest way: re-fetch on any change. For high scale, append/update locally.
                fetchParticipants();
            })
            .subscribe();
            
         return () => { supabase.removeChannel(channel); }
     }
  }, []);


  // HANDLER: Create New User (Registration)
  const handleRegister = async (formData: any): Promise<{success: boolean, message: string}> => {
    if (!supabase) return { success: false, message: "Erro de conexão." };

    // Check if user exists by CPF
    const { data: existingUser } = await supabase
        .from('participants')
        .select('id')
        .eq('cpf', formData.cpf)
        .single();
    
    if (existingUser) {
      return { 
          success: false, 
          message: "Este CPF já possui cadastro! Vá até a aba 'Entrar' para marcar sua presença." 
      };
    } else {
      // New user
      const { error } = await supabase.from('participants').insert({
          name: formData.nome,
          whatsapp: formData.whatsapp,
          platform_id: formData.idPlataforma, // Note: DB column uses snake_case
          cpf: formData.cpf,
      });

      if (error) {
          console.error(error);
          return { success: false, message: "Erro ao salvar cadastro. Tente novamente." };
      }
      return { success: true, message: "Cadastro realizado com sucesso! Boa sorte!" };
    }
  };

  // HANDLER: Check-In (Login for Attendance)
  const handleCheckIn = async (loginData: {cpf: string, nome: string}): Promise<{success: boolean, message: string}> => {
      if (!supabase) return { success: false, message: "Erro de conexão." };

      const { data: user } = await supabase
        .from('participants')
        .select('id, participation_count, name')
        .eq('cpf', loginData.cpf)
        .single();
      
      if (!user) {
          return { success: false, message: "CPF não encontrado. Faça o cadastro primeiro!" };
      }
      
      const { error: updateError } = await supabase
        .from('participants')
        .update({ 
            participation_count: (user.participation_count || 0) + 1,
            attended: true,
            is_new: false,
            created_at: new Date().toISOString() // Updates the sort order to top
        })
        .eq('id', user.id);

      if (updateError) {
           return { success: false, message: "Erro ao atualizar presença." };
      }
      
      return { success: true, message: `Bem-vindo de volta, ${user.name.split(' ')[0]}! Presença confirmada.` };
  }

  const handleLogout = async () => {
    if (supabase) await supabase.auth.signOut();
  };

  return (
    <>
      <style>{styles}</style>
      
      <CasinoBackground />
      
      {view === 'admin' ? (
        isAdminLoggedIn ? <AdminDashboard data={participantsData} onLogout={handleLogout} /> : <AdminLogin />
      ) : (
        <SignupView onSignup={handleRegister} onCheckIn={handleCheckIn} />
      )}

      {/* Floating Toggle Button */}
      <button className="dev-toggle" onClick={() => setView(view === 'admin' ? 'user' : 'admin')}>
        Alternar para {view === 'admin' ? 'Cadastro (User)' : 'Painel Admin'}
      </button>
    </>
  );
}

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
} else {
  document.body.innerHTML = '<div id="root"></div>';
  const root = createRoot(document.getElementById("root")!);
  root.render(<App />);
}