import mongoose from "mongoose";
import {dbContext} from "../db/DbContext.js";
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

const Task = new Schema(
  {
    title: { type: String, required: true },
    creatorEmail: { type: String, required: true },
    completed: { type: Boolean, default: false },
    listId: { type: ObjectId, ref: "List", required: true },
    boardId: {type: ObjectId, ref: "Board", required: true}
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

Task.virtual("creator", {
  localField: "creatorEmail",
  ref: "Profile",
  foreignField: "email",
  justOne: true,
});

//CASCADE ON DELETE
Task.pre("deleteMany", function (next) {
  //lets find all the lists and remove them
  Promise.all([
    //something like...
    dbContext.Comment.deleteMany({ listId: this._conditions.listId }),
  ])
    .then(() => next())
    .catch((err) => next(err));
});

//CASCADE ON DELETE
Task.pre("findOneAndRemove", function (next) {
  //lets find all the lists and remove them
  Promise.all([
    dbContext.Comment.deleteMany({ taskId: this._conditions._id })
  ])
    .then(() => next())
    .catch((err) => next(err));
});

export default Task;
