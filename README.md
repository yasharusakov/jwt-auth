# How to use this project

### First of all create a database use mongodb
### Сreate a .env file in server directory and add environment variables

PORT=`5000` \
DB_URL=`mongodb+srv://<username>:<password>@cluster0.nmfmq6w.mongodb.net/<project_name>?retryWrites=true&w=majority` \
JWT_ACCESS_SECRET=`jwt-secret-key` \
JWT_REFRESH_SECRET=`jwt-resfresh-secret-key` \
SMTP_HOST=`smtp.gmail.com` \
SMTP_PORT=`587` \
SMTP_USER=`YOUR EMAIL` \
SMTP_PASSWORD=`YOUR PASSWORD` \
API_URL=`http://localhost:5000` \
CLIENT_URL=`http://localhost:3000`

### Use these commands in terminal 

jwt-auth/server `npm start` \
jwt-auth/client `npm start`
