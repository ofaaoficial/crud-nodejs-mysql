CREATE DATABASE IF NOT EXISTS  crud_books;

USE crud_books;

CREATE TABLE users(
    id INT(11) NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    fullname VARCHAR(100) NOT NULL
);

ALTER TABLE users
    ADD PRIMARY KEY (id);

ALTER TABLE users
    MODIFY id int(11) NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 2;

DESCRIBE users;


CREATE TABLE books (
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    user_id INT(11),
    create_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
)
