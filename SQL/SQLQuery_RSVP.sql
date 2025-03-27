use RSVP_DB;

--Creating the User_Credential Table:
CREATE TABLE User_Credential (
    user_id INT IDENTITY(1,1) PRIMARY KEY,
    emailId VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL 
);

--Organization Table:
CREATE TABLE Organization (
    org_id INT IDENTITY(1,1) PRIMARY KEY, 
    org_name VARCHAR(255) NOT NULL,
    org_email VARCHAR(255) UNIQUE NOT NULL,
    org_phone_no VARCHAR(15) NOT NULL, 
    org_joining DATE NOT NULL
);

--Event Table
CREATE TABLE EventTable (
    event_id INT IDENTITY(1,1) PRIMARY KEY, 
    event_title VARCHAR(255) NOT NULL, 
    event_description TEXT, 
    event_date DATE NOT NULL,
    event_venue VARCHAR(255) NOT NULL, 
    capacity INT NOT NULL,
    org_id INT NOT NULL,
    created_at DATETIME DEFAULT GETDATE(), 
    CONSTRAINT FK_Event_Org FOREIGN KEY (org_id) REFERENCES Organization(org_id) ON DELETE CASCADE
);

--User Table
CREATE TABLE UserTable (
    userId INT IDENTITY(1,1) PRIMARY KEY,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    age INT CHECK (age >= 18) NOT NULL,
    phoneNo VARCHAR(15) UNIQUE NOT NULL,
    role VARCHAR(50) CHECK (role IN ('Admin', 'Manager', 'Employee', 'Guest')) NOT NULL,
    organization_id INT NOT NULL,
    CONSTRAINT FK_User_Organization FOREIGN KEY (organization_id) REFERENCES Organization(org_id) ON DELETE CASCADE
);

--Booking Table
CREATE TABLE Booking (
    booking_id INT IDENTITY(1,1) PRIMARY KEY,
    event_id INT NOT NULL,
    user_id INT NOT NULL,
    status CHAR(10) CHECK (status IN ('Pending', 'Confirmed', 'Cancelled')) NOT NULL,
    booked_at DATETIME2 DEFAULT GETDATE(),
    CONSTRAINT FK_Booking_Event FOREIGN KEY (event_id) REFERENCES EventTable(event_id) ON DELETE CASCADE,
    CONSTRAINT FK_Booking_User FOREIGN KEY (user_id) REFERENCES User_Credential(user_id) ON DELETE CASCADE
);

--Inserting the values in the User_Credential Table
INSERT INTO User_Credential (emailId, password) VALUES 
('vemularamani9373@gmail.com', 'Ram@123'),  
('amrik.bhadra@mitaoe.ac.in', 'amk@123'),  
('srivaths.iyer@mitaoe.ac.in', 'iyer@2005');

select * from User_Credential;


--Inserting values for the Organisation Table 
INSERT INTO Organization (org_name, org_email, org_phone_no, org_joining)  
VALUES  
('The Knowledge Network', 'knowledgenetwork@mitaoe.ac.in', '9373004289', '2022-06-15'),  
('GDG', 'gdg@mitaoe.ac.in', '8765432109', '2020-09-25'),  
('CodeChef', 'CodeChef@mitaoe.ac.in', '7654321098', '2021-03-10');

select * from Organization;

----Inserting values for the UserTable
INSERT INTO UserTable (firstname, lastname, age, phoneNo, role, organization_id)  
VALUES  
('Ramani', 'Vemula', 21, '9373004289', 'Admin', 1),  
('Amrik', 'Bhadra', 23, '7739226305', 'Manager', 2),  
('Srivaths', 'Iyer', 22, '7654321098', 'Employee', 1);

select * from UserTable;

