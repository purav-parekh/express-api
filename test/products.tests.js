import app from "../app.js";
import chai from "chai";
import chaiHttp from "chai-http";

// Assertion
chai.should();
chai.use(chaiHttp);

describe("GET /products", () => {
	describe("GET /products", () => {
		it("should return all products", (done) => {
			chai
				.request(app)
				.get("/products")
				.end((err, res) => {
					let p = res?.body?.data?.prods;
					res.should.have.status(200);
					p.should.be.a("array");
					p.length.should.not.be.eql(0);
					done();
				});
		});
	});
});
