const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Board, Hashtag } = require('../models');
// const { isLoggedIn } = require('./middlewares');

const router = express.Router();

try{
    fs.readdirSync('uploads');
}catch(error){
    console.log('uploads 폴더 없음, 폴더 생성함');
    fs.mkdirSync('uploads');
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb( null, 'uploads/');
        },
        filename(req, file, cb){
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: {fileSize: 5*1024*1024},
});

router.post('/img', upload.single('img'), (req,res) => { //이미지 업로드 라우터
    console.log(req.file);
    res.json({ url:`/img/${req.file.filename}`});
});

const upload2 = multer();
router.post('/', upload2.none(), async(req, res, next) =>{ // 게시글 업로드 라우터
    try{
        const board = await Post.create({
            content: req.body.content,
            img: req.body.url,
        });
        const hashtag = req.body.content.match(/#[^\s#]+/g);
        if (hashtag){
            const result = await Promise.all(
                hashtag.map(tag => {
                    return Hashtag.findOrCreate({
                        where: { title: tag.slicke(1).toLowerCase()},
                    })
                }),
            );
            await post.addHashtags(result.map(r => r[0]));
        }
        res.redirect('/');
    } catch (error){
        console.error(error);
        next(error);
    }
});

module.exports = router;