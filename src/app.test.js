const request = require("supertest");
const app = require("./app");

describe("Test the API", () => {
  describe("GET json from /api/timestamp/", () => {
    it("responds with json", done => {
      request(app)
        .get("/api/timestamp")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200, done);
    });
  });

  describe("GET json from /api/timestamp/:date_string", () => {
    it("responds with json", done => {
      request(app)
        .get("/api/timestamp/string")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200, done);
    });
  });

  describe("date is valid if parsed by Date()", () => {
    it("date is valid format string", async () => {
      const res = await request(app).get("/api/timestamp/2016-11-20");
      expect(res.body.date).toBe(new Date("2016-11-20").toString());
    });

    it("date is valid format number", async () => {
      const res = await request(app).get("/api/timestamp/156548545648");
      expect(res.body.date).toBe(new Date(156548545648).toString());
    });

    it("date is empty", async () => {
      const res = await request(app).get("/api/timestamp");
      expect(res.body.date).toBe(new Date().toString());
    });

    it("if is invalid format", async () => {
      const res = await request(app).get("/api/timestamp/foobar");
      expect(res.body).toMatchObject({ error: "Invalid Date" });
    });
  });

  describe("Must return formated json", () => {
    it('should have a property like {"unix": <date.getTime()> }', async () => {
      const res = await request(app).get("/api/timestamp/2016-11-20");
      expect(res.body.unix).toBe(new Date("2016-11-20").getTime());
    });

    it('should have a property like {"utc" : <date.toUTCString()> }', async () => {
      const res = await request(app).get("/api/timestamp/2016-11-20");
      expect(res.body.utc).toBe(new Date("2016-11-20").toUTCString());
    });
  });
});
