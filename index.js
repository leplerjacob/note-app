require('dotenv').config();
const morgan = require("morgan");
const express = require("express");
const app = express();
const cors = require("cors");
const Note = require("./models/note");

const logger = morgan((tokens, req, res) => {
  return [
    "---\nMethod: " + tokens.method(req, res),
    "\nUrl: " + tokens.url(req, res),
    "\nRequest Status: " + tokens.status(req, res),
    "\nLength: " + tokens.res(req, res, "content-length"),
    "\nResponse Time: " + tokens["response-time"](req, res),
    "ms",
  ].join(" ");
});

const unknownEndpoint = (error, request, response, next) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  // console.error(error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: "Validation Error" });
  }
  next(error);
};

app.use(cors());
app.use(express.json());
app.use(express.static("build"));
app.use(logger);
app.use(unknownEndpoint);
app.use(errorHandler);

/*
(hardcoded notes)
let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true,
  },
  {
    id: 4,
    content: "Use express in order to make http requests",
    date: "2019-06-30T12:01:14.298Z",
    important: true,
  },
];
*/

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

app.get("/api/notes/:id", (request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      next(error);
    });

  /*
  const id = Number(request.params.id);
  const note = notes.find((note) => note.id === id);

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
    response.body;
  }
  */
});

/*
(Used before utilizing auto generated id on MongoDB Atlas)
const generatedId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};
*/

app.post("/api/notes", (request, response, next) => {
  const body = request.body;

  if (body.content.length === 0) {
    return response.status(400).json({ error: "Note must not be blank" });
  } else if (body.content.length < 7) {
    return response
      .status(400)
      .json({ error: "Note must have at least 7 characters" });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  });

  note
    .save()
    .then((savedNote) => savedNote.toJSON())
    .then((savedAndFormattedNote) => response.json(savedAndFormattedNote))
    .catch((error) => next(error));

  /*
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generatedId(),
  };
  notes = notes.concat(note);

  response.json(note);
  */
});

app.delete("/api/notes/:id", (request, response) => {
  Note.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.result(204).end();
    })
    .catch((error) => next(error));

  /*
  Employed before finding out about findByIdAndDelete
  Note.findById(request.params.id).then((note) => {
    Note.deleteOne({ _id: note._id })
      .then(() => {
        console.log("Successfully deleted note");
        response.status(204).end();
      })
      .catch((err) => {
        console.log("Something went wrong...");
        response.status(404).end();
      });
  });
  */

  // .remove() is deprecated
  // Note.remove({ _id: note._id }, (err) => {
  //   console.log('Something went wrong ', err);
  // });
  // console.log(typeof note._id);
  response.status(204).end();
});

/* OLD
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);
  response.status(204).end();
  */

app.put("/api/notes/:id", (request, response, next) => {
  const body = request.body;

  console.log("request.body: ", request.body);
  const note = {
    content: body.content,
    important: body.important,
  };
  console.log("note: ", note);

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));

  /*
  Used before finding out about findByIdAndUpdate
  Note.findById(request.params.id).then((note) => {
    Note.findOneAndUpdate({ _id: note._id }, { important: !note.important })
      .then((res) => {
        console.log("Successfulyl updated note");
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
    response.json(note);
  });
*/
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
