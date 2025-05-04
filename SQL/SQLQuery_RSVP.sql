use RSVP_DB;

--Student Table:
CREATE TABLE Student (
    PRN VARCHAR(20) PRIMARY KEY,
    Name VARCHAR(100),
    Department VARCHAR(50),
    Year INT,
    Div CHAR(1),
    Batch VARCHAR(2),
    Email VARCHAR(100),
    Contact VARCHAR(10),
    Password VARCHAR(100)
);
Select * from Student;

--Club Table:
CREATE TABLE Club (
    club_id INT PRIMARY KEY IDENTITY(1,1),
    club_name VARCHAR(100),
    club_department VARCHAR(50),
    club_email VARCHAR(100),
    club_contact VARCHAR(10),
    club_createdAt DATETIME DEFAULT GETDATE(),
    club_updatedAt DATETIME DEFAULT GETDATE()
);
Select * from Club;


--Organization Table:
CREATE TABLE Organisation (
    org_id INT PRIMARY KEY IDENTITY(1,1),
    org_name VARCHAR(100),
    org_department VARCHAR(50),
    org_role VARCHAR(50),
    org_email VARCHAR(100),
    org_contact VARCHAR(10),
    org_no_of_events INT,
    club_id INT,
    org_password VARCHAR(100),
    FOREIGN KEY (club_id) REFERENCES Club(club_id)
);

Select * from Organisation;


--Event Table
CREATE TABLE Event (
    event_id INT PRIMARY KEY IDENTITY(1,1),
    org_id INT,
    event_name VARCHAR(100),
    event_date DATE,
    event_description TEXT,
    event_start_time TIME,
    event_end_time TIME,
    event_venue VARCHAR(100),
    event_status VARCHAR(50),
    event_mode VARCHAR(20), 
    event_no_of_seats INT,
    event_eligibility VARCHAR(100),
    event_paid VARCHAR(3) CHECK (event_paid IN ('Yes', 'No')),
    event_amount DECIMAL(10,2) NULL,
    event_qr VARBINARY(MAX) NULL,
    FOREIGN KEY (org_id) REFERENCES Organisation(org_id),
    CHECK (
        (event_paid = 'Yes' AND event_amount IS NOT NULL AND event_qr IS NOT NULL) OR
        (event_paid = 'No' AND event_amount IS NULL AND event_qr IS NULL)
    )
);
select * from Event;


--Event_Registration_Table
CREATE TABLE Event_Registration (
    event_reg_id INT PRIMARY KEY IDENTITY(1,1),
    event_id INT,
    student_id VARCHAR(20),
    transaction_id VARCHAR(100),
    payment_screenshot VARBINARY(MAX) NULL,
    FOREIGN KEY (event_id) REFERENCES Event(event_id),
    FOREIGN KEY (student_id) REFERENCES Student(PRN)
);
select * from Event_Registration;


--Attendence
CREATE TABLE Attendance (
    attendance_id INT PRIMARY KEY IDENTITY(1,1),
    event_registration_id INT UNIQUE,
    status VARCHAR(10) CHECK (status IN ('Present', 'Absent')),
    FOREIGN KEY (event_registration_id) REFERENCES Event_Registration(event_reg_id)
);

select * from Attendance;

INSERT INTO Organisation (
    org_name, 
    org_department, 
    org_role, 
    org_email, 
    org_contact, 
    org_no_of_events, 
    club_id, 
    org_password
)
VALUES (
    'The Knowledge Network',        -- org_name
    'Computer Engineering',         -- org_department
    'Admin',                        -- org_role
    'tkn@mitaoe.ac.in',             -- org_email
    '9999990001',                   -- org_contact
    3,                              -- org_no_of_events
    NULL,                           -- club_id
    'Tkn@123' -- hashed password
);

select * from Organisation;
delete from Organisation where org_id = 1;

INSERT INTO Student (PRN, Name, Department, Year, Div, Batch, Email, Contact, Password)
VALUES (
    '202201040077',
    'Aarav Sharma',
    'Computer Engineering',
    37,
    'B',
    'B2',
    'srivaths.iyer@gmail.com',
    '9876543210',
    'pass1234' -- Ideally this should be a hashed password
);

select * from Student;


ALTER TABLE Event
ADD event_category VARCHAR(50) NULL;

EXEC sp_help 'event';

SET IDENTITY_INSERT Event OFF;

select * from Event;

INSERT INTO Event (
  org_id, event_name, event_date, event_description,
  event_start_time, event_end_time, event_venue,
  event_status, event_mode, event_no_of_seats,
  event_eligibility, event_paid, event_amount,
  event_qr, event_category
)
VALUES 
-- Paid Events (event_amount NOT NULL, event_qr NOT NULL)
(2, 'AI Workshop', '2025-05-05', 'A hands-on AI workshop for beginners.',
 '10:00:00', '13:00:00', 'Auditorium A', 'Scheduled', 'Offline', 100,
 'All Students', 'Yes', 150.00, 0x010203, 'Technical'),

(4, 'Cybersecurity Seminar', '2025-05-08', 'Explore basics of cybersecurity.',
 '14:00:00', '16:00:00', 'Hall B', 'Scheduled', 'Online', 200,
 'Engineering Students', 'Yes', 200.00, 0xDEADBEEF, 'Seminar'),

(5, 'Tech Expo', '2025-05-10', 'Exhibition of latest tech projects.',
 '09:00:00', '12:00:00', 'Expo Center', 'Scheduled', 'Offline', 150,
 'Everyone', 'Yes', 100.00, 0xA1B2C3D4, 'Exhibition'),

-- Free Events (event_amount NULL, event_qr NULL)
(2, 'Intro to Git', '2025-05-12', 'Learn Git basics in this session.',
 '11:00:00', '12:30:00', 'Lab 1', 'Scheduled', 'Offline', 80,
 'All Branches', 'No', NULL, NULL, 'Workshop'),

(6, 'Startup Talk', '2025-05-15', 'Hear from successful startup founders.',
 '15:00:00', '17:00:00', 'Seminar Hall', 'Scheduled', 'Offline', 100,
 'Final Year Only', 'No', NULL, NULL, 'Talk'),

(4, 'Web Dev 101', '2025-05-18', 'Learn basic HTML, CSS, JS.',
 '10:00:00', '13:00:00', 'Room 105', 'Scheduled', 'Offline', 120,
 'All Students', 'No', NULL, NULL, 'Technical'),

(5, 'Resume Building', '2025-05-20', 'Improve your resume with expert tips.',
 '13:00:00', '14:30:00', 'Online', 'Scheduled', 'Online', 300,
 'Final Year Students', 'No', NULL, NULL, 'Career'),

-- Paid Events
(6, 'Cloud Computing Bootcamp', '2025-05-22', 'Deep dive into AWS & Azure.',
 '09:00:00', '17:00:00', 'Lab 3', 'Scheduled', 'Offline', 60,
 'CS/IT Branch Only', 'Yes', 250.00, 0xBADA55, 'Technical'),

(2, 'Graphic Design Contest', '2025-05-25', 'Compete to design the best poster.',
 '10:30:00', '12:30:00', 'Studio', 'Scheduled', 'Offline', 50,
 'All Years', 'Yes', 50.00, 0xC0FFEE, 'Competition'),

-- Free Event
(5, 'Club Orientation', '2025-05-28', 'Get to know the different clubs.',
 '16:00:00', '17:30:00', 'Main Auditorium', 'Scheduled', 'Offline', 400,
 'First Years', 'No', NULL, NULL, 'Orientation');

 -- Insert 80 students
DECLARE @i INT = 1;
WHILE @i <= 80
BEGIN
    DECLARE @PRN VARCHAR(20) = CONCAT('PRN', FORMAT(@i, '0000'));
    DECLARE @Name VARCHAR(100) = CONCAT('Student_', @i);
    DECLARE @Departments TABLE (Dept VARCHAR(50));
    INSERT INTO @Departments VALUES ('Computer'), ('IT'), ('ENTC'), ('Mechanical'), ('Civil');
    DECLARE @Dept VARCHAR(50);
    SELECT TOP 1 @Dept = Dept FROM @Departments ORDER BY NEWID();

    DECLARE @Year INT = 1 + ((@i - 1) / 20); -- 20 students per year
    DECLARE @Div CHAR(1) = CHAR(ASCII('A') + ((@i - 1) % 3)); -- A, B, C
    DECLARE @Batch VARCHAR(2) = CHAR(ASCII('B') + ((@i - 1) % 2)); -- B, C
    DECLARE @Email VARCHAR(100) = CONCAT('student', @i, '@college.edu');
    DECLARE @Contact VARCHAR(10) = CONCAT('9', FORMAT(@i, '000000000'));
    DECLARE @Password VARCHAR(100) = 'Password123';

    INSERT INTO Student (PRN, Name, Department, Year, Div, Batch, Email, Contact, Password)
    VALUES (@PRN, @Name, @Dept, @Year, @Div, @Batch, @Email, @Contact, @Password);

    SET @i = @i + 1;
END

-- Registering and recording attendance for Event ID 2 (AI Workshop)
-- 30 registrations, 25 attended
DECLARE @i INT = 1;
WHILE @i <= 30
BEGIN
    DECLARE @PRN VARCHAR(20) = CONCAT('PRN', FORMAT(1 + @i % 80, '0000'));
    DECLARE @TxnID VARCHAR(100) = CASE WHEN @i <= 25 THEN CONCAT('TXN_EVT2_', @i) ELSE NULL END;
    DECLARE @Screenshot VARBINARY(MAX) = CASE WHEN @TxnID IS NOT NULL THEN 0x01020304 ELSE NULL END;

    INSERT INTO Event_Registration (event_id, student_id, transaction_id, payment_screenshot)
    VALUES (2, @PRN, @TxnID, @Screenshot);

    IF @i <= 25
    BEGIN
        INSERT INTO Attendance (event_registration_id, status)
        VALUES (SCOPE_IDENTITY(), 'Present');
    END
    ELSE
    BEGIN
        INSERT INTO Attendance (event_registration_id, status)
        VALUES (SCOPE_IDENTITY(), 'Absent');
    END

    SET @i = @i + 1;
END

-- Unpaid Event
DECLARE @j INT = 1;
WHILE @j <= 20
BEGIN
    DECLARE @PRN VARCHAR(20) = CONCAT('PRN', FORMAT(21 + @j % 80, '0000'));

    INSERT INTO Event_Registration (event_id, student_id, transaction_id, payment_screenshot)
    VALUES (5, @PRN, NULL, NULL);

    INSERT INTO Attendance (event_registration_id, status)
    VALUES (SCOPE_IDENTITY(), CASE WHEN @j <= 15 THEN 'Present' ELSE 'Absent' END);

    SET @j = @j + 1;
END


select * from Organisation;
select * from Event;

