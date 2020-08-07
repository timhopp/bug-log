import express from "express";
import BaseController from "../utils/BaseController";
import { bugsService } from "../services/BugsService";
import { notesService } from "../services/NotesService";
import auth0Provider from "@bcwdev/auth0provider";

export class BugsController extends BaseController {
  constructor() {
    super("api/bugs");
    this.router
      .get("", this.getAll)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(auth0Provider.getAuthorizedUserInfo)
      .post("", this.create)
      .put("/:id", this.edit)
      .get("/:id/notes", this.getNotesByBug);
  }

  async getNotesByBug(req, res, next){
    try{
      let data = await notesService.getNotesByBug(req.param.id, req.userInfo.email)
      return res.send(data)
    } catch(error) {
      next(error)
    }
  }
  async getAll(req, res, next) {
    try {
      let data = await bugsService.getAll();
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creator = req.user.email;
      let data = await bugsService.create(req.body)
      return res.status(201).send(data)
    } catch (error) {
      next(error);
    }
  }

  async edit(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email
      let data = await bugsService.edit(req.params.id, req.userInfo.email, req.body)
      return res.send(data)
    } catch (error) { next(error) }
  }
}

