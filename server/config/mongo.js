const fs = require("fs");
const MongoClient = require("mongodb").MongoClient;
const fastcsv = require("fast-csv");

const url = "mongodb://localhost:27017";

let streamFarms = fs.createReadStream("../data/farms.csv");
let streamNdvi = fs.createReadStream("../data/farms_ndvi.csv");
let streamPrecipitation = fs.createReadStream(
  "../data/farms_precipitation.csv"
);
let farmsData = [];
let farmsNdviData = [];
let farmsPrecipitationData = [];
const client = new MongoClient(url, { useUnifiedTopology: true });
let _db;

module.exports = {
  connectToServer: () => {
    client.connect(async (err) => {
      if (err) console.error(err);
      console.warn("Mongo connected in 27017");
      _db = client.db("gaivota-test");
      await _db.collection("farms").deleteMany();

      await _db.collection("farms_ndvi").deleteMany();

      await _db.collection("farms_precipitation").deleteMany();

      await _db.collection("user").insertOne({
        name: "Admin",
        email: "admin@gaivota.ai",
        password: "admin",
      });
      console.warn("Admin inserted");

      let csvStreamFarms = fastcsv
        .parse()
        .on("data", function(data) {
          farmsData.push({
            farm_id: data[0],
            name: data[1],
            latitude: data[2],
            longitude: data[3],
            variety: data[4],
            total_area: data[5],
            yield_estimation: data[6],
            price: data[7],
          });
        })
        .on("end", function() {
          farmsData.shift();
          client
            .db("gaivota-test")
            .collection("farms")
            .insertMany(farmsData, (err, res) => {
              if (err) throw err;
            });
        });

      let csvStreamFarmsNdvis = fastcsv
        .parse()
        .on("data", function(data) {
          farmsNdviData.push({
            date: data[0],
            ndvi_221: data[1],
            ndvi_231: data[2],
            ndvi_271: data[3],
          });
        })
        .on("end", function() {
          farmsNdviData.shift();
          client
            .db("gaivota-test")
            .collection("farms_ndvi")
            .insertMany(farmsNdviData, (err, res) => {
              if (err) throw err;
            });
        });

      let csvStreamFarmsPrecipitation = fastcsv
        .parse()
        .on("data", function(data) {
          farmsPrecipitationData.push({
            date: data[0],
            precipitation_221: data[1],
            precipitation_231: data[2],
            precipitation_271: data[3],
          });
        })
        .on("end", function() {
          farmsPrecipitationData.shift();
          client
            .db("gaivota-test")
            .collection("farms_precipitation")
            .insertMany(farmsPrecipitationData, (err, res) => {
              if (err) throw err;
            });
        });

      streamFarms.pipe(csvStreamFarms);
      streamNdvi.pipe(csvStreamFarmsNdvis);
      streamPrecipitation.pipe(csvStreamFarmsPrecipitation);

      return true;
    });
  },

  getDb: () => {
    return _db;
  },
};
