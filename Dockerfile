ARG NODE_RELEASE=14.15.4

FROM node:${NODE_RELEASE}-alpine AS build

ARG NODE_RELEASE

ENV CYPRESS_INSTALL_BINARY=0

RUN echo "Node $(node -v) / NPM v$(npm -v)"

WORKDIR /home/node

COPY ./package*.json ./

RUN npm ci

COPY ./tsconfig.json .
COPY ./client ./client
COPY ./server ./server

RUN npm run build

FROM node:${NODE_RELEASE}-alpine

ARG NODE_RELEASE

LABEL maintainer="Jonathan Sharpe"

WORKDIR /home/node

COPY --from=build /home/node/package*.json ./

ENV NODE_ENV=production
ENV PORT=80

RUN npm ci

COPY --from=build /home/node/dist ./dist

EXPOSE 80

ENTRYPOINT [ "npm" ]

CMD [ "start" ]
