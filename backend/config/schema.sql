-- =============================================
-- CivicEase PostgreSQL Schema
-- Run this file once to initialize the database
-- =============================================

-- Enable UUID extension (optional, we use serial IDs)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================================
-- USERS TABLE
-- Covers: regular users, admins, validators
-- =============================================
CREATE TABLE IF NOT EXISTS users (
  id                    SERIAL PRIMARY KEY,
  user_name             VARCHAR(255) NOT NULL,
  user_email            VARCHAR(255) NOT NULL UNIQUE,
  user_password         VARCHAR(255) NOT NULL,
  user_dob              DATE,
  user_phonenumber      BIGINT,
  user_country          VARCHAR(100),
  user_state            VARCHAR(100),
  user_pincode          INTEGER,
  aadhaar_number        BIGINT UNIQUE,
  is_admin              BOOLEAN DEFAULT FALSE,
  is_validator          BOOLEAN DEFAULT FALSE,
  is_admin_active       BOOLEAN DEFAULT FALSE,
  is_validator_active   BOOLEAN DEFAULT FALSE,
  first_login           BOOLEAN DEFAULT NULL,
  admin_profile_id      VARCHAR(50) UNIQUE,
  validator_profile_id  VARCHAR(50) UNIQUE,
  validator_owner_id    VARCHAR(50),
  location              VARCHAR(255),
  otp                   VARCHAR(10),
  otp_request_count     INTEGER DEFAULT 0,
  otp_request_time      TIMESTAMPTZ,
  refresh_token         TEXT,
  otp_expire            TIMESTAMPTZ,
  reset_token           VARCHAR(255),
  reset_token_expire    TIMESTAMPTZ,
  category              VARCHAR(20) CHECK (category IN ('general', 'member')),
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- EXPO PUSH TOKENS TABLE
-- One-to-many: one user can have multiple tokens
-- =============================================
CREATE TABLE IF NOT EXISTS expo_push_tokens (
  id         SERIAL PRIMARY KEY,
  user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token      VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- SUPER ADMINS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS super_admins (
  id         SERIAL PRIMARY KEY,
  username   VARCHAR(255) NOT NULL UNIQUE,
  password   VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- COMPLAINT COUNTER TABLE
-- Replaces MongoDB counterModel
-- =============================================
CREATE TABLE IF NOT EXISTS counters (
  name  VARCHAR(50) PRIMARY KEY,
  seq   INTEGER DEFAULT 0
);

-- Insert default complaint counter
INSERT INTO counters (name, seq)
VALUES ('complaint', 0)
ON CONFLICT (name) DO NOTHING;

-- =============================================
-- COMPLAINTS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS complaints (
  id               SERIAL PRIMARY KEY,
  complaint_id     VARCHAR(20) UNIQUE,
  title            VARCHAR(255) NOT NULL,
  description      TEXT,
  user_id          INTEGER REFERENCES users(id) ON DELETE SET NULL,
  rejection_reason TEXT DEFAULT NULL,
  grievance_type   VARCHAR(100),
  loc_coords       FLOAT[],
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- COMPLAINT PROGRESS TABLE
-- Replaces the embedded progress array
-- =============================================
CREATE TABLE IF NOT EXISTS complaint_progress (
  id           SERIAL PRIMARY KEY,
  complaint_id INTEGER NOT NULL REFERENCES complaints(id) ON DELETE CASCADE,
  status       VARCHAR(50) CHECK (status IN ('new','under_validation','validated','rejected','in_progress','completed')),
  message      TEXT,
  date         TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- NOTIFICATIONS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS notifications (
  id           SERIAL PRIMARY KEY,
  user_id      INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title        VARCHAR(255),
  body         TEXT,
  category     VARCHAR(20) CHECK (category IN ('general', 'member', 'single')),
  complaint_id VARCHAR(20),
  is_read      BOOLEAN DEFAULT FALSE,
  read_at      TIMESTAMPTZ,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- INDEXES for common queries
-- =============================================
CREATE INDEX IF NOT EXISTS idx_users_email           ON users(user_email);
CREATE INDEX IF NOT EXISTS idx_users_is_admin        ON users(is_admin);
CREATE INDEX IF NOT EXISTS idx_users_is_validator    ON users(is_validator);
CREATE INDEX IF NOT EXISTS idx_users_admin_profile   ON users(admin_profile_id);
CREATE INDEX IF NOT EXISTS idx_users_validator_owner ON users(validator_owner_id);
CREATE INDEX IF NOT EXISTS idx_complaints_user_id    ON complaints(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_complaint_id ON complaint_progress(complaint_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_expo_tokens_user_id   ON expo_push_tokens(user_id);
