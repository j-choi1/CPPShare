# CPPShare

CPPShare is a website where Cal Poly Pomona students can share and download textbooks for their classes in PDF format. The project comes prefilled with only CS courses but more courses can be added. 

The database is used to store the list of courses and metadata of files. All files are stored in the `uploads` folder with a random filename.

### Frontend
* [React](https://reactjs.org/)
* [Material-UI](https://material-ui.com/)

### Backend
* [Express](https://expressjs.com/)
* [MySQL](https://www.npmjs.com/package/mysql2) using [Docker](https://www.docker.com/)

The entire project is developed using [TypeScript](https://www.typescriptlang.org/).

## Database Configuration

The `.env` file in the base directory contains the MySQL credentials. The default credentials are set according to the environment set om `docker-compose.yml`.

## Available Scripts

In the project directory, you can run:

`docker-compose up -d`

Creates Docker containers for MySQL service. Upon initialization, the database will execute SQL files in the `dbscripts` folder to initialize database tables and data. You can access phpMyAdmin, an administration tool for MySQL, at http://localhost/phpmyadmin.

### Development

* `npm run start-server`
  
  Starts the Express server under port 4000.

* `npm run start-react`

  Starts the React app under port 3000. Open http://localhost:3000 to view it in the browser.

### Production

* `npm run build-server`

  Compiles the TypeScript files in the `server` folder to plain JavaScript. Outputs to the `dist` folder.

* `npm run build-react`
  
  Builds the React app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

* `npm start`

  Runs both `npm run build-server` and `npm run build-react` scripts and will start Express server. Express will serve the static files in the `build` folder created from React.

## Screenshots

![Screen1](https://i.imgur.com/JjhJZal.png)

---

![Screen2](https://i.imgur.com/swMy2Zd.png)

---

![Screen3](https://i.imgur.com/spppEED.png)

---

![Screen4](https://i.imgur.com/x2vDdJX.png)