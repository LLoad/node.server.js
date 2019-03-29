CREATE SCHEMA test_db;

CREATE TABLE test_db.drug (
    drugId INT NOT NULL,
    drugName VARCHAR(45) NOT NULL,
    drugShape VARCHAR(45) NOT NULL,
    drugColor VARCHAR(45) NOT NULL,
    drugFrontText VARCHAR(45),
    PRIMARY KEY (drugId)
);