const { User, Photo } = require("../models");
const { generateToken } = require("../utils/jwt");

const dataUser = {
    username: "test",
    email: "test@gmail.com",
    password: "rahasia"
};

const dataPhoto = {
    title: "photo 1",
    caption: "Ini adalah photo 1",
    image_url: "/photo/1.jpg"
};

const createUser = async () => {
    const user = await User.create(dataUser);
    return {
        id: user.id,
        email: user.email,
        username: user.username
    };
};

const createPhoto = async (title, iduser, idPhoto) => {
    await Photo.create({
        title: title,
        caption: "Ini adalah photo 1",
        image_url: "/photo/1.jpg",
        UserId: iduser,
        id: idPhoto
    });
};

const generateTokenTesting = async (user) => {
    return generateToken({
        id: user.id,
        email: user.email,
        username: user.username,
        password: user.password
    });
};

module.exports = { createUser, generateTokenTesting, createPhoto };