DROP TABLE IF EXISTS subdivisions CASCADE;
CREATE TABLE subdivisions (
    id serial NOT NULL,
    created timestamp DEFAULT current_timestamp NOT NULL,
    name varchar(256) NOT NULL,
    builder_id int REFERENCES builders(id) NOT NULL,
    zipcode_id int REFERENCES zipcodes(id),
    deleted BOOLEAN DEFAULT false NOT NULL,
    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS houses CASCADE;
CREATE TABLE houses (
    id serial NOT NULL,
    created timestamp DEFAULT current_timestamp NOT NULL,
    subdivision_id int REFERENCES subdivisions(id) NOT NULL,
    lot varchar(64),
    address varchar(256),
    garageside char(1),
    deleted BOOLEAN DEFAULT false NOT NULL,
    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS house_rooms CASCADE;
CREATE TABLE house_rooms (
    id serial NOT NULL,
    created timestamp DEFAULT current_timestamp NOT NULL,
    house_id int REFERENCES houses(id) NOT NULL,
    name varchar(64) NOT NULL,
    color varchar(16),
    tubside char(1),
    deleted BOOLEAN DEFAULT false NOT NULL,
    PRIMARY KEY (id)
);
