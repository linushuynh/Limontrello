# Limontrello

[Limontrello](https://limontrello.onrender.com/) is a website inspired by [Trello](https://trello.com/home). Limontrello is a great tool for productivity and organizing tasks. Each user is able to make as many boards as they desire and within those boards they are able to make cards that can be labeled. 

Limontrello also utilizes the [React Beautiful DnD](https://github.com/atlassian/react-beautiful-dnd) package to allow users to drag and drop cards.

### Live Site: [Limontrello](https://limontrello.onrender.com/)

## ✅ Wiki Link

- [Database Schema](https://github.com/linushuynh/Limontrello/wiki/DB-Schema-1.1)
- [Feature List](https://github.com/linushuynh/Limontrello/wiki/Features-List)
- [Redux State Shape](https://github.com/linushuynh/Limontrello/wiki/Redux-Shape)
- [User Stories](https://github.com/linushuynh/Limontrello/wiki/User-Stories)

**Frameworks, Platforms and Libraries:**

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![Python](https://img.shields.io/badge/python-yellow?style=for-the-badge&logo=python&logoColor=blue) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Flask](https://img.shields.io/badge/Flask-%23404d59.svg?style=for-the-badge&logo=flask&logoColor=%2361DAFB) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![React Beautiful DnD](https://img.shields.io/badge/React_Beautiful_DnD-ff69b4?style=for-the-badge&logo=react&logoColor=69FFB4)

**Database:**

![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

**Hosting:**

![Render](https://img.shields.io/badge/Render-informational?style=for-the-badge&logo=render&logoColor=%5bdec3)

## 💻 Run Limontrello on Local

Clone the project

```bash
git clone https://github.com/linushuynh/Limontrello.git
```

Install dependencies

```bash
cd react-app
npm install
cd ..
pipenv install -r requirements.txt
pipenv run
flask db upgrade
flask seed all
```

Setup the Environment Variables

To run this project, you will need to add a .env file in the root of your directory
To do this, duplicate(copy/paste) the **.env.example** file in the root directory then rename the copy to **.env**
Make sure the SECREY_KEY, DATABASE_URL, and SCHEMA are the same.

Start the backend of the server

```bash
pipenv run flask run
```

Open another terminal window(make sure you're in the root directory) then run 

```bash
cd react-app
npm start
```

**Then you can visit localhost:3000 to view your local version of Limontrello!**
