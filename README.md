CURD task manager backend
-Technology: ExpressJS, Mongoose, bcrypt, Jsonwebtoken
-The app is functional to create account using email and password, save password using bycrypt hash, use jsonwebtoken for session manage, create task with some basick field title, completed and description. MongoDb save task with a owner which referance loged in user. the app can retrive task by id or all task of loged in user,user are able to edit task title, description and mark as completed or not  of his own task. User also can delete task of his won using task id.

-APIs:
app.get('/') 

router.post('auth/signup');
router.post('auth/login');

router.post('tasks/');
router.get('tasks/:id');
router.get('tasks/');
router.put('tasks/:id');
router.delete('tasks/:id');
router.get('tasks/search');

