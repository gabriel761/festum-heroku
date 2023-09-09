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

CREATE TABLE assinatura (
	pk_id serial PRIMARY KEY,
	dados_assinatura varchar(1500),
	data_primeira_cobranca date,
	data_criacao date default current_date,
	id varchar(10),
	card_token varchar(200),
	data_contagem_bloqueio date
);
CREATE TABLE cartao (
	pk_id serial PRIMARY KEY,
	dados_cartao varchar(1500),
	numero varchar (30),
	card_token varchar (200),
	bandeira varchar (50)
);

alter table assinatura add fk_assinatura_fornecedor int;
alter table assinatura add foreign key (fk_assinatura_fornecedor) references fornecedor(pk_id);

alter table cartao add fk_cartao_fornecedor int;
alter table cartao add foreign key (fk_cartao_fornecedor) references fornecedor(pk_id);

create table webhook_logs (
	pk_id serial primary key,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	JSONdata varchar(500000)
)