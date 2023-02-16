
create table pessoa (
	pk_id serial primary key,
	nome varchar (50) not null,
	sobrenome varchar (50) not null,
	email varchar (50) not null,
	senha varchar (50) not null,
	tipo_pessoa varchar (20)
);
create table cliente (
	pk_id serial primary key,
	data_nascimento date not null,
	cpf varchar (15) not null,
	telefone varchar (20),
	tipo_telefone varchar (20),
	instagram varchar (50),
	endereco varchar (400),
	auth_adm boolean,
	auth_pag boolean
);
create table fornecedor (
	pk_id serial primary key,
	nome_loja varchar (50) not null,
	cnpj varchar (20) not null,
	telefone varchar (20) not null,
	instagram varchar (200),
	endereco varchar (400) not null,
	auth_adm boolean not null,
	auth_pag boolean not null,
	vip boolean not null
);
create table produto (
	pk_id serial primary key,
	nome varchar (100),
	descricao varchar (1000),
	imagem varchar (400),
	preco_original numeric,
	preco_final numeric
)
create table anuncio(
	pk_id serial primary key,
	titulo varchar(500),
	tipo_anuncio varchar (100),
	preco_anuncio numeric,
	para_fornecedor boolean,
	imagem varchar(1000),
	status varchar (50),
	id_produto int,
	id_fornecedor int
)

alter table cliente add fk_cliente_pessoa int;
alter table fornecedor add fk_fornecedor_pessoa int;

alter table cliente add foreign key (fk_cliente_pessoa) references pessoa(pk_id);
alter table fornecedor add foreign key (fk_fornecedor_pessoa) references pessoa(pk_id);

alter table anuncio add fk_anuncio_fornecedor int;
alter table anuncio add foreign key (fk_anuncio_fornecedor) references fornecedor(pk_id);