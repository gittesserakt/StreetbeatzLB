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

create or replace table artist
(
    artist_id  int auto_increment
        primary key,
    name      varchar(255) not null
);

create or replace table poi
(
    poi_id    int auto_increment
        primary key,
    name      varchar(255) not null,
    icon      varchar(255) null,
    poi_type  int          null,
    latitude  double       not null,
    longitude double       not null
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
    start_time      datetime     null,
	end_time      datetime     null,
    created_by     varchar(255) not null,
    artist_id       int          not null,
    stage_id       int          not null,
    constraint created_by_fk
        foreign key (created_by) references administrator (identifier),
    constraint artist_id_fk
        foreign key (artist_id) references artist (artist_id),
    constraint stage_id_fk
        foreign key (stage_id) references stage (stage_id)
);

create or replace table vote
(
    email    varchar(255) not null
        primary key,
	artist_id int          not null,
    constraint vote_ibfk_1
        foreign key (artist_id) references artist (artist_id)
);

create or replace index artist_id
    on vote (artist_id);

# identifier is email encoded with Base64URL
INSERT INTO `administrator` (identifier, email, firstname, surname, picture) VALUES
	('ZGVubmlzQGdtYWlsLmNvbQ', 'dennis@gmail.com', 'Dennis', 'Mustermann', null),
	('ZW50d2lja2xlckBnbWFpbC5jb20', 'entwickler@gmail.com', 'Entwickler', 'Mustermann', null),
	('aGFydmV5QGdtYWlsLmNvbQ', 'harvey@gmail.com', 'Harvey', 'Mustermann', null);

INSERT INTO `artist` (`name`) VALUES
	('Dominik Friedrich'),
	('Alice Rose'),
	('Der Katze & Die Hund'),
	('Maxmaber Orkestar'),
	('Nothing Concrete'),
	('PHI'),
	('Teresa Bergman'),
	('The Busquitos');

INSERT INTO `poi` (name, icon, poi_type, latitude, longitude) VALUES
	('Haupteingang', '0', NULL, 48.89629356141575, 9.196231354904848),
	('Eingang Mömpelgardstraße', '0', NULL, 48.89885774762525, 9.197583035983675),
	('Vorgarten', NULL, NULL, 48.89890437269485, 9.196007967518401),
	('Barocke Broderie', NULL, NULL, 48.90163303471827, 9.195045750240379),
	('Herzogschaukel/ Aktionshaus', NULL, NULL, 48.902251005875385, 9.199487247719524),
	('Restaurant Parkcafé', '2', NULL, 48.89950208404342, 9.201831829700073),
	('Eingang Hinterer Schlosshof', '0', NULL, 48.89982743592445, 9.197495485734656),
	('Stage A', '1', NULL, 48.898986, 9.195800),
	('Stage B', '1', NULL, 48.897815, 9.196530),
	('Stage C', '1', NULL, 48.896432, 9.196165),
	('Stage D', '1', NULL, 48.899091, 9.197302),
	('Stage E', '1', NULL, 48.900007, 9.201417),
	('Stage F', '1', NULL, 48.900457, 9.200464),
	('Stage G', '1', NULL, 48.900477, 9.198559),
	('Stage H', '1', NULL, 48.902243, 9.198940),
	('Stage I', '1', NULL, 48.901842, 9.197179),
	('Stage K', '1', NULL, 48.901475, 9.195543),
	('Stage L', '1', NULL, 48.901147, 9.196509),
	('Stage M', '1', NULL, 48.899800, 9.198606),
	('Stage S', '1', NULL, 48.900378, 9.195961);

INSERT INTO `stage` (name, stage_size) VALUES
	('A', 25.6),
	('B', 15.3),
	('C', 12.5),
	('D', 12.2),
	('E', 10.9),
	('F', 14.5),
	('G', 8.8);

INSERT INTO `vote` (email, artist_id) VALUES
	('mjouaux@stud.hs-heilbronn.de ', 1),
	('mmousa@stud.hs-heilbronn.de ', 2),
	('ddeifel@stud.hs-heilbronn.de', 3),
	('nholl@stud.hs-heilbronn.de ', 3);

INSERT INTO `performance` (start_time, end_time, created_by, artist_id, stage_id) VALUES
		 ('2023-05-28 08:00:00', '2023-05-28 08:30:00', 'ZGVubmlzQGdtYWlsLmNvbQ', 1, 1),
		 ('2023-05-28 09:00:00', '2023-05-28 09:30:00', 'ZGVubmlzQGdtYWlsLmNvbQ', 2, 1),
		 ('2023-05-28 10:00:00', '2023-05-28 10:30:00', 'ZGVubmlzQGdtYWlsLmNvbQ', 3, 1),
		 ('2023-05-28 11:00:00', '2023-05-28 11:30:00', 'ZGVubmlzQGdtYWlsLmNvbQ', 4, 1),
		 ('2023-05-28 12:00:00', '2023-05-28 12:30:00', 'ZGVubmlzQGdtYWlsLmNvbQ', 5, 1),
		 ('2023-05-28 13:00:00', '2023-05-28 13:30:00', 'ZGVubmlzQGdtYWlsLmNvbQ', 6, 1),
		 ('2023-05-28 14:00:00', '2023-05-28 14:30:00', 'ZGVubmlzQGdtYWlsLmNvbQ', 7, 1),
		 ('2023-05-28 15:00:00', '2023-05-28 15:30:00', 'ZGVubmlzQGdtYWlsLmNvbQ', 8, 1),
		 ('2023-05-28 16:00:00', '2023-05-28 16:30:00', 'ZGVubmlzQGdtYWlsLmNvbQ', 1, 1),
		 ('2023-05-28 17:00:00', '2023-05-28 17:30:00', 'ZGVubmlzQGdtYWlsLmNvbQ', 2, 2),
		 ('2023-05-28 18:00:00', '2023-05-28 18:30:00', 'ZGVubmlzQGdtYWlsLmNvbQ', 3, 3),
		 ('2023-05-28 19:00:00', '2023-05-28 19:30:00', 'ZGVubmlzQGdtYWlsLmNvbQ', 4, 4),
		 ('2023-05-28 20:00:00', '2023-05-28 20:30:00', 'ZGVubmlzQGdtYWlsLmNvbQ', 5, 5),
		 ('2023-05-28 21:00:00', '2023-05-28 21:30:00', 'ZGVubmlzQGdtYWlsLmNvbQ', 6, 6),
		 ('2023-05-28 08:00:00', '2023-05-28 08:30:00', 'ZGVubmlzQGdtYWlsLmNvbQ', 8, 7),
		 ('2023-05-28 09:00:00', '2023-05-28 09:30:00', 'ZGVubmlzQGdtYWlsLmNvbQ', 1, 2),
		 ('2023-05-28 10:00:00', '2023-05-28 10:30:00', 'ZGVubmlzQGdtYWlsLmNvbQ', 2, 4),
		 ('2023-05-28 11:00:00', '2023-05-28 11:30:00', 'ZGVubmlzQGdtYWlsLmNvbQ', 5, 6),
		 ('2023-05-28 12:00:00', '2023-05-28 12:30:00', 'ZGVubmlzQGdtYWlsLmNvbQ', 1, 1),
		 ('2023-05-28 13:00:00', '2023-05-28 13:30:00', 'ZGVubmlzQGdtYWlsLmNvbQ', 2, 1),
		 ('2023-05-28 14:00:00', '2023-05-28 14:30:00', 'ZGVubmlzQGdtYWlsLmNvbQ', 3, 1),
		 ('2023-05-28 15:00:00', '2023-05-28 15:30:00', 'ZGVubmlzQGdtYWlsLmNvbQ', 4, 1),
		 ('2023-05-28 16:00:00', '2023-05-28 16:30:00', 'ZGVubmlzQGdtYWlsLmNvbQ', 5, 1),
		 ('2023-05-28 17:00:00', '2023-05-28 17:30:00', 'ZGVubmlzQGdtYWlsLmNvbQ', 6, 1),
		 ('2023-05-28 08:00:00', '2023-05-28 08:30:00', 'ZGVubmlzQGdtYWlsLmNvbQ', 7, 1),
		 ('2023-05-28 09:00:00', '2023-05-28 09:30:00', 'ZGVubmlzQGdtYWlsLmNvbQ', 8, 1),
		 ('2023-05-28 10:00:00', '2023-05-28 10:30:00', 'ZGVubmlzQGdtYWlsLmNvbQ', 1, 1),
		 ('2023-05-28 11:00:00', '2023-05-28 11:30:00', 'ZGVubmlzQGdtYWlsLmNvbQ', 2, 2),
		 ('2023-05-28 12:00:00', '2023-05-28 12:30:00', 'ZGVubmlzQGdtYWlsLmNvbQ', 3, 3),
		 ('2023-05-28 13:00:00', '2023-05-28 13:30:00', 'ZGVubmlzQGdtYWlsLmNvbQ', 4, 4),
		 ('2023-05-28 14:00:00', '2023-05-28 14:30:00', 'ZGVubmlzQGdtYWlsLmNvbQ', 5, 5),
		 ('2023-05-28 15:00:00', '2023-05-28 15:30:00', 'ZGVubmlzQGdtYWlsLmNvbQ', 6, 6),
		 ('2023-05-28 08:00:00', '2023-05-28 08:30:00', 'ZGVubmlzQGdtYWlsLmNvbQ', 8, 7),
		 ('2023-05-28 09:00:00', '2023-05-28 09:30:00', 'ZGVubmlzQGdtYWlsLmNvbQ', 1, 2),
		 ('2023-05-28 10:00:00', '2023-05-28 10:30:00', 'ZGVubmlzQGdtYWlsLmNvbQ', 2, 4),
		 ('2023-05-28 11:00:00', '2023-05-28 11:30:00', 'ZGVubmlzQGdtYWlsLmNvbQ', 5, 6),
		 ('2023-05-28 12:00:00', '2023-05-28 12:30:00', 'ZGVubmlzQGdtYWlsLmNvbQ', 1, 1),
		 ('2023-05-28 13:00:00', '2023-05-28 13:30:00', 'ZGVubmlzQGdtYWlsLmNvbQ', 2, 1),
		 ('2023-05-28 14:00:00', '2023-05-28 14:30:00', 'ZGVubmlzQGdtYWlsLmNvbQ', 3, 1),
		 ('2023-05-28 15:00:00', '2023-05-28 15:30:00', 'ZGVubmlzQGdtYWlsLmNvbQ', 4, 1),
		 ('2023-05-28 08:00:00', '2023-05-28 08:30:00', 'ZGVubmlzQGdtYWlsLmNvbQ', 5, 1),
		 ('2023-05-28 09:00:00', '2023-05-28 09:30:00', 'ZGVubmlzQGdtYWlsLmNvbQ', 6, 1),
		 ('2023-05-28 10:00:00', '2023-05-28 10:30:00', 'ZGVubmlzQGdtYWlsLmNvbQ', 7, 1),
		 ('2023-05-28 11:00:00', '2023-05-28 11:30:00', 'ZGVubmlzQGdtYWlsLmNvbQ', 8, 1),
		 ('2023-05-28 12:00:00', '2023-05-28 12:30:00', 'ZGVubmlzQGdtYWlsLmNvbQ', 1, 1),
		 ('2023-05-28 13:00:00', '2023-05-28 13:30:00', 'ZGVubmlzQGdtYWlsLmNvbQ', 2, 2),
		 ('2023-05-28 14:00:00', '2023-05-28 14:30:00', 'ZGVubmlzQGdtYWlsLmNvbQ', 3, 3),
		 ('2023-05-28 15:00:00', '2023-05-28 15:30:00', 'ZGVubmlzQGdtYWlsLmNvbQ', 4, 4),
		 ('2023-05-28 08:00:00', '2023-05-28 08:30:00', 'ZGVubmlzQGdtYWlsLmNvbQ', 5, 5),
		 ('2023-05-28 09:00:00', '2023-05-28 09:30:00', 'ZGVubmlzQGdtYWlsLmNvbQ', 6, 6),
		 ('2023-05-28 10:00:00', '2023-05-28 10:30:00', 'ZGVubmlzQGdtYWlsLmNvbQ', 8, 7),
		 ('2023-05-28 11:00:00', '2023-05-28 11:30:00', 'ZGVubmlzQGdtYWlsLmNvbQ', 1, 2),
		 ('2023-05-28 12:00:00', '2023-05-28 12:30:00', 'ZGVubmlzQGdtYWlsLmNvbQ', 2, 4),
		 ('2023-05-28 13:00:00', '2023-05-28 13:30:00', 'ZGVubmlzQGdtYWlsLmNvbQ', 5, 6);
