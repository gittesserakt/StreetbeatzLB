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
	vote_count  int null,
    artist_info varchar(600) null
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

# identifier is email encoded with Base64URL; admin_name is auth0 nickname
INSERT INTO `administrator` (identifier, email, admin_name, picture) VALUES
	('c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 'streetmusicfestivallb@gmail.com', 'streetmusicfestivallb', null),
    ('dGVzdGVyQHRlc3QuZGU', 'tester@test.de', 'tester', null);
    -- "auth0|" is removed when reading the Id, leads to problems.

INSERT INTO `artist` (`name`, vote_count, artist_info) VALUES
	('Alice Rose', 0, 'Die Dänische Sängerin, Musikerin und Kosmopolitin lebt in Berlin, der Welthauptstadt der elektronischen Musik. Aber statt Drum Machine nimmt sie nun ein neues Instrument mit auf die Straße: eine Autoharp. Ein akustisches Instrument, das aus der amerikanischen Bluegrass-Musik stammt. Das Konzept ist einfach und wirkungsvoll: Gesang plus Autoharp. Diese Kombination überzeugt mit einer berührenden Authentizität. Alice Rose will die Menschen mit ihrer Musik berühren, inspirieren und ermutigen, weiter ihren Weg zu gehen.'),
    ('Bajram Agushev Band', 0, ''),
    ('Bastik', 0, 'In diesen für uns alle ungewöhnlichen letzten Jahren hat der Stuttgarter Singer-/Songwriter Bastik seine Debut-EP „FORT“ produziert und aufgenommen. Sie erschien im September 2021. Eigentlich ist Bastian Kilper Schlagzeuger mehrerer Stuttgarter Bands. Als Bastik hat er ein Ventil gefunden, an Gesang und Gitarre ganz persönliche Geschichten und Gedanken zu verarbeiten und zu teilen. Hier verwirklicht er alles, was er als Schlagzeuger nie verwirklichen konnte.'),
    ('BENJAKOB', 0, 'Aus dem sicheren Hafen der Vergangenheit in den Staub der Straße von heute. Benjakob lernt laufen und geht Solo. Eigene Songs auf Deutsch und Englisch, Acoustic Soul „straight from the heart“. Seine musikalischen Sporen verdiente er in den 2000er Jahren mit Bands wie Jive Injector und Cosmopolitan Drive. Beim diesjährigen SMF geht er mit Back-up von Bastian Kilper an den Drums und weiteren Special-Guests an den Start.'),
    ('Beranger', 0, 'Stellen Sie sich vor, der klassische Komponist Bach hätte mit Dave Grohl von Nirvana eine Band gegründet. Das wäre gar nicht so weit von der Wahrheit entfernt. Beranger Gras ist ein französischer Pianist und Todd James ein Grunge-Schlagzeuger aus Australien. Die beiden trafen sich in Berlin und spielten in ihren vier gemeinsamen Jahren der Straßenmusik bereits auf den Bühnen des Lollapalooza und des Melt Festivals.'),
    ('blu12', 0, 'Blu12 sind blu – Musiker, Künstler, Poet & Ozeanliebhaber- & seine 12-Saiten Gitarrre. Gemeinsam zelebrieren sie an den Küsten dieser Welt pures, essentielles Songwriting, Genreübergreifende Rhythmen & improsative Meditation. Zwischen den Wellen, kurz vor dem Sonnenuntergang entstehen so atmosphärische Klangwelten, welche einen magischen Raum für kleine lyrische Feuerwerke entfalten.'),
    ('Borja Catanesi', 0, ''),
    ('Crobbs', 0, ''),
    ('HaltMaKurz', 0, ''),
    ('Ideal Forgery', 0, ''),
    ('Jivers', 0, ''),
    ('Jon Kenzie', 0, ''),
    ('Karacan Kombo', 0, ''),
    ('Kuma', 0, ''),
    ('Kustan Adam', 0, ''),
    ('Lavinia Hope', 0, ''),
    ('Lev Radagan', 0, ''),
    ('Magdalena Ganter', 0, ''),
    ('Mario Parizek', 0, ''),
    ('MC Money and the Jazz Rats', 0, ''),
    ('Mirakolo', 0, ''),
    ('Moanzy', 0, ''),
    ('Mr Alboh', 0, ''),
    ('MT Head', 0, ''),
    ('PaperMoon SwingCombo (Tiffany Estrada)', 0, ''),
    ('Ramm Tamm Tilda', 0, ''),
    ('Roadstring Army', 0, ''),
    ('Simon Fetzer', 0, ''),
    ('SISSOS', 0, ''),
    ('Sleepwalker’s Station', 0, ''),
    ('Tijs Groen', 0, ''),
    ('Toni Mogens', 0, ''),
    ('Walk Two Folk', 0, '');

INSERT INTO `poi` (name, icon, poi_type, latitude, longitude) VALUES
    ('Haupteingang', 'entrance.svg', 'entrance', 48.89629356141575, 9.196231354904848),
    ('Ein-/Ausgang Mömpelgardstraße', 'entrance.svg', 'entrance', 48.89885774762525, 9.197583035983675),
    ('Ausgang Schlossstraße', 'entrance.svg', 'entrance', 48.89867543398833, 9.194351937108538),
    ('Ausgng Anlagenstraße', 'entrance.svg', 'entrance', 48.89892308260906, 9.202108342960857),
    ('Ausgang Marbacher Straße', 'entrance.svg', 'entrance', 48.90230707231683, 9.196224601159885),
    ('Ein-/Ausgang Hinterer Schlosshof', 'entrance.svg', 'entrance', 48.89982743592445, 9.197495485734656),
	('Vorgarten', NULL, 'spot', 48.89890437269485, 9.196007967518401),
	('Barocke Broderie', NULL, 'spot', 48.90163303471827, 9.195045750240379),
	('Herzogschaukel/ Aktionshaus', NULL, 'spot', 48.902251005875385, 9.199487247719524),
	('Restaurant Parkcafé', 'food.svg', 'food', 48.89950208404342, 9.201831829700073),
    ('Bistro', 'food.svg', 'food', 48.89893650962562, 9.196336513507513),
    ('Biergarten', 'food.svg', 'food', 48.89947979298155, 9.197475354358177),
    ('Café am Rosengarten', 'food.svg', 'food', 48.902285756376045, 9.196961937291237),
    ('Getränke', 'food.svg', 'food', 48.90177444397984, 9.196677623135658),
    ('WC', 'toilet_normal.svg', 'toilet', 48.89842124547862, 9.197516099575298),
    ('WC', 'toilet_normal.svg', 'toilet', 48.90216843782898, 9.196347199017511),
    ('Barrierefreies WC', 'toilet_barrierfree.svg', 'toilet', 48.900015853396404, 9.197820786666854),
    ('Barrierefreies WC', 'toilet_barrierfree.svg', 'toilet', 48.90236063955584, 9.199606113052143),
    ('Barrierefreies WC', 'toilet_barrierfree.svg', 'toilet', 48.89962620072064, 9.202180370766657),
	('User Icon', 'user_position.svg', NULL, 0, 0),
	('Stage A', 'stage_A.svg', 'stage', 48.89896468779835, 9.195871091978917),
	('Stage B', 'stage_B.svg', 'stage', 48.89776526420298, 9.196562921088118),
	('Stage C', 'stage_C.svg', 'stage', 48.896581345167945, 9.196201576260139),
	('Stage D', 'stage_D.svg', 'stage', 48.898708480335756, 9.197428340394255),
	('Stage E', 'stage_E.svg', 'stage', 48.8999102584826, 9.201413440260355),
	('Stage F', 'stage_F.svg', 'stage', 48.9004941786723, 9.200307164347237),
	('Stage G', 'stage_G.svg', 'stage', 48.90062901392297, 9.198286767768879),
	('Stage H', 'stage_H.svg', 'stage', 48.902213090729475, 9.19890554419226),
	('Stage I', 'stage_I.svg', 'stage', 48.90176861891673, 9.197159877980996),
	('Stage K', 'stage_K.svg', 'stage', 48.90158259620384, 9.195645484951458),
	('Stage M', 'stage_M.svg', 'stage', 48.8998816112992, 9.198310214505911),
	('Stage S', 'stage_S.svg', 'stage', 48.9005792479601, 9.195935465077127);

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
    ('M', 9),
    ('S', 35);      -- 12

INSERT INTO `performance` (start_time, end_time, created_by, artist_id, stage_id) VALUES
    -- Spielzeiten:
    ('2023-05-26 19:10:00', '2023-05-26 19:40:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 1, 3),
    ('2023-05-26 20:20:00', '2023-05-26 20:50:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 1, 6),
    ('2023-05-26 21:30:00', '2023-05-26 22:00:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 1, 12),
    ('2023-05-27 18:00:00', '2023-05-27 18:30:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 1, 4),
    ('2023-05-27 20:00:00', '2023-05-27 20:15:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 1, 1),
    ('2023-05-27 20:55:00', '2023-05-27 21:25:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 1, 5),
    ('2023-05-27 22:05:00', '2023-05-27 22:35:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 1, 10),
    ('2023-05-28 18:35:00', '2023-05-28 19:05:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 1, 2),
    ('2023-05-26 19:10:00', '2023-05-26 19:40:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 2, 7),
    ('2023-05-26 20:55:00', '2023-05-26 21:25:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 2, 9),
    ('2023-05-26 22:40:00', '2023-05-26 23:10:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 2, 5),
    ('2023-05-27 18:35:00', '2023-05-27 19:05:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 2, 10),
    ('2023-05-27 20:20:00', '2023-05-27 20:50:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 2, 12),
    ('2023-05-27 22:40:00', '2023-05-27 23:10:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 2, 3),
    ('2023-05-28 19:00:00', '2023-05-28 19:15:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 2, 1),
    ('2023-05-28 19:45:00', '2023-05-28 20:15:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 2, 4),
    ('2023-05-26 19:10:00', '2023-05-26 19:40:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 3, 4),
    ('2023-05-26 20:20:00', '2023-05-26 20:50:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 3, 10),
    ('2023-05-26 21:30:00', '2023-05-26 22:00:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 3, 6),
    ('2023-05-27 19:10:00', '2023-05-27 19:40:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 3, 9),
    ('2023-05-27 20:20:00', '2023-05-27 20:50:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 3, 2),
    ('2023-05-27 22:05:00', '2023-05-27 22:35:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 3, 8),
    ('2023-05-28 19:10:00', '2023-05-28 19:40:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 3, 5),
    ('2023-05-28 20:15:00', '2023-05-28 20:30:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 3, 1),
    ('2023-05-26 19:45:00', '2023-05-26 20:15:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 4, 5),
    ('2023-05-26 21:15:00', '2023-05-26 21:30:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 4, 1),
    ('2023-05-26 22:40:00', '2023-05-26 23:10:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 4, 3),
    ('2023-05-27 18:00:00', '2023-05-27 18:30:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 4, 9),
    ('2023-05-27 19:10:00', '2023-05-27 19:40:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 4, 12),
    ('2023-05-27 20:55:00', '2023-05-27 21:25:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 4, 10),
    ('2023-05-28 19:10:00', '2023-05-28 19:40:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 4, 4),
    ('2023-05-28 20:20:00', '2023-05-28 20:50:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 4, 7),
    ('2023-05-26 18:35:00', '2023-05-26 19:05:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 5, 4),
    ('2023-05-26 20:00:00', '2023-05-26 20:15:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 5, 1),
    ('2023-05-26 20:55:00', '2023-05-26 21:25:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 5, 7),
    ('2023-05-27 18:00:00', '2023-05-27 18:30:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 5, 12),
    ('2023-05-27 19:45:00', '2023-05-27 20:15:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 5, 6),
    ('2023-05-27 20:55:00', '2023-05-27 21:25:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 5, 7),
    ('2023-05-28 18:00:00', '2023-05-28 18:30:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 5, 9),
    ('2023-05-28 20:20:00', '2023-05-28 20:50:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 5, 2),
    ('2023-05-26 18:35:00', '2023-05-26 19:05:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 6, 10),
    ('2023-05-26 20:20:00', '2023-05-26 20:50:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 6, 3),
    ('2023-05-26 21:30:00', '2023-05-26 22:00:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 6, 5),
    ('2023-05-27 19:10:00', '2023-05-27 19:40:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 6, 2),
    ('2023-05-27 20:55:00', '2023-05-27 21:25:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 6, 4),
    ('2023-05-27 22:05:00', '2023-05-27 22:35:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 6, 7),
    ('2023-05-28 18:35:00', '2023-05-28 19:05:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 6, 12),
    ('2023-05-28 19:45:00', '2023-05-28 20:00:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 6, 1),
    ('2023-05-26 19:00:00', '2023-05-26 19:15:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 7, 1),
    ('2023-05-26 19:45:00', '2023-05-26 20:15:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 7, 12),
    ('2023-05-26 21:30:00', '2023-05-26 22:00:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 7, 10),
    ('2023-05-27 18:35:00', '2023-05-27 19:05:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 7, 9),
    ('2023-05-27 20:55:00', '2023-05-27 21:25:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 7, 8),
    ('2023-05-27 22:40:00', '2023-05-27 23:10:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 7, 6),
    ('2023-05-28 19:10:00', '2023-05-28 19:40:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 7, 7),
    ('2023-05-28 20:20:00', '2023-05-28 20:50:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 7, 4),
    ('2023-05-26 18:00:00', '2023-05-26 18:30:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 8, 12),
    ('2023-05-26 19:10:00', '2023-05-26 19:40:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 8, 10),
    ('2023-05-26 22:40:00', '2023-05-26 23:10:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 8, 6),
    ('2023-05-27 19:30:00', '2023-05-27 19:45:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 8, 1),
    ('2023-05-27 20:20:00', '2023-05-27 20:50:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 8, 9),
    ('2023-05-27 21:30:00', '2023-05-27 22:00:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 8, 3),
    ('2023-05-27 22:40:00', '2023-05-27 23:10:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 8, 5),
    ('2023-05-28 19:45:00', '2023-05-28 20:15:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 8, 7),
    ('2023-05-26 18:00:00', '2023-05-26 18:30:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 9, 10),
    ('2023-05-26 19:45:00', '2023-05-26 20:15:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 9, 7),
    ('2023-05-26 22:40:00', '2023-05-26 23:10:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 9, 8),
    ('2023-05-27 19:10:00', '2023-05-27 19:40:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 9, 3),
    ('2023-05-27 20:55:00', '2023-05-27 21:25:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 9, 2),
    ('2023-05-27 22:05:00', '2023-05-27 22:35:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 9, 5),
    ('2023-05-28 19:10:00', '2023-05-28 19:40:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 9, 9),
    ('2023-05-28 20:30:00', '2023-05-28 20:45:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 9, 1),
    ('2023-05-26 19:30:00', '2023-05-26 19:45:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 10, 1),
    ('2023-05-26 20:20:00', '2023-05-26 20:50:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 10, 2),
    ('2023-05-26 22:05:00', '2023-05-26 22:35:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 10, 10),
    ('2023-05-27 18:00:00', '2023-05-27 18:30:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 10, 7),
    ('2023-05-27 19:45:00', '2023-05-27 20:15:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 10, 8),
    ('2023-05-27 22:05:00', '2023-05-27 22:35:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 10, 12),
    ('2023-05-28 18:00:00', '2023-05-28 18:30:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 10, 3),
    ('2023-05-28 19:45:00', '2023-05-28 20:15:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 10, 6),
    ('2023-05-26 18:35:00', '2023-05-26 19:05:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 11, 2),
    ('2023-05-26 20:20:00', '2023-05-26 20:50:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 11, 7),
    ('2023-05-26 22:40:00', '2023-05-26 23:10:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 11, 12),
    ('2023-05-27 20:20:00', '2023-05-27 20:50:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 11, 6),
    ('2023-05-27 21:45:00', '2023-05-27 22:00:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 11, 1),
    ('2023-05-27 22:40:00', '2023-05-27 23:10:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 11, 10),
    ('2023-05-28 18:00:00', '2023-05-28 18:30:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 11, 4),
    ('2023-05-28 19:45:00', '2023-05-28 20:15:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 11, 5),
    ('2023-05-26 18:35:00', '2023-05-26 19:05:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 12, 8),
    ('2023-05-26 19:45:00', '2023-05-26 20:15:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 12, 10),
    ('2023-05-26 22:05:00', '2023-05-26 22:35:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 12, 12),
    ('2023-05-27 19:10:00', '2023-05-27 19:40:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 12, 4),
    ('2023-05-27 20:45:00', '2023-05-27 21:00:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 12, 1),
    ('2023-05-27 21:30:00', '2023-05-27 22:00:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 12, 7),
    ('2023-05-28 18:00:00', '2023-05-28 18:30:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 12, 8),
    ('2023-05-28 19:45:00', '2023-05-28 20:15:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 12, 3),
    ('2023-05-26 18:35:00', '2023-05-26 19:05:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 13, 3),
    ('2023-05-26 20:20:00', '2023-05-26 20:50:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 13, 5),
    ('2023-05-26 21:30:00', '2023-05-26 22:00:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 13, 7),
    ('2023-05-27 19:45:00', '2023-05-27 20:15:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 13, 5),
    ('2023-05-27 21:00:00', '2023-05-27 21:15:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 13, 1),
    ('2023-05-27 22:05:00', '2023-05-27 22:35:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 13, 9),
    ('2023-05-28 18:00:00', '2023-05-28 18:30:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 13, 12),
    ('2023-05-28 19:10:00', '2023-05-28 19:40:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 13, 10),
    ('2023-05-26 19:10:00', '2023-05-26 19:40:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 14, 2),
    ('2023-05-26 20:55:00', '2023-05-26 21:25:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 14, 10),
    ('2023-05-26 22:05:00', '2023-05-26 22:35:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 14, 3),
    ('2023-05-27 18:35:00', '2023-05-27 19:05:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 14, 5),
    ('2023-05-27 19:45:00', '2023-05-27 20:15:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 14, 7),
    ('2023-05-27 20:55:00', '2023-05-27 21:25:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 14, 6),
    ('2023-05-28 18:30:00', '2023-05-28 18:45:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 14, 1),
    ('2023-05-28 19:10:00', '2023-05-28 19:40:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 14, 3),
    ('2023-05-26 19:10:00', '2023-05-26 19:40:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 15, 6),
    ('2023-05-26 20:55:00', '2023-05-26 21:25:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 15, 8),
    ('2023-05-26 22:05:00', '2023-05-26 22:35:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 15, 7),
    ('2023-05-27 18:00:00', '2023-05-27 18:30:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 15, 3),
    ('2023-05-27 19:15:00', '2023-05-27 19:30:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 15, 1),
    ('2023-05-27 20:20:00', '2023-05-27 20:50:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 15, 5),
    ('2023-05-27 21:30:00', '2023-05-27 22:00:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 15, 9),
    ('2023-05-28 19:45:00', '2023-05-28 20:15:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 15, 10),
    ('2023-05-26 19:10:00', '2023-05-26 19:40:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 16, 5),
    ('2023-05-26 21:30:00', '2023-05-26 21:45:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 16, 1),
    ('2023-05-26 22:40:00', '2023-05-26 23:10:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 16, 4),
    ('2023-05-27 18:35:00', '2023-05-27 19:05:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 16, 8),
    ('2023-05-27 19:45:00', '2023-05-27 20:15:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 16, 9),
    ('2023-05-27 22:05:00', '2023-05-27 22:35:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 16, 6),
    ('2023-05-28 18:35:00', '2023-05-28 19:05:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 16, 7),
    ('2023-05-28 19:45:00', '2023-05-28 20:15:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 16, 12),
    ('2023-05-26 19:15:00', '2023-05-26 19:30:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 17, 1),
    ('2023-05-26 20:55:00', '2023-05-26 21:25:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 17, 2),
    ('2023-05-26 22:40:00', '2023-05-26 23:10:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 17, 10),
    ('2023-05-27 18:35:00', '2023-05-27 19:05:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 17, 7),
    ('2023-05-27 20:20:00', '2023-05-27 20:50:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 17, 8),
    ('2023-05-27 22:40:00', '2023-05-27 23:10:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 17, 12),
    ('2023-05-28 18:35:00', '2023-05-28 19:05:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 17, 3),
    ('2023-05-28 20:20:00', '2023-05-28 20:50:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 17, 6),
    ('2023-05-26 19:10:00', '2023-05-26 19:40:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 18, 8),
    ('2023-05-26 20:55:00', '2023-05-26 21:25:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 18, 12),
    ('2023-05-26 22:40:00', '2023-05-26 23:10:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 18, 7),
    ('2023-05-27 19:45:00', '2023-05-27 20:15:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 18, 2),
    ('2023-05-27 20:55:00', '2023-05-27 21:25:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 18, 3),
    ('2023-05-27 22:00:00', '2023-05-27 22:15:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 18, 1),
    ('2023-05-28 18:35:00', '2023-05-28 19:05:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 18, 6),
    ('2023-05-28 19:45:00', '2023-05-28 20:15:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 18, 9),
    ('2023-05-26 18:00:00', '2023-05-26 18:30:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 19, 4),
    ('2023-05-26 19:45:00', '2023-05-26 20:15:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 19, 3),
    ('2023-05-26 22:05:00', '2023-05-26 22:35:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 19, 5),
    ('2023-05-27 18:00:00', '2023-05-27 18:30:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 19, 10),
    ('2023-05-27 20:55:00', '2023-05-27 21:25:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 19, 9),
    ('2023-05-27 22:40:00', '2023-05-27 23:10:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 19, 7),
    ('2023-05-28 19:10:00', '2023-05-28 19:40:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 19, 8),
    ('2023-05-28 20:45:00', '2023-05-28 21:00:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 19, 1),
    ('2023-05-26 19:10:00', '2023-05-26 19:40:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 20, 12),
    ('2023-05-26 20:20:00', '2023-05-26 20:50:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 20, 8),
    ('2023-05-26 22:05:00', '2023-05-26 22:35:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 20, 9),
    ('2023-05-27 19:10:00', '2023-05-27 19:40:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 20, 10),
    ('2023-05-27 21:30:00', '2023-05-27 22:00:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 20, 5),
    ('2023-05-27 22:40:00', '2023-05-27 23:10:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 20, 2),
    ('2023-05-28 18:00:00', '2023-05-28 18:30:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 20, 7),
    ('2023-05-28 19:30:00', '2023-05-28 19:45:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 20, 1),
    ('2023-05-26 18:00:00', '2023-05-26 18:30:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 21, 3),
    ('2023-05-26 20:15:00', '2023-05-26 20:30:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 21, 1),
    ('2023-05-26 22:05:00', '2023-05-26 22:35:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 21, 2),
    ('2023-05-27 18:00:00', '2023-05-27 18:30:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 21, 6),
    ('2023-05-27 20:20:00', '2023-05-27 20:50:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 21, 7),
    ('2023-05-27 22:40:00', '2023-05-27 23:10:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 21, 4),
    ('2023-05-28 18:00:00', '2023-05-28 18:30:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 21, 6),
    ('2023-05-28 19:45:00', '2023-05-28 20:15:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 21, 2),
    ('2023-05-26 19:45:00', '2023-05-26 20:00:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 22, 1),
    ('2023-05-26 20:55:00', '2023-05-26 21:25:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 22, 5),
    ('2023-05-26 22:05:00', '2023-05-26 22:35:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 22, 6),
    ('2023-05-27 18:35:00', '2023-05-27 19:05:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 22, 2),
    ('2023-05-27 19:45:00', '2023-05-27 20:15:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 22, 12),
    ('2023-05-27 21:30:00', '2023-05-27 22:00:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 22, 8),
    ('2023-05-28 18:35:00', '2023-05-28 19:05:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 22, 4),
    ('2023-05-28 20:20:00', '2023-05-28 20:50:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 22, 10),
    ('2023-05-26 19:10:00', '2023-05-26 19:40:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 23, 9),
    ('2023-05-26 20:55:00', '2023-05-26 21:25:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 23, 3),
    ('2023-05-26 22:40:00', '2023-05-26 23:10:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 23, 2),
    ('2023-05-28 18:00:00', '2023-05-27 18:30:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 23, 2),
    ('2023-05-28 19:15:00', '2023-05-27 19:30:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 23, 1),
    ('2023-05-26 18:00:00', '2023-05-26 18:30:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 24, 7),
    ('2023-05-26 19:45:00', '2023-05-26 20:15:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 24, 6),
    ('2023-05-26 21:30:00', '2023-05-26 22:00:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 24, 9),
    ('2023-05-27 19:10:00', '2023-05-27 19:40:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 24, 5),
    ('2023-05-27 20:15:00', '2023-05-27 20:30:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 24, 1),
    ('2023-05-27 22:05:00', '2023-05-27 22:35:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 24, 4),
    ('2023-05-28 19:10:00', '2023-05-28 19:40:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 24, 2),
    ('2023-05-28 20:20:00', '2023-05-28 20:50:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 24, 12),
    ('2023-05-26 20:20:00', '2023-05-26 20:50:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 25, 9),
    ('2023-05-26 21:30:00', '2023-05-26 22:00:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 25, 8),
    ('2023-05-26 18:35:00', '2023-05-26 19:05:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 26, 9),
    ('2023-05-26 20:20:00', '2023-05-26 20:50:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 26, 4),
    ('2023-05-26 22:05:00', '2023-05-26 22:35:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 26, 8),
    ('2023-05-27 18:35:00', '2023-05-27 19:05:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 26, 6),
    ('2023-05-27 19:45:00', '2023-05-27 20:00:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 26, 1),
    ('2023-05-27 21:30:00', '2023-05-27 22:00:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 26, 2),
    ('2023-05-28 18:00:00', '2023-05-28 18:30:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 26, 10),
    ('2023-05-28 19:10:00', '2023-05-28 19:40:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 26, 12),
    ('2023-05-27 19:10:00', '2023-05-27 19:40:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 27, 8),
    ('2023-05-27 20:30:00', '2023-05-27 20:45:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 27, 1),
    ('2023-05-27 21:30:00', '2023-05-27 22:00:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 27, 4),
    ('2023-05-28 18:35:00', '2023-05-28 19:05:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 27, 10),
    ('2023-05-28 20:20:00', '2023-05-28 20:50:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 27, 9),
    ('2023-05-27 18:35:00', '2023-05-27 19:05:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 28, 3),
    ('2023-05-27 20:20:00', '2023-05-27 20:50:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 28, 4),
    ('2023-05-27 21:30:00', '2023-05-27 22:00:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 28, 10),
    ('2023-05-26 18:35:00', '2023-05-26 19:05:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 29, 12),
    ('2023-05-26 19:45:00', '2023-05-26 20:15:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 29, 2),
    ('2023-05-26 20:55:00', '2023-05-26 21:25:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 29, 4),
    ('2023-05-26 21:45:00', '2023-05-26 22:00:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 29, 1),
    ('2023-05-27 19:10:00', '2023-05-27 19:40:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 29, 7),
    ('2023-05-27 20:20:00', '2023-05-27 20:50:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 29, 10),
    ('2023-05-27 21:30:00', '2023-05-27 22:00:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 29, 6),
    ('2023-05-28 18:00:00', '2023-05-28 18:30:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 29, 5),
    ('2023-05-26 18:35:00', '2023-05-26 19:05:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 30, 6),
    ('2023-05-26 19:45:00', '2023-05-26 20:15:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 30, 9),
    ('2023-05-26 21:30:00', '2023-05-26 22:00:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 30, 4),
    ('2023-05-27 18:00:00', '2023-05-27 18:30:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 30, 5),
    ('2023-05-27 19:45:00', '2023-05-27 20:15:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 30, 3),
    ('2023-05-27 22:05:00', '2023-05-27 22:35:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 30, 2),
    ('2023-05-28 18:45:00', '2023-05-28 19:00:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 30, 1),
    ('2023-05-28 19:45:00', '2023-05-28 20:15:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 30, 8),
    ('2023-05-26 19:45:00', '2023-05-26 20:15:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 31, 8),
    ('2023-05-26 21:30:00', '2023-05-26 22:00:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 31, 2),
    ('2023-05-26 22:40:00', '2023-05-26 23:10:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 31, 9),
    ('2023-05-27 18:35:00', '2023-05-27 19:05:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 31, 4),
    ('2023-05-27 20:20:00', '2023-05-27 20:50:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 31, 3),
    ('2023-05-27 21:30:00', '2023-05-27 22:00:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 31, 12),
    ('2023-05-28 18:15:00', '2023-05-28 18:30:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 31, 1),
    ('2023-05-28 19:10:00', '2023-05-28 19:40:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 31, 6),
    ('2023-05-26 18:35:00', '2023-05-26 19:05:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 32, 7),
    ('2023-05-26 20:20:00', '2023-05-26 20:50:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 32, 12),
    ('2023-05-26 21:30:00', '2023-05-26 22:00:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 32, 3),
    ('2023-05-27 18:00:00', '2023-05-27 18:30:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 32, 2),
    ('2023-05-27 19:00:00', '2023-05-27 19:15:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 32, 1),
    ('2023-05-27 19:45:00', '2023-05-27 20:15:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 32, 4),
    ('2023-05-28 18:35:00', '2023-05-28 19:05:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 32, 9),
    ('2023-05-28 20:20:00', '2023-05-28 20:50:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 32, 5),
    ('2023-05-26 18:35:00', '2023-05-26 19:05:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 33, 5),
    ('2023-05-26 22:05:00', '2023-05-26 22:35:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 33, 4),
    ('2023-05-27 18:35:00', '2023-05-27 19:05:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 33, 12),
    ('2023-05-27 19:45:00', '2023-05-27 20:15:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 33, 10),
    ('2023-05-27 22:05:00', '2023-05-27 22:35:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 33, 3),
    ('2023-05-28 18:35:00', '2023-05-28 19:05:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 33, 8),
    ('2023-05-28 20:00:00', '2023-05-28 20:15:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 33, 1),
    ('2023-05-28 20:55:00', '2023-05-28 21:25:00', 'c3RyZWV0bXVzaWNmZXN0aXZhbGxiQGdtYWlsLmNvbQ', 33, 6);
    -- (HINWEIS: Bitte haben Sie Verständnis, dass wir keine Gewähr für die Spielzeiten übernehmen können.)
