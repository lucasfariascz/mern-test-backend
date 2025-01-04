# Use uma imagem oficial do Node.js
FROM node:20.18.1

# Cria o diretório de trabalho e define permissões
WORKDIR /home/node/app

# Copie apenas os arquivos necessários para instalar dependências
COPY package*.json tsconfig.json prisma ./

# Instale as dependências de produção e desenvolvimento
RUN npm install

# Copie o código restante para o contêiner
COPY src ./src

# Gere os arquivos JavaScript (build TypeScript)
RUN npx prisma generate && npm run build

# Especifica a porta que a aplicação usa
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "dist/app.js"]