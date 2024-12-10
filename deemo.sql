CREATE TABLE ExamSheet (
	id VARCHAR(255) NOT NULL,
    roll_no VARCHAR(255) NOT NULL,
    dept VARCHAR(255) NOT NULL,
    attempt INT NOT NULL,
    paper VARCHAR(255) NOT NULL,
    fA_language VARCHAR(255) NOT NULL,
	sA_language VARCHAR(255),
	thA_language VARCHAR(255),
    f_time_attempt TIME,
    s_time_attempt TIME,
    th_time_attempt TIME,
    f_time_end TIME,
    s_time_end TIME,
    th_time_end TIME,
	exam_date Date,
    PRIMARY KEY (id)  -- Assuming roll_no and attempt uniquely identify a record
);
DELETE FROM ExamSheet
WHERE id ='1733377417329S003';


drop table ExamSheet;
select * from ExamSheet;

CREATE TABLE Student (
    roll_no VARCHAR(255) PRIMARY KEY,
    department VARCHAR(255) NOT NULL,
	name VARCHAR(255) NOT NULL,
    subjects TEXT[]  -- Array of subjects
);

INSERT INTO Student (roll_no, department, name, subjects) 
VALUES 
('S001', 'PHD', 'Alice', ARRAY['Math', 'Physics', 'English']),
('S002', 'Mechanical Engineering', 'Bob', ARRAY['Thermodynamics', 'Fluid Mechanics', 'ME102']),
('S003', 'PHD', 'Charlie', ARRAY['Math', 'Chemistry', 'English']),
('S004', 'PHD', 'Diana', ARRAY['Math', 'Physics', 'Hindi']),
('S005', 'Computer Science', 'Eve', ARRAY['Algorithms', 'Databases', 'CS202']),
('S006', 'PHD', 'Alice', ARRAY['Math', 'Physics', 'Eglish']),
('S007', 'Mechanical Engineering', 'Bob', ARRAY['Thermodynamics', 'Fluid Mechanics', 'ME102']),
('S008', 'PHD', 'Charlie', ARRAY['Computer', 'Physics', 'English']),
('S009', 'PHD', 'Diana', ARRAY['Math', 'Computer', 'English']),
('S0010', 'Computer Science', 'Eve', ARRAY['Algorithms', 'Databases', 'CS202']);

SELECT * 
FROM Student
WHERE 'Math' = ANY(subjects);


select * from Student;

DROP TABLE Student;


CREATE TABLE Login (
    roll_no VARCHAR(255) PRIMARY KEY, -- Primary key
    name VARCHAR(255) NOT NULL,       -- Student's name
    department VARCHAR(255) NOT NULL, -- Department of the user
    subjects TEXT[],                  -- Array of subjects
    password VARCHAR(255) NOT NULL    -- Password for login
);

select * from Login where roll_no='S003';

SELECT * 
FROM Login
WHERE 'Chemistry' = ANY(subjects);

select * from Login where department='PHD';


CREATE TABLE ExamQuestion (
    id SERIAL PRIMARY KEY,          -- Auto-incrementing unique identifier
	subject VARCHAR(255) NOT NULL,
    question TEXT NOT NULL,         -- The question text, required
    opt_1 VARCHAR(255) NOT NULL,    -- Option 1, required
    opt_2 VARCHAR(255) NOT NULL,    -- Option 2, required
    opt_3 VARCHAR(255) NOT NULL,    -- Option 3, required
    opt_4 VARCHAR(255) NOT NULL,    -- Option 4, required
    ans VARCHAR(255),               -- The correct answer, optional
    language VARCHAR(50) NOT NULL   -- Language of the question, required
);

INSERT INTO ExamQuestion (id, subject, question, opt_1, opt_2, opt_3, opt_4, ans, language) VALUES
(171, 'English', 'What is the antonym of "happy"?', 'Sad', 'Joyful', 'Content', 'Excited', 'Sad', 'English'),
(172, 'English', 'What part of speech is "beautiful"?', 'Noun', 'Verb', 'Adjective', 'Adverb', 'Adjective', 'English'),
(173, 'English', 'What does "succeed" mean?', 'Fail', 'Win', 'Try', 'Lose', 'Win', 'English'),
(174, 'English', 'What is the synonym of "quick"?', 'Fast', 'Slow', 'Steady', 'Careful', 'Fast', 'English'),
(175, 'English', 'What is the meaning of "grateful"?', 'Thankful', 'Unthankful', 'Joyful', 'Angry', 'Thankful', 'English'),
(176, 'English', 'What is the opposite of "difficult"?', 'Easy', 'Hard', 'Complex', 'Complicated', 'Easy', 'English'),
(177, 'English', 'What type of word is "happiness"?', 'Noun', 'Verb', 'Adjective', 'Adverb', 'Noun', 'English'),
(178, 'English', 'What does "incredible" mean?', 'Unbelievable', 'Ordinary', 'Normal', 'Simple', 'Unbelievable', 'English'),
(179, 'English', 'What is the plural form of "child"?', 'Children', 'Childs', 'Childes', 'Kids', 'Children', 'English'),
(180, 'English', 'What does "consume" mean?', 'To eat', 'To waste', 'To save', 'To ignore', 'To eat', 'English');


select * from ExamQuestion;

drop table ExamQuestion;


CREATE TABLE Paper (
    sub_code VARCHAR(50) PRIMARY KEY,  -- Subject code, primary key
    subject VARCHAR(255) NOT NULL,      -- Subject name, required
    Date DATE NOT NULL                   -- Date of the paper, required
);

INSERT INTO Paper (sub_code, subject, Date) VALUES
('MATH101', 'Math', '2024-12-05'),
('ENG101', 'English', '2024-12-06'),
('PHY101', 'Physics', '2024-12-07'),
('CHEM101', 'Chemistry', '2024-12-08'),
('COMP101', 'Computer Science', '2024-12-09');

drop table Paper;

select * from Paper;


CREATE TABLE examAnswers (
    id VARCHAR(255) NOT NULL,                 -- Unique identifier for each record
    question_id VARCHAR(255) NOT NULL,       -- ID of the associated question
    roll_no VARCHAR(50) NOT NULL,            -- Roll number of the student
    attempt INT NOT NULL,                    -- Attempt number
    selected_option VARCHAR(255),           -- Option selected by the user
    subject VARCHAR(255) NOT NULL,          -- Subject associated with the question
    PRIMARY KEY (id)                         -- Define 'id' as the primary key
);
drop table examAnswers;

select * from examAnswers;




