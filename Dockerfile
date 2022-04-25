FROM node:14

# Create app directory
WORKDIR /app
ADD . /app/

# global install & update
RUN node@14 yarn install

RUN rm yarn.lock
RUN rm package-lock.json
RUN yarn
RUN yarn build

ENV HOST 0.0.0.0
EXPOSE 3000

# start command
CMD [ "yarn", "dev" ]
