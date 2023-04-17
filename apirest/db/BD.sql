DROP DATABASE IF EXISTS datety;
CREATE DATABASE datety;
USE datety;
d
 
   CREATE TABLE IF NOT EXISTS `notification` (
  `idNotification` INT NOT NULL,
  `tittle` VARCHAR(50) NOT NULL,
  `description` VARCHAR(250) NULL,
  `idSender` INT NOT NULL,
  `idReceiver` INT NOT NULL,
  `idEvent` INT NOT NULL,
  `endTime` DATE NOT NULL,
  PRIMARY KEY (`idNotification`),
    FOREIGN KEY (`idSender`) REFERENCES `user` (`idUser`),
    FOREIGN KEY (`idReceiver`) REFERENCES `user` (`idUser`)
    );
    
CREATE TABLE IF NOT EXISTS `settings` (
  `idSettings` VARCHAR(50) NOT NULL,
  `idUser` INT NOT NULL,
  `darkTheme` TINYINT(8) NULL,
  `email` VARCHAR(50) NOT NULL,
  `availableDays` VARCHAR(50) NOT NULL,
  `startSleep` TIME NOT NULL,
  `endSleep` TIME NOT NULL,
  PRIMARY KEY (`idSettings`),
    FOREIGN KEY (`idUser`)
    REFERENCES `user` (`idUser`)
    );
 
 CREATE TABLE IF NOT EXISTS `event` (
  `idEvent` INT NOT NULL AUTO_INCREMENT,
  `tittle` VARCHAR(50) NOT NULL,
  `description` VARCHAR(250) NULL,
  `startDate` DATE NOT NULL,
  `endDate` DATE NOT NULL,
  `startTime` TIME NOT NULL,
  `endTime` TIME NOT NULL,
  `isDinamic` TINYINT(8) NOT NULL,
  `isAccepted` TINYINT(8) NOT NULL,
  PRIMARY KEY (`idEvent`)
  );

CREATE TABLE IF NOT EXISTS `userEvent` (
  `idUserEvent` INT NOT NULL auto_increment,
  `idUser` INT NOT NULL,
  `idEvent` INT NOT NULL,
  PRIMARY KEY (`idUserEvent`),
    FOREIGN KEY (`idUser`) REFERENCES `user` (`idUser`),
    FOREIGN KEY (`idEvent`) REFERENCES `event` (`idEvent`)
    );
    
    
    INSERT INTO user (name, surname, email, userName, password, photo)
VALUES
('John', 'Doe', 'johndoe@example.com', 'johndoe', 'password123', 'johndoe.jpg'),
('Jane', 'Doe', 'janedoe@example.com', 'janedoe', 'password456', 'janedoe.jpg'),
('Bob', 'Smith', 'bobsmith@example.com', 'bobsmith', 'password789', 'bobsmith.jpg'),
('Alice', 'Johnson', 'alicejohnson@example.com', 'alicejohnson', 'passwordabc', 'alicejohnson.jpg');

INSERT INTO notification (idNotification, tittle, description, idSender, idReceiver, idEvent, endTime)
VALUES
(1, 'New message', 'You have a new message from John', 1, 2, NULL, '2023-04-13'),
(2, 'Invitation', 'You have been invited to Bobs birthday party', 3, 1, 1, '2023-05-10'),
(3, 'Reminder', 'Reminder for your meeting with Alice', 2, 1, 2, '2023-04-14');

INSERT INTO settings (idSettings, idUser, darkTheme, email, availableDays, startSleep, endSleep)
VALUES
('settings001', 1, 1, 'johndoe@example.com', 'Monday, Wednesday, Friday', '23:00:00', '07:00:00'),
('settings002', 2, 0, 'janedoe@example.com', 'Tuesday, Thursday, Saturday', '00:00:00', '08:00:00'),
('settings003', 3, 1, 'bobsmith@example.com', 'Monday, Tuesday, Thursday, Friday', '22:00:00', '06:00:00');

INSERT INTO event (tittle, description, startDate, endDate, startTime, endTime, isDinamic, isAccepted)
VALUES
('meeting with carl', 'how are you', '2023-02-23', '2023-02-23', '14:00:00', '16:00:00', 1, 0),
('Bobs birthday party', 'Come celebrate Bobs birthday with us!', '2023-05-10', '2023-05-10', '18:00:00', '22:00:00', 0, 1),
('Meeting with Alice', 'Discuss the new project with Alice', '2023-04-14', '2023-04-14', '10:00:00', '12:00:00', 0, 1),
('Gym session', 'Hit the gym for a quick workout', '2023-04-13', '2023-04-13', '07:00:00', '08:00:00', 1, 1);

INSERT INTO userEvent (idUser, idEvent)
VALUES
(1, 1),
(1, 2),
(2, 2),
(3, 3);