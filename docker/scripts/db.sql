CREATE DATABASE db_authjs;
CREATE OR REPLACE User 'monUtilisateurAuthJS'@'%' IDENTIFIED BY 'monmotdepassesécurisé';

CREATE TABLE IF NOT EXISTS db_authjs.users (
    email VARCHAR(200),
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    refresh_token VARCHAR(500),
    role ENUM('étudiant', 'intervenant') NOT NULL DEFAULT 'étudiant',
    PRIMARY KEY (email)
);

DELIMITER //
CREATE OR REPLACE PROCEDURE db_authjs.p_UserFromEmail (OUT user_email CHAR(200))
    BEGIN
        SELECT * FROM db_authjs.users u WHERE email = user_email;
    END;
    //
DELIMITER;

DELIMITER //
CREATE OR REPLACE PROCEDURE db_authjs.p_Etudiants ()
    BEGIN
        SELECT * FROM db_authjs.users u WHERE role = 'etudiant';
    END;
    //
DELIMITER;

DELIMITER //
CREATE OR REPLACE PROCEDURE db_authjs.p_Intervenants ()
    BEGIN
        SELECT * FROM db_authjs.users u WHERE role = 'intervenant';
    END;
    //
DELIMITER;


CREATE OR REPLACE PROCEDURE db_authjs.p_CreateUser (IN p_email CHAR(200), IN p_username CHAR(50), IN p_password CHAR(50), IN p_role CHAR(20), IN p_token CHAR(500))
    BEGIN
        INSERT INTO db_authjs.users (email, username, password, role, token) VALUES(p_email, p_username, p_password, p_role, p_token);
    END;
    //
DELIMITER;

CREATE OR REPLACE PROCEDURE db_authjs.p_UpdateUserToken (
    IN p_email CHAR(200),
    IN p_token CHAR(500)
    )
    BEGIN
        UPDATE db_authjs.users
        SET token = p_token
        WHERE email = p_email;
    END;
    //
DELIMITER;


GRANT EXECUTE ON PROCEDURE db_authjs.p_UserFromEmail TO monUtilisateurAuthJS;
GRANT EXECUTE ON PROCEDURE db_authjs.p_Etudiants TO monUtilisateurAuthJS;
GRANT EXECUTE ON PROCEDURE db_authjs.p_Intervenants TO monUtilisateurAuthJS;
GRANT EXECUTE ON PROCEDURE db_authjs.p_CreateUser TO monUtilisateurAuthJS;
GRANT EXECUTE ON PROCEDURE db_authjs.p_UpdateUserToken TO monUtilisateurAuthJS;

DROP USER IF EXISTS 'root'@'localhost';



