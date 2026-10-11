# Gerenciador de Tarefas — Angular + TypeScript

Aplicação web simples para cadastrar tarefas, acompanhar sua conclusão e filtrar itens por status. Desenvolvida como exercício prático de **Angular Signals**, formulários e persistência local, com foco em conceitos fundamentais de front-end.

## Objetivo do projeto

Construir uma interface pequena, mas funcional, que demonstre manipulação de eventos, atualização reativa de estado, estruturação de modelos com TypeScript e renderização de listas no Angular.

## Funcionalidades implementadas

- Cadastrar uma tarefa pelo campo de texto e botão **Adicionar**.
- Impedir cadastro de tarefa vazia (o título é tratado com `trim()`).
- Marcar ou desmarcar uma tarefa como concluída.
- Excluir tarefas individualmente.
- Alternar entre **Todas**, **Pendentes** e **Concluídas**.
- Exibir contadores de tarefas totais, concluídas e pendentes.
- Salvar a lista no `localStorage` e restaurar os registros ao recarregar a página.
- Mostrar mensagem quando o filtro não retornar tarefas.

## Fluxo de utilização

1. Digite uma atividade, por exemplo `Estudar componentes Angular`.
2. Clique em **Adicionar**.
3. Marque a caixa ao concluir a atividade; os indicadores são atualizados.
4. Use o seletor de filtro para ver somente pendências ou itens concluídos.
5. Use **Excluir** para remover um item.
6. Atualize a página: os registros continuam salvos no mesmo navegador.

## Detalhes técnicos

### Modelo TypeScript

```ts
interface Task {
  id: number;
  title: string;
  done: boolean;
}
```

Cada tarefa possui um identificador, um título e um marcador de conclusão. O ID é gerado com `Date.now()`; isso é suficiente para a demonstração, mas uma aplicação maior deveria usar identificadores mais robustos.

### Signals e estado reativo

- `tasks = signal<Task[]>(...)` mantém a lista de tarefas.
- `filter = signal<'all' | 'pending' | 'done'>(...)` guarda o filtro selecionado.
- `completed = computed(...)` calcula quantas tarefas foram concluídas.
- `visibleTasks = computed(...)` prepara a lista exibida de acordo com o filtro.

Em vez de modificar diretamente objetos existentes, os métodos `toggle()` e `remove()` criam novas listas e chamam `persist()` para atualizar o signal e salvar os dados.

### Formulário e template

O template usa `[(ngModel)]` para o texto da nova tarefa e `(ngSubmit)` para executar `add()`. A listagem é feita com `@for (...; track task.id)` e a mensagem vazia com `@empty`.

### Persistência

Os dados são armazenados sob a chave `angular-portfolio-tasks`. `loadTasks()` faz a leitura e, quando o JSON é inválido, retorna uma lista vazia. O armazenamento é **local ao navegador/dispositivo** e não sincroniza com outros usuários.

## Validação manual sugerida

- [ ] Não cadastrar título só com espaços
- [ ] Adicionar duas tarefas e conferir o contador total
- [ ] Marcar uma tarefa e conferir contadores e filtro de concluídas
- [ ] Desmarcar a tarefa e conferir o retorno à lista de pendentes
- [ ] Excluir uma tarefa e verificar atualização dos indicadores
- [ ] Recarregar a página e confirmar persistência
- [ ] Limpar o armazenamento do site e verificar estado inicial

## Melhorias futuras

- Editar título de uma tarefa.
- Adicionar prazo e prioridade.
- Separar a interface em componentes reutilizáveis.
- Criar serviço de persistência e testes unitários.
- Adicionar testes E2E e integração com API REST.

## Tecnologias

- Angular 20 (componentes standalone e sintaxe de controle de fluxo `@for`/`@if`)
- TypeScript 5.9
- HTML5 e CSS3
- Angular CLI para desenvolvimento e build
- Sem API externa ou banco de dados no estágio atual

## Pré-requisitos

- Node.js e npm instalados (use uma versão de Node.js compatível com Angular 20)
- Editor como Visual Studio Code
- Navegador moderno

Confira as versões locais:

```bash
node --version
npm --version
```

## Instalação e execução

Clone o repositório (substitua a URL por aquela publicada no seu perfil) e acesse a pasta do projeto:

```bash
git clone https://github.com/SEU-USUARIO/NOME-DO-REPOSITORIO.git
cd NOME-DO-REPOSITORIO
npm install
npm start
```

Abra **http://localhost:4200**. Alternativamente, use `npx ng serve`.

Para gerar a compilação de produção:

```bash
npm run build
```

A saída é criada dentro da pasta `dist/` (conforme `angular.json`). O código-fonte fica em `src/`. Se a porta 4200 já estiver ocupada, use `npx ng serve --port 4201`.

## Organização dos arquivos

```text
.
├── src/
│   ├── app/
│   │   ├── app.component.ts     # Estado, lógica e ações da interface
│   │   └── app.component.html   # Template e interações Angular
│   ├── index.html               # Documento base
│   ├── main.ts                  # Bootstrap da aplicação
│   └── styles.css               # Estilos globais
├── angular.json                 # Configuração Angular CLI
├── package.json                 # Dependências e scripts
├── tsconfig.json                # Configurações TypeScript
└── README.md                    # Documentação
```

> Este é um exemplo deliberadamente compacto: a lógica está concentrada no componente raiz. Ainda não há módulos de domínio, roteamento entre telas nem integração com backend.

## Scripts disponíveis

| Comando | Finalidade |
|---|---|
| `npm install` | Instala as dependências |
| `npm start` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera o build de produção |
| `npm run test` | Script declarado em `package.json`, **sem suíte/configuração de testes incluída nesta entrega**; não considere testes automatizados implementados |

## Status e limitações

- Projeto de **estudo e portfólio**, não uma solução de produção.
- Ainda **não foram executados `npm install`, build e testes neste ambiente**; valide tudo localmente antes de publicar.
- Não há autenticação, banco de dados, API externa, pipeline de CI/CD ou suíte automatizada de testes.
- Não há imagens reais da aplicação no repositório. Se quiser, adicione capturas próprias após executar o projeto, em uma pasta `docs/`, e referencie-as neste README.

## Publicação no GitHub

Na raiz deste projeto, depois de testar localmente:

```bash
git init
git add .
git commit -m "feat: adiciona projeto Angular inicial"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/NOME-DO-REPOSITORIO.git
git push -u origin main
```

Crie primeiro um repositório vazio no GitHub. **Não envie a pasta `node_modules/`**, que já está ignorada no `.gitignore`. Se o projeto for parte de um repositório único com os três aplicativos, rode os comandos Git na raiz do portfólio, e não dentro de cada subpasta.
