const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const app = express();
app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
  name: 'session-cookie',
}));

const multer = require('multer');
const fs = require('fs');


//폴더 없으면 생성
try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}

//multer 인수 설정
const upload = multer({
    //storage : 어디에 저장할 것인가?
  storage: multer.diskStorage({
      //req => 요청에 대한 정보,
      //file => 업로드 파일 정보
      // done => 함수(첫번째 인수에는 에러, 두번째는 실제 경로나 파일 이름) 앞 두 파라미터를 가공하여 done에 넘기는 형식
    destination(req, file, done) {
      done(null, 'uploads/');
    },

    // 파일 확장자와 이름 결정
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});
app.get('/upload', (req, res) => {
  res.sendFile(path.join(__dirname, 'multipart.html'));
});

// app.post('/upload', upload.single('image'), (req, res) => {
//   console.log(req.file);
//   res.send('ok');
// });

//upload.fields를 라우터 미들웨어 앞에 넣어두면 설정에 따라 생성 후 req.file 객체 생성 인수는 input 태그의 name이나 form 데이터의 키와 일치하면 된다.
// 업로드 성공 결과는 req.file 객체 안에 들어있고, req.body는 해당 타이틀이 들어가있음
app.post('/upload',
    upload.fields([{name:'image1'},{name:'image2'}]),
    (req,res)=>{
        console.log(req.files,req.body);
        res.send('ok');
    });

app.get('/', (req, res, next) => {
  console.log('GET / 요청에서만 실행됩니다.');
  next();
}, (req, res) => {
  throw new Error('에러는 에러 처리 미들웨어로 갑니다.')
});
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});