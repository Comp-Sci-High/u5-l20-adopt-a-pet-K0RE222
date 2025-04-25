const mongoose = require("mongoose");
const express = require("express");
const app = express();


app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.set("view engine", "ejs");

app.use((req, res, next) => {
  console.log(req.method + req.path);
  next();
});


const petSchema = new mongoose.Schema(
    {
      name: String,
      emoji: String,
      age: Number,
      adopted: Boolean
    },
    { timestamps: true }
  );
  const Pet = mongoose.model("Pet", petSchema, "Pets");


  app.get("/", async (req, res) => {
    const pets = await Pet.find({}).sort({ createdAt: -1 });
    res.render("pets.ejs", { pets });
  });
  
  app.post("/add/pet", async (req, res) => {
    const newPet = await new Pet({
      name: req.body.name,
      emoji: req.body.emoji,
      age: req.body.age,
      adopted: req.body.adopted === "on",
    }).save();
    res.json(newPet);
  });













  async function startServer() {
    await mongoose.connect(
      "mongodb+srv://SE12:CSH2025@cluster0.u9yhg.mongodb.net/CSHpets?retryWrites=true&w=majority&appName=Cluster0"
    );
  
    app.listen(3000, () => {
      console.log(`Server running.`);
    });
  }
  
  startServer();
