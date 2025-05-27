# Backend Node.js/Express - Dashboard Analítico

## Como rodar

1. Instale as dependências:
   ```sh
   npm install
   ```
2. Copie o arquivo `.env.example` para `.env` e ajuste a chave JWT se desejar.
3. Rode o servidor em modo desenvolvimento:
   ```sh
   npm run dev
   ```
   Ou em modo produção:
   ```sh
   npm start
   ```

## Rotas principais

- `POST /api/auth/register` - Cadastro de usuário `{ email, password }`
- `POST /api/auth/login` - Login `{ email, password }` (retorna token JWT)
- `GET /api/sales` - Listar vendas do usuário (protegida)
- `POST /api/sales` - Criar venda `{ product, amount, date }` (protegida)
- `PUT /api/sales/:id` - Atualizar venda (protegida)
- `DELETE /api/sales/:id` - Remover venda (protegida)

## Banco de dados

- Usa SQLite localmente (`database.sqlite` criado automaticamente)

## Observações

- Todas as rotas de vendas exigem autenticação via JWT no header: `Authorization: Bearer <token>`
- O projeto segue o escopo detalhado para autenticação e CRUD de dados analíticos. 