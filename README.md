# Twitch Clone
The goal of this project is to make a copy of a popular streaming website, Twitch.

# Motivation
This was a final project from an Udemy course, Modern React with Redux by Stephen Grider. The purpose of the course was to introduce concepts of React and Redux without going into deep details of back-end development. The application used OAuth for user authentication and a third-party library to handle REST API's without having to build a server to post and fetch data from a database.

I wanted to expand my understanding of the core concepts of the course by adding extra features that weren't previously in the project. In addition, I wanted to learn more about back-end development, so I decided to remove the third-party library that dealt with the back-end and build my own. Some of the features I have added so far includes:

- On each stream, any user of the web application can post comments that updates in real-time.
- Using a different library to handle authentication such as Auth0. Once the user is authenticated, some of the data is stored into the local storage of the browser and a database that ran on my machine. The purpose for this is to set a session for each user of the web application.
- Developed a server with Node and Express and wrote REST API's to handle all CRUD operations that involve users, streams and comments.
- The project did not make use of any database schemas, so I developed tables for users, streams and comments. The database I chose to use for this project is PostgreSQL.
- The ability to comment on comments, i.e. being able to handle levels of nested comments. To do this, I developed a K-nary tree component in React.

# Pending Features
- A user profile page to update personal information
- A search feature to find users and streams
- On the front page of the web application to display the streams in order of highest engagement based on the number of comments
- Administrative abilities, being able to notify users of violations and deleting users streams
- Refactor code using a microservice architecture
- Using Docker for containerization and Kubernetes to orchestrate the containers
- Hosted on AWS or Azure

# Technology Stack
- React
- Redux
- Node.js & Express.js
- PostgreSQL
- Docker & Kubernetes

# Learning Outcome
