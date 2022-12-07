<h1 align="center"> 💰 Miau Café 💰 </h1>

API para o projeto Miau Café (desenvolvido para a disciplina de Programação para Dispositivos Móveis na FATEC de São José dos Campos)

### :hammer_and_wrench: Tecnologias e ferramentas
- TypeScript, NodeJS, Express, Insomnia

## :gear: Como rodar
Antes de começar, você vai precisar ter instalado o Node.js e o Yarn (confira um tutorial
[aqui](https://www.notion.so/Instala-o-das-ferramentas-405f3e8b014649cbb422dee6b5bd0535)),
e para clonar esse repositório o [Git](https://git-scm.com/) também!

```bash
# Clone esse repositório
$ git clone https://github.com/vbuarque/fatec-app-cafe-back

# Instale as dependências do projeto, assim como suas tipagens
$ yarn

# Execute a aplicação
$ yarn dev

# O servidor inciará na porta:3333 - acesse http://localhost:3333
```

> Use o Insomnia ou Postman, por exemplo, para simular requisições e respostas das rotas

## :railway_track: Rotas
<details>
 <summary>Endpoints disponíveis para gerenciamento de <b>Equipes</b></summary>
 <br>

|                                                                    Tipo | Situação          | Caminho        |
| ----------------------------------------------------------------------: | :---------------- | :------------- |
|    [![](https://img.shields.io/badge/GET-2E8B57?style=for-the-badge)]() | Listar equipes    | `/teams`       |
|   [![](https://img.shields.io/badge/POST-4682B4?style=for-the-badge)]() | Criar equipe      | `/teams`       |
|    [![](https://img.shields.io/badge/GET-2E8B57?style=for-the-badge)]() | Visualizar equipe | `/teams/:code` |
|    [![](https://img.shields.io/badge/PUT-9370DB?style=for-the-badge)]() | Atualizar equipe  | `/teams/:code` |
| [![](https://img.shields.io/badge/DELETE-CD853F?style=for-the-badge)]() | Excluir equipe    | `/teams/:code` |

</details>

## ⚠️ Estrutura de pastas

```
📂 fatec-app-cafe-back
|- 📁 src
|---- 📁 models
|---- 📁 routes
|---- 📁 types
|--- 📄 server.ts
|- 📄 .gitignore
|- 📄 package.json
|- 📄 tsconfig.json
|- 📄 tslint.json
|- 📄 yarn.lock
```

[![image](https://img.shields.io/badge/✨%20Vinicius%20Buarque,%202022-LinkedIn-009973?style=flat-square)](https://www.linkedin.com/in/vbgusmao/)
