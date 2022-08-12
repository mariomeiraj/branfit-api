-- create database branfit

create type status_compra as enum('Pago', 'Pagamento pendente', 'Em rota de entrega',  'Compra entrega');
create type tamanho_produto as enum('P', 'M', 'G', 'GG', 'Único');
create type tipo_pagamento as enum('à vista', 'parcelado');

drop table if exists produtos_comprados;
drop table if exists usuarios;
drop table if exists enderecos;
drop table if exists categorias;
drop table if exists sub_categorias;
drop table if exists produtos;
drop table if exists compras;

create table usuarios(
  id serial primary key,
  nome text not null,
  cpf int not null unique,
  email text not null unique,
  telefone int default null,
  senha text not null
);

create table endereco(
  id serial primary key,
  id_usuario int not null references usuarios(id),
  cep int not null,
  estado text not null,
  cidade text not null,
  rua text not null,
  bairro text not null,
  numero int not null,
  complemento text default null
);

create table categorias(
  id serial primary key,
  nome text not null
);

create table sub_categorias(
  id serial primary key,
  id_categoria int not null references categorias(id),
  nome text not null
);

create table produtos(
  id serial primary key,
  id_sub_categoria int not null references sub_categorias(id),
  nome text not null,
  descricao text default null,
  tamanho tamanho_produto not null,
  estoque int not null,
  valor_avista int not null,
  valor_parcelado int not null
);

create table compras(
  id serial primary key,
  id_usuario int not null references usuarios(id),
  status_compra status_compra not null default 'Pagamento pendente'
  tipo_pagamento tipo_pagamento not null
);

create table produto_comprado(
  id serial primary key,
  id_compra int not null references compras(id),
  id_produto int not null references produtos(id)
);