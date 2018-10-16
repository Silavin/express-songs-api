const express = require("express");
const app = express();

app.use(express.json());

let songList = [
  {
    id: 1,
    name: "The First",
    artist: "First"
  },
  {
    id: 2,
    name: "The Second",
    artist: "Second"
  },
  {
    id: 3,
    name: "The Thrid",
    artist: "Third"
  }
];

app.get("/songs", (req, res) => {
  res.status(200).json(songList);
});

app.get("/songs/:id", (req, res) => {
  const songsId = req.params.id;
  res.status(200).json(
    songList.find(song => {
      return song.id === parseInt(songsId);
    })
  );
});

app.post("/songs", (req, res) => {
  const newSong = {
    id: songList.length + 1,
    name: req.body.name,
    artist: req.body.artist
  };

  songList.push(newSong);
  res.status(201).json(newSong);
});

app.put("/songs/:id", (req, res) => {
  const selectedSong = songList.find(song => {
    return song.id === parseInt(req.params.id);
  });

  const { name, artist } = req.body;

  const copyOfSong = { ...selectedSong };

  selectedSong["name"] = name ? name : copyOfSong["name"];
  selectedSong["artist"] = artist ? artist : copyOfSong["artist"];

  res.status(200).json(selectedSong);
});

app.delete("/songs/:id", (req, res) => {
  const selectedSong = songList.find(song => {
    return song.id === parseInt(req.params.id);
  });

  songList = songList.filter(song => {
    return song.id !== parseInt(req.params.id);
  });

  res.status(200).json(selectedSong);
});

app.listen(3000, () => {
  console.log("The app is starting up");
});
