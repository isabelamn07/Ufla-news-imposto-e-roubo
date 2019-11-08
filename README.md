# Ufla-news-imposto-e-roubo
  Repositório utilizado para realização do trabalho da disciplina de Modelagem e Implementação de Software ofertada no período de 2019/02 pela Universidade Federal de Lavras.

<hr> 

## Sobre
  O projeto "Ufla-News" tem como objetivo a construção de uma aplicação mobile android que funcione como meio divulgador de boletins eletrônicos emitidos por diferentes entidades que compõem a Ufla como a incubadora de empresas tecnológicas (INBATEC), a pró-reitoria de gradução (PRG), o restaurante universitário (RU), entre outros. Atuando principalmente de forma a facilitar a divulgação, acesso e organização desses boletins, o aplciativo também dispõe de um ambiente de interação social de forma análoga ao encontrado em redes sociais conhecidas como youtube, twitter e facebook.
  
  
  

## Equipe

| Nome       | Username         | Função  |
| ------------- |:-------------:|:-------------:|
| Isabela Nascimento   | @isabelamn07 |  Product Owner/Desenvolvedora |
| Filipe Rodrigues     | @Filipe-Rodrigues      |  Scrum Master/Desenvolvedor |
| Márcio Inácio | @M4rc1o     |  Desenvolvedor  |
| Tarik Santigo| @Tarik-INC    |   Scrum Master/Desenvolvedor |
| Ricardo Caldeira| @Ricardo Caldeira     |  Desenvolvedor |



## Tutorial de instalação

### Requisitos do projeto

**1.  Instalar Node.js**

O primeiro passo é instalar a plataforma para execução de código JavaScript, o **Node.js**. Para isso, basta acessar esse [link](https://nodejs.org/en/ "NodeJS") e seguir as instruções.

==================

**2.  Instalar Ionic** 

Uma vez instalado o **Node.js** em sua máquina, o próximo passso é instalar o **Ionic** e seu utilitário de linha de comando, denominado **Ionic CLI**. Abra o terminal e entre com com o seguinte comando: `npm install -g ionic`

> Você precisará de permissão de administrador para tal

==================

**3. Instalar Angular Cli**

Em seguida, é necessário instalar a ferramenta **Angular Cli** através do comando `npm i -D -E @angular/cli`. Aguarde a instalação e então finalmente avance para o último passo, onde a aplicação será executada.

> Também será necessária permissão de administrador aqui

==================


### Etapas de execução

**1. Baixar o projeto**

Em uma pasta corrente execute o seguinte comando:
```
Git clone git@github.com:isabelamn07/Ufla-news-imposto-e-roubo.git
```
Ou baixe o projeto em zip e o extraia

**2. Instalar as dependencias do projeto**

No diretório que contêm o projeto, execute os seguintes comandos:
```
cd Ufla-news-imposto-e-roubo
npm i
```
**3. Executar serviço de autentificação da aplicação**

Na pasta do projeto, execute os seguintes comandos:
```
cd utils/server
npm i
npm run start-auth
```

**4. Executar serviço de dados da aplicação**

Instale a seguinte depêndencia (necessária permissao de adiministrador do sistema): 
```
sudo npm i -g json-server
```

Na pasta do projeto, execute os seguintes comandos:
```
cd utils/server
npm i
json-server --watch db.json
```
**5. Iniciar aplicativo**

Na pasta do projeto, execute o seguinte comando:
```
ionic serve
```
