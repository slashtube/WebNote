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
Now you need to edit the db-example.env file located in the database directory and modify the USERNAME and PASSWORD to match
the ones you've just created. After that rename the db-example.env to db.env.


