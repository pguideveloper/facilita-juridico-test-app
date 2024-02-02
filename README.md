## Como rodar o projeto?

- Rode o comando `npm install` para instalar todas as dependências do projeto

- Crie o arquivo `.env.local` baseado no padrão do `.env.example`.

- Rode o compando `npm run dev` e abra o link que será exibido no console, normalmente `http://localhost:5173/`.

Uma curiosidade o Vite usa a porta `5173`, pois é como se escreve `site` com números.

### Principais bibliotecas e motivações

- shadcn: Como não tinha nenhuma definição de layout para seguir, para poupar tempo utilizei essa biblioteca de componentes, gosto dela pois não precisamos instalar todos os componentes, podemos instalar apenas os componentes que iremos usar via CLI é bem compacta e customizável. Mesmo o básico fica elegante.
- zod: A mesma motivação do backend, mas no frontend podemos integrar com diversas outras ferramentas, como o `react-hook-forms`.
- react-hook-forms: Biblioteca para facilitar a integração do React com formulários HTML
- react-query: Gosto de usar o `react-query`, pois fica bem fácil de gerenciar nossas requisições HTTP, temos mais controles do estado, tem toda a parte de cache das requisições já implementada, podemos gerenciar a quantidade de tentativas para cada requisição.

### Considerações finais

Mais coisas poderiam ter sido feitas tanto no frontend quanto no backend, melhorar a parte de responsividade, organizar melhor o projeto. Adicionar alguns testes tanto no frontend, quanto no backend. Optei por testar apenas o algoritmo que faz o cálculo das rotas, pois foi a primeira etapa de implementação do projeto, então precisava de uma maneira simples de testar.
