CREATE DATABASE db_authjs;
CREATE OR REPLACE User 'monUtilisateurAuthJS'@'%' IDENTIFIED BY 'monmotdepassesécurisé';

CREATE TABLE IF NOT EXISTS db_authjs.users (
    email VARCHAR(200),
    username VARCHAR(50) NOT NULL,
    password VARCHAR(200) NOT NULL,
    refresh_token VARCHAR(500),
    role ENUM('étudiant', 'intervenant') NOT NULL DEFAULT 'étudiant',
    PRIMARY KEY (email)
);

GRANT SELECT ON db_authjs.users TO 'monUtilisateurAuthJS'@'%';
GRANT UPDATE ON db_authjs.users TO 'monUtilisateurAuthJS'@'%';
GRANT INSERT ON db_authjs.users TO 'monUtilisateurAuthJS'@'%';

DROP USER IF EXISTS 'root'@'localhost';



