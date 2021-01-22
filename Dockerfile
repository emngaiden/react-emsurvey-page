FROM node:14.15.4
WORKDIR /src
ENV PATH /node_modules/.bin:$PATH
COPY . .
RUN npm install && npm cache clean --force

EXPOSE 80

CMD ["npm", "start"]