DROP DATABASE IF EXISTS sdc_qna;
CREATE DATABASE sdc_qna;

USE sdc_qna;

DROP SCHEMA IF EXISTS questions;
CREATE TABLE questions (
  question_id int NOT NULL,
  product_id int,
	question_body varchar(255),
	question_date varchar(255),
	asker_name varchar(255),
	asker_email varchar(255),
	question_reported boolean,
	question_helpfulness int,
  PRIMARY KEY (question_id)
);

DROP SCHEMA IF EXISTS answers;
CREATE TABLE answers (
  answer_id int NOT NULL,
  answer_body varchar(255),
  answer_date varchar(255),
	answerer_name varchar(255),
  answerer_email varchar(255),
	answer_reported boolean,
	answer_helpfulness int,
	question_id int,
  PRIMARY KEY (answer_id),
  FOREIGN KEY (question_id) REFERENCES questions(question_id)
);

DROP SCHEMA IF EXISTS photos;
CREATE TABLE photos (
  photo_id int NOT NULL,
  photo_url varchar(255),
	answer_id int,
  PRIMARY KEY (photo_id),
  FOREIGN KEY (answer_id) REFERENCES answers(answer_id)
);

