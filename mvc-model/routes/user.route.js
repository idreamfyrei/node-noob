import express from "express";

const router = express.Router();
import {getAllUser, getUserByID, patchUserByID, deleteUserByID, postUserByID} from '../controllers/user.controller.js';

//* ROUTES
  
  // Give JSON data in case user hit /api/users through mobile devices that doesn't support HTML rendering
  router.get("/", getAllUser);
  
  // do get data for a specific user through dynamic routing (:id)
  router.route("/:id")
  .get(getUserByID)
  .patch(patchUserByID)
  .delete(deleteUserByID);
  
  //* Post
  router.post("/", postUserByID);
  
export default router; 