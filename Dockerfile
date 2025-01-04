# Use uma imagem oficial do Node.js
FROM node:20.18.1

# Cria o diretório de trabalho e define permissões
WORKDIR /home/node/app

# Copie todos os arquivos necessários
COPY package*.json tsconfig.json ./
COPY prisma ./prisma/

# Instale as dependências
RUN npm install

# Copie o código fonte
COPY src ./src

# Gere os arquivos Prisma e faça o build
RUN npx prisma generate && npm run build

# Especifica a porta que a aplicação usa
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "dist/app.js"]