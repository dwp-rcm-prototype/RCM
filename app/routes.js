module.exports = {
  bind : function (app, assetPath) {
    app.get('/', function (req, res) {
      res.render('index',
                {'assetPath' : assetPath});
    });

    /* Example pages */
    app.get('/rcm/', function(req, res) {
      res.render('rcm/index.html', {'assetPath' : assetPath})
    });

    app.post('/rcm/step4', function(req, res) {
        res.render('rcm/step4',{
          'assetPath' : assetPath
        });
    });

    app.post('/rcm/step6', function(req, res) {
      if(req.body.radioGroup  === 'both') {
        res.render('rcm/step6',{
          'nextStep'  : 'step6a',
          'assetPath' : assetPath
        })
      }
      else if (req.body.radioGroup  === 'partner') {
        res.render('rcm/step6a',{
          'nextStep'  : 'step6a',
          'assetPath' : assetPath
        })
      } else {
        res.render('rcm/step6',{
          'nextStep'  : 'step7',
          'assetPath' : assetPath
        })
      }
    });

    app.post('/rcm/step4b', function(req, res) {
      if (req.body.radioIndentGroup === 'Yes-partner') {
        res.render('rcm/step4b',{
          'assetPath' : assetPath
        })
      } else {
        res.render('rcm/step6',{
          'nextStep'  : 'step7',
          'assetPath' : assetPath
        })
      }
    });

    app.post('/rcm/step6', function(req, res) {
      if(req.body.radioGroup  === 'both') {
        res.render('rcm/step6',{
          'nextStep'  : 'step6a',
          'assetPath' : assetPath
        })
      }
      else if (req.body.radioGroup  === 'partner') {
        res.render('rcm/step6a',{
          'nextStep'  : 'step6a',
          'assetPath' : assetPath
        })
      } else {
        res.render('rcm/step6',{
          'nextStep'  : 'step7',
          'assetPath' : assetPath
        })
      }
    });

    app.post('/rcm/step8', function(req, res) {
      if(req.body.radioGroup  === 'Yes-vehicle') {
        res.render('rcm/step8a',{
          'nextStep'  : 'step8a',
          'assetPath' : assetPath
        })
      } else {
        res.render('rcm/otherPerson',{
          'assetPath' : assetPath
        })
      }
    })

    app.post('/rcm/otherPerson', function(req, res) {
      if (req.body.radioGroup === 'another-vehicle') {
        res.render('rcm/step8a', {
          'assetPath' : assetPath
        })
      } else {
        res.render('rcm/otherPerson',{
          'assetPath' : assetPath
        })
      }
    })

    /*******************************************
    route-2 - question ordering changed
    *********************************************/
    app.post('/rcm-route2/step4b', function(req, res) {
      if (req.body.radioIndentGroup === 'Yes-partner') {
        res.render('rcm-route2/step4b',{
          'assetPath' : assetPath,
          'nextStep'  : 'step2',
        })
      } else {
        res.render('rcm-route2/step2',{
          'assetPath' : assetPath
        })
      }
    });

    app.post('/rcm-route2/step6', function(req, res) {
      if(req.body.radioGroup  === 'both') {
        res.render('rcm-route2/step6',{
          'nextStep'  : 'step6a',
          'assetPath' : assetPath
        })
      }
      else if (req.body.radioGroup  === 'partner') {
        res.render('rcm-route2/step6a',{
          'nextStep'  : 'step6a',
          'assetPath' : assetPath
        })
      } else {
        res.render('rcm-route2/step6',{
          'nextStep'  : 'step7',
          'assetPath' : assetPath
        })
      }
    });

    app.post('/rcm-route2/step8', function(req, res) {
      if(req.body.radioGroup  === 'both') {
        res.render('rcm-route2/step8',{
          'nextStep'  : 'step8a',
          'assetPath' : assetPath
        })
      }
      else if (req.body.radioGroup  === 'partner') {
        res.render('rcm-route2/step8a',{
          'nextStep'  : 'step8a',
          'assetPath' : assetPath
        })
      } else {
        res.render('rcm-route2/step8',{
          'nextStep'  : 'steps9',
          'assetPath' : assetPath
        })
      }
    })

    app.post('/rcm/step9' , function (req, res) {
      if (req.body.radioIndentGroup === 'Yes') {

          res.render('rcm/otherPerson',{
            'assetPath' : assetPath
          })
      } else {
        res.render('rcm/step9',{
          'assetPath' : assetPath
        })
      }
    })
  }
};
