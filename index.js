import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";

import { registerValidation, loginValidation, postCreateValidation } from "./validations.js";

import { checkAuth, handleValidationErrors } from "./utils/index.js";

import { UserControllers, PostControllers } from './controllers/index.js';

mongoose
    .connect('mongodb+srv://root:4444@cluster0.vtvolef.mongodb.net/blog')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err));

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.post('/auth/login', loginValidation, handleValidationErrors, UserControllers.login);
app.post('/auth/register', registerValidation, handleValidationErrors, UserControllers.register);
app.get('/auth/me', checkAuth, UserControllers.getMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    });
});

app.get('/posts', PostControllers.getAll);
app.get('/tags', PostControllers.getLastTags);
app.get('/posts/:id', PostControllers.getOne);
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostControllers.create);
app.delete('/posts/:id', checkAuth, PostControllers.remove);
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostControllers.update);

app.listen(4444, (err) => {
    if (err) {
        console.log(err);
    }
    console.log('Server is started');
});