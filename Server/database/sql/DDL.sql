CREATE SCHEMA test;

CREATE TABLE test.drug (
    drugId VARCHAR(20) NOT NULL,
    drugName VARCHAR(100) NOT NULL,
    drugImage VARCHAR(100) NOT NULL,
    drugType VARCHAR(20) NOT NULL,
    drugShape VARCHAR(45) NOT NULL,
    drugColor VARCHAR(45) NOT NULL,
    drugFrontText VARCHAR(45),
    drugBackText VARCHAR(45),
    PRIMARY KEY (drugId)
);