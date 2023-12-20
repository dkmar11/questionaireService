# QUESTIONNAIRE_SERVICE
### General Info
***
This service was developed to create questions for different kinds of tests.
## Technologies
***
A list of technologies used within the project:
* [node](https://nodejs.org/en/download): Version 18.13.0 
* [docker](https://docs.docker.com/engine/release-notes/20.10/): Version 20.10.24
* [mysql](https://dev.mysql.com/downloads/mysql/): Version 8.0.33

## Installation without docker
### Requirements

* [node](https://nodejs.org/en/download): Version 18.13.0 
* [mysql](https://dev.mysql.com/downloads/mysql/): Version 8.0.33

### Database structure
Mysql command:

```Mysql
CREATE DATABASE questionnairedb;

USE questionnairedb;

CREATE TABLE test (
IDTest INT NOT NULL AUTO_INCREMENT,
nombre VARCHAR(50) NOT NULL,
PRIMARY KEY (IDTest)
);

CREATE TABLE type (
  IDType INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL,
  PRIMARY KEY (IDType)
);

CREATE TABLE questions (
  IDQuestions INT NOT NULL AUTO_INCREMENT,
  Question VARCHAR(80) NOT NULL,
  Answer VARCHAR(80) NOT NULL,
  ImgScr VARCHAR(50),
  IDTest INT NOT NULL,
  IDType INT NOT NULL,
  PRIMARY KEY (IDQuestions),
  FOREIGN KEY (IDTest) REFERENCES test(IDTest),
  FOREIGN KEY (IDType) REFERENCES type(IDType)
);

CREATE TABLE options (
  IDOptions INT NOT NULL AUTO_INCREMENT,
  Label VARCHAR(50) NOT NULL,
  Value VARCHAR(50) NOT NULL,
  ImgSrc VARCHAR(50),
  IDQuestions INT NOT NULL,
  PRIMARY KEY (IDOptions),
  FOREIGN KEY (IDQuestions) REFERENCES questions(IDQuestions)
);


INSERT INTO test (nombre) VALUES ('aptitude');
INSERT INTO test (nombre) VALUES ('concentration');
INSERT INTO test (nombre) VALUES ('logical');
INSERT INTO test (nombre) VALUES ('reasoning');
INSERT INTO test (nombre) VALUES ('spatial');
INSERT INTO type (nombre) VALUES ('checkBox');
INSERT INTO type (nombre) VALUES ('radioButton');
```


## Installation with docker
### Requirements
* [docker](https://docs.docker.com/engine/release-notes/20.10/): Version 20.10.24


### Start the service using docker compose locally
$ docker compose -f docker-compose.dev.yaml up -d

# questionaireService
