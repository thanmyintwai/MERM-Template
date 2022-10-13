const passport = require('passport')

module.exports = (app) =>{

    app.get('/auth/google',passport.authenticate('google',  {
          scope: ['profile', 'email'],
          /* session: false */
        })
      );

    app.get(
      '/auth/google/callback', 
      //middle ware 1
      passport.authenticate('google', /* {session: false} */), 
      //middle ware 2
      (req, res)=>{
        //console.log('google callback is called')
        //res.redirect('/api/current_user')
        res.redirect('/surveys')
    })

    app.get('/api/logout', (req, res, next)=>{
      
      req.logout();
      res.redirect('/')
      //res.redirect('/') 
    })
    
    app.get('/api/current_user',(req, res)=>{
      if(!req.user){
          res.send({isLogIn: false })
      }
      //data extracted from cookie
      //res.send(res.session)
        
        res.send({...req.user['_doc'], isLogIn: true})
    })



}