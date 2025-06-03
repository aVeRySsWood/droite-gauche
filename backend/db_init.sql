CREATE DATABASE IF NOT EXISTS votes_db;

USE votes_db;

CREATE TABLE IF NOT EXISTS things (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    left_votes INT DEFAULT 0,
    right_votes INT DEFAULT 0
);
