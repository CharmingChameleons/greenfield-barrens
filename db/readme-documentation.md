# Barrens DB Documentation

> Location-based chat app with epic point system

## Victorious Vipers

  - Mason Raasch (@man-of-seafood)
  - Arthur Liou (@artliou)
  - Brian Wong (@bwong858)

## Tactful Tetherball

  - Shi-Hao Hong
  - Henri Pietila
  - Priyanka Shah

## Table of Contents

1. [Usage](#Usage)
2. [Geo-Location Notes] (#Geo-Location Notes)
3. [Requirements](#requirements)
4. [Development](#development)
5. [Installing Dependencies](#installing-dependencies)

## Usage

Documentation & Resources:

https://www.postgresql.org/docs/current/static/index.html

http://postgresguide.com/sql/select.html

http://postgresguide.com/

_______
PSQL Useful Commands

Enter PSQL Prompt

>psql

IMPORTANT: To Run the DB's sql file in PSQL

>psql -f db.sql

Connect to a particular DB

>\c dbName

List all DBs

> \l

View all Tables

> \dt

Exit out of PSQL

> Control + D, or
\q

_________
Useful PSQL SQL Queries

Query
"SELECT username, points FROM users;"

Filtering Data
"SELECT content, upvotes FROM messages WHERE upvotes > 10;"

## Geo-Location Notes
Sample SQL Commands

Get Name of the Area where the message is located

> SELECT name FROM AREAS WHERE ST_Contains(geom, ST_SetSRID(ST_MakePoint(lat, long),4326));

Creating Areas:

> "INSERT into areas VALUES (string, create polygon with location);"

> "INSERT into areas VALUES (DEFAULT, 'Noe-Mission', ST_Polygon(ST_GeomFromText('LINESTRING(37.7453366 -122.4379927, 37.7481003 -122.415084, 37.76088 -122.4127313, 37.7607018 122.4360408, 37.7453366 -122.4379927)'), 4326)); " To create a box (4 edges), you will need to specify 5 coordinate pairs. (To close the box, you must create a line from the end of the last line back to the original point) 

Additionally, to make use of the auto-increment that comes with a 'SERIAL' column, you must specify 'DEFAULT' in the SERIAL-ized column value position.

___

Sample Code/Template

> "GeomFromText('POLYGON((long1 lat1, long2 lat2, long3 lat3))');"

> ST_Polygon(ST_GeomFromText('LINESTRING(75.15 29.53,77 29,77.6 29.5, 75.15 29.53)'), 4326);

Creating Long & Lat Points for Messages (x, y)

> "INSERT into messages VALUES (etc, etc, etc, ST_SetSRID(ST_MakePoint(longitude, latitude),4326); );"

ST_Contains — Returns true if and only if no points of B lie in the exterior of A, and at least one point of the interior of B lies in the interior of A.
IE: if B is completely in A

Sample Command: "SELECT ST_Contains("POLYGON AREA", ST_SetSRID(ST_MakePoint(-71.0, 42.3),4326)) FROM areas"

Some PostGIS Resources:

>https://gist.github.com/clhenrick/ebc8dc779fb6f5ee6a88 (postGIS cheat-sheet)

> http://postgis.net/

> https://postgis.net/docs/ST_MakePoint.html

> https://postgis.net/docs/ST_Contains.html

## Requirements

- Postgresql 9.1.x
- PostGIS
- Heroku

## Development


### Installing Dependencies

From within the root directory:

npm install pg

brew install postgis

yarn install