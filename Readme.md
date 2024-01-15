Esse é o web service para o ui do meu sistema de enquetes.

Passo 1:
--------

Para faze-lo funcionar, você precisa do MySQL instalado e funcionando

Passo 2:
--------

Crie um arquivo com o nome de .env dentro da pasta web\_service, depois, preencha-o da seguinte forma:

*   DB\_user=(seu usuario do banco de dados)
*   DB\_password=(sua senha do banco de dados)
*   DB\_database=voting\_system
*   DB\_host=(seu hospedeiro do MySQL, em caso de maquina propria localhost)

Passo 3:
--------

Va até o seu MySQL query editor e copie o conteúdo do arquivo em src/model/service/createTable.sql

Passo 4:
--------

Entre na pasta web\_service com o terminal do seu computador e rode o comando "npm i" para instalar as dependências necessárias> Deve demorar alguns segundos dependendo da sua máquina.

Passo 5:
--------

Agora rode o comando npm start .