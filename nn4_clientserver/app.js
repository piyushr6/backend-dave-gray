const express = require('express');

//express app
const app = express();

//register vire engine
app.set('view engine', 'ejs');


//listen for requests
app.listen(3000);

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

