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