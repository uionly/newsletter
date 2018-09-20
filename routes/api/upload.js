var express = require('express');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');
var path = require('path');
var singleUpload = multer();
var async  = require('async');
var uuid = require('uuid');
var empty = require('empty-folder');
var Newsletter = require('../../models/newsletter');
var logoImg;
var headerImg;
var industryImages = [];
var highlightsImages = [];
var eventsImages = [];
var logoStorage = multer.diskStorage({ //multers disk storage settings
  destination: function (req, file, cb) {
      cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
      var datetimestamp = Date.now();
      console.log(file)
      logoImg = 'logo.'+file.originalname.split('.')[file.originalname.split('.').length -1]
      // cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
      cb(null, 'logo.'+file.originalname.split('.')[file.originalname.split('.').length -1])
  }
});
var headerStorage = multer.diskStorage({ //multers disk storage settings
  destination: function (req, file, cb) {
      cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
      var datetimestamp = Date.now();
      console.log(file)
      // cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
      headerImg = 'header.'+file.originalname.split('.')[file.originalname.split('.').length -1]
      cb(null, 'header.'+file.originalname.split('.')[file.originalname.split('.').length -1])
  }
});

var industryWatchStorage = multer.diskStorage({ //multers disk storage settings
  destination: function (req, file, cb) {
      cb(null, './uploads/industryWatch/');
  },
  filename: function (req, file, cb) {
      var datetimestamp = Date.now();
      console.log(file);
      

      if (!fs.existsSync(__dirname+'/../../uploads/industryWatch')){
          fs.mkdirSync(__dirname+'/../../uploads/industryWatch');
      }
      //fs.mkdirSync(__dirname+'/../../uploads/industryWatch')
      fs.readdir(__dirname+'/../../uploads/industryWatch', function(err, files){
        console.log('length',files.lenth);
        // cb(null, 'header-'+datetimestamp+'.'+file.originalname.split('.')[file.originalname.split('.').length -1])
        if(files.length){
          console.log('other image')
          files.forEach(function(elem, i){
            console.log(file)
            var index = i+1;
            industryImages.push('header-'+index+'.'+file.originalname.split('.')[file.originalname.split('.').length -1])
            cb(null, 'header-'+index+'.'+file.originalname.split('.')[file.originalname.split('.').length -1])
          })
        }else{
          console.log('first image');
          industryImages.push('header-0'+'.'+file.originalname.split('.')[file.originalname.split('.').length -1])
          cb(null, 'header-0'+'.'+file.originalname.split('.')[file.originalname.split('.').length -1])
        }

      })
     
  }
});

var highlightsStorage = multer.diskStorage({ //multers disk storage settings
  destination: function (req, file, cb) {
      cb(null, './uploads/highlights/');
  },
  filename: function (req, file, cb) {
      var datetimestamp = Date.now();
      console.log(file);
      

      if (!fs.existsSync(__dirname+'/../../uploads/highlights')){
          fs.mkdirSync(__dirname+'/../../uploads/highlights');
      }
      //fs.mkdirSync(__dirname+'/../../uploads/industryWatch')
      fs.readdir(__dirname+'/../../uploads/highlights', function(err, files){
        console.log('length',files.lenth);
        // cb(null, 'header-'+datetimestamp+'.'+file.originalname.split('.')[file.originalname.split('.').length -1])
        if(files.length){
          console.log('other image')
          files.forEach(function(elem, i){
            console.log(file)
            var index = i+1;
            highlightsImages.push('header-'+index+'.'+file.originalname.split('.')[file.originalname.split('.').length -1])
            cb(null, 'header-'+index+'.'+file.originalname.split('.')[file.originalname.split('.').length -1])
          })
        }else{
          console.log('first image');
          highlightsImages.push('header-0'+'.'+file.originalname.split('.')[file.originalname.split('.').length -1])
          cb(null, 'header-0'+'.'+file.originalname.split('.')[file.originalname.split('.').length -1])
        }

      })
     
  }
});

var eventsStorage = multer.diskStorage({ //multers disk storage settings
  destination: function (req, file, cb) {
      cb(null, './uploads/events/');
  },
  filename: function (req, file, cb) {
      var datetimestamp = Date.now();
      console.log(file);
      

      if (!fs.existsSync(__dirname+'/../../uploads/events')){
          fs.mkdirSync(__dirname+'/../../uploads/events');
      }
      //fs.mkdirSync(__dirname+'/../../uploads/industryWatch')
      fs.readdir(__dirname+'/../../uploads/events', function(err, files){
        console.log('length',files.lenth);
        // cb(null, 'header-'+datetimestamp+'.'+file.originalname.split('.')[file.originalname.split('.').length -1])
        if(files.length){
          console.log('other image')
          files.forEach(function(elem, i){
            console.log(file)
            var index = i+1;
            eventsImages.push('header-'+index+'.'+file.originalname.split('.')[file.originalname.split('.').length -1])
            cb(null, 'header-'+index+'.'+file.originalname.split('.')[file.originalname.split('.').length -1])
          })
        }else{
          eventsImages.push('header-0'+'.'+file.originalname.split('.')[file.originalname.split('.').length -1])
          cb(null, 'header-0'+'.'+file.originalname.split('.')[file.originalname.split('.').length -1])
        }

      })
     
  }
});

var uploadLogo = multer({ //multer settings
  storage: logoStorage
}).single('file');
// var uploadLogo = multer({dest: './uploads'}).single('logo');
var uploadHeader = multer({storage: headerStorage}).single('file');
var industryWatch = multer({storage: industryWatchStorage}).single('file');
var highlightsImg = multer({storage: highlightsStorage}).single('file');
var eventsImg = multer({storage: eventsStorage}).single('file');

var PDFDocument = require('pdfkit');

function generatePDF(headerImg, data, cb){
  let title = data.header.title;
  let edition = data.header.edition;
  let firstSectionName = data.firstSectionName || "Industry Watch";
  var firstSections = data.IndustryWatch;
  var upcomingEventsSection = data.UpcomingEvents;
  console.log(firstSections)
  var doc = new PDFDocument()
  var pdfName = Date.now()+'.pdf'
  doc.pipe(fs.createWriteStream('./pdf/'+pdfName));
  // doc.text('Fit', 320, 0);
  // doc.end()


  function getDate(){
    var month = new Date().getMonth();
    var year = new Date().getFullYear()
    var monthStr;
    switch(month){
      case 0:
        monthStr = "Jan";
        break;
      case 1:
        monthStr = "Feb";
        break;
      case 2:
        monthStr = "March";
        break;
      case 3:
        monthStr = "Apr";
        break;
      case 4:
        monthStr = "May";
        break;
      case 5:
        monthStr = "June";
        break;
      case 6:
        monthStr = "July";
        break;
      case 7:
        monthStr = "Aug";
        break;
      case 8:
        monthStr = "Sep";
        break;
      case 9:
        monthStr = "Oct";
        break;
      case 10:
        monthStr = "Nov";
        break;
      case 11:
        monthStr = "Dec";
      case 12:
        monthStr = "Dec";

    }

    return monthStr+' '+year
  }







async.series([
function(callback){
console.log('***************');
console.log(firstSections.length);
console.log("******************");
var count = firstSections.length;

  console.log('in async');
  doc.image(__dirname+'/../../uploads/header.jpg', 0, 0, {width:1200, height:330})
  doc.fontSize(15)
  doc.fill('black')
  doc.text('Edition: '+edition, 580, 20)
  doc.fontSize(15)
  doc.fill('black')
  doc.text(getDate(), 720, 20)
  doc.fontSize(50)
  doc.fill('#b539fd')
  doc.font('Helvetica')
  doc.text(title, 20, 260)
 
  doc.fontSize(30)
  doc.fill('black')
  doc.text(firstSectionName, 20, 360, {align:'center'})
  doc.moveTo(20, doc.getY()-15)    
  doc.lineTo(300, doc.getY()-15)
  doc.fillAndStroke("red", "#dcdcdc")
  doc.moveTo(530, doc.getY()-15)    
  doc.lineTo(870, doc.getY()-15)
  doc.fillAndStroke("red", "#dcdcdc")
  firstSections.forEach(function(elem){
    //section 1
    doc.moveDown()
    doc.fontSize(18)
    doc.fill('#972624')
    doc.text(elem.title)
    doc.image("lighthouse.jpg",{width:860, height:250})
    doc.fontSize(12)
    doc.text(' ')
    doc.fontSize(12)
    doc.fill('black')
    doc.text(elem.desc)
    doc.moveDown()
    doc.fontSize(12)

    doc.text('WATCH ONLINE', 25, doc.getY(), {link:elem.link})
    doc.text('', 20, doc.getY())

    var pos1 = doc.getY();
    doc.rect(20, pos1-20, 120, 20)
    doc.stroke()
    doc.moveDown();
    count --;
    if(count === 0){
      callback();
    }

});
//allback();
},
function(callback){
  console.log('in second ')
//  Highlights
doc.fontSize(30)
doc.fill('black')
doc.text('Highlights', {align:'center'})
doc.moveTo(20, doc.getY()-15)    
doc.lineTo(300, doc.getY()-15)
doc.fillAndStroke("red", "#dcdcdc")
doc.moveTo(530, doc.getY()-15)    
doc.lineTo(875, doc.getY()-15)
doc.fillAndStroke("red", "#dcdcdc")
doc.moveDown();



doc.image('lighthouse.jpg',{width:400, height:200})
doc.text(' ')
var img1pos = doc.getY();
doc.image('lighthouse.jpg',500, img1pos-233,{width:380, height:200})
var hightlight1Pos = doc.getY();
doc.fill('black')
doc.fontSize(15)
doc.text("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", {width:360})

doc.text("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", 500, hightlight1Pos-0, {width:360})
var hightlight1PosLast = doc.getY();
doc.text(' ', 0, hightlight1PosLast)

//Upcoming Events
var eventsArr = [
  { title: 'test1', img: 'lighthouse.jpg',desc: 'test1',  link: 'http://youtube.com/1' },
  { title: 'test2', img: 'lighthouse.jpg',desc: 'test2',  link: 'http://youtube.com/1' },
  { title: 'test3', img: 'lighthouse.jpg',desc: 'test3',  link: 'http://youtube.com/1' }
]
doc.fontSize(30)
doc.fill('black')
doc.text("Upcoming Events",  {align:'center'})
doc.moveTo(20, doc.getY()-15)    
doc.lineTo(300, doc.getY()-15)
doc.fillAndStroke("red", "#dcdcdc")
doc.moveTo(530, doc.getY()-15)    
doc.lineTo(875, doc.getY()-15)
doc.fillAndStroke("red", "#dcdcdc")
var upcomingPos = doc.getY();
doc.text(' ', 20, upcomingPos)
upcomingEventsSection.forEach(function(elem){
  doc.moveDown()
  doc.fontSize(18)
  doc.fill('#972624')
  doc.text(elem.title)
  doc.image("lighthouse.jpg",{width:860, height:250})
  doc.fontSize(12)
  doc.text(' ')
  doc.fontSize(12)
  doc.fill('black')
  doc.text(elem.desc)
  doc.moveDown()
  doc.fontSize(12)
  doc.text('WATCH ONLINE', 25, doc.getY(), {link:elem.link})
  doc.text('', 20, doc.getY())

  var pos1 = doc.getY();
  doc.rect(20, pos1-20, 120, 20)
  doc.stroke()


});



  doc.end();
  callback()
}



],function(err){
  if(err){
    console.log(err);
    return;
  }
  //console.log(err);
  console.log('genergting...')
  cb('/pdf/'+pdfName);
})




   
}


router.post('/upload', function(req, res, next) {
    var path = '';
    console.log(req.file)
    upload(req, res, function (err) {
       if (err) {
         // An error occurred when uploading
         console.log(err);
         return res.status(422).send("an Error occured")
       }  
       path = req.file.path;
       console.log(path)
       fs.rename(path, 'uploads/header.jpg', function(err){
           if(!err){
               console.log('name changed!!')
           }
       })
       return res.send("Upload Completed for "+path); 	 
   });
  
})

router.post('/generatePDF',function(req, res, next){
  console.log(req.body);
  var fakeBody = {
    header:{
     title:"UI/UX DEVELOPER",
           edition: "12",
           headerImg: "C:\\fakepath\\header.jpg"
    },
    IndustryWatch:[
      {
        title:"test1",
        desc:"Lorem Ipsum",
        link:"http://google.com",
        img:"C:\\fakepath\\header.jpg"
      }
    ],
    Highlights:[
      {
      img:"C:\\fakepath\\header.jpg",
     desc:"Lorem Ipsum"
      },
      {
      img:"C:\\fakepath\\header.jpg",
     desc:"Lorem Ipsum"
      }
    ],
    UpcomingEvents:[
      {
        title:"test1",
        desc:"Lorem Ipsum",
        link:"http://google.com",
        img:"C:\\fakepath\\header.jpg"
      }
    ],
   }
    generatePDF("headerImg", fakeBody, function(pdf){
      console.log(pdf)
      res.send({success:true, data: pdf})
    });

})

router.post('/logo', function(req, res){
  uploadLogo(req, res, function(err){
    res.send({msg:'logo uploaded...'})
  })
})
router.post('/header', function(req, res){
  uploadHeader(req, res, function(err){
    res.send({msg:'header uploaded...'})
  })
})

router.post('/industryWatch', function(req, res){
  industryWatch(req, res, function(err){
    res.send({msg:'industryHeader uploaded...'})
  })
})

router.post('/highlights', function(req, res){
  highlightsImg(req, res, function(err){
    res.send({msg:'highlights uploaded...'})
  })
})

router.post('/events', function(req, res){
  eventsImg(req, res, function(err){
    res.send({msg:'highlights uploaded...'})
  })
})

router.post('/save', function(req, res){
  var data = req.body;
  delete data.header.logo;
  delete data.header.headerImg;

  var id = uuid();
  console.log(id)
  
  fs.mkdirSync(__dirname+'/../../newsletters/'+id);

  fs.readdir(__dirname+'/../../uploads/', function(err, files){
    console.log(files)
    if(err){
      console.log(err);
    }else{
      files.forEach(function(file){
        var fromPath = path.join(__dirname+'./../../uploads/', file);
        var toPath = path.join(__dirname+'/../../newsletters/'+id, file)
        fs.stat(fromPath, function(err, stat){
          if(stat.isFile()){
            console.log( "'%s' is a file.", fromPath );
          }else if(stat.isDirectory()){
            console.log( "'%s' is a directory.", fromPath );
          }
          fs.rename(fromPath, toPath, function(err){
            if(err) throw err;
            console.log('successfully moved')
          })
        })
      })


    }
  })
  var exposedPath ='/newsletters/'+id;
  console.log(industryImages);
  console.log(highlightsImages);
  console.log(eventsImages);
  data.UpcommingEvents.forEach((elem,i) => {
    delete elem.eimage;
    elem.title = elem.eheading;
    delete elem.eheading;
    elem.desc = elem.edesc;
    delete elem.edesc;
    elem.Img = exposedPath+'/events/'+eventsImages[i];
    elem.date = elem.efromdate;
    delete elem.efromdate;
    elem.venue = elem.evenue;
    delete elem.evenue;
    elem.link = elem.elink;
    delete elem.elink;
  });
  data.highlights.forEach((elem,i) => {
    delete elem.hlightImages;
    elem.desc = elem.hlightDesc;
    delete elem.hlightDesc;
    elem.Img = exposedPath+'/highlights/'+highlightsImages[i];
  });
  data.industryWatch.forEach((elem,i) => {
    delete elem.sec_img;
    elem.title = elem.sec_heading;
    delete elem.sec_heading;
    elem.desc = elem.sec_desc;
    delete elem.sec_desc;
    elem.link = elem.sec_link;
    delete elem.sec_link;
    elem.Img = exposedPath+'/industryWatch/'+industryImages[i];
  });

  var payload = {
    date: data.header.currentDate,
    headerTitle : data.header.title,
    edition : data.header.edition,
    headerLogo: exposedPath+'/'+logoImg,
    headerBanner:exposedPath+'/'+headerImg,
    IndustryWatch:data.industryWatch,
    Highlights:data.highlights,
    UpcomingEvents:data.UpcommingEvents,
    footer:data.footerText
  }
  var newsletter = new Newsletter(payload);
  newsletter.save(function(err, newsletter){
    if(!err){
      res.send({success:true, message:'successfully saved...'})
    }else{
      res.send({success:false, message:err})
    }
  })

  //res.send({data:data, path:exposedPath})
})

router.get('/view', function(req, res){
  console.log('finding..')
  Newsletter.find({}, function(err, newsletters){
    res.send({success:true, data:newsletters})
  })
})

router.get('/remove', function(req, res){
  empty(__dirname+'/../../uploads/', false, (o)=>{
    if(o.error) console.error(err);
    res.send({success:true, msg:'directory removed...'})
    //console.log(o.removed);
    //console.log(o.failed);
  });
})


module.exports = router;