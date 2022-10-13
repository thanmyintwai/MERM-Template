
const _ = require('lodash');
const { Path } = require('path-parser');
//url involves in NodeJS
const { URL } = require('url')
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin')


const Survey = mongoose.model('surveys');

module.exports = (app) =>{

    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        res.send('Thanks for voting!');
      });

    app.post('/api/surveys/webhook', (req, res)=>{
    
        const p = new Path('/api/surveys/:surveyId/:choice');

        ///......................
            res.send({})

    })
    app.post('/api/surveys', requireLogin, requireCredits, async (req, res)=>{
        const { title, subject, body, recipients } = req.body;

        try{
            res.send(user)

        } catch(error){
            res.status(402).send(error)
        }



    })

    app.get('/api/surveys', requireLogin, async (req, res) => {
        //we don't need list of recipients
        const surveys = await Survey.find({ _user: req.user.id }).select({
          recipients: false
        });
    
        res.send(surveys);
      });

}
