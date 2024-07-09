# to-do-app

by using react and firebase service to build a dashboard web app.

# firestore collection design

I have created only one collection users for this todo app.

the document name for each user is identified by unique uid acquired by firebase authentication login response.

users/{uid}/tasks/{year}/{month}/{day}/dailyTasks 

this is the root path to my daily task, then I can easily query and manipulate my dailyTask details.


