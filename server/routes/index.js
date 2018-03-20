var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

var sequelize = new Sequelize('test', 'root', '', {
  host: "127.0.0.1",
  dialect: 'mysql',
  port: 3306
})

var Content = sequelize.define('rtf', {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  content: {
    type: Sequelize.STRING(10000000000000),
  }
}, {
  operatorsAliases: false,
  freezeTableName: true // Model 对应的表名将与model名相同
});

router.post('/test',(req,res,next)=>{
  console.log('----------');
  let content = req.body.content;
  console.log(req.body.content);
  Content.sync({force: true}).then(function () {
    return Content.create({
      content: content
    });
  });
})

module.exports = router;
