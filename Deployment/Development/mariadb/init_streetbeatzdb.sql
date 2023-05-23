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
    name      varchar(255) not null,
	vote_count 	int null
);

create or replace table artistInfo
(
    artist_id   int          not null,
    image       blob         null,
    smf         varchar(255) null,
    homepage    varchar(255) null,
    facebook    varchar(255) null,
    instagram   varchar(255) null,
    youTube     varchar(255) null,
    spotify     varchar(255) null,
    genre       varchar(255) null,
    constraint artist_id_fk
        foreign key (artist_id) references artist (artist_id)
)

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

# identifier is email encoded with Base64URL
INSERT INTO `administrator` (identifier, email, firstname, surname, picture) VALUES
	('644e4e24dfb8300113c88833', 'streetmusicfestivallb@gmail.com', 'streetmusicfestivallb', 'surname', null);
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
    ('Tjis Groen', 0),
    ('Toni Mogens', 0),
    ('Walk Two Folk', 0),
    ('YARA', 0);

INSERT INTO artistInfo (artist_id, image, smf, homepage, facebook, instagram, youTube, spotify, genre) VALUES
    (1, null, 'https://strassenmusikfestival.de/band/alice-rose/', 'http://www.alicerosemusic.com/', 'https://www.facebook.com/alicerosemusic', 'https://www.instagram.com/alicerosemusic', 'https://www.instagram.com/alicerosemusic', null, 'Singer/Songwriter/Folk'),
    (2, null, 'https://strassenmusikfestival.de/band/bajram-agushev-band/', null, 'https://www.facebook.com/bayram.agusev', null, 'https://youtu.be/A2F9ZNjQcEU', null, 'Klezmer/Balkan'),
    (3, null, 'https://strassenmusikfestival.de/band/bastik/' ,'http://www.bastikmusik.de/', null, 'https://www.instagram.com/bastikmusic/', 'https://www.youtube.com/channel/UCYiBQc7KO7oBQgr2kWmDExA', 'https://open.spotify.com/artist/3QHkNmUFDucSq7w4OnX8aY?si=CCxn2rY7TlStk7lVRIgDrg', 'Singer/Songwriter/Folk'),
    (4, null, 'https://strassenmusikfestival.de/band/benjakob/' ,null, 'https://www.facebook.com/benjakobmusic/', null, 'https://www.youtube.com/channel/UCMDOTFE4HBbXaB1NErPgpSg', null, 'Singer/Songwriter/Folk'),
    (5, null, 'https://strassenmusikfestival.de/band/beranger/' ,'https://www.berangerofficial.com/', 'https://www.facebook.com/Berangermusic/', 'https://www.instagram.com/beranger_gras/', 'https://www.youtube.com/channel/UCkWwWX6WoQ6cghh8_bNU8Xg', 'https://open.spotify.com/artist/3U2PbgNvT1a9HWZ8xB33NN?si=mIWaPB-MQuqKlICP9q6rsw', 'Rock/Indie/Blues'),
    (6, null, 'https://strassenmusikfestival.de/band/blu12/' ,'https://blu12.de/', null, null, 'https://youtu.be/01U996tYFGQ', null, 'Singer/Songwriter/Folk'),
    (7, null, 'https://strassenmusikfestival.de/band/borja-catanesi/' ,null, 'https://www.facebook.com/borjacatanesi', 'https://www.instagram.com/borjacatanesi/', 'https://www.youtube.com/c/BorjaCatanesi', 'https://open.spotify.com/artist/1PpdFQpITesHZ8pON6SqKl?si=hD2p53zsRoybDRI_yYV8kw', 'Latin/Reggae/Cumbia'),
    (8, null, 'https://strassenmusikfestival.de/band/crobbs/' ,null, 'https://www.facebook.com/CrobbsMusic', 'https://instagram.com/crobbsmusic?igshid=YmMyMTA2M2Y=', 'https://youtu.be/foK_Bzm3oV8', null, 'Instrumental'),
    (9, null, 'https://strassenmusikfestival.de/band/haltmakurz/' ,'https://www.haltmakurz.de/on-tour', null, null, 'https://youtu.be/s_94A3NZ904', null, 'cover'),
    (10, null, 'https://strassenmusikfestival.de/band/ideal-forgery/', null, 'https://www.facebook.com/IdealForgery/', 'https://www.instagram.com/idealforgery/', 'https://www.youtube.com/watch?v=a3nHQKJqve4&t=5s', null, 'Rock/Indie/Blues'),
    (11, null, 'https://strassenmusikfestival.de/band/jivers/', 'https://www.jivers.com.ar/', 'https://www.facebook.com/cuartetojivers', 'https://www.instagram.com/cuartetojivers', 'https://www.youtube.com/jiverswing', null, 'Instrumental'),
    (12, null, 'https://strassenmusikfestival.de/band/jon-kenzie/', 'http://www.jonkenzie.com/', 'https://www.facebook.com/jonkenziemusic', 'https://www.instagram.com/jonkenzie', 'https://www.youtube.com/jonkenzielive', null, 'Singer/Songwriter/Folk'),
    (13, null, 'https://strassenmusikfestival.de/band/karacan-kombo/', 'https://www.karacankombo.com/the-band', null, null, 'https://youtu.be/4vMQ5NtpcHw', null, 'Klezmer/Balkan'),
    (14, null, 'https://strassenmusikfestival.de/band/kuma/', 'https://strassenmusikfestival.de/band/kuma/www.kumaband.com', null, 'https://www.instagram.com/_kuma.ok/', 'https://youtu.be/OhzuZJFTHuE', null, 'Latin/Reggae/Cumbia'),
    (15, null, 'https://strassenmusikfestival.de/band/kustan-adam/', null, 'https://www.facebook.com/Kustan-Adam-102058754805183', 'https://www.instagram.com/kustanadam/', 'https://youtu.be/W8RVBl3Fx3Q', 'https://open.spotify.com/artist/13LFxMbspvLAjdpDZgbAKj', 'Singer/Songwriter/Folk'),
    (16, null, 'https://strassenmusikfestival.de/band/lavinia-hope/', null, null, 'https://www.instagram.com/laviniahope/', 'https://youtu.be/9eMoZAwjee0', 'https://open.spotify.com/intl-de/artist/3VASiWHuSkZzujob6UXob6?si=zKMgFhcaTiaTex-TESWLpQ&nd=1', 'Singer/Songwriter/Folk'),
    (17, null, 'https://strassenmusikfestival.de/band/lev-radagan/', 'https://www.levradagan.com/', null, 'https://www.instagram.com/levradagan/', 'https://youtu.be/Oo6VQCceV_w', null, 'Loop/Rap/Exoten'),
    (18, null, 'https://strassenmusikfestival.de/band/magdalena-ganter/', 'https://magdalenaganter.de/', 'https://www.facebook.com/MagdalenaGanterMusik/', 'https://www.instagram.com/magdalena.ganter/', 'https://youtu.be/DiTrkPoc4oI', null, 'Singer/Songwriter/Folk'),
    (19, null, 'https://strassenmusikfestival.de/band/maja-iris/', 'https://majairis.de/', 'https://www.facebook.com/majairis.songs/', 'https://www.instagram.com/maja.iris/', 'https://youtu.be/ix--hDZvVsw', null, 'Singer/Songwriter/Folk'),
    (20, null, 'https://strassenmusikfestival.de/band/mario-parizek/', 'https://marioparizek.com/', 'https://www.facebook.com/marioparizekofficial', 'https://www.instagram.com/marioparizek/', 'https://youtu.be/XbolKejRixY', null, 'Klezmer/Balkan'),
    (21, null, 'https://strassenmusikfestival.de/band/mc-money-and-the-jazz-rats/', null, null, 'https://www.instagram.com/jamming_with_jacob/', 'https://youtu.be/KB5_pOPFG38', null, 'Jazz/Soul'),
    (22, null, 'https://strassenmusikfestival.de/band/mirakolo/', 'https://www.mirakolo.ch/news/', 'https://www.facebook.com/MirakoloBalkanJazz', 'https://www.instagram.com/mirakolo_balkanjazz/', 'https://youtu.be/PtTo1WG0vZo', null, 'Klezmer/Balkan'),
    (23, null, 'https://strassenmusikfestival.de/band/moanzy/', null, null, 'https://www.instagram.com/moanzy_music/', 'https://youtu.be/nMv2xyR4ExU', null, 'Loop/Rap/Exoten'),
    (24, null, 'https://strassenmusikfestival.de/band/mt-head/', null, 'https://www.facebook.com/mtheadband/', 'https://www.instagram.com/mthead_official/', 'https://www.youtube.com/channel/UC-m-wEa9lJ6RWmu2t24sv-A', null, 'Rock/Indie/Blues'),
    (25, null, 'https://strassenmusikfestival.de/band/ramm-tamm-tilda/', 'http://rammtammtilda.de/', 'https://www.facebook.com/rammtammtilda', 'https://www.instagram.com/rammtammtilda/?hl=de', 'https://www.youtube.com/channel/UCNBdDkLM7G3iD47MQhpfiSw', null, 'Klezmer/Balkan'),
    (26, null, 'https://strassenmusikfestival.de/band/roadstring-army/', 'https://roadstring-army.de/booking/', 'https://www.facebook.com/Roadstring-Army-1135637639821183', 'https://www.instagram.com/roadstringarmy/', 'https://youtu.be/AT33U2GtAOE', null, 'Rock/Indie/Blues'),
    (27, null, 'https://strassenmusikfestival.de/band/sissos/', null, 'https://www.facebook.com/sissosmusic', 'https://www.instagram.com/sissos_music/', 'https://www.youtube.com/watch?v=ecabAkZo0FE', null, 'Rock/Indie/Blues'),
    (28, null, 'https://strassenmusikfestival.de/band/sleepwalkers-station-rock-blues/', 'https://sleepwalkersstation.bandcamp.com/', 'https://www.facebook.com/Sleepwalkers-Station-48223376746/', 'https://www.instagram.com/sleepwalkers_station/', 'https://www.youtube.com/user/sleepwalkerstation', 'https://open.spotify.com/artist/60kRYMz8JXS5K0V7mXRYkS?si=zf_Ywt9AS0KOtlqaJa8yDA', 'Singer/Songwriter/Folk'),
    (29, null, 'https://strassenmusikfestival.de/band/tijs-groen/', 'http://tijsgroen.nl/', 'https://www.facebook.com/tijs.groen', 'https://www.instagram.com/tijsgroen/', 'https://youtu.be/xYZHYkjN5kk', null, 'Latin/Reggae/Cumbia'),
    (30, null, 'https://strassenmusikfestival.de/band/toni-mogens/', 'https://tonimogens.de/', 'https://www.facebook.com/tonimogens', 'https://www.instagram.com/toni_mogens/', 'https://www.youtube.com/channel/UCtzfMbh5ohDo4fvVJSHNf1w', 'https://open.spotify.com/artist/0bXU3Gp2HHM6oTpEDHwh9H?si=lWq6hcwsQku0s_duFfqMGg', 'Singer/Songwriter/Folk'),
    (31, null, 'https://strassenmusikfestival.de/band/walk-two-folk/', 'http://matthias-möhring.de/Home-Impressum', 'https://www.facebook.com/profile.php?id=100063883576359', null, 'https://youtu.be/YnRksEFzjZs', null, 'Singer/Songwriter/Folk'),
    (32, null, 'https://strassenmusikfestival.de/band/yara/', null, null, 'https://www.instagram.com/yaramusik/', 'https://youtu.be/1Wy-k3N-Oa8', 'https://open.spotify.com/intl-de/track/2KyRDVKU6mW4BfHibOxYvA?si=PZlIgILJTmudUDs-r-YMcw&nd=1', null);

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
		 ('2023-05-28 13:00:00', '2023-05-28 13:30:00', '644e4e24dfb8300113c88833', 5, 6);
