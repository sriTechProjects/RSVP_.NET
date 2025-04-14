

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
    '1234567890',
    'Aarav Sharma',
    'Computer Engineering',
    3,
    'B',
    'B2',
    'aarav.sharma@example.com',
    '9876543210',
    'pass1234' -- Ideally this should be a hashed password
);

select * from Student;