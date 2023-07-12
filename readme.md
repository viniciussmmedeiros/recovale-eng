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

- Abra o PGAdmin.
- Crie um novo banco de dados. Sugiro usar o nome "recovale", pois o arquivo "application.yml" da API já está configurado para esse nome. No entanto, você pode escolher outro nome, mas lembre-se de fazer as alterações necessárias.
  _Observação: idealmente, esses valores do arquivo yml deveriam ser variáveis de ambiente para ocultar detalhes críticos de implementação._

- Abra uma nova query no PGAdmin, copie e cole o conteúdo do arquivo "schema.sql" e execute-o. Isso criará as tabelas.
- Copie e cole o conteúdo do arquivo 'insert.sql' para popular com dados iniciais.

### Executando a API

- Abra o IntelliJ IDEA e execute o projeto "recovale-api" (Também é possível, ou recomendável, abrir diretamente o projeto clicando no arquivo pom.xml).
- Para testar se a API está funcionando corretamente, abra o navegador e acesse: http://localhost:8080/actuator/health
  _Observação: certifique-se de estar conectado ao banco pelo PGAdmin para que a API seja executada sem erros._

### Executando o Frontend

- Abra a pasta "recovale-app" no VSCode.
- No terminal, dentro da pasta "recovale-app", se for a primeira vez que você está executando, execute o comando "npm install". Em seguida, execute o comando "npm start". A partir da segunda vez, você só precisa executar o comando "npm start".

### Primeiros testes:

- Pode consultar as tabelas no banco para saber os dados básicos de login de algumas contas para testar.
  Exemplos:
  username: admin | senha: admin para acessar uma conta de administrador
  username: qwe | senha: qwe para acessar uma conta de remetente

Testes:

Cadastrar da tela inicial, funciona da seguinte forma:
Para um input cpf/cnpj de 11 dígitos será considerado cpf, então o usuário será um remetente. Se o input tiver exatos 14 dígitos será considerado um cnpj, logo um destinatário (empresa).
_Observação: não usar qualquer pontuação, inserir apenas os dígitos. Para exemplos, olhar os inserts padrões do banco._

Testar resgate de recompensas:
Logar com um usuário que já tenha pontuação (o qwe / qwe por exemplo) e selecionar a aba de resgate de recompensas. A partir dela é possível filtrar as recompensas e resgatar, observando
que a pontuação do usuário atualiza de acordo e o número de recompensas disponíveis diminui.
_Observação: se o usuário não tiver pontuação suficiente para um resgate uma exceção não tratada será lançada. Será resolvida em breve._
