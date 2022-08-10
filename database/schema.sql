DROP DATABASE IF EXISTS sdc_qna;
CREATE DATABASE sdc_qna;

DROP TABLE IF EXISTS questions;
CREATE TABLE questions (
question_id int NOT NULL PRIMARY KEY,
product_id int,
question_body varchar(255),
question_date varchar(255),
asker_name varchar(255),
asker_email varchar(255),
question_reported boolean DEFAULT false,
question_helpfulness int DEFAULT 0
);

DROP TABLE IF EXISTS answers;
CREATE TABLE answers (
answer_id int NOT NULL PRIMARY KEY,
answer_body varchar(255),
answer_date varchar(255),
answerer_name varchar(255),
answerer_email varchar(255),
answer_reported boolean DEFAULT false,
answer_helpfulness int DEFAULT 0,
question_id int,
FOREIGN KEY (question_id) REFERENCES questions(question_id)
);

DROP TABLE IF EXISTS photos;
CREATE TABLE photos (
photo_id int NOT NULL PRIMARY KEY,
photo_url varchar(255),
answer_id int,
FOREIGN KEY (answer_id) REFERENCES answers(answer_id)
);

