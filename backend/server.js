import express from "express";
import mongodb from "mongodb";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
const dbUrl = "mongodb://webtrekk:webtrekk@webtrekk-shard-00-00-rfqne.gcp.mongodb.net:27017,webtrekk-shard-00-01-rfqne.gcp.mongodb.net:27017,webtrekk-shard-00-02-rfqne.gcp.mongodb.net:27017/test?ssl=true&replicaSet=webtrekk-shard-0&authSource=admin&retryWrites=true";
// const dbUrl ="mongodb://localhost/webtrekk"

function validate(data) {
  let errors = {};
  const isValid = Object.keys(errors).length === 0;
  return { errors, isValid };
}

mongodb.MongoClient.connect(
  dbUrl,
  function(err, db) {
    app.get("/api/customers", (req, res) => {
      db.collection("customers")
        .find({})
        .toArray((err, customers) => {
          res.json({ customers });
        });
    });

    app.post("/api/customers", (req, res) => {
      const { errors, isValid } = validate(req.body);
      if (isValid) {
        const {
          cover,
          firstname,
          lastname,
          gender,
          birthday,
          lifetimevalue
        } = req.body;
        db.collection("customers").insert(
          {
            cover,
            name : {firstname,lastname},
            gender,
            birthday,
            lifetimevalue
          },
          (err, result) => {
            if (err) {
              res
                .status(500)
                .json({ errors: { global: "Something went wrong" } });
            } else {
              res.json({ customer: result.ops[0] });
            }
          }
        );
      } else {
        res.status(400).json({ errors });
      }
    });

    app.put("/api/customers/:_id", (req, res) => {
      const { errors, isValid } = validate(req.body);

      if (isValid) {
        const {
          cover,
          firstname,
          lastname,
          gender,
          birthday,
          lifetimevalue
        } = req.body;
        db.collection("customers").findOneAndUpdate(
          { _id: new mongodb.ObjectId(req.params._id) },
          {
            $set: {
              cover,
              name : {firstname,lastname},
              gender,
              birthday,
              lifetimevalue
            }
          },
          { returnOriginal: false },
          (err, result) => {
            if (err) {
              res.status(500).json({ errors: { global: err } });
              return;
            }
            res.json({ customer: result.value });
          }
        );
      } else {
        res.status(400).json({ errors });
      }
    });

    app.get("/api/customers/:_id", (req, res) => {
      db.collection("customers").findOne(
        { _id: new mongodb.ObjectId(req.params._id) },
        (err, customer) => {
          res.json({ customer });
        }
      );
    });

    app.delete("/api/customers/:_id", (req, res) => {
      db.collection("customers").deleteOne(
        { _id: new mongodb.ObjectId(req.params._id) },
        (err, r) => {
          if (err) {
            res.status(500).json({ errors: { global: err } });
            return;
          }

          res.json({});
        }
      );
    });

    app.use((req, res) => {
      res.status(404).json({
        errors: {
          global:
            "Still working on it. Please try again later when we implement it"
        }
      });
    });

    app.listen(8080, () => console.log("Server is running on localhost:8080"));
  }
);
