# Desenvolvimento-de-Software
Repositório referente ao projeto de CIN0136 - Desenvolvimento de Software

## PRISMA
A proposta é criar um aplicativo inclusivo para conectar pessoas neurodiversas, especialmente autistas, considerando suas dificuldades específicas. O app permitirá interações anônimas ou personalizadas, com conexões baseadas em interesses, suporte por IA e opções para conversar em diferentes níveis de conforto. O objetivo é promover amizades de forma adaptada e empática, oferecendo um espaço seguro que respeite as particularidades sociais desse público.

---
### Objetivos

- Facilitar interações entre pessoas autistas em um ambiente inclusivo e confortável.
- Disponibilizar modos de interação (como IA, anonimato e conexão por interesses) que respeitem as limitações e preferências dos usuários.
- Criar uma rede de suporte social adaptada às necessidades de indivíduos neurodiversos, promovendo o sentimento de pertencimento.

---
### Pre-requisitos:
- [Conda](https://anaconda.org/anaconda/conda)
- [Docker](https://docs.docker.com/engine/install/)

---
### Primeiros passos:
#### Windows
1. Configurando o ambiente do Manager: 
```
conda create --name prisma-manager python=3.12 --yes
conda activate prisma-manager
pip install -r ./back_end/manager/requirements.txt
```
2. Configurando a API:
```
conda create --name prisma-api python=3.12 --yes
conda activate prisma-api
pip install -r ./back_end/api/requirements.txt
```
3. Executando serviço:
No folder `back_end/compose`:
```
docker compose up --build
```
4. Testando ativamente o serviço:
No folder `back_end/test`
```
conda activate prisma-manager
python test.py
```
---
### Configurando Cloud
Instalar seguintes extensões para Google Chrome.
- [BitWarden](https://bitwarden.com/download/)
- [FlowCrypt](https://chromewebstore.google.com/detail/flowcrypt-encrypt-gmail-w/bnjglocicdkmhmoohhfkfkbbkejdhdgc)

Assim que tiver isso configurado, falar com Breno para conseguir acesso à Cloud.

---
### Configurando Protobufs
Por hora não existe uma biblioteca onde tanto Manager quanto Client possam usar os mesmos protobufs.

Caso tenha necessidade de modificar e atualizar, é preciso atualizar ambos.
Para atualizar:
1. Vá para o folder base do projeto que irá usar os protobufs. O Manager por exemplo é: `/back_end/manager/app/`
2. Execute: `python -m grpc_tools.protoc -I. --python_out=. --grpc_python_out=. .\server\proto\message.proto`

TODO: Ajustar Protobufs para que todo o projeto tenha acesso à mesma lib.