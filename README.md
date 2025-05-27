# Dashboard Analítico Corporativo

Um sistema web completo para análise de vendas e gestão de produtos, com autenticação e interface moderna.

## 🚀 Funcionalidades

- **Autenticação Segura**
  - Login com JWT
  - Proteção de rotas
  - Interface moderna e responsiva

- **Dashboard de Vendas**
  - Visualização de vendas
  - Formatação monetária (R$)
  - Datas no formato brasileiro (dd/mm/aaaa)

- **Gestão de Produtos**
  - Listagem de produtos
  - Adição de novos produtos
  - Edição de produtos existentes
  - Remoção de produtos

## 🛠️ Tecnologias

### Frontend
- React
- CSS Moderno
- Formatação de dados (moeda e datas)
- Gerenciamento de estado

### Backend
- Node.js
- Express
- JWT para autenticação
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
DATABASE_URL=seu_banco_aqui
```

### Banco de Dados
O sistema usa SQLite por padrão. As tabelas necessárias são:
- users
- products
- sales

## 👤 Uso

1. Acesse `http://localhost:5173` (ou a porta indicada)
2. Faça login com suas credenciais
3. Navegue pelo menu superior:
   - Dashboard: Visualize vendas
   - Produtos: Gerencie produtos

## 🤝 Contribuição

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## ✨ Próximos Passos

- [ ] Implementar gráficos no dashboard
- [ ] Adicionar filtros de data
- [ ] Melhorar responsividade
- [ ] Adicionar mais relatórios
- [ ] Implementar testes automatizados
