# INSTRUÇÕES PARA EXECUTAR O PROJETO

Este arquivo contém instruções para executar o projeto usando Spring, React e PostgreSQL.

## 1. Instalação

### Backend

- Java JDK 17
- IntelliJ IDEA (ou outro editor de sua preferência)

### Frontend

- Node.js
- VSCode (ou outro editor de sua preferência)

### Banco de Dados

- PostgreSQL
- PGAdmin

## 2. Executando

**Se você não quiser executar o banco, simplesmente comente as partes correspondentes da API para que ela possa ser executada.**

Se você deseja executar o banco de dados, siga estas etapas:

- Abra o PGAdmin.
- Crie um novo banco de dados. Sugiro usar o nome "recovale", pois o arquivo "application.yml" da API já está configurado para esse nome. No entanto, você pode escolher outro nome, mas lembre-se de fazer as alterações necessárias.
  *Observação: idealmente, esses valores do arquivo yml deveriam ser variáveis de ambiente para ocultar detalhes críticos de implementação.*

- Abra uma nova query no PGAdmin, copie e cole o conteúdo do arquivo "schema.sql" e execute-o. (Neste momento, o banco estará vazio, então não há nenhum arquivo de schema ou insert, simplesmente executar o banco, por hora.)

### Executando a API

- Abra o IntelliJ IDEA e execute o projeto "recovale-api" (Também é possível, ou recomendável, abrir diretamente o projeto clicando no arquivo pom.xml).
- Para testar se a API está funcionando corretamente, abra o navegador e acesse: http://localhost:8080/actuator/health
  *Observação: se o código relacionado ao banco de dados não estiver comentado, certifique-se de estar conectado ao banco pelo PGAdmin para que a API seja executada sem erros.*

### Executando o Frontend

- Abra a pasta "recovale-app" no VSCode.
- No terminal, dentro da pasta "recovale-app", se for a primeira vez que você está executando, execute o comando "npm install". Em seguida, execute o comando "npm start". A partir da segunda vez, você só precisa executar o comando "npm start".
