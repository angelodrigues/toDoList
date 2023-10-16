# FROM ubuntu:latest AS build

# RUN apt-get update
# RUN apt-get install openjdk-21-jdk -y

# COPY . . 

# RUN apt-get install maven -y
# RUN mvn clean install

# FROM openjdk:21-jdk-slim

# EXPOSE 8080

# COPY --from=build /target/todolist-1.0.0.jar app.jar

# ENTRYPOINT ["java","-jar", "app.jar"]
# Estágio de compilação
FROM openjdk:17-jdk AS build

WORKDIR /app

COPY . .

RUN apt-get update
RUN apt-get install -y maven
RUN mvn clean install

# Estágio de execução
FROM openjdk:17-jdk-slim

WORKDIR /app

EXPOSE 8080

COPY --from=build /app/target/todolist-1.0.0.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]
