FROM node:20-alpine AS build

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

RUN yarn build


FROM nginx:1.27.3-alpine

# Set up SSL certificates
COPY ./certs/crt.pem /etc/ssl/keys/crt.pem
COPY ./certs/key.pem /etc/ssl/keys/key.pem
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy built application from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose necessary ports
EXPOSE 80
EXPOSE 443


# Start Nginx
CMD ["nginx", "-g", "daemon off;"]