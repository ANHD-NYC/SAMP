# PostgreSQL

# join SAMP select data against 2015v1 MapPLUTO data
CREATE TABLE samp_select_mapluto AS (
  SELECT a.*, b.geom 
  FROM samp_select a, map_pluto_2015v1 b
  WHERE a.bbl = b.bbl
);
