import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class HouseService {
    async updateHouse(houseId, userId, houseData) {
        const houseToBeUpdated = await this.getHouseById(houseId)
        if (houseToBeUpdated.creatorId.toString() != userId) {
            throw new Forbidden("Not your house to update")
        }

        houseToBeUpdated.bedrooms = houseData.bedrooms || houseToBeUpdated.bedrooms
        houseToBeUpdated.bathrooms = houseData.bathrooms || houseToBeUpdated.bathrooms
        houseToBeUpdated.year = houseData.year || houseToBeUpdated.year
        houseToBeUpdated.price = houseData.price || houseToBeUpdated.price
        houseToBeUpdated.imgUrl = houseData.imgUrl || houseToBeUpdated.imgUrl
        houseToBeUpdated.description = houseData.description || houseToBeUpdated.description

        await houseToBeUpdated.save()
        return houseToBeUpdated


    }
    async deleteHouse(houseId, userId) {
        const houseToBeDeleted = await this.getHouseById(houseId)
        if (houseToBeDeleted.creatorId.toString() != userId) {
            throw new Forbidden("Not your house to delete!")
        }

        await houseToBeDeleted.remove()
        return houseToBeDeleted
    }
    async getHouseById(houseId) {
        const house = await dbContext.Houses.findById(houseId)

        if (!house) {
            throw new BadRequest(`${houseId} is not a valid Id`)
        }
        return house
    }
    async createHouse(houseData) {
        const house = await dbContext.Houses.create(houseData)
        return house
    }
    async getHouses() {
        const houses = await dbContext.Houses.find()
        return houses
    }

}

export const houseService = new HouseService()