DROP DATABASE IF EXISTS sdc_qna;
CREATE DATABASE sdc_qna;

DROP TABLE IF EXISTS questions CASCADE;
CREATE TABLE questions (
question_id SERIAL PRIMARY KEY,
product_id int,
question_body varchar(1000),
question_date bigint,
asker_name varchar(255),
asker_email varchar(255),
question_reported boolean DEFAULT false,
question_helpfulness int DEFAULT 0
);

DROP TABLE IF EXISTS answers CASCADE;
CREATE TABLE answers (
answer_id SERIAL PRIMARY KEY,
question_id int,
answer_body varchar(1000),
answer_date bigint,
answerer_name varchar(255),
answerer_email varchar(255),
answer_reported boolean DEFAULT false,
answer_helpfulness int DEFAULT 0,
FOREIGN KEY (question_id) REFERENCES questions(question_id)
);

DROP TABLE IF EXISTS photos CASCADE;
CREATE TABLE photos (
photo_id SERIAL PRIMARY KEY,
answer_id int,
photo_url varchar(500),
FOREIGN KEY (answer_id) REFERENCES answers(answer_id)
);

-- check current max question_id
SELECT nextval('questions_question_id_seq') FROM questions LIMIT 1;

SELECT setval ('questions_question_id_seq', (SELECT max(question_id) FROM questions) + 1);
SELECT setval ('answers_answer_id_seq', (SELECT max(answer_id) FROM answers) + 1);
SELECT setval ('photos_photo_id_seq', (SELECT max(photo_id) FROM photos) + 1);

ALTER TABLE questions ALTER COLUMN question_date SET DATA TYPE timestamp with time zone USING to_timestamp(question_date/1000);
ALTER TABLE answers ALTER COLUMN answer_date SET DATA TYPE timestamp with time zone USING to_timestamp(answer_date/1000);

CREATE INDEX idx_product_id ON questions(product_id);
CREATE INDEX fk_answers_question_id ON answers(question_id);
CREATE INDEX fk_photos_answer_id ON photos(answer_id);
CREATE INDEX idx_question_id ON questions(question_id);
CREATE INDEX idx_answer_id ON answers(answer_id);
CREATE INDEX idx_photo_id ON photos(photo_id);






