FROM node:12


RUN ln -fs /usr/share/zoneinfo/Asia/Bangkok /etc/localtime
RUN dpkg-reconfigure -f noninteractive tzdata

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

RUN npm install pm2 -g

RUN npm install randomstring

COPY --chown=node:node . .

EXPOSE 3000

CMD [ "node", "server.js", "pm2-runtime" ]


