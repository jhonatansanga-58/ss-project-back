-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema db_events
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema db_events
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `db_events` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `db_events` ;

-- -----------------------------------------------------
-- Table `db_events`.`event`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_events`.`event` (
  `id` INT NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  `description` VARCHAR(600) NOT NULL,
  `location` VARCHAR(300) NOT NULL,
  `start_date` DATE NOT NULL,
  `end_date` DATE NOT NULL,
  `time` VARCHAR(45) NOT NULL,
  `min_age` TINYINT NOT NULL,
  `create_date` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `state` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_events`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_events`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `birthday` VARCHAR(45) NULL,
  `create_date` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `role` TINYINT NULL DEFAULT 1,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_events`.`user_event`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_events`.`user_event` (
  `user_id` INT NOT NULL,
  `event_id` INT NOT NULL,
  INDEX `fk_user_event_user_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_user_event_event1_idx` (`event_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_event_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `db_events`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_event_event1`
    FOREIGN KEY (`event_id`)
    REFERENCES `db_events`.`event` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
