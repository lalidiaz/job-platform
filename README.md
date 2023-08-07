### Job Tracker FullStack App -  Nodejs + Reactjs (Redux) + Mongo

**This a Job Tracker app:**
- Track your job applications.
- Save the status (interview, declined or pending).
- Add job.
- Edit job.
- Delete job. 
- See all jobs.
- Filter, paginate and sort all jobs.

**Tech stack:**
- Nodejs (Backend)
- Reactjs (Frontend)
- Mongo - Mongoose (Database)

You can test the deployed version here [job tracker app]([https://job-platform-v2.onrender.com/](https://job-tracking-fullstack-app.web.app/landing)

You can register, log in with your existing user or log in as test user with **demo** button.


**setup**
```
npm install
```

Create .env file and provide correct values

```
JWT_EXPIRES_IN=1d
JWT_SECRET=
MONGO_URI=
```

**start the backend**

```
npm run dev
```

**start the client**
```
cd client
npm run start
```
