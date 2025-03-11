const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blogs')

//express app
const app = express();

//connect to mongodb
const dbURI = 'mongodb+srv://piyushrathi06:FvpflzVrvYe69c5m@nodetut.jbqaa.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=nodetut'

mongoose.connect(dbURI)
   .then((result) => {
      app.listen(3000);
      console.log('connected to db');
   })
   .catch((err) => console.log(err));

//register vire engine
app.set('view engine', 'ejs');


//listen for requests


// app.use((req, res, next) => {
//    console.log('new request made:');
//    console.log('host :', req.hostname);
//    console.log('path :', req.path);
//    console.log('method :', req.method);
//    next();
// });
//browser hangs here does not load page. we need next()
// app.use(morgan('tiny'));

app.get('/add-blog', (req, res) => {
   const blog = new Blog({
      title: 'new blog',
      snippet: 'about my blog',
      body: 'more about my new blog'
   });

   blog.save()
      .then((result) => {
         res.send(result)
      })
      .catch((err) => {
         console.log(err);
      });
});

app.get('/all-blogs', (req, res) => {
   Blog.find()
      .then(result => {
         res.send(result);
      })
      .catch(err => {
         console.log(err);
      });
});

app.get('/single-blog', (req, res) => {
   Blog.findById('5ea99b49b8531f40c0fde689')
      .then(result => {
         res.send(result);
      })
      .catch(err => {
         console.log(err);
      });
});

app.get('/blogs', (req, res) => {
   Blog.find().sort({ createdAt: -1 })
      .then(result => {
         res.render('index', { blogs: result, title: 'All blogs' });
      })
      .catch(err => {
         console.log(err);
      });
});


//middleware and static files
app.use(express.static('public'));
app.use(morgan('dev'));



app.get('/', (req, res) => {
   // res.send('<p>Homepage</p>');
   // res.sendFile('./views/index.html', { root: __dirname });

   //blogs : blogs === blogs

   const blogs = [
      { title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur' },
      { title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur' },
      { title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur' },
   ];

   res.render('index', { title: 'Home', blogs });

});


app.get('/about', (req, res) => {
   // res.send('<p>about</p>');
   // res.sendFile('./views/about.html', { root: __dirname });
   res.render('about', { title: 'About' });
});


app.get('/blogs/create', (req, res) => {
   res.render('create', { title: 'Home' });
});


//redirects
app.get('/about-us', (req, res) => {
   res.redirect('/about', { title: 'About' });
});

//404 page
app.use((req, res) => {
   res.status(404).render('404', { title: '404' });
});

