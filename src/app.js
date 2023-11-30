const express = require("express");
const applyMiddleware = require("./middlewares/applyMiddleWare");
const connectDB = require("./db/connectDB");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

const authenticationRouter = require("./routes/authentication/index");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

//middlware
applyMiddleware(app);
app.use(authenticationRouter);
// app.get()

// database
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oykwxyb.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const petcategoryCollection = client.db("petDB").collection("petsCategory");
const myDonationsCollection = client.db("petDB").collection("myDonations");
const usersCollection = client.db("petDB").collection("usersCollection");
const allPetsCollection = client.db("petDB").collection("allpets");
const adoptedByUserCollection = client.db("petDB").collection("adoptedByUser");
const createDonationCollection = client
  .db("petDB")
  .collection("createDonation");

//pet cateogry get route
app.get("/petcategory", async (req, res) => {
  const cursor = petcategoryCollection.find();
  const result = await cursor.toArray();
  res.send(result);
});

//get pets through id
app.get("/petcategory/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await petcategoryCollection.findOne(query);
  res.send(result);
});
// post  pets
app.post("/addnewpet", async (req, res) => {
  const newPet = req.body;
  console.log(newPet);
  const result = await allPetsCollection.insertOne(newPet);
  res.send(result);
});
//get all pets
app.get("/addnewpet", async (req, res) => {
  const cursor = allPetsCollection.find();
  const result = await cursor.toArray();
  res.send(result);
});
app.get("/", (req, res) => {
  res.send("Pet adaption server issssss running");
});

// update pet information
app.put("/addnewpet/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const options = { upsert: true };
  const updatePetInfo = req.body;
  const petInfo = {
    $set: {
      petName: updatePetInfo.petName,
      Petcategory: updatePetInfo.Petcategory,
      petAge: updatePetInfo.petAge,
      petLocation: updatePetInfo.petLocation,
      petLongDescription: updatePetInfo.petLongDescription,
      petShortDescription: updatePetInfo.petShortDescription,
      photo: updatePetInfo.photo,
    },
  };
  // console.log(updatePetInfo);
  const result = await allPetsCollection.updateOne(filter, petInfo, options);
  res.send(result);
});
// update pet information
app.patch("/addnewpet/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const options = { upsert: true };
  const updatePetAdopt = req.body;
  const petInfo = {
    $set: {
      adopted: updatePetAdopt.adopted,
    },
  };
  console.log(updatePetAdopt);
  const result = await allPetsCollection.updateOne(filter, petInfo, options);
  res.send(result);
});

//delete one
app.delete("/addnewpet/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const result = await allPetsCollection.deleteOne(filter);
  res.send(result);
});
//get pet details
app.get("/addnewpet/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await allPetsCollection.findOne(query);
  res.send(result);
});

// send data to server dopted pet by user
app.post("/adoptedpet", async (req, res) => {
  const AdoptedPet = req.body;
  console.log(AdoptedPet);
  const result = await adoptedByUserCollection.insertOne(AdoptedPet);
  res.send(result);
});

//create campaing route
app.post("/createcampaign", async (req, res) => {
  const createCampaign = req.body;
  console.log(createCampaign);
  const result = await createDonationCollection.insertOne(createCampaign);
  res.send(result);
});

//get data from campaign collection
app.get("/createcampaign", async (req, res) => {
  const cursor = createDonationCollection.find();
  const result = await cursor.toArray();
  res.send(result);
});

//get campaign data by id
app.get("/createcampaign/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await createDonationCollection.findOne(query);
  res.send(result);
});

//update donation amount
app.put("/createcampaign/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const options = { upsert: true };
  const donatedByInfo = req.body;
  const petInfo = {
    $set: {
      donatedAmount: donatedByInfo.donatedAmount,
      donatedUserEmail: donatedByInfo.donatedUserEmail,
      donatedUserEmail: donatedByInfo.donatedUserName,
    },
  };
  console.log(donatedByInfo);
  const result = await createDonationCollection.updateOne(
    filter,
    petInfo,
    options
  );
  res.send(result);
});
// update donation

app.put("/createcampaign/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const options = { upsert: true };
  const updatedonationInfo = req.body;
  const updatedonation = {
    $set: {
      petName: updatedonationInfo.petName,
      petPicture: updatedonationInfo.petPicture,
      maxDonation: updatedonationInfo.maxDonation,
      createtDonationTime: updatedonationInfo.createtDonationTime,
      createtDonationDate: updatedonationInfo.createtDonationDate,
      lastDonationDate: updatedonationInfo.lastDonationDate,
      isPaused: updatedonationInfo.isPaused,
      shortDonationDescription: updatedonationInfo.shortDonationDescription,
      longDonationDescription: updatedonationInfo.longDonationDescription,
    },
  };
  console.log(updatedonationInfo);
  const result = await createDonationCollection.updateOne(
    filter,
    updatedonation,
    options
  );
  res.send(result);
});
// delete admin donation
app.delete("/createcampaign/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const result = await createDonationCollection.deleteOne(filter);
  res.send(result);
});
//make donation pause
app.patch("/createcampaign/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const options = { upsert: true };
  const pauseDonationInfo = req.body;
  const pauseDonation = {
    $set: {
      isPaused: pauseDonationInfo.isPaused,
    },
  };
  console.log(pauseDonation);
  const result = await createDonationCollection.updateOne(
    filter,
    pauseDonation
  );
  res.send(result);
});
// my donationsss where i donated
app.post("/myalldonation", async (req, res) => {
  const MyDonations = req.body;
  console.log(MyDonations);
  const result = await myDonationsCollection.insertOne(MyDonations);
  res.send(result);
});
//get my alll donations
app.get("/myalldonation", async (req, res) => {
  const cursor = myDonationsCollection.find();
  const result = await cursor.toArray();
  res.send(result);
});
// handle refund
app.patch("/myalldonation/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const refund = {
    $set: {
      donatedAmount: "0",
    },
  };
  console.log(refund);
  const result = await myDonationsCollection.updateOne(filter, refund);
  res.send(result);
});

// users related api
app.post("/users", async (req, res) => {
  const user = req.body;
  //insert email if user dosent exist
  const query = { email: user.email };
  const existingUser = await usersCollection.findOne(query);
  if (existingUser) {
    return res.send({ message: "user already exists", insertedId: null });
  }
  const result = await usersCollection.insertOne(user);
  res.send(result);
});
// update user admin
app.patch("/users/admin/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const updateAdmin = {
    $set: {
      role: "admin",
    },
  };
  const result = await usersCollection.updateOne(filter, updateAdmin);
  res.send(result);
});

//get all users
app.get("/users", async (req, res) => {
  const result = await usersCollection.find().toArray();
  res.send(result);
});

//error handling
app.all("*", (req, res, next) => {
  const error = new Error(`entered url is not valid,[${req.url}]`);
  error.status = 404;
  next(error);
});

// global middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
  });
});
// const main = async () => {
//   await connectDB();
//   app.listen(port, () => {
//     console.log(`Pet Adaption Platform server is listening on: ${port}`);
//   });
// };
// main();

module.exports = app;