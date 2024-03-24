FROM node:20
WORKDIR /social-media-api
COPY package.json /social-media-api
RUN npm install
COPY . /social-media-api
CMD ["node", "index.js"]
EXPOSE 4000