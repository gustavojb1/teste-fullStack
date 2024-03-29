--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: clients; Type: TABLE; Schema: clients; Owner: postgres
--

CREATE TABLE clients.clients (
    id integer NOT NULL,
    nome character varying(100),
    email character varying(100),
    telefone character varying(15),
    x numeric,
    y numeric
);


ALTER TABLE clients.clients OWNER TO postgres;

--
-- Name: clients_id_seq; Type: SEQUENCE; Schema: clients; Owner: postgres
--

CREATE SEQUENCE clients.clients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE clients.clients_id_seq OWNER TO postgres;

--
-- Name: clients_id_seq; Type: SEQUENCE OWNED BY; Schema: clients; Owner: postgres
--

ALTER SEQUENCE clients.clients_id_seq OWNED BY clients.clients.id;


--
-- Name: clients id; Type: DEFAULT; Schema: clients; Owner: postgres
--

ALTER TABLE ONLY clients.clients ALTER COLUMN id SET DEFAULT nextval('clients.clients_id_seq'::regclass);


--
-- Name: clients clients_pkey; Type: CONSTRAINT; Schema: clients; Owner: postgres
--

ALTER TABLE ONLY clients.clients
    ADD CONSTRAINT clients_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

