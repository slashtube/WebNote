# WebNote
WebNote is a webapp used for taking and storing notes.

WebNote uses NodeJS for the backend, React for its frontend and MariaDB for the database.

DISCLAIMER: this is a project made for hobby and educational purposes.

## Requirements
- NodeJS
- Nodemon
- MariaDB

## Setup
Open mariadb as root and create the database and the user: 
```
CREATE DATABASE WebNoteDB;
CREATE USER 'your_username'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON WebNoteDB.* TO 'your_username'@'localhost';
FLUSH PRIVILEGES
```

