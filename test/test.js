// TESTING JS

var request = require("request"),
expect = require("chai").expect,
cheerio = require("cheerio");

var baseUrl = "http://localhost:3000";

describe("Beta Connect Title", function() {
	it("should be 'SBelser Beta Connect'", function() {
		request(baseUrl, function(err, res, body) {
			var $ = cheerio.load(body);
			var title = $("title").text();
			expect(title).to.equal("SBelser Beta Connect");
			done();
		});
	});
});


// EXAMPLES BELOW

// describe('Catchphrasely resource routes', function() {
//   it('GET should return 200', function(done) {
//     request(baseUrl + '/api/phrases', function(err, res, body) {
//       expect(res.statusCode).to.equal(200);
//       // expect(res.statusCode).to.equal(300);
//       done();
//     });
//   });
//   it('POST should return 200', function(done) {
//     request.post(baseUrl + '/api/phrases', function(err, res, body) {
//       expect(res.statusCode).to.equal(200);
//       // expect(res.statusCode).to.equal(300);
//       done();
//     });
//   });
//   it('PUT should return 200', function(done) {
//     request.put(baseUrl + '/api/phrases/1', function(err, res, body) {
//       expect(res.statusCode).to.equal(200);
//       // expect(res.statusCode).to.equal(300);
//       done();
//     });
//   });
//   it('DELETE should return 200', function(done) {
//     request.del(baseUrl + '/api/phrases/:id', function(err, res, body) {
//       expect(res.statusCode).to.equal(200);
//       // expect(res.statusCode).to.equal(300);
//       done();
//     });
//   });
// });