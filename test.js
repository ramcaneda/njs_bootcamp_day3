const chai = require("chai");
const chaiHttp = require("chai-http");
const chaiThings = require("chai-things");
const fs = require("fs");
const server = require("./");
const should = chai.should();

const reviewFile = "movie_reviews.json";

chai.use(chaiHttp);
chai.use(chaiThings);

describe("Movie Reviews", () => {
  let defaultValues = [];
  let averages = {};
  before((done)=>{
    //backup file
    fs.copyFileSync(reviewFile, 'backup.json');
    done();
  });
  beforeEach((done) => {
    //reset file before every test
    defaultValues = [
      { id: 1, movie: "Holy Grail", rating: 2 },
      { id: 2, movie: "Holy Grail", rating: 5 },
      { id: 3, movie: "Life of Brian", rating: 4 },
      { id: 5, movie: "Life of Brian", rating: 3 },
      { id: 6, movie: "Meaning of Life", rating: 2 },
      { id: 7, movie: "Meaning of Life", rating: 3 },
    ];
    fs.writeFileSync(reviewFile, JSON.stringify(defaultValues));

    let titles = ["Holy Grail", "Life of Brian", "Meaning of Life"];
    for (var k of titles) {
      let reviews = defaultValues.filter((r) => r.movie == k);
      averages[k] =
        reviews.reduce((p, c) => (p += c.rating), 0) / reviews.length;
    }
    done();
  });
  after((done) => {
    //restore file
    fs.copyFileSync('backup.json', reviewFile);
    fs.rmSync('backup.json');
    done();
  });
  describe("GET /moviereviews", () => {
    it("it should return averages of reviews per movie", (done) => {
      chai
        .request(server)
        .get("/moviereviews")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(3);
          for (var k of Object.keys(averages)) {
            res.body
              .filter((m) => m.movie == k)[0]
              .rating.should.be.closeTo(averages[k], 0.001, `movie "${k}" has the wrong average`);
          }
          done();
        });
    });
  });
  describe("GET /moviereviews/:moviename", () => {
    it("it should return average reviews of a certain movie", (done) => {
      chai
        .request(server)
        .get("/moviereviews/Life%20of%20Brian")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.not.be.a("array");
          res.body.rating.should.be.closeTo(averages["Life of Brian"], 0.001);
          done();
        });
    });
  });
  describe("POST /moviereviews", () => {
    it("it should return added object with unique ID", (done) => {
      chai.request(server)
        .post("/moviereviews")
        .send({
          movie: "Holy Grail",
          rating: 3
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('id');
          let results = JSON.parse(fs.readFileSync(reviewFile));
          results.filter(x=>x.id == res.body.id).length.should.be.eql(1, `id is not unique`);
          done();
        });
    });
  });

  describe("DELETE /moviereviews/:id", () => {
    it("it should delete the review identified by id", (done) => {
      chai.request(server)
        .delete("/moviereviews/5")
        .end((err, res)=>{
          res.should.have.status(200);
          let results = JSON.parse(fs.readFileSync(reviewFile));
          results.filter(x=>x.id == res.body.id).length.should.be.eql(0, `review is not deleted`);
          done();
        });
    });
  });
});
