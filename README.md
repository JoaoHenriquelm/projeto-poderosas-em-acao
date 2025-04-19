
# ❤️ Poderosas Em ação - Back-end

Esta aplicação corresponde ao lado do servidor do projeto Poderosas em Ação, sendo responsável por funcionalidades essenciais, como autenticação de administradores no aplicativo, recuperação de informações dos associados e cadastro de novos associados e assistidos a partir de dados recebidos via Google Forms pelo app script. Todas as informações são armazenadas no banco de dados MongoDB.


## 👤 Usado por

Esse projeto é usado pela instituição poderosas em ação.

#### Mídias da instituição:
- [Instagram](https://www.instagram.com/poderosasemacao_/)

- [Site da organização](https://www.poderosasemacao.org/)
## 🔧 Tecnologias utilizadas

**Back-end:** Node, Typescript, Express, Bcrypt, JsonWebToken, Mongoose.

**Banco de Dados:** MongoDB.
## 📄 Documentação da API

#### Cria um associado

```http
  POST /associate
```

| Body  | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `fullName` | `string` | **Obrigatório**. Nome completo do associado |
| `dateOfBirth` | `string` | **Obrigatório**. Data de nascimento do associado |
| `natiolity` | `string` | **Obrigatório**. Nacionalidade do associado |
| `maritalStatus` | `string` | **Obrigatório**. Estado civil completo do associado |
| `cpf` | `string` | **Obrigatório**. CPF do associado |
| `rg` | `string` | **Obrigatório**. RG do associado |
| `issuingBody` | `string` | **Obrigatório**. Órgão emissor do associado |
| `address` | `string` | **Obrigatório**. Endereço completo com rua, cidade, cep e estado do associado  |
| `street` | `string` | **Obrigatório**. Rua do associado |
| `city` | `string` | **Obrigatório**. Cidade do associado |
| `cep` | `string` | **Obrigatório**. CEP do associado |
| `state` | `string` | **Obrigatório**. Estado do associado |
| `homePhone` | `string` | **Obrigatório**. Telefone residencial do associado |
| `cellPhone` | `string` | **Obrigatório**. Telefone celular do associado |
| `email` | `string` | **Obrigatório**. Email do associado |
| `associationCategory` | `string` | **Obrigatório**. Categoria do associado do associado |
| `contribuitionAmount` | `string` | Valor de contribuição do associado |
| `paymentMethod` | `string` | **Obrigatório**. Método de pagamento do associado |
| `responsibleCPF` | `string` | CPF do responsável do associado |
| `responsibleName` | `string` | Nome completo do responsável do associado |

#### Cria um assistido

```http
  POST /attend
```

| Body   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `fullName` | `string` | **Obrigatório**. Nome completo do assistido |
| `dateOfBirth` | `string` | **Obrigatório**. Data de nascimento do assistido |
| `natiolity` | `string` | **Obrigatório**. Nacionalidade do assistido |
| `maritalStatus` | `string` | **Obrigatório**. Estado civil completo do assistido |
| `cpf` | `string` | **Obrigatório**. CPF do assistido |
| `rg` | `string` | **Obrigatório**. RG do assistido |
| `issuingBody` | `string` | **Obrigatório**. Órgão emissor do assistido |
| `address` | `string` | **Obrigatório**. Endereço completo com rua, cidade, cep e estado do assistido  |
| `street` | `string` | **Obrigatório**. Rua do assistido |
| `city` | `string` | **Obrigatório**. Cidade do assistido |
| `cep` | `string` | **Obrigatório**. CEP do assistido |
| `state` | `string` | **Obrigatório**. Estado do assistido |
| `homePhone` | `string` | **Obrigatório**. Telefone residencial do assistido |
| `cellPhone` | `string` | **Obrigatório**. Telefone celular do assistido |
| `currentSchool` | `string` | Escola atual do assistido |
| `dependents` | `string` | O assistido possui dependentes? |
| `numberOfDependents` | `string` | Número de dependentes do assistido |
| `relationOfDependents` | `string` | Relação dos dependentes do assistido |
| `diagnosisYear` | `string` | **Obrigatório**. Ano do diagnóstico do assistido |
| `amountOfQuimi` | `string` | **Obrigatório**. Quantidade de quimios do assistido |
| `amountOfRad` | `string` | **Obrigatório**. Quantidade de rádios do assistido |
| `mastoligis` | `string` | **Obrigatório**. Nome do mastologista do assistido |
| `oncologist` | `string` | **Obrigatório**. Nome do oncologista do assistido |
| `hadSurgery` | `string` | **Obrigatório**. O assistido fez cirurgia? |
| `typeSurgery` | `string` | Tipo de cirurgia do assistido |
| `vaccines` | `string` | **Obrigatório**. Vacinas do assistido |
| `allergies` | `string` | **Obrigatório**. Alergias do assistido |
| `specialsConditions` | `string` | **Obrigatório**. Condições especiais do assistido |
| `continuosUseMedications` | `string` | **Obrigatório**. Medicação de uso contínuo do assistido |
| `observations` | `string` | **Obrigatório**. Observações do assistido 
| `medicalInsurance` | `string` | Seguro médico do assistido 
| `working` | `string` | **Obrigatório**. O assistido trabalha? 
| `functionWork` | `string` | Função no trabalho do assistido 
| `activityOfInterest` | `string` | **Obrigatório**. Atividade de interesse do assistido na instuição 
| `preferredParticipationShift` | `string` | **Obrigatório**. Turno preferido de participação do assistido 
| `authorizationUseImage` | `string` | **Obrigatório**. O assistido autoriza o uso da imagem? 
| `emergencyContact` | `{	name: string, phoneNumber: string, kinship: string}` | **Obrigatório**. Contato de emergência do assistido 
| `dataOfResponsible` | `{	fullName: string, kinship:string, dateOfBirth: string, rg: string, cpf: string, address: string, homePhone: string, cellPhone: string, email: string }` | Dados do responsável do assistido 

#### Retorna um associado

```http
  GET /associate/${cpf}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `cpf` | `string` | **Obrigatório**. CPF do associado |


#### Retorna um assistido

```http
  GET /attend/${cpf}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `cpf` | `string` | **Obrigatório**. CPF do assistido |


#### Retorna um array de associados em páginas

```http
  GET /associate/?limit={limit}&page=${page}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `limit` | `string` | **Obrigatório**. Limite de associados para buscar em cada página |
| `page` | `string` | **Obrigatório**. Página de associados para buscar |

#### Retorna um array de associados que iniciam com um nome

```http
  GET /associate/${name}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name` | `string` | **Obrigatório**. Busca associados que começam com esse nome.  |


#### Retorna um array de associados que nasceram no mês passado

```http
  GET /birthdays/${month}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `month` | `string` | **Obrigatório**. Busca associados que fazem aniversário nesse mês.  |


## 📚 Aprendizados


- Experimentei a Clean Architecture, separando as camadas do projeto de forma organizada, com foco principal na orientação a objetos (OO) para garantir melhor encapsulamento e reutilização de código.

- Implementei tratamento de erros utilizando o tipo Either, proporcionando um fluxo mais seguro e previsível no gerenciamento de falhas.

- Aprendi a esquematizar documentos no Mongoose para o MongoDB, estruturando os dados de maneira eficiente e alinhada às necessidades da aplicação.

## 📦  Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`DATABASE_PASSWORD`

`DATABASE_USER`

`PORT`

`JWT_PASS`


## 🚀 Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/JoaoHenriquelm/projeto-poderosas-em-acao.git
```

Entre no diretório do projeto

```bash
  cd projeto-poderosas-em-acao
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run dev
```


## 🔗 Relacionados

Segue o front-end da aplicação:

[Poderosas em ação - Front-end](https://github.com/JoaoHenriquelm/app-reactNative-poderosas-em-acao)

