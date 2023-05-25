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
    poi_type  varchar(255) null,
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
    -- "auth0|" is removed when reading the Id, leads to problems.

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
	('Haupteingang', 'entrance.svg', 'entrance', 48.89629356141575, 9.196231354904848),
	('Eingang Mömpelgardstraße', 'entrance.svg', 'entrance', 48.89885774762525, 9.197583035983675),
	('Vorgarten', NULL, 'spot', 48.89890437269485, 9.196007967518401),
	('Barocke Broderie', NULL, 'spot', 48.90163303471827, 9.195045750240379),
	('Herzogschaukel/ Aktionshaus', NULL, 'spot', 48.902251005875385, 9.199487247719524),
	('Restaurant Parkcafé', 'food.svg', 'food', 48.89950208404342, 9.201831829700073),
	('Eingang Hinterer Schlosshof', 'entrance.svg', 'entrance', 48.89982743592445, 9.197495485734656),
	('User Icon', 'user_position.svg', NULL, 0, 0),
	('Stage A', 'stage_A.svg', 'stage', 48.898986, 9.195800),
	('Stage B', 'stage_B.svg', 'stage', 48.897815, 9.196530),
	('Stage C', 'stage_C.svg', 'stage', 48.896432, 9.196165),
	('Stage D', 'stage_D.svg', 'stage', 48.899091, 9.197302),
	('Stage E', 'stage_E.svg', 'stage', 48.900007, 9.201417),
	('Stage F', 'stage_F.svg', 'stage', 48.900457, 9.200464),
	('Stage G', 'stage_G.svg', 'stage', 48.900477, 9.198559),
	('Stage H', 'stage_H.svg', 'stage', 48.902243, 9.198940),
	('Stage I', 'stage_I.svg', 'stage', 48.901842, 9.197179),
	('Stage K', 'stage_K.svg', 'stage', 48.901475, 9.195543),
	('Stage L', 'stage_L.svg', 'stage', 48.901147, 9.196509),
	('Stage M', 'stage_M.svg', 'stage', 48.899800, 9.198606),
	('Stage S', 'stage_S.svg', 'stage', 48.900378, 9.195961);

INSERT INTO `stage` (name, stage_size) VALUES
	('A', 25.6),    -- 1
	('B', 15.3),
	('C', 12.5),    -- 3
	('D', 12.2),
	('E', 10.9),    -- 5
	('F', 14.5),
	('G', 8.8),     -- 7
    ('H', 4.5),
    ('I', 5.8),
    ('K', 5.6),     -- 10
    ('L', 10.5),
    ('M', 9),
    ('S', 35);      -- 13

INSERT INTO `performance` (start_time, end_time, created_by, artist_id, stage_id) VALUES
    -- Spielzeiten:
    ('2023-05-26 19:10:00', '2023-05-26 19:40:00', '644e4e24dfb8300113c88833', 1, 3),
    ('2023-05-26 20:20:00', '2023-05-26 20:50:00', '644e4e24dfb8300113c88833', 1, 6),
    ('2023-05-26 21:30:00', '2023-05-26 22:00:00', '644e4e24dfb8300113c88833', 1, 12),
    ('2023-05-27 18:00:00', '2023-05-27 18:30:00', '644e4e24dfb8300113c88833', 1, 4),
    ('2023-05-27 21:15:00', '2023-05-27 21:45:00', '644e4e24dfb8300113c88833', 1, 1),
    ('2023-05-27 22:05:00', '2023-05-27 22:35:00', '644e4e24dfb8300113c88833', 1, 10),
    ('2023-05-28 18:35:00', '2023-05-27 19:05:00', '644e4e24dfb8300113c88833', 1, 2),
    ('2023-05-28 19:45:00', '2023-05-27 20:15:00', '644e4e24dfb8300113c88833', 1, 9),
    ('2023-05-26 19:10:00', '2023-05-26 19:40:00', '644e4e24dfb8300113c88833', 2, 7),
    ('2023-05-26 20:55:00', '2023-05-26 21:25:00', '644e4e24dfb8300113c88833', 2, 9),
    ('2023-05-26 22:40:00', '2023-05-26 23:10:00', '644e4e24dfb8300113c88833', 2, 5),
    ('2023-05-27 18:35:00', '2023-05-27 19:05:00', '644e4e24dfb8300113c88833', 2, 10),
    ('2023-05-27 20:20:00', '2023-05-27 20:50:00', '644e4e24dfb8300113c88833', 2, 12),
    ('2023-05-27 22:40:00', '2023-05-27 23:10:00', '644e4e24dfb8300113c88833', 2, 3),
    ('2023-05-28 19:00:00', '2023-05-28 19:30:00', '644e4e24dfb8300113c88833', 2, 1),
    ('2023-05-28 19:45:00', '2023-05-28 20:15:00', '644e4e24dfb8300113c88833', 2, 4),
    ('2023-05-26 19:10:00', '2023-05-26 19:40:00', '644e4e24dfb8300113c88833', 3, 4),
    ('2023-05-26 20:20:00', '2023-05-26 20:50:00', '644e4e24dfb8300113c88833', 3, 10),
    ('2023-05-26 21:30:00', '2023-05-26 22:00:00', '644e4e24dfb8300113c88833', 3, 6),
    ('2023-05-27 19:10:00', '2023-05-27 19:40:00', '644e4e24dfb8300113c88833', 3, 9),
    ('2023-05-27 20:20:00', '2023-05-27 20:50:00', '644e4e24dfb8300113c88833', 3, 2),
    ('2023-05-27 22:05:00', '2023-05-27 22:35:00', '644e4e24dfb8300113c88833', 3, 8),
    ('2023-05-28 19:10:00', '2023-05-28 19:40:00', '644e4e24dfb8300113c88833', 3, 5),
    ('2023-05-28 20:15:00', '2023-05-28 20:45:00', '644e4e24dfb8300113c88833', 3, 1),
    ('2023-05-26 19:45:00', '2023-05-26 20:15:00', '644e4e24dfb8300113c88833', 4, 5),
    ('2023-05-26 21:15:00', '2023-05-26 21:45:00', '644e4e24dfb8300113c88833', 4, 1),
    ('2023-05-26 22:40:00', '2023-05-26 23:10:00', '644e4e24dfb8300113c88833', 4, 3),
    ('2023-05-27 18:00:00', '2023-05-27 18:30:00', '644e4e24dfb8300113c88833', 4, 9),
    ('2023-05-27 19:10:00', '2023-05-27 19:40:00', '644e4e24dfb8300113c88833', 4, 12),
    ('2023-05-27 20:55:00', '2023-05-27 21:25:00', '644e4e24dfb8300113c88833', 4, 10),
    ('2023-05-28 19:10:00', '2023-05-28 19:40:00', '644e4e24dfb8300113c88833', 4, 4),
    ('2023-05-28 20:20:00', '2023-05-28 20:50:00', '644e4e24dfb8300113c88833', 4, 8),
    ('2023-05-26 18:35:00', '2023-05-26 19:05:00', '644e4e24dfb8300113c88833', 5, 4),
    ('2023-05-26 20:00:00', '2023-05-26 20:30:00', '644e4e24dfb8300113c88833', 5, 1),
    ('2023-05-26 20:55:00', '2023-05-26 21:25:00', '644e4e24dfb8300113c88833', 5, 7),
    ('2023-05-27 18:00:00', '2023-05-27 18:30:00', '644e4e24dfb8300113c88833', 5, 12),
    ('2023-05-27 19:45:00', '2023-05-27 20:15:00', '644e4e24dfb8300113c88833', 5, 6),
    ('2023-05-27 20:55:00', '2023-05-27 21:25:00', '644e4e24dfb8300113c88833', 5, 7),
    ('2023-05-28 18:00:00', '2023-05-28 18:30:00', '644e4e24dfb8300113c88833', 5, 9),
    ('2023-05-28 20:20:00', '2023-05-28 20:50:00', '644e4e24dfb8300113c88833', 5, 2),
    ('2023-05-26 18:35:00', '2023-05-26 19:05:00', '644e4e24dfb8300113c88833', 6, 10),
    ('2023-05-26 20:20:00', '2023-05-26 20:50:00', '644e4e24dfb8300113c88833', 6, 3),
    ('2023-05-26 21:30:00', '2023-05-26 22:00:00', '644e4e24dfb8300113c88833', 6, 5),
    ('2023-05-27 19:10:00', '2023-05-27 19:40:00', '644e4e24dfb8300113c88833', 6, 2),
    ('2023-05-27 20:55:00', '2023-05-27 21:25:00', '644e4e24dfb8300113c88833', 6, 4),
    ('2023-05-27 22:05:00', '2023-05-27 22:35:00', '644e4e24dfb8300113c88833', 6, 7),
    ('2023-05-28 18:35:00', '2023-05-28 19:05:00', '644e4e24dfb8300113c88833', 6, 12),
    ('2023-05-28 19:45:00', '2023-05-28 20:15:00', '644e4e24dfb8300113c88833', 6, 1),
    ('2023-05-26 19:00:00', '2023-05-26 19:30:00', '644e4e24dfb8300113c88833', 7, 1),
    ('2023-05-26 19:45:00', '2023-05-26 20:15:00', '644e4e24dfb8300113c88833', 7, 12),
    ('2023-05-26 21:30:00', '2023-05-26 22:00:00', '644e4e24dfb8300113c88833', 7, 10),
    ('2023-05-27 18:35:00', '2023-05-27 19:05:00', '644e4e24dfb8300113c88833', 7, 9),
    ('2023-05-27 20:55:00', '2023-05-27 21:25:00', '644e4e24dfb8300113c88833', 7, 8),
    ('2023-05-27 22:40:00', '2023-05-27 23:10:00', '644e4e24dfb8300113c88833', 7, 6),
    ('2023-05-28 19:10:00', '2023-05-28 19:40:00', '644e4e24dfb8300113c88833', 7, 7),
    ('2023-05-28 20:20:00', '2023-05-28 20:50:00', '644e4e24dfb8300113c88833', 7, 4),
    ('2023-05-26 18:00:00', '2023-05-26 18:30:00', '644e4e24dfb8300113c88833', 8, 12),
    ('2023-05-26 19:10:00', '2023-05-26 19:40:00', '644e4e24dfb8300113c88833', 8, 10),
    ('2023-05-26 22:40:00', '2023-05-26 23:10:00', '644e4e24dfb8300113c88833', 8, 6),
    ('2023-05-27 19:30:00', '2023-05-27 20:00:00', '644e4e24dfb8300113c88833', 8, 1),
    ('2023-05-27 20:20:00', '2023-05-27 20:50:00', '644e4e24dfb8300113c88833', 8, 9),
    ('2023-05-27 21:30:00', '2023-05-27 22:00:00', '644e4e24dfb8300113c88833', 8, 3),
    ('2023-05-27 22:40:00', '2023-05-27 23:10:00', '644e4e24dfb8300113c88833', 8, 5),
    ('2023-05-28 19:45:00', '2023-05-28 20:15:00', '644e4e24dfb8300113c88833', 8, 7),
    ('2023-05-26 18:00:00', '2023-05-26 18:30:00', '644e4e24dfb8300113c88833', 9, 10),
    ('2023-05-26 19:45:00', '2023-05-26 20:15:00', '644e4e24dfb8300113c88833', 9, 7),
    ('2023-05-26 22:40:00', '2023-05-26 23:10:00', '644e4e24dfb8300113c88833', 9, 8),
    ('2023-05-27 19:10:00', '2023-05-27 19:40:00', '644e4e24dfb8300113c88833', 9, 3),
    ('2023-05-27 20:55:00', '2023-05-27 21:25:00', '644e4e24dfb8300113c88833', 9, 2),
    ('2023-05-27 22:05:00', '2023-05-27 22:35:00', '644e4e24dfb8300113c88833', 9, 5),
    ('2023-05-28 19:10:00', '2023-05-28 19:40:00', '644e4e24dfb8300113c88833', 9, 9),
    ('2023-05-28 20:30:00', '2023-05-28 21:00:00', '644e4e24dfb8300113c88833', 9, 1),
    ('2023-05-26 19:30:00', '2023-05-26 20:00:00', '644e4e24dfb8300113c88833', 10, 1),
    ('2023-05-26 20:20:00', '2023-05-26 20:50:00', '644e4e24dfb8300113c88833', 10, 2),
    ('2023-05-26 22:05:00', '2023-05-26 22:35:00', '644e4e24dfb8300113c88833', 10, 10),
    ('2023-05-27 18:00:00', '2023-05-27 18:30:00', '644e4e24dfb8300113c88833', 10, 7),
    ('2023-05-27 19:45:00', '2023-05-27 20:15:00', '644e4e24dfb8300113c88833', 10, 8),
    ('2023-05-27 22:05:00', '2023-05-27 22:35:00', '644e4e24dfb8300113c88833', 10, 12),
    ('2023-05-28 18:00:00', '2023-05-28 18:30:00', '644e4e24dfb8300113c88833', 10, 3),
    ('2023-05-28 19:45:00', '2023-05-28 20:15:00', '644e4e24dfb8300113c88833', 10, 6),
    ('2023-05-26 18:35:00', '2023-05-26 19:05:00', '644e4e24dfb8300113c88833', 11, 2),
    ('2023-05-26 20:20:00', '2023-05-26 20:50:00', '644e4e24dfb8300113c88833', 11, 7),
    ('2023-05-26 22:40:00', '2023-05-26 23:10:00', '644e4e24dfb8300113c88833', 11, 12),
    ('2023-05-27 20:20:00', '2023-05-27 20:50:00', '644e4e24dfb8300113c88833', 11, 6),
    ('2023-05-27 21:45:00', '2023-05-27 22:15:00', '644e4e24dfb8300113c88833', 11, 1),
    ('2023-05-27 22:40:00', '2023-05-27 23:10:00', '644e4e24dfb8300113c88833', 11, 10),
    ('2023-05-28 18:00:00', '2023-05-28 18:30:00', '644e4e24dfb8300113c88833', 11, 4),
    ('2023-05-28 19:45:00', '2023-05-28 20:15:00', '644e4e24dfb8300113c88833', 11, 5),
    ('2023-05-26 18:35:00', '2023-05-26 19:05:00', '644e4e24dfb8300113c88833', 12, 8),
    ('2023-05-26 19:45:00', '2023-05-26 20:15:00', '644e4e24dfb8300113c88833', 12, 10),
    ('2023-05-26 22:05:00', '2023-05-26 22:35:00', '644e4e24dfb8300113c88833', 12, 12),
    ('2023-05-27 19:10:00', '2023-05-27 19:40:00', '644e4e24dfb8300113c88833', 12, 4),
    ('2023-05-27 20:45:00', '2023-05-27 21:15:00', '644e4e24dfb8300113c88833', 12, 1),
    ('2023-05-27 21:30:00', '2023-05-27 22:00:00', '644e4e24dfb8300113c88833', 12, 7),
    ('2023-05-28 18:00:00', '2023-05-28 18:30:00', '644e4e24dfb8300113c88833', 12, 8),
    ('2023-05-28 19:45:00', '2023-05-28 20:15:00', '644e4e24dfb8300113c88833', 12, 3),
    ('2023-05-26 18:35:00', '2023-05-26 19:05:00', '644e4e24dfb8300113c88833', 13, 3),
    ('2023-05-26 20:20:00', '2023-05-26 20:50:00', '644e4e24dfb8300113c88833', 13, 5),
    ('2023-05-26 21:30:00', '2023-05-26 22:00:00', '644e4e24dfb8300113c88833', 13, 7),
    ('2023-05-27 19:45:00', '2023-05-27 20:15:00', '644e4e24dfb8300113c88833', 13, 5),
    ('2023-05-27 21:00:00', '2023-05-27 21:30:00', '644e4e24dfb8300113c88833', 13, 1),
    ('2023-05-27 22:05:00', '2023-05-27 22:35:00', '644e4e24dfb8300113c88833', 13, 9),
    ('2023-05-28 18:00:00', '2023-05-28 18:30:00', '644e4e24dfb8300113c88833', 13, 12),
    ('2023-05-28 19:10:00', '2023-05-28 19:40:00', '644e4e24dfb8300113c88833', 13, 10),
    ('2023-05-26 19:10:00', '2023-05-26 19:40:00', '644e4e24dfb8300113c88833', 14, 2),
    ('2023-05-26 20:55:00', '2023-05-26 21:25:00', '644e4e24dfb8300113c88833', 14, 10),
    ('2023-05-26 22:05:00', '2023-05-26 22:35:00', '644e4e24dfb8300113c88833', 14, 3),
    ('2023-05-27 18:35:00', '2023-05-27 19:05:00', '644e4e24dfb8300113c88833', 14, 5),
    ('2023-05-27 19:45:00', '2023-05-27 20:15:00', '644e4e24dfb8300113c88833', 14, 7),
    ('2023-05-27 20:55:00', '2023-05-27 21:25:00', '644e4e24dfb8300113c88833', 14, 6),
    ('2023-05-28 18:30:00', '2023-05-28 19:00:00', '644e4e24dfb8300113c88833', 14, 1),
    ('2023-05-28 19:10:00', '2023-05-28 19:40:00', '644e4e24dfb8300113c88833', 14, 3),
    ('2023-05-26 19:10:00', '2023-05-26 19:40:00', '644e4e24dfb8300113c88833', 15, 6),
    ('2023-05-26 20:55:00', '2023-05-26 21:25:00', '644e4e24dfb8300113c88833', 15, 8),
    ('2023-05-26 22:05:00', '2023-05-26 22:35:00', '644e4e24dfb8300113c88833', 15, 7),
    ('2023-05-27 18:00:00', '2023-05-27 18:30:00', '644e4e24dfb8300113c88833', 15, 3),
    ('2023-05-27 19:15:00', '2023-05-27 19:45:00', '644e4e24dfb8300113c88833', 15, 1),
    ('2023-05-27 20:20:00', '2023-05-27 20:50:00', '644e4e24dfb8300113c88833', 15, 5),
    ('2023-05-27 21:30:00', '2023-05-27 22:00:00', '644e4e24dfb8300113c88833', 15, 9),
    ('2023-05-28 19:45:00', '2023-05-28 20:15:00', '644e4e24dfb8300113c88833', 15, 10),
    ('2023-05-26 19:10:00', '2023-05-26 19:40:00', '644e4e24dfb8300113c88833', 16, 5),
    ('2023-05-26 21:30:00', '2023-05-26 22:00:00', '644e4e24dfb8300113c88833', 16, 1),
    ('2023-05-26 22:40:00', '2023-05-26 23:10:00', '644e4e24dfb8300113c88833', 16, 4),
    ('2023-05-27 18:35:00', '2023-05-27 19:05:00', '644e4e24dfb8300113c88833', 16, 8),
    ('2023-05-27 19:45:00', '2023-05-27 20:15:00', '644e4e24dfb8300113c88833', 16, 9),
    ('2023-05-27 22:05:00', '2023-05-27 22:35:00', '644e4e24dfb8300113c88833', 16, 6),
    ('2023-05-28 18:35:00', '2023-05-28 19:05:00', '644e4e24dfb8300113c88833', 16, 7),
    ('2023-05-28 19:45:00', '2023-05-28 20:15:00', '644e4e24dfb8300113c88833', 16, 12),
    ('2023-05-26 19:15:00', '2023-05-26 19:45:00', '644e4e24dfb8300113c88833', 17, 1),
    ('2023-05-26 20:55:00', '2023-05-26 21:25:00', '644e4e24dfb8300113c88833', 17, 2),
    ('2023-05-26 22:40:00', '2023-05-26 23:10:00', '644e4e24dfb8300113c88833', 17, 10),
    ('2023-05-27 18:35:00', '2023-05-27 19:05:00', '644e4e24dfb8300113c88833', 17, 7),
    ('2023-05-27 20:20:00', '2023-05-27 20:50:00', '644e4e24dfb8300113c88833', 17, 8),
    ('2023-05-27 22:40:00', '2023-05-27 23:10:00', '644e4e24dfb8300113c88833', 17, 12),
    ('2023-05-28 18:35:00', '2023-05-28 19:05:00', '644e4e24dfb8300113c88833', 17, 3),
    ('2023-05-28 20:20:00', '2023-05-28 20:50:00', '644e4e24dfb8300113c88833', 17, 6),
    ('2023-05-26 19:10:00', '2023-05-26 19:40:00', '644e4e24dfb8300113c88833', 18, 8),
    ('2023-05-26 20:55:00', '2023-05-26 21:25:00', '644e4e24dfb8300113c88833', 18, 12),
    ('2023-05-26 22:40:00', '2023-05-26 23:10:00', '644e4e24dfb8300113c88833', 18, 7),
    ('2023-05-27 19:45:00', '2023-05-27 20:15:00', '644e4e24dfb8300113c88833', 18, 2),
    ('2023-05-27 20:55:00', '2023-05-27 21:25:00', '644e4e24dfb8300113c88833', 18, 3),
    ('2023-05-27 22:00:00', '2023-05-27 22:30:00', '644e4e24dfb8300113c88833', 18, 1),
    ('2023-05-28 18:35:00', '2023-05-28 19:05:00', '644e4e24dfb8300113c88833', 18, 6),
    ('2023-05-28 19:45:00', '2023-05-28 20:15:00', '644e4e24dfb8300113c88833', 18, 9),
    ('2023-05-26 18:00:00', '2023-05-26 18:30:00', '644e4e24dfb8300113c88833', 19, 5),
    ('2023-05-26 20:20:00', '2023-05-26 20:50:00', '644e4e24dfb8300113c88833', 19, 9),
    ('2023-05-26 21:30:00', '2023-05-26 22:00:00', '644e4e24dfb8300113c88833', 19, 8),
    ('2023-05-27 18:35:00', '2023-05-27 19:05:00', '644e4e24dfb8300113c88833', 19, 3),
    ('2023-05-27 20:20:00', '2023-05-27 20:50:00', '644e4e24dfb8300113c88833', 19, 4),
    ('2023-05-27 21:30:00', '2023-05-27 22:00:00', '644e4e24dfb8300113c88833', 19, 10),
    ('2023-05-28 18:00:00', '2023-05-28 18:30:00', '644e4e24dfb8300113c88833', 19, 2),
    ('2023-05-28 19:15:00', '2023-05-28 19:45:00', '644e4e24dfb8300113c88833', 19, 1),
    ('2023-05-26 18:00:00', '2023-05-26 18:30:00', '644e4e24dfb8300113c88833', 20, 4),
    ('2023-05-26 19:45:00', '2023-05-26 20:15:00', '644e4e24dfb8300113c88833', 20, 3),
    ('2023-05-26 22:05:00', '2023-05-26 22:35:00', '644e4e24dfb8300113c88833', 20, 5),
    ('2023-05-27 18:00:00', '2023-05-27 18:30:00', '644e4e24dfb8300113c88833', 20, 10),
    ('2023-05-27 20:55:00', '2023-05-27 21:25:00', '644e4e24dfb8300113c88833', 20, 9),
    ('2023-05-27 22:40:00', '2023-05-27 23:10:00', '644e4e24dfb8300113c88833', 20, 7),
    ('2023-05-28 19:10:00', '2023-05-28 19:40:00', '644e4e24dfb8300113c88833', 20, 8),
    ('2023-05-28 20:45:00', '2023-05-28 21:15:00', '644e4e24dfb8300113c88833', 20, 1),
    ('2023-05-26 19:10:00', '2023-05-26 19:40:00', '644e4e24dfb8300113c88833', 21, 12),
    ('2023-05-26 20:20:00', '2023-05-26 20:50:00', '644e4e24dfb8300113c88833', 21, 8),
    ('2023-05-26 22:05:00', '2023-05-26 22:35:00', '644e4e24dfb8300113c88833', 21, 9),
    ('2023-05-27 19:10:00', '2023-05-27 19:40:00', '644e4e24dfb8300113c88833', 21, 10),
    ('2023-05-27 21:30:00', '2023-05-27 22:00:00', '644e4e24dfb8300113c88833', 21, 5),
    ('2023-05-27 22:40:00', '2023-05-27 23:10:00', '644e4e24dfb8300113c88833', 21, 2),
    ('2023-05-28 18:00:00', '2023-05-28 18:30:00', '644e4e24dfb8300113c88833', 21, 7),
    ('2023-05-28 19:30:00', '2023-05-28 20:00:00', '644e4e24dfb8300113c88833', 21, 1),
    ('2023-05-26 18:00:00', '2023-05-26 18:30:00', '644e4e24dfb8300113c88833', 22, 3),
    ('2023-05-26 20:15:00', '2023-05-26 20:45:00', '644e4e24dfb8300113c88833', 22, 1),
    ('2023-05-26 22:05:00', '2023-05-26 22:35:00', '644e4e24dfb8300113c88833', 22, 2),
    ('2023-05-27 18:00:00', '2023-05-27 18:30:00', '644e4e24dfb8300113c88833', 22, 6),
    ('2023-05-27 20:20:00', '2023-05-27 20:50:00', '644e4e24dfb8300113c88833', 22, 7),
    ('2023-05-27 22:40:00', '2023-05-27 23:10:00', '644e4e24dfb8300113c88833', 22, 4),
    ('2023-05-28 18:00:00', '2023-05-28 18:30:00', '644e4e24dfb8300113c88833', 22, 6),
    ('2023-05-28 19:45:00', '2023-05-28 20:15:00', '644e4e24dfb8300113c88833', 22, 2),
    ('2023-05-26 19:45:00', '2023-05-26 20:15:00', '644e4e24dfb8300113c88833', 23, 1),
    ('2023-05-26 20:55:00', '2023-05-26 21:25:00', '644e4e24dfb8300113c88833', 23, 5),
    ('2023-05-26 22:05:00', '2023-05-26 22:35:00', '644e4e24dfb8300113c88833', 23, 6),
    ('2023-05-27 18:35:00', '2023-05-27 19:05:00', '644e4e24dfb8300113c88833', 23, 2),
    ('2023-05-27 19:45:00', '2023-05-27 20:15:00', '644e4e24dfb8300113c88833', 23, 12),
    ('2023-05-27 21:30:00', '2023-05-27 22:00:00', '644e4e24dfb8300113c88833', 23, 8),
    ('2023-05-28 18:35:00', '2023-05-28 19:05:00', '644e4e24dfb8300113c88833', 23, 4),
    ('2023-05-28 20:20:00', '2023-05-28 20:50:00', '644e4e24dfb8300113c88833', 23, 10),
    ('2023-05-26 18:00:00', '2023-05-26 18:30:00', '644e4e24dfb8300113c88833', 24, 7),
    ('2023-05-26 19:45:00', '2023-05-26 20:15:00', '644e4e24dfb8300113c88833', 24, 6),
    ('2023-05-26 21:30:00', '2023-05-26 22:00:00', '644e4e24dfb8300113c88833', 24, 9),
    ('2023-05-27 19:10:00', '2023-05-27 19:40:00', '644e4e24dfb8300113c88833', 24, 5),
    ('2023-05-27 20:15:00', '2023-05-27 20:45:00', '644e4e24dfb8300113c88833', 24, 1),
    ('2023-05-27 22:05:00', '2023-05-27 22:35:00', '644e4e24dfb8300113c88833', 24, 4),
    ('2023-05-28 19:10:00', '2023-05-28 19:40:00', '644e4e24dfb8300113c88833', 24, 2),
    ('2023-05-28 20:20:00', '2023-05-28 20:50:00', '644e4e24dfb8300113c88833', 24, 12),
    ('2023-05-26 18:35:00', '2023-05-26 19:05:00', '644e4e24dfb8300113c88833', 25, 9),
    ('2023-05-26 20:20:00', '2023-05-26 20:50:00', '644e4e24dfb8300113c88833', 25, 4),
    ('2023-05-26 22:05:00', '2023-05-26 22:35:00', '644e4e24dfb8300113c88833', 25, 8),
    ('2023-05-27 18:35:00', '2023-05-27 19:05:00', '644e4e24dfb8300113c88833', 25, 6),
    ('2023-05-27 19:45:00', '2023-05-27 20:15:00', '644e4e24dfb8300113c88833', 25, 1),
    ('2023-05-27 21:30:00', '2023-05-27 22:00:00', '644e4e24dfb8300113c88833', 25, 2),
    ('2023-05-28 18:00:00', '2023-05-28 18:30:00', '644e4e24dfb8300113c88833', 25, 10),
    ('2023-05-28 19:10:00', '2023-05-28 19:40:00', '644e4e24dfb8300113c88833', 25, 12),
    ('2023-05-26 19:10:00', '2023-05-26 19:40:00', '644e4e24dfb8300113c88833', 26, 9),
    ('2023-05-26 20:55:00', '2023-05-26 21:25:00', '644e4e24dfb8300113c88833', 26, 3),
    ('2023-05-26 22:40:00', '2023-05-26 23:10:00', '644e4e24dfb8300113c88833', 26, 2),
    ('2023-05-27 19:10:00', '2023-05-27 19:40:00', '644e4e24dfb8300113c88833', 26, 8),
    ('2023-05-27 20:30:00', '2023-05-27 21:00:00', '644e4e24dfb8300113c88833', 26, 1),
    ('2023-05-27 21:30:00', '2023-05-27 22:00:00', '644e4e24dfb8300113c88833', 26, 4),
    ('2023-05-28 18:35:00', '2023-05-28 19:05:00', '644e4e24dfb8300113c88833', 26, 10),
    ('2023-05-28 20:20:00', '2023-05-28 20:50:00', '644e4e24dfb8300113c88833', 26, 7),
    ('2023-05-26 18:35:00', '2023-05-26 19:05:00', '644e4e24dfb8300113c88833', 27, 12),
    ('2023-05-26 19:45:00', '2023-05-26 20:15:00', '644e4e24dfb8300113c88833', 27, 2),
    ('2023-05-26 20:55:00', '2023-05-26 21:25:00', '644e4e24dfb8300113c88833', 27, 4),
    ('2023-05-26 21:45:00', '2023-05-26 22:00:00', '644e4e24dfb8300113c88833', 27, 1),
    ('2023-05-27 19:10:00', '2023-05-27 19:40:00', '644e4e24dfb8300113c88833', 27, 7),
    ('2023-05-27 20:20:00', '2023-05-27 20:50:00', '644e4e24dfb8300113c88833', 27, 10),
    ('2023-05-27 21:30:00', '2023-05-27 22:00:00', '644e4e24dfb8300113c88833', 27, 6),
    ('2023-05-28 18:00:00', '2023-05-28 18:30:00', '644e4e24dfb8300113c88833', 27, 5),
    ('2023-05-26 18:35:00', '2023-05-26 19:05:00', '644e4e24dfb8300113c88833', 28, 6),
    ('2023-05-26 19:45:00', '2023-05-26 20:15:00', '644e4e24dfb8300113c88833', 28, 9),
    ('2023-05-26 21:30:00', '2023-05-26 22:00:00', '644e4e24dfb8300113c88833', 28, 4),
    ('2023-05-27 18:00:00', '2023-05-27 18:30:00', '644e4e24dfb8300113c88833', 28, 5),
    ('2023-05-27 19:45:00', '2023-05-27 20:15:00', '644e4e24dfb8300113c88833', 28, 3),
    ('2023-05-27 22:05:00', '2023-05-27 22:35:00', '644e4e24dfb8300113c88833', 28, 2),
    ('2023-05-28 18:45:00', '2023-05-28 19:15:00', '644e4e24dfb8300113c88833', 28, 1),
    ('2023-05-28 19:45:00', '2023-05-28 20:15:00', '644e4e24dfb8300113c88833', 28, 8),
    ('2023-05-26 19:45:00', '2023-05-26 20:15:00', '644e4e24dfb8300113c88833', 29, 8),
    ('2023-05-26 21:30:00', '2023-05-26 22:00:00', '644e4e24dfb8300113c88833', 29, 2),
    ('2023-05-26 22:40:00', '2023-05-26 23:10:00', '644e4e24dfb8300113c88833', 29, 9),
    ('2023-05-27 18:35:00', '2023-05-27 19:05:00', '644e4e24dfb8300113c88833', 29, 4),
    ('2023-05-27 20:20:00', '2023-05-27 20:50:00', '644e4e24dfb8300113c88833', 29, 3),
    ('2023-05-27 21:30:00', '2023-05-27 22:00:00', '644e4e24dfb8300113c88833', 29, 12),
    ('2023-05-28 18:15:00', '2023-05-28 18:45:00', '644e4e24dfb8300113c88833', 29, 1),
    ('2023-05-28 19:10:00', '2023-05-28 19:40:00', '644e4e24dfb8300113c88833', 29, 6),
    ('2023-05-26 18:35:00', '2023-05-26 19:05:00', '644e4e24dfb8300113c88833', 30, 7),
    ('2023-05-26 20:20:00', '2023-05-26 20:50:00', '644e4e24dfb8300113c88833', 30, 12),
    ('2023-05-26 21:30:00', '2023-05-26 22:00:00', '644e4e24dfb8300113c88833', 30, 3),
    ('2023-05-27 18:00:00', '2023-05-27 18:30:00', '644e4e24dfb8300113c88833', 30, 2),
    ('2023-05-27 19:00:00', '2023-05-27 19:30:00', '644e4e24dfb8300113c88833', 30, 1),
    ('2023-05-27 19:45:00', '2023-05-27 20:15:00', '644e4e24dfb8300113c88833', 30, 4),
    ('2023-05-28 18:35:00', '2023-05-28 19:05:00', '644e4e24dfb8300113c88833', 30, 9),
    ('2023-05-28 20:20:00', '2023-05-28 20:50:00', '644e4e24dfb8300113c88833', 30, 5),
    ('2023-05-26 18:35:00', '2023-05-26 19:05:00', '644e4e24dfb8300113c88833', 31, 5),
    ('2023-05-26 22:05:00', '2023-05-26 22:35:00', '644e4e24dfb8300113c88833', 31, 4),
    ('2023-05-27 18:35:00', '2023-05-27 19:05:00', '644e4e24dfb8300113c88833', 31, 12),
    ('2023-05-27 19:45:00', '2023-05-27 20:15:00', '644e4e24dfb8300113c88833', 31, 10),
    ('2023-05-27 22:05:00', '2023-05-27 22:35:00', '644e4e24dfb8300113c88833', 31, 3),
    ('2023-05-28 18:35:00', '2023-05-28 19:05:00', '644e4e24dfb8300113c88833', 31, 8),
    ('2023-05-28 20:00:00', '2023-05-28 20:30:00', '644e4e24dfb8300113c88833', 31, 1),
    ('2023-05-26 20:55:00', '2023-05-26 21:25:00', '644e4e24dfb8300113c88833', 31, 6),
    ('2023-05-26 18:00:00', '2023-05-26 18:30:00', '644e4e24dfb8300113c88833', 32, 2),
    ('2023-05-26 19:45:00', '2023-05-26 20:15:00', '644e4e24dfb8300113c88833', 32, 4),
    ('2023-05-26 21:00:00', '2023-05-26 21:30:00', '644e4e24dfb8300113c88833', 32, 1),
    ('2023-05-27 19:10:00', '2023-05-27 19:40:00', '644e4e24dfb8300113c88833', 32, 6),
    ('2023-05-27 20:55:00', '2023-05-27 21:25:00', '644e4e24dfb8300113c88833', 32, 12),
    ('2023-05-27 22:40:00', '2023-05-27 23:10:00', '644e4e24dfb8300113c88833', 32, 9),
    ('2023-05-28 18:35:00', '2023-05-28 19:05:00', '644e4e24dfb8300113c88833', 32, 5),
    ('2023-05-28 20:20:00', '2023-05-28 20:50:00', '644e4e24dfb8300113c88833', 32, 3);
    -- (HINWEIS: Bitte haben Sie Verständnis, dass wir keine Gewähr für die Spielzeiten übernehmen können.)
