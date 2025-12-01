# Introdução

Nos últimos anos, clínicas, consultórios e hospitais têm buscado
otimizar seus processos internos para melhorar a eficiência operacional
e a qualidade no atendimento ao paciente. Nesse contexto, este estudo de
caso apresenta o desenvolvimento de um Sistema de Gerenciamento
Hospitalar (SGH), projetado para centralizar informações, reduzir falhas
humanas, agilizar fluxos de trabalho e oferecer suporte à tomada de
decisões clínicas e administrativas.

O objetivo principal do projeto é criar um sistema completo e integrado,
capaz de gerenciar pacientes, profissionais de saúde, agendamentos,
exames, prontuários eletrônicos e fluxos internos da instituição. O
sistema será desenvolvido utilizando tecnologias modernas de front-end e
back-end, com ênfase em segurança, escalabilidade e usabilidade.

Os principais usuários do sistema são:

-   **Recepcionistas**: responsáveis por cadastrar pacientes, agendar
    consultas e organizar fluxos de atendimento.
-   **Médicos**: acessam prontuários, registram diagnósticos, solicitam
    exames e visualizam histórico clínico.
-   **Enfermeiros**: realizam triagens, monitoram dados vitais e inserem
    informações assistenciais.
-   **Administradores**: gerenciam usuários, permissões, unidades de
    atendimento, profissionais, relatórios e indicadores do sistema.

A relevância do SGH está na sua capacidade de integrar setores,
automatizar processos repetitivos, evitar perdas de informações e
garantir maior segurança e rastreabilidade dos dados clínicos.

# Análise e Requisitos

## Requisitos Funcionais (RF)

-   **RF01 -- Gerenciar pacientes:** cadastrar, editar e consultar
    informações.
-   **RF02 -- Gerenciar prontuário eletrônico:** registrar informações
    clínicas, diagnósticos, prescrições e exames.
-   **RF03 -- Solicitar e registrar exames:** registrar solicitações,
    resultados e status.
-   **RF04 -- Controle de acesso por permissão:** restringir
    funcionalidades por papel.
-   **RF05 -- Histórico de atendimentos:** armazenar todas as consultas
    realizadas.

## Requisitos Não Funcionais (RNF)

-   **RNF01 -- Segurança:** autenticação JWT, criptografia e controle de
    acesso.
-   **RNF02 -- Usabilidade:** interface simples, intuitiva e
    responsiva.
-   **RNF03 -- Escalabilidade:** arquitetura preparada para múltiplas
    unidades.
-   **RNF04 -- Disponibilidade:** funcionamento 24/7 e tolerância a
    falhas.
-   **RNF05 -- Integridade dos dados:** consistência e proteção contra
    alterações indevidas.
-   **RNF06 -- Compatibilidade:** funcionamento nos principais
    navegadores.
-   **RNF07 -- Manutenção:** boas práticas e separação de
    responsabilidades.

# Modelagem e Arquitetura

Na imagem abaixo é possível ver o diagrama UML:

![UML](./assets/uml.png)

# Implementação

O projeto foi desenvolvido com um conjunto de módulos bem definidos,
envolvendo:

-   modelos,
-   rotas,
-   controladores,
-   componentes,
-   hooks,
-   banco de dados,
-   e outras camadas da aplicação.

Usuários para teste:

-   **email:** role | **senha:** 123456 
-   **email:** medico01 | **senha:** 123456 
-   **email:** medico02 | **senha:** 123456

Segue abaixo alguns prints tirados do sistema:

- Perfil Admin: 
![Print 01](./assets/print01.PNG)

- Perfil Admin: 
![Print 02](./assets/print02.PNG)

- Perfil Admin: 
![Print 03](./assets/print03.PNG)

- Perfil Médico: 
![Print 04](./assets/print04.PNG)

- Perfil Admin: 
![Print 05](./assets/print05.PNG)

- Perfil Tecnico: 
![Print 06](./assets/print06.PNG)

- Perfil Médico: 
![Print 07](./assets/print07.PNG)

# Planos de Teste (Backend)

### Autenticação e Autorização

-   Testar login com credenciais válidas.
-   Rejeitar tokens inválidos ou expirados.
-   Garantir controle de acesso por roles.
-   Garantir que apenas médicos acessem prontuários.

### CRUD de Usuários, Pacientes e Profissionais

-   Criar, editar, listar e excluir registros.
-   Validar integridade e códigos de resposta da API.

# Conclusão

O desenvolvimento do SGH permitiu aplicar conhecimentos técnicos em um
cenário realista e complexo. Entre as principais lições aprendidas,
destaca-se a importância de:

-   uma arquitetura modular,
-   segurança e autenticação bem estruturadas,
-   boas práticas de desenvolvimento.

**Desafios:** controle de acesso por papéis e organização do fluxo
clínico.

**Pontos para evoluções futuras:**

-   Integração com APIs externas (laboratórios, faturamento).
-   Testes automatizados e monitoração contínua.
-   Dashboards analíticos e indicadores.
-   Suporte a múltiplas unidades.

O projeto demonstra que é possível construir uma solução sólida, segura
e escalável, com espaço claro para expansão futura.