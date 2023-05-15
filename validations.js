import { body } from "express-validator";

export const loginValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Минимальная длина пароля 5 симолов').isLength({ min: 5 })
];

export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Минимальная длина пароля 5 симолов').isLength({ min: 5 }),
    body('fullName', 'Минимальная длина имени 3 символа').isLength({ min: 3 }),
    body('avatarUrl', 'Укажите верную ссылку на аватар').optional().isURL()
];

export const postCreateValidation = [
    body('title', 'Введите заголовок статьи').isLength({ min: 3 }).isString(),
    body('text', 'Введите текст статьи').isLength({ min: 3 }).isString(),
    body('tags', 'Неверный формат тэгов').optional().isString(),
    body('imageUrl', 'Неверная ссылка на изображение').optional().isString()
];