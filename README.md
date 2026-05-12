<div align="center">

<br />

# ServiJá
# Gabriel Rosa, Lucas Bressanin, Murilo Godoy, João Pedro Baungartner e João Pedro Vivacqua

**Plataforma de conexão entre clientes e prestadores de serviços locais**

Encontre cabeleireiros, manicures, eletricistas e muito mais — por cidade, categoria, preço e avaliação.

<br />

[![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=flat-square&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Java](https://img.shields.io/badge/Java_17-ED8B00?style=flat-square&logo=openjdk&logoColor=white)](https://www.java.com)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot_3-6DB33F?style=flat-square&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org)

<br />

</div>

---

## Sobre o projeto

O **ServiJá** é um marketplace de serviços locais que conecta clientes a prestadores autônomos. Um cliente que chegou em São Paulo e precisa cortar o cabelo entra na plataforma, busca cabeleireiros no bairro, compara preço e avaliação, escolhe um horário e agenda — tudo em poucos cliques.

Do lado do prestador, a plataforma oferece um painel completo para gerenciar perfil, serviços, disponibilidade e agendamentos recebidos.

> *"Acabei de chegar em São Paulo e preciso cortar o cabelo. Busco cabeleireiros em SP, comparo preço e nota, escolho um horário e faço o agendamento."*

<br />

## Funcionalidades

### Para clientes
- Busca de prestadores por **cidade**, **bairro** e **categoria**
- Comparação por **preço**, **nota média** e **disponibilidade**
- Agendamento com seleção de serviço, data e horário
- Pagamento simulado (PIX, cartão ou dinheiro)
- Avaliação pós-serviço com nota e comentário
- Lista de prestadores favoritos

### Para prestadores
- Cadastro de perfil profissional com endereço de atendimento
- Gerenciamento de serviços com preço e duração
- Configuração de disponibilidade por dia da semana
- Painel de agendamentos com ações de confirmar, recusar e concluir
- Nota média calculada automaticamente pelas avaliações

<br />

## Estrutura do frontend

```
servija/
├── app/
│   ├── (cliente)/
│   │   ├── agendar/[prestadorId]/     # Fluxo de agendamento
│   │   ├── avaliar/[agendamentoId]/   # Avaliar serviço concluído
│   │   └── cliente/
│   │       ├── agendamentos/          # Histórico de agendamentos
│   │       └── favoritos/             # Prestadores salvos
│   │
│   ├── (prestador)/
│   │   └── prestador/
│   │       ├── agendamentos/          # Gerenciar agendamentos
│   │       ├── dashboard/             # Visão geral e métricas
│   │       ├── disponibilidades/      # Configurar horários
│   │       └── servicos/              # Gerenciar serviços
│   │
│   └── (public)/
│       ├── busca/                     # Busca de prestadores
│       ├── login/                     # Autenticação
│       ├── prestadores/[id]/          # Perfil público do prestador
│       ├── registro/                  # Cadastro de cliente ou prestador
│       └── page.tsx                   # Landing page
│
├── components/
│   ├── AppointmentCard.tsx            # Card de agendamento com status
│   ├── AuthGuard.tsx                  # Proteção de rotas autenticadas
│   ├── EmptyState.tsx                 # Estado vazio reutilizável
│   ├── Footer.tsx
│   ├── LoadingSkeleton.tsx            # Skeleton de carregamento
│   ├── Navbar.tsx
│   ├── PageWrapper.tsx                # Layout padrão de página
│   ├── ProviderCard.tsx               # Card de prestador na listagem
│   ├── ServiceCard.tsx                # Card de serviço
│   ├── Sidebar.tsx                    # Navegação lateral (área autenticada)
│   ├── StarRating.tsx                 # Exibição de nota com estrelas
│   └── StatusBadge.tsx                # Badge colorido por status
│
├── contexts/
│   ├── AuthContext.tsx                # Autenticação global (token, role, user)
│   └── ToastContext.tsx               # Notificações globais
│
├── lib/
│   ├── api.ts                         # Cliente HTTP com interceptor de auth
│   ├── types.ts                       # Tipos TypeScript dos DTOs da API
│   └── utils.ts                       # Formatação de datas, preços etc.
│
├── globals.css
└── next.config.ts
```

<br />

## Domínio — 10 entidades

| # | Entidade | Responsabilidade |
|---|----------|-----------------|
| 1 | `Cliente` | Quem busca e contrata serviços |
| 2 | `Prestador` | Profissional que oferece serviços |
| 3 | `Endereco` | Localização para perfil e filtros |
| 4 | `CategoriaServico` | Agrupamento por tipo de serviço |
| 5 | `Servico` | Oferta específica de um prestador |
| 6 | `Disponibilidade` | Dias e horários de atendimento |
| 7 | `Agendamento` | Entidade central — liga cliente, prestador e serviço |
| 8 | `Pagamento` | Registro de pagamento do agendamento |
| 9 | `Avaliacao` | Nota e comentário pós-serviço |
| 10 | `Favorito` | Prestadores salvos pelo cliente |

### Fluxo de status do agendamento

```
PENDENTE ──► CONFIRMADO ──► CONCLUIDO
    │              │
    │              └──► CANCELADO
    │
    ├──► RECUSADO
    └──► CANCELADO
```

<br />

## Começando

### Pré-requisitos

- Node.js 18+

### Instalação e execução

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/servija.git

# Entre na pasta do projeto
cd servija

# Instale as dependências
npm install

# Rode em desenvolvimento
npm run dev
```


### Variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_API_URL=""
```

<br />

## API — principais endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `POST` | `/auth/login` | Autenticação — retorna JWT |
| `POST` | `/clientes` | Cadastrar cliente |
| `POST` | `/prestadores` | Cadastrar prestador |
| `GET` | `/prestadores/cidade/{cidade}` | Buscar prestadores por cidade |
| `GET` | `/prestadores/cidade/{cidade}/bairro/{bairro}` | Filtrar por bairro |
| `GET` | `/servicos/prestador/{id}/ativos` | Serviços ativos de um prestador |
| `GET` | `/prestadores/{id}/disponibilidades` | Disponibilidade do prestador |
| `POST` | `/agendamentos` | Criar agendamento |
| `PATCH` | `/agendamentos/{id}/confirmar` | Prestador confirma |
| `PATCH` | `/agendamentos/{id}/recusar` | Prestador recusa |
| `PATCH` | `/agendamentos/{id}/concluir` | Marcar como concluído |
| `PATCH` | `/agendamentos/{id}/cancelar` | Cancelar agendamento |
| `POST` | `/avaliacoes` | Avaliar agendamento concluído |
| `POST` | `/favoritos` | Favoritar prestador |
| `DELETE` | `/favoritos/{id}` | Remover favorito |


<br />

## Autenticação

O sistema utiliza **JWT Bearer Token**. Após o login, o token é armazenado em `localStorage` e enviado automaticamente em todas as requisições via interceptor no `lib/api.ts`.

Existem dois tipos de usuário com áreas distintas na plataforma:

| Role | Área | Acesso |
|------|------|--------|
| `CLIENTE` | `/cliente/*` e `/agendar/*` | Agendamentos, favoritos, avaliações |
| `PRESTADOR` | `/prestador/*` | Dashboard, serviços, disponibilidades |

<br />

## Projeto acadêmico

Desenvolvido como projeto final da disciplina de **Arquitetura de Objetos**.

O projeto demonstra na prática: modelagem de domínio com 10 entidades coesas, separação em camadas (controller → service → repository), uso de DTOs, regras de negócio encapsuladas em services, API REST documentada e integração completa com frontend em React/Next.js.

---

<div align="center">
  <sub>Feito com Next.js, Spring Boot e muito café ☕</sub>
</div>
