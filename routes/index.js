
var View = require("../controller/view");
var User = require("../controller/user");
var Search = require("../controller/search");
var Admin = require("../controller/admin");
var Comment = require("../controller/comment");

module.exports = function(app) {

 //用户退出登录
app.get('/logout', checkLogin);
app.get('/logout', User.logout);
//用户请求登录
app.post('/login', checkNotLogin);
app.post('/login', User.loginPost);
//请求注册
app.post('/register', checkNotLogin);
app.post('/register', User.registerPost);

//相关查询
app.get('/search',Search.searchKey);
app.get('/u/:name',Search.searchUser);
app.get('/tags/:tag',View.tagList);

//首页
app.get('/',View.index);
//用户跳转登录
app.get('/login', checkNotLogin);
app.get('/login', View.login);
//跳转注册页面
app.get('/register', checkNotLogin);
app.get('/register', View.register);

app.get('/links', View.links);


app.get('/list',View.list);

app.get('/tags',View.tags);

app.get('/admin', checkLogin);
app.get('/admin', View.admin);


app.get('/admin/post', checkLogin);
app.get('/admin/post', View.article);

app.post('/admin/post', checkLogin);
app.post('/admin/post',View.articlePost);

app.get('/upload', checkLogin);
app.get('/upload',View.upload );

app.post('/upload', checkLogin);
app.post('/upload', View.uploadPost);

app.get('/archive', View.archive);

app.get('/u/:name/:day/:title',View.detail);

app.post('/u/:name/:day/:title',Comment.comment );

app.get('/edit/:name/:day/:title', checkLogin);
app.get('/edit/:name/:day/:title', View.editPost);

app.post('/edit/:name/:day/:title', checkLogin);
app.post('/edit/:name/:day/:title', User.editPost);


app.get('/remove/:name/:day/:title', checkLogin);
app.get('/remove/:name/:day/:title', User.removeAticle);



// 404页面
  app.use(function (req, res) {
    res.render("home/common/404");
  });

  // 检测是否登录限制访问页面
   function checkLogin(req, res, next) {
    if (!req.session.user) {
      req.flash('error', '未登录!'); 
      res.redirect('/login');
    }
    next();
  }

  function checkNotLogin(req, res, next) {
    if (req.session.user) {
      req.flash('error', '已登录!'); 
      res.redirect('back');
    }
    next();
  }


};
