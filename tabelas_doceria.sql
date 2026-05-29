Create database db_doceria;
use db_doceria;

create table tbl_doce (
id_doce int not null primary key auto_increment,
tipo varchar(120) not null,
nome varchar (120)not null,
massa varchar(120) not null,
recheio varchar (120) not null,
cobertura varchar(120) not null,
qtd int not null,
peso decimal(10,2) not null,
porcao int not null,
preco decimal(10,2) not null,
data_validade date not null,
status enum ('Disponivel', 'Descartado') not null
);

alter table tbl_doce 
modify column cobertura varchar(120) not null;


create table tbl_funcionario  (
id_funcionario int not null primary key auto_increment,
nome varchar(120) not null,
email varchar (120) not null,
senha varchar (100) not null
);

create table tbl_historico_descarte (
id_historico_descarte int not null primary key auto_increment,
id_doce int not null,
id_funcionario int not null,
data_descarte datetime not null default (current_date())
);

alter table tbl_historico_descarte
add constraint fk_funcionario_descarte
foreign key (id_funcionario) references tbl_funcionario (id_funcionario),
add constraint fk_doce_descarte
foreign key (id_doce) references tbl_doce (id_doce);