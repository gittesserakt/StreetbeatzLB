create or replace table administrator
(
    identifier varchar(255) not null
        primary key,
    email      varchar(255) not null,
    firstname  varchar(255) null,
    surname    varchar(255) null,
    picture    varchar(255) null,
    constraint administrator_pk2
        unique (email)
);

create or replace table `group`
(
    group_id int auto_increment
        primary key,
    name     varchar(255) not null
);

create or replace table poi
(
    poi_id    int auto_increment
        primary key,
    name      varchar(255) not null,
    icon      varchar(255) null,
    poi_type  int          null,
    latitude  double       not null,
    longitude double       null
);

create or replace table stage
(
    stage_id   int auto_increment
        primary key,
    name       varchar(128) null,
    stage_size double       null
);

create or replace table performance
(
    performance_id int auto_increment
        primary key,
    date_time      datetime     null,
    created_by     varchar(255) not null,
    group_id       int          not null,
    stage_id       int          not null,
    constraint created_by_fk
        foreign key (created_by) references administrator (identifier),
    constraint group_id_fk
        foreign key (group_id) references `group` (group_id),
    constraint stage_id_fk
        foreign key (stage_id) references stage (stage_id)
);

create or replace table vote
(
    email    varchar(255) not null
        primary key,
    group_id int          not null,
    constraint vote_ibfk_1
        foreign key (group_id) references `group` (group_id)
);

create or replace index group_id
    on vote (group_id);

# identifier is email encoded with Base64URL
INSERT INTO `administrator` (identifier, email, firstname, surname, picture) VALUES
	('ZGVubmlzQGdtYWlsLmNvbQ', 'dennis@gmail.com', 'Dennis', 'Mustermann', null),
	('ZW50d2lja2xlckBnbWFpbC5jb20', 'entwickler@gmail.com', 'Entwickler', 'Mustermann', null),
	('aGFydmV5QGdtYWlsLmNvbQ', 'harvey@gmail.com', 'Harvey', 'Mustermann', null);

INSERT INTO `group` (`name`) VALUES
	('Dominik Friedrich'),
	('Alice Rose'),
	('Der Katze & Die Hund'),
	('Maxmaber Orkestar'),
	('Nothing Concrete'),
	('PHI'),
	('Teresa Bergman'),
	('The Busquitos');

INSERT INTO `poi` (name, icon, poi_type, latitude, longitude) VALUES
	('Haupteingang', NULL, NULL, 48.89629356141575, 9.196231354904848),
	('Eingang Mömpelgardstraße', NULL, NULL, 48.89885774762525, 9.197583035983675),
	('Vorgarten', NULL, NULL, 48.89890437269485, 9.196007967518401),
	('Barocke Broderie', NULL, NULL, 48.90163303471827, 9.195045750240379),
	('Herzogschaukel/ Aktionshaus', NULL, NULL, 48.902251005875385, 9.199487247719524),
	('Restaurant Parkcafé', NULL, NULL, 48.89950208404342, 9.201831829700073),
	('Eingang Hinterer Schlosshof', NULL, NULL, 48.89982743592445, 9.197495485734656),
	('Stages', NULL, NULL, 48.90194275338896, 9.197502693265069);

INSERT INTO `stage` (name, stage_size) VALUES
	('A', 25.6),
	('B', 15.3),
	('C', 12.5),
	('D', 12.2),
	('E', 10.9),
	('F', 14.5),
	('G', 8.8);

INSERT INTO `vote` (email, group_id) VALUES
	('mjouaux@stud.hs-heilbronn.de ', 1),
	('mmousa@stud.hs-heilbronn.de ', 2),
	('ddeifel@stud.hs-heilbronn.de', 3),
	('nholl@stud.hs-heilbronn.de ', 3);

INSERT INTO `performance` (date_time, created_by, group_id, stage_id) VALUES
	('2023-05-28 08-00-00', 'ZGVubmlzQGdtYWlsLmNvbQ', 'Dominik Friedrich', 'A'),
	('2023-05-28 09-00-00', 'ZGVubmlzQGdtYWlsLmNvbQ', 'Alice Rose', 'A'),
	('2023-05-28 10-00-00', 'ZGVubmlzQGdtYWlsLmNvbQ', 'Der Katze & Die Hund', 'A'),
	('2023-05-28 11-00-00', 'ZGVubmlzQGdtYWlsLmNvbQ', 'Maxmaber Orkestar', 'A'),
	('2023-05-28 12-00-00', 'ZGVubmlzQGdtYWlsLmNvbQ', 'Nothing Concrete', 'A'),
	('2023-05-28 13-00-00', 'ZGVubmlzQGdtYWlsLmNvbQ', 'PHI', 'A'),
	('2023-05-28 14-00-00', 'ZGVubmlzQGdtYWlsLmNvbQ', 'Teresa Bergman', 'A'),
	('2023-05-28 15-00-00', 'ZGVubmlzQGdtYWlsLmNvbQ', 'The Busquitos', 'A'),
	('2023-05-28 16-00-00', 'ZGVubmlzQGdtYWlsLmNvbQ', 'Dominik Friedrich', 'A'),
	('2023-05-28 17-00-00', 'ZGVubmlzQGdtYWlsLmNvbQ', 'Alice Rose', 'B'),
	('2023-05-28 18-00-00', 'ZGVubmlzQGdtYWlsLmNvbQ', 'Der Katze & Die Hund', 'C'),
	('2023-05-28 19-00-00', 'ZGVubmlzQGdtYWlsLmNvbQ', 'Maxmaber Orkestar', 'D'),
	('2023-05-28 20-00-00', 'ZGVubmlzQGdtYWlsLmNvbQ', 'Nothing Concrete', 'E'),
	('2023-05-28 21-00-00', 'ZGVubmlzQGdtYWlsLmNvbQ', 'PHI', 'F'),
	('2023-05-28 08-00-00', 'ZGVubmlzQGdtYWlsLmNvbQ', 'The Busquitos', 'G'),
	('2023-05-28 09-00-00', 'ZGVubmlzQGdtYWlsLmNvbQ', 'Dominik Friedrich', 'B'),
	('2023-05-28 10-00-00', 'ZGVubmlzQGdtYWlsLmNvbQ', 'Alice Rose', 'D'),
	('2023-05-28 11-00-00', 'ZGVubmlzQGdtYWlsLmNvbQ', 'Nothing Concrete', 'F'),
	('2023-05-28 12-00-00', 'ZGVubmlzQGdtYWlsLmNvbQ', 'Dominik Friedrich', 'A'),
	('2023-05-28 13-00-00', 'ZGVubmlzQGdtYWlsLmNvbQ', 'Alice Rose', 'A'),
	('2023-05-28 14-00-00', 'ZGVubmlzQGdtYWlsLmNvbQ', 'Der Katze & Die Hund', 'A'),
	('2023-05-28 15-00-00', 'ZGVubmlzQGdtYWlsLmNvbQ', 'Maxmaber Orkestar', 'A'),
	('2023-05-28 16-00-00', 'ZGVubmlzQGdtYWlsLmNvbQ', 'Nothing Concrete', 'A'),
	('2023-05-28 17-00-00', 'ZGVubmlzQGdtYWlsLmNvbQ', 'PHI', 'A'),
	('2023-05-28 08-00-00', 'ZGVubmlzQGdtYWlsLmNvbQ', 'Teresa Bergman', 'A'),
	('2023-05-28 09-00-00', 'ZGVubmlzQGdtYWlsLmNvbQ', 'The Busquitos', 'A'),
	('2023-05-28 10-00-00', 'ZGVubmlzQGdtYWlsLmNvbQ', 'Dominik Friedrich', 'A'),
	('2023-05-28 11-00-00', 'ZGVubmlzQGdtYWlsLmNvbQ', 'Alice Rose', 'B'),
	('2023-05-28 12-00-00', 'ZGVubmlzQGdtYWlsLmNvbQ', 'Der Katze & Die Hund', 'C'),
	('2023-05-28 13-00-00', 'ZGVubmlzQGdtYWlsLmNvbQ', 'Maxmaber Orkestar', 'D'),
	('2023-05-28 14-00-00', 'ZGVubmlzQGdtYWlsLmNvbQ', 'Nothing Concrete', 'E'),
	('2023-05-28 15-00-00', 'ZGVubmlzQGdtYWlsLmNvbQ', 'PHI', 'F'),
	('2023-05-28 08-00-00', 'ZGVubmlzQGdtYWlsLmNvbQ', 'The Busquitos', 'G'),
	('2023-05-28 09-00-00', 'ZGVubmlzQGdtYWlsLmNvbQ', 'Dominik Friedrich', 'B'),
	('2023-05-28 10-00-00', 'ZGVubmlzQGdtYWlsLmNvbQ', 'Alice Rose', 'D'),
	('2023-05-28 11-00-00', 'ZGVubmlzQGdtYWlsLmNvbQ', 'Nothing Concrete', 'F'),
	('2023-05-28 12-00-00', 'ZGVubmlzQGdtYWlsLmNvbQ', 'Dominik Friedrich', 'A'),
	('2023-05-28 13-00-00', 'ZGVubmlzQGdtYWlsLmNvbQ', 'Alice Rose', 'A'),
	('2023-05-28 14-00-00', 'ZGVubmlzQGdtYWlsLmNvbQ', 'Der Katze & Die Hund', 'A'),
	('2023-05-28 15-00-00', 'ZGVubmlzQGdtYWlsLmNvbQ', 'Maxmaber Orkestar', 'A'),
	('2023-05-28 08-00-00', 'ZGVubmlzQGdtYWlsLmNvbQ', 'Nothing Concrete', 'A'),
	('2023-05-28 09-00-00', 'ZGVubmlzQGdtYWlsLmNvbQ', 'PHI', 'A'),
	('2023-05-28 10-00-00', 'ZGVubmlzQGdtYWlsLmNvbQ', 'Teresa Bergman', 'A'),
	('2023-05-28 11-00-00', 'ZGVubmlzQGdtYWlsLmNvbQ', 'The Busquitos', 'A'),
	('2023-05-28 12-00-00', 'ZGVubmlzQGdtYWlsLmNvbQ', 'Dominik Friedrich', 'A'),
	('2023-05-28 13-00-00', 'ZGVubmlzQGdtYWlsLmNvbQ', 'Alice Rose', 'B'),
	('2023-05-28 14-00-00', 'ZGVubmlzQGdtYWlsLmNvbQ', 'Der Katze & Die Hund', 'C'),
	('2023-05-28 15-00-00', 'ZGVubmlzQGdtYWlsLmNvbQ', 'Maxmaber Orkestar', 'D'),
	('2023-05-28 08-00-00', 'ZGVubmlzQGdtYWlsLmNvbQ', 'Nothing Concrete', 'E'),
	('2023-05-28 09-00-00', 'ZGVubmlzQGdtYWlsLmNvbQ', 'PHI', 'F'),
	('2023-05-28 10-00-00', 'ZGVubmlzQGdtYWlsLmNvbQ', 'The Busquitos', 'G'),
	('2023-05-28 11-00-00', 'ZGVubmlzQGdtYWlsLmNvbQ', 'Dominik Friedrich', 'B'),
	('2023-05-28 12-00-00', 'ZGVubmlzQGdtYWlsLmNvbQ', 'Alice Rose', 'D'),
	('2023-05-28 13-00-00', 'ZGVubmlzQGdtYWlsLmNvbQ', 'Nothing Concrete', 'F');
