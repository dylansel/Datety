DROP DATABASE IF EXISTS datety;
CREATE DATABASE datety;
USE datety;
  CREATE TABLE IF NOT EXISTS `user` (
  `idUser` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `surname` VARCHAR(50) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  `userName` VARCHAR(50) NOT NULL,
  `password` VARCHAR(50) NOT NULL,
  `photo` VARCHAR(50),
  PRIMARY KEY (`idUser`)
  );
 
   
    
CREATE TABLE IF NOT EXISTS `settings` (
  `idSettings` INT NOT NULL AUTO_INCREMENT,
  `idUser` INT NOT NULL,
  `darkTheme` TINYINT(8) ,
  `availableDays` VARCHAR(50),
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
  `idUserEvent` INT NOT NULL AUTO_INCREMENT,
  `idUser` INT NOT NULL,
  `idEvent` INT NOT NULL,
  PRIMARY KEY (`idUserEvent`),
    FOREIGN KEY (`idUser`) REFERENCES `user` (`idUser`),
    FOREIGN KEY (`idEvent`) REFERENCES `event` (`idEvent`)
    );


CREATE TABLE IF NOT EXISTS `notification` (
  `idNotification` INT NOT NULL AUTO_INCREMENT,
  `tittle` VARCHAR(50) NOT NULL,
  `description` VARCHAR(250) NULL,
  `idSender` INT NOT NULL,
  `idReceiver` INT NOT NULL,
  `idEvent` INT NOT NULL,
  `endTime` DATE NOT NULL,
  PRIMARY KEY (`idNotification`),
    FOREIGN KEY (`idSender`) REFERENCES `user` (`idUser`),
    FOREIGN KEY (`idReceiver`) REFERENCES `user` (`idUser`),
    FOREIGN KEY (`idEvent`) REFERENCES `event` (`idEvent`)
    );
    

INSERT INTO `user` (`name`, `surname`, `email`, `userName`, `password`, `photo`)
VALUES
  ('Juan', 'Pérez', 'juan.perez@example.com', 'juanp', '123456', 'photo1.jpg'),
  ('María', 'González', 'maria.gonzalez@example.com', 'mariag', 'abcdef', 'photo2.jpg'),
  ('Pedro', 'Sánchez', 'pedro.sanchez@example.com', 'pedros', 'ghijkl', 'photo3.jpg'),
  ('Lucía', 'Martínez', 'lucia.martinez@example.com', 'luciam', 'mnopqr', 'photo4.jpg');


INSERT INTO `event` (`tittle`, `description`, `startDate`, `endDate`, `startTime`, `endTime`, `isDinamic`, `isAccepted`)
VALUES
  ('Fiesta de cumpleaños', 'Celebración de cumpleaños de Juan', '2023-04-22', '2023-04-22', '19:00:00', '23:00:00', 0, 1),
  ('Partido de fútbol', 'Encuentro deportivo entre amigos', '2023-04-24', '2023-04-24', '10:00:00', '12:00:00', 0, 1),
  ('Reunión de trabajo', 'Reunión para discutir avances del proyecto', '2023-04-26', '2023-04-26', '14:00:00', '16:00:00', 0, 1),
  ('Cena de negocios', 'Cena para cerrar acuerdos comerciales', '2023-04-28', '2023-04-28', '20:00:00', '22:00:00', 0, 1);


INSERT INTO `userEvent` (`idUser`, `idEvent`)
VALUES
    (1, 1),
    (1, 2),
    (2, 2),
    (2, 3),
    (3, 3),
    (3, 4),
    (4, 1),
    (4, 4);

INSERT INTO `settings` (`idUser`, `darkTheme`, `availableDays`, `startSleep`, `endSleep`)
VALUES 
(1, 1, 'Monday,Tuesday,Wednesday,Thursday,Friday', '23:00:00', '07:00:00'),
(2, 0, 'Monday,Wednesday,Friday', '00:00:00', '08:00:00'),
(3, 1, 'Monday,Wednesday,Friday', '01:30:00', '09:00:00'),
(4, 0, 'Tuesday,Thursday', '22:00:00', '06:00:00');

INSERT INTO `notification` (`tittle`, `description`, `idSender`, `idReceiver`, `idEvent`, `endTime`)
VALUES 
('Recordatorio', 'Reunión mañana a las 10am', 1, 2, 1, '2023-04-20'),
('Nueva invitación', 'Te invito a mi fiesta de cumpleaños', 2, 1, 2, '2023-04-22'),
('Actualización de evento', 'Cambio de hora de la reunión', 3, 1, 3, '2023-04-23'),
('Recordatorio', 'Cita médica a las 3pm', 4, 3, 4, '2023-04-25'),
('Invitación pendiente', 'Confirma tu asistencia a la cena', 1, 3, 2, '2023-04-21'),
('Nueva invitación', 'Te invito al partido de fútbol', 4, 2, 4, '2023-04-26'),
('Actualización de evento', 'Se cambió la fecha de la fiesta', 2, 4, 2, '2023-04-23'),
('Recordatorio', 'Entrega de proyecto mañana a las 9am', 3, 4, 3, '2023-04-24');


