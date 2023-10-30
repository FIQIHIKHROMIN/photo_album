const request = require("supertest");
const app = require("../app");
const { Photo, User } = require("../models");
const { createUser, generateTokenTesting, createPhoto } = require("./testing");

const dataPhoto = {
    title: "photo 1",
    caption: "komentar photo 1",
    image_url: "photo1.jpg"
};


let token;

describe("POST /photos", () => {
    beforeAll(async () => {
        const user = await createUser();
        token = await generateTokenTesting(user);
    });
    it('should create photo success (201)', (done) => {
        request(app)
            .post('/photos')
            .send(dataPhoto)
            .set({ Authorization: token })
            .expect(201)
            .end((err, res) => {
                if (err) done(err);

                expect(res.body).toHaveProperty("title");
                expect(res.body).toHaveProperty("caption");
                expect(res.body).toHaveProperty("image_url");
                done();
            });
    });

    it('should be error no auth (401)', (done) => {
        request(app)
            .post('/photos')
            .send(dataPhoto)
            .set({ Authorization: ' '})
            .expect(401)
            .end((err, res) => {
                if (err) done(err);
                expect(res.body).toBe('Token not provided!');
                done();
            });
    });

    afterAll(async () => {
        try {
            await User.destroy({ where: {} });
            await Photo.destroy({ where: {} });
        } catch (error) {
            console.log(error);
        }
    });
});

// test untuk get All photo
describe("GET /photos", () => {
    beforeAll(async () => {
        const user = await createUser();
        token = await generateTokenTesting(user);
        await createPhoto("photo 1", user.id, 1);
        await createPhoto("photo 2", user.id, 2);
        await createPhoto("photo 7", user.id, 5);
        await createPhoto("photo 8", user.id, 4);
    });
    it('should be get photo success(200)', (done) => {
        request(app)
            .get('/photos')
            .set({ Authorization: token })
            .expect(200)
            .end((err, res) => {
                if (err) done(err);
                expect(res.body).toHaveLength(4);
                expect(res.body[0]).toHaveProperty("User");
                expect(res.body[0]).toHaveProperty("UserId");
                expect(res.body[0]).toHaveProperty("title");
                done();
            });
    });

    it('should be error no auth (401)', (done) => {
        request(app)
            .post('/photos')
            .set({ Authorization: '' })
            .expect(401)
            .end((err, res) => {
                if (err) done(err);
                expect(res.body).toBe('Token not provided!');

                console.log(res.body);
                done();
            });


    });

    afterAll(async () => {
        try {
            await User.destroy({ where: {} });
            await Photo.destroy({ where: {} });
        } catch (error) {
            console.log(error);
        }
    });
});


// test untuk get Photo by id
describe("GET /photos/:id", () => {
    beforeAll(async () => {
        const user = await createUser();
        token = await generateTokenTesting(user);
        await createPhoto("photo 1", user.id, 1);
        await createPhoto("photo 2", user.id, 2);
    });
    it('should be get photo success(200)', (done) => {
        request(app)
            .get('/photos/1')
            .set({ Authorization: token })
            .expect(200)
            .end((err, res) => {
                if (err) done(err);
                expect(res.body.title).toBe("photo 1");
                expect(res.body).toHaveProperty("UserId");
                done();
            });
    });

    it('should be not found (404)', (done) => {
        request(app)
            .get('/photos/4')
            .set({ Authorization: token })
            .expect(404)
            .end((err, res) => {
                if (err) done(err);
                expect(res.body).toBe('Data not found!');
                done();
            });
    });

    afterAll(async () => {
        try {
            await User.destroy({ where: {} });
            await Photo.destroy({ where: {} });
        } catch (error) {
            console.log(error);
        }
    });
});