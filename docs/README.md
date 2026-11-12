# Viraliza

Projeto desenvolvido para fins de estudo de **desenvolvimento de uma aplicação de rede social**, com foco na utilização de React, TypeScript e Java Spring Boot.

## Sobre o projeto

O **Viraliza** é uma aplicação de rede social desenvolvida como projeto de estudo e prática de desenvolvimento de software.

O projeto tem como objetivo explorar conceitos e tecnologias utilizados no desenvolvimento de aplicações web modernas, incluindo a criação de uma API REST, desenvolvimento de uma interface com React e TypeScript e comunicação entre frontend e backend.

### Tecnologias

<div align="center">
	<code><img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/rest.png" alt="REST" title="REST"/></code>
	<code><img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/git.png" alt="Git" title="Git"/></code>
	<code><img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/css.png" alt="CSS" title="CSS"/></code>
	<code><img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/swagger.png" alt="Swagger" title="Swagger"/></code>
	<code><img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/react.png" alt="React" title="React"/></code>
	<code><img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/typescript.png" alt="TypeScript" title="TypeScript"/></code>
	<code><img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/vite.png" alt="Vite" title="Vite"/></code>
	<code><img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/java.png" alt="Java" title="Java"/></code>
	<code><img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/spring.png" alt="Spring" title="Spring"/></code>
	<code><img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/spring_boot.png" alt="Spring Boot" title="Spring Boot"/></code>
	<code><img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/postgresql.png" alt="PostgreSQL" title="PostgreSQL"/></code>
	<code><img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/docker.png" alt="Docker" title="Docker"/></code>
</div>

**Frontend**
- React
- TypeScript
- Vite

**Backend**
- Java
- Spring Boot

**Database**
- PostgreSQL

**Setup**
- Docker

## Objetivo

Este projeto foi desenvolvido exclusivamente para **estudo, demonstração de conhecimentos e composição de portfólio**.

A aplicação não possui finalidade comercial.

## Api

Atualmente o projeto está usando um servidor local de Mock Api usando prism ``@stoplight/prism-cli``, e o contrato da Api está sendo desenvolvido no arquivo ``OpenApi.yaml``.

## Configuração do ambiente de desenvolvimento

### 1. Pré-requisitos

Antes de iniciar, certifique-se de que o computador possui:

- Git;
- Docker Engine;
- Docker Compose (plugin);
- Java 21 (JDK);
- IntelliJ IDEA (opcional, para desenvolvimento).

### 2. Clonando o repositório

Clone o projeto e acesse sua pasta:

```bash
git clone <URL_DO_REPOSITORIO>
cd <NOME_DO_REPOSITORIO>
```

### 3. Configurando as variáveis de ambiente

Crie o arquivo `.env` a partir do modelo disponibilizado:

```bash
cp .env.example .env
```

Edite o arquivo e configure as senhas de acesso ao PostgreSQL:

```bash
nano .env
```

### 4. Preparando o PostgreSQL

Conceda permissão de execução ao script de inicialização:

```bash
chmod +x docker/postgres/init/01-create-app-user.sh
```

Verifique se a configuração do Docker Compose está correta:

```bash
docker compose config
```

Inicie o container do PostgreSQL:

```bash
docker compose up -d
```

Verifique se o container está funcionando:

```bash
docker compose ps
```

Para acompanhar os logs:

```bash
docker compose logs -f database
```

### 5. Configurando o backend

Abra o projeto `backend` no IntelliJ IDEA.

Crie o arquivo `src/main/resources/application-local.yml`, utilizando como referência as configurações documentadas no projeto.

Configure as credenciais do PostgreSQL de acordo com o arquivo `.env`.
Atenção: o arquivo `application-local.yml` não deve ser enviado ao GitHub.

### 6. Executando a aplicação

No IntelliJ IDEA, execute a classe principal do Spring Boot.
Alternativamente, pelo terminal, acesse a pasta do backend:

```bash
cd backend
```

Conceda permissão de execução ao Gradle Wrapper:

```bash
chmod +x gradlew
```

Execute a aplicação:

```bash
./gradlew bootRun
```

O backend estará disponível em:

```text
http://localhost:8080
```

### 7. Encerrando o ambiente

Para parar e remover o container do PostgreSQL:

```bash
docker compose down
```

Os dados do banco permanecem armazenados no volume Docker e estarão disponíveis na próxima inicialização.

**Importante:** não utilize `docker compose down -v` caso queira preservar os dados do banco.

## Direitos autorais

© 2026 Timas. Todos os direitos reservados.

Este projeto é disponibilizado exclusivamente para fins de demonstração e portfólio. **Não é permitida a cópia, redistribuição, modificação ou utilização deste projeto, total ou parcialmente, sem autorização prévia do autor.**