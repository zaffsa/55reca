# Escolha a versão específica do Node.js que você precisa
FROM node:20
WORKDIR /usr/src/app
# Copiar package.json e package-lock.json (se disponível)
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install

# Copiar os arquivos da aplicação para o container
COPY . .

EXPOSE 8080


CMD ["node", "index.js"]
