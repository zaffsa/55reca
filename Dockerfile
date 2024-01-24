# Escolha a versão específica do Node.js que você precisa
FROM node:21
WORKDIR /app
# Copiar package.json e package-lock.json (se disponível)
COPY package*.json .

# Instalar as dependências do projeto

RUN npm install
RUN npm rebuild bcrypt 

# Copiar os arquivos da aplicação para o container
COPY . .

EXPOSE 8080


CMD node index.js
