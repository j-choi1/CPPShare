import knex from './database';
import app from './app';
import multer from 'multer';
import fs from 'fs';
import util from 'util';
import path from 'path';

const PORT = 4000;
const renameFile = util.promisify(fs.rename);

const upload = multer({
    dest: 'uploads/',
    fileFilter(req, file, cb) {
        cb(null, file.mimetype === 'application/pdf');
    },
    limits: {
        files: 1,
    },
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.get('/courses', async (req, res) => {
    const courses = await knex('courses').orderBy('name', 'asc');

    res.json(courses);
});

app.get('/courses/:courseID/files', async (req, res) => {
    const files = await knex('files')
        .where({ course_id: req.params.courseID })
        .orderBy('upload_date', 'desc');

    res.json(files);
});

app.get('/files/:fileID/download', async (req, res) => {
    const file = await knex('files')
        .where({ course_id: req.params.fileID })
        .first();

    res.download(`${__dirname}/../uploads/${file.filename}.pdf`);
});

app.post('/upload', upload.single('file'), async (req, res) => {
    await renameFile(
        `uploads/${req.file.filename}`,
        `uploads/${req.file.filename}.pdf`
    );

    await knex('files').insert({
        course_id: req.body.course,
        comment: req.body.comment || '',
        filename: req.file.filename,
    });

    res.json({ status: 'success' });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}.`));
