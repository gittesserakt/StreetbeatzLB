create or replace table administrator
(
    identifier  varchar(255) not null
        primary key,
    email       varchar(255) not null,
    admin_name  varchar(255) null,
    picture     varchar(255) null,
    constraint administrator_pk2
        unique (email)
);

create or replace table artist
(
    artist_id   int auto_increment
        primary key,
    name        varchar(255) not null,
	vote_count  int null
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
    stage_id    int auto_increment
        primary key,
    name        varchar(128) null,
    stage_size  double       null
);

create or replace table performance
(
    performance_id  int auto_increment
        primary key,
    start_time      datetime     null,
	end_time        datetime     null,
    created_by      varchar(255) not null,
    artist_id       int          not null,
    stage_id        int          not null,
    constraint created_by_fk
        foreign key (created_by) references administrator (identifier),
    constraint artist_id_fk
        foreign key (artist_id) references artist (artist_id),
    constraint stage_id_fk
        foreign key (stage_id) references stage (stage_id)
);

# identifier is email encoded with Base64URL
INSERT INTO `administrator` (identifier, email, admin_name, picture) VALUES
	('644e4e24dfb8300113c88833', 'streetmusicfestivallb@gmail.com', 'streetmusicfestivallb', null),
    ('646cc9f12c53a205c4cd520f', 'tester@test.de', 'tester', null);
    --"auth0|" is removed when reading the Id, leads to problems.

INSERT INTO `artist` (`name`, vote_count) VALUES
	('Alice Rose', 0),
    ('Bajram Agushev Band', 0),
    ('Bastik', 0),
    ('BENJAKOB', 0),
    ('Beranger', 0),
    ('blu12', 0),
    ('Borja Catanesi', 0),
    ('Crobbs', 0),
    ('HaltMaKurz', 0),
    ('Ideal Forgery', 0),
    ('Jivers', 0),
    ('Jon Kenzie', 0),
    ('Karacan Kombo', 0),
    ('Kuma', 0),
    ('Kustan Adam', 0),
    ('Lavinia Hope', 0),
    ('Lev Radagan', 0),
    ('Magdalena Ganter', 0),
    ('Maja Iris', 0),
    ('Mario Parizek', 0),
    ('MC Money and the Jazz Rats', 0),
    ('Mirakolo', 0),
    ('Moanzy', 0),
    ('MT Head', 0),
    ('Ramm Tamm Tilda', 0),
    ('Roadstring Army', 0),
    ('SISSOS', 0),
    ('Sleepwalker’s Station', 0),
    ('Tijs Groen', 0),
    ('Toni Mogens', 0),
    ('Walk Two Folk', 0),
    ('YARA', 0);

INSERT INTO `poi` (name, icon, poi_type, latitude, longitude) VALUES
	('Haupteingang', '0', NULL, 48.89629356141575, 9.196231354904848),
	('Eingang Mömpelgardstraße', '0', NULL, 48.89885774762525, 9.197583035983675),
	('Vorgarten', NULL, NULL, 48.89890437269485, 9.196007967518401),
	('Barocke Broderie', NULL, NULL, 48.90163303471827, 9.195045750240379),
	('Herzogschaukel/ Aktionshaus', NULL, NULL, 48.902251005875385, 9.199487247719524),
	('Restaurant Parkcafé', '2', NULL, 48.89950208404342, 9.201831829700073),
	('Eingang Hinterer Schlosshof', '0', NULL, 48.89982743592445, 9.197495485734656),
	('Stage A', 'A', NULL, 48.898986, 9.195800),
	('Stage B', 'B', NULL, 48.897815, 9.196530),
	('Stage C', 'C', NULL, 48.896432, 9.196165),
	('Stage D', 'D', NULL, 48.899091, 9.197302),
	('Stage E', 'E', NULL, 48.900007, 9.201417),
	('Stage F', 'F', NULL, 48.900457, 9.200464),
	('Stage G', 'G', NULL, 48.900477, 9.198559),
	('Stage H', 'H', NULL, 48.902243, 9.198940),
	('Stage I', 'I', NULL, 48.901842, 9.197179),
	('Stage K', 'K', NULL, 48.901475, 9.195543),
	('Stage L', 'L', NULL, 48.901147, 9.196509),
	('Stage M', 'M', NULL, 48.899800, 9.198606),
	('Stage S', 'S', NULL, 48.900378, 9.195961);

INSERT INTO `stage` (name, stage_size) VALUES
	('A', 25.6),
	('B', 15.3),
	('C', 12.5),
	('D', 12.2),
	('E', 10.9),
	('F', 14.5),
	('G', 8.8),
    ('H', 4.5),
    ('I', 5.8),
    ('K', 5.6),
    ('L', 10.5),
    ('M', 9),
    ('S', 35);

INSERT INTO `performance` (start_time, end_time, created_by, artist_id, stage_id) VALUES
	('2023-05-28 08:00:00', '2023-05-28 08:30:00', '644e4e24dfb8300113c88833', 1, 1),
	('2023-05-28 09:00:00', '2023-05-28 09:30:00', '644e4e24dfb8300113c88833', 2, 1),
    ('2023-05-28 10:00:00', '2023-05-28 10:30:00', '644e4e24dfb8300113c88833', 3, 1),
	('2023-05-28 11:00:00', '2023-05-28 11:30:00', '644e4e24dfb8300113c88833', 4, 1),
	('2023-05-28 12:00:00', '2023-05-28 12:30:00', '644e4e24dfb8300113c88833', 5, 1),
	('2023-05-28 13:00:00', '2023-05-28 13:30:00', '644e4e24dfb8300113c88833', 6, 1),
	('2023-05-28 14:00:00', '2023-05-28 14:30:00', '644e4e24dfb8300113c88833', 7, 1),
	('2023-05-28 15:00:00', '2023-05-28 15:30:00', '644e4e24dfb8300113c88833', 8, 1),
	('2023-05-28 16:00:00', '2023-05-28 16:30:00', '644e4e24dfb8300113c88833', 1, 1),
	('2023-05-28 17:00:00', '2023-05-28 17:30:00', '644e4e24dfb8300113c88833', 2, 2),
	('2023-05-28 18:00:00', '2023-05-28 18:30:00', '644e4e24dfb8300113c88833', 3, 3),
	('2023-05-28 19:00:00', '2023-05-28 19:30:00', '644e4e24dfb8300113c88833', 4, 4),
	('2023-05-28 20:00:00', '2023-05-28 20:30:00', '644e4e24dfb8300113c88833', 5, 5),
	('2023-05-28 21:00:00', '2023-05-28 21:30:00', '644e4e24dfb8300113c88833', 6, 6),
	('2023-05-28 08:00:00', '2023-05-28 08:30:00', '644e4e24dfb8300113c88833', 8, 7),
	('2023-05-28 09:00:00', '2023-05-28 09:30:00', '644e4e24dfb8300113c88833', 1, 2),
	('2023-05-28 10:00:00', '2023-05-28 10:30:00', '644e4e24dfb8300113c88833', 2, 4),
	('2023-05-28 11:00:00', '2023-05-28 11:30:00', '644e4e24dfb8300113c88833', 5, 6),
	('2023-05-28 12:00:00', '2023-05-28 12:30:00', '644e4e24dfb8300113c88833', 1, 1),
	('2023-05-28 13:00:00', '2023-05-28 13:30:00', '644e4e24dfb8300113c88833', 2, 1),
	('2023-05-28 14:00:00', '2023-05-28 14:30:00', '644e4e24dfb8300113c88833', 3, 1),
    ('2023-05-28 15:00:00', '2023-05-28 15:30:00', '644e4e24dfb8300113c88833', 4, 1),
	('2023-05-28 16:00:00', '2023-05-28 16:30:00', '644e4e24dfb8300113c88833', 5, 1),
	('2023-05-28 17:00:00', '2023-05-28 17:30:00', '644e4e24dfb8300113c88833', 6, 1),
	('2023-05-28 08:00:00', '2023-05-28 08:30:00', '644e4e24dfb8300113c88833', 7, 1),
	('2023-05-28 09:00:00', '2023-05-28 09:30:00', '644e4e24dfb8300113c88833', 8, 1),
	('2023-05-28 10:00:00', '2023-05-28 10:30:00', '644e4e24dfb8300113c88833', 1, 1),
	('2023-05-28 11:00:00', '2023-05-28 11:30:00', '644e4e24dfb8300113c88833', 2, 2),
	('2023-05-28 12:00:00', '2023-05-28 12:30:00', '644e4e24dfb8300113c88833', 3, 3),
	('2023-05-28 13:00:00', '2023-05-28 13:30:00', '644e4e24dfb8300113c88833', 4, 4),
	('2023-05-28 14:00:00', '2023-05-28 14:30:00', '644e4e24dfb8300113c88833', 5, 5),
	('2023-05-28 15:00:00', '2023-05-28 15:30:00', '644e4e24dfb8300113c88833', 6, 6),
	('2023-05-28 08:00:00', '2023-05-28 08:30:00', '644e4e24dfb8300113c88833', 8, 7),
	('2023-05-28 09:00:00', '2023-05-28 09:30:00', '644e4e24dfb8300113c88833', 1, 2),
	('2023-05-28 10:00:00', '2023-05-28 10:30:00', '644e4e24dfb8300113c88833', 2, 4),
	('2023-05-28 11:00:00', '2023-05-28 11:30:00', '644e4e24dfb8300113c88833', 5, 6),
	('2023-05-28 12:00:00', '2023-05-28 12:30:00', '644e4e24dfb8300113c88833', 1, 1),
	('2023-05-28 13:00:00', '2023-05-28 13:30:00', '644e4e24dfb8300113c88833', 2, 1),
	('2023-05-28 14:00:00', '2023-05-28 14:30:00', '644e4e24dfb8300113c88833', 3, 1),
	('2023-05-28 15:00:00', '2023-05-28 15:30:00', '644e4e24dfb8300113c88833', 4, 1),
	('2023-05-28 08:00:00', '2023-05-28 08:30:00', '644e4e24dfb8300113c88833', 5, 1),
	('2023-05-28 09:00:00', '2023-05-28 09:30:00', '644e4e24dfb8300113c88833', 6, 1),
	('2023-05-28 10:00:00', '2023-05-28 10:30:00', '644e4e24dfb8300113c88833', 7, 1),
	('2023-05-28 11:00:00', '2023-05-28 11:30:00', '644e4e24dfb8300113c88833', 8, 1),
	('2023-05-28 12:00:00', '2023-05-28 12:30:00', '644e4e24dfb8300113c88833', 1, 1),
	('2023-05-28 13:00:00', '2023-05-28 13:30:00', '644e4e24dfb8300113c88833', 2, 2),
	('2023-05-28 14:00:00', '2023-05-28 14:30:00', '644e4e24dfb8300113c88833', 3, 3),
	('2023-05-28 15:00:00', '2023-05-28 15:30:00', '644e4e24dfb8300113c88833', 4, 4),
	('2023-05-28 08:00:00', '2023-05-28 08:30:00', '644e4e24dfb8300113c88833', 5, 5),
	('2023-05-28 09:00:00', '2023-05-28 09:30:00', '644e4e24dfb8300113c88833', 6, 6),
	('2023-05-28 10:00:00', '2023-05-28 10:30:00', '644e4e24dfb8300113c88833', 8, 7),
	('2023-05-28 11:00:00', '2023-05-28 11:30:00', '644e4e24dfb8300113c88833', 1, 2),
	('2023-05-28 12:00:00', '2023-05-28 12:30:00', '644e4e24dfb8300113c88833', 2, 4),
	('2023-05-28 13:00:00', '2023-05-28 13:30:00', '644e4e24dfb8300113c88833', 5, 6),
    ('2023-05-29 12:00:00', '2023-05-29 12:30:00', '644e4e24dfb8300113c88833', 2, 4);
