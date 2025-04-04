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
CREATE OR REPLACE PROCEDURE p_UserFromEmail (OUT user_email CHAR(200))
    BEGIN
        SELECT * FROM db_authjs.users u WHERE email = user_email;
    END;
    //
DELIMITER;

DELIMITER //
CREATE OR REPLACE PROCEDURE p_Etudiants ()
    BEGIN
        SELECT * FROM db_authjs.users u WHERE role = 'etudiant';
    END;
    //
DELIMITER;

DELIMITER //
CREATE OR REPLACE PROCEDURE p_Intervenants ()
    BEGIN
        SELECT * FROM db_authjs.users u WHERE role = 'intervenant';
    END;
    //
DELIMITER;

GRANT EXECUTE ON PROCEDURE p_UserFromEmail TO monUtilisateurAuthJS;
GRANT EXECUTE ON PROCEDURE p_Etudiants TO monUtilisateurAuthJS;
GRANT EXECUTE ON PROCEDURE p_Intervenants TO monUtilisateurAuthJS;

DROP USER IF EXISTS root;



