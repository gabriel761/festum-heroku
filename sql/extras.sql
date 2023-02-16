create table categoria (
	pk_id serial primary key,
	nome varchar(100)
);
create table subCategoria (
	pk_id serial primary key,
	nome varchar(100)
);
create table segmento (
	pk_id serial primary key,
	nome varchar(100)
)