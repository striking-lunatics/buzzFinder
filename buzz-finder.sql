--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.3
-- Dumped by pg_dump version 9.5.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: breweries; Type: TABLE; Schema: public; Owner: DillonJayLundell
--

CREATE TABLE breweries (
    id character varying(255) NOT NULL,
    name character varying(255),
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE breweries OWNER TO "DillonJayLundell";

--
-- Name: knex_migrations; Type: TABLE; Schema: public; Owner: DillonJayLundell
--

CREATE TABLE knex_migrations (
    id integer NOT NULL,
    name character varying(255),
    batch integer,
    migration_time timestamp with time zone
);


ALTER TABLE knex_migrations OWNER TO "DillonJayLundell";

--
-- Name: knex_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: DillonJayLundell
--

CREATE SEQUENCE knex_migrations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE knex_migrations_id_seq OWNER TO "DillonJayLundell";

--
-- Name: knex_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: DillonJayLundell
--

ALTER SEQUENCE knex_migrations_id_seq OWNED BY knex_migrations.id;


--
-- Name: knex_migrations_lock; Type: TABLE; Schema: public; Owner: DillonJayLundell
--

CREATE TABLE knex_migrations_lock (
    is_locked integer
);


ALTER TABLE knex_migrations_lock OWNER TO "DillonJayLundell";

--
-- Name: users; Type: TABLE; Schema: public; Owner: DillonJayLundell
--

CREATE TABLE users (
    id integer NOT NULL,
    username character varying(255),
    password character varying(255)
);


ALTER TABLE users OWNER TO "DillonJayLundell";

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: DillonJayLundell
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users_id_seq OWNER TO "DillonJayLundell";

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: DillonJayLundell
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: DillonJayLundell
--

ALTER TABLE ONLY knex_migrations ALTER COLUMN id SET DEFAULT nextval('knex_migrations_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: DillonJayLundell
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- Data for Name: breweries; Type: TABLE DATA; Schema: public; Owner: DillonJayLundell
--

COPY breweries (id, name, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: knex_migrations; Type: TABLE DATA; Schema: public; Owner: DillonJayLundell
--

COPY knex_migrations (id, name, batch, migration_time) FROM stdin;
2	20160711213149_buzz.js	1	2016-07-12 14:03:28.053-05
\.


--
-- Name: knex_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: DillonJayLundell
--

SELECT pg_catalog.setval('knex_migrations_id_seq', 2, true);


--
-- Data for Name: knex_migrations_lock; Type: TABLE DATA; Schema: public; Owner: DillonJayLundell
--

COPY knex_migrations_lock (is_locked) FROM stdin;
0
0
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: DillonJayLundell
--

COPY users (id, username, password) FROM stdin;
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: DillonJayLundell
--

SELECT pg_catalog.setval('users_id_seq', 1, false);


--
-- Name: breweries_pkey; Type: CONSTRAINT; Schema: public; Owner: DillonJayLundell
--

ALTER TABLE ONLY breweries
    ADD CONSTRAINT breweries_pkey PRIMARY KEY (id);


--
-- Name: knex_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: DillonJayLundell
--

ALTER TABLE ONLY knex_migrations
    ADD CONSTRAINT knex_migrations_pkey PRIMARY KEY (id);


--
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: DillonJayLundell
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users_username_unique; Type: CONSTRAINT; Schema: public; Owner: DillonJayLundell
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_username_unique UNIQUE (username);


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

