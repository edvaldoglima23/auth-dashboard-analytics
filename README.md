# Dashboard Analítico Corporativo

Um sistema web completo para análise de vendas e gestão de produtos, com autenticação JWT, dashboard analítico, exportação de relatórios e interface moderna.

## 🚀 Funcionalidades

- **Autenticação Segura**
  - Login com JWT
  - Proteção de rotas
  - Interface moderna e responsiva

- **Dashboard de Vendas**
  - Visualização de vendas com gráficos (Chart.js)
  - KPIs: vendas totais, média, produto mais vendido, total de produtos
  - Gráficos de vendas por período, categoria e tendência por produto
  - Exportação de relatórios em Excel e PDF
  - Filtros por data
  - Formatação monetária (R$)
  - Datas no formato brasileiro (dd/mm/aaaa)

- **Gestão de Produtos**
  - Listagem de produtos
  - Adição, edição e remoção de produtos
  - Controle de estoque

- **Gestão de Vendas**
  - Registro de novas vendas
  - Histórico de vendas
  - Cancelamento de vendas
  - Atualização automática do estoque

## 🛠️ Tecnologias

### Frontend
- React (Vite)
- Chart.js & react-chartjs-2
- Material-UI (MUI)
- date-fns
- jsPDF, xlsx (exportação)
- Axios
- CSS Moderno

### Backend
- Node.js
- Express
- JWT para autenticação
- Sequelize ORM
- SQLite para banco de dados

## 📦 Instalação

1. **Clone o repositório**
```bash
git clone [seu-repositorio]
cd auth-dashboard-analytics
```

2. **Backend**
```bash
cd backend
npm install
npm run dev
```
Se aparecer erro de porta ocupada, rode:
```bash
sudo kill -9 $(sudo lsof -t -i:3001) || true
```
Se mudar os modelos, apague o banco para resetar:
```bash
rm database.sqlite
npm run dev
```

3. **Frontend**
```bash
cd frontend
npm install
npm run dev
```

## 🔧 Configuração

### Variáveis de Ambiente
Crie um arquivo `.env` na pasta backend:
```env
JWT_SECRET=seu_secret_aqui
```

### Banco de Dados
O sistema usa SQLite por padrão. As tabelas são criadas automaticamente.

## 👤 Uso

1. Acesse `http://localhost:5174` (ou a porta indicada)
2. Faça login com:
   - **Email:** admin@example.com
   - **Senha:** admin123
3. Navegue pelo menu superior:
   - Dashboard: Visualize vendas e gráficos
   - Produtos: Gerencie produtos
   - Vendas: Registre e acompanhe vendas

## 📝 Problemas Comuns

- **Porta 3001 ocupada:**
  - Rode `sudo kill -9 $(sudo lsof -t -i:3001) || true` antes de iniciar o backend.
- **Banco de dados desatualizado:**
  - Apague `database.sqlite` e rode `npm run dev` para recriar.
- **Login volta para tela inicial:**
  - Verifique se o backend está rodando e se o token está salvo no localStorage.

## 🤝 Contribuição

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'Add NovaFeature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## ✨ Próximos Passos

- [x] Dashboard com gráficos
- [x] Exportação de relatórios (Excel/PDF)
- [x] Filtros de data
- [x] Melhorias de autenticação
- [ ] Melhorar responsividade
- [ ] Adicionar mais relatórios
- [ ] Implementar testes automatizados
