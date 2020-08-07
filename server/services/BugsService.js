import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class BugsService {

  async getAll() {
    return await dbContext.Bugs.find()
  }
  async create(rawData) {
    let data = await dbContext.Bugs.create(rawData)
    return data
  }

  async edit(id, userEmail, update) {
    let data = await dbContext.Bugs.findOneAndUpdate({ _id: id, creatorEmail: userEmail }, update, { new: true })
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this list");
    }
    return data;
  }
}



export const bugsService = new BugsService();
