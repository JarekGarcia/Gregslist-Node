import { Auth0Provider } from "@bcwdev/auth0provider";
import { houseService } from "../services/HouseService.js";
import BaseController from "../utils/BaseController.js";

export class HouseController extends BaseController {
    constructor() {
        super('api/houses')
        this.router
            .get('', this.getHouses)
            .get('/:houseId', this.getHouseById)

            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createHouse)
            .delete('/:houseId', this.deleteHouse)
            .put('/:houseId', this.updateHouse)

    }

    async getHouses(request, response, next) {
        try {
            const houses = await houseService.getHouses()
            return response.send(houses)
        } catch (error) {
            next(error)
        }
    }
    async getHouseById(request, response, next) {
        try {
            const houseId = request.params.houseId
            const house = await houseService.getHouseById(houseId)
            return response.send(house)
        } catch (error) {
            next(error)
        }
    }

    async createHouse(request, response, next) {
        try {
            const houseData = request.body
            const userInfo = request.userInfo
            houseData.creatorId = userInfo.id
            const house = await houseService.createHouse(houseData)
            return response.send(house)
        } catch (error) {
            next(error)
        }
    }

    async deleteHouse(request, response, next) {
        try {
            const houseId = request.params.houseId
            const userId = request.userInfo.id
            const house = await houseService.deleteHouse(houseId, userId)
            return response.send(`${house.id} deleted`)
        } catch (error) {
            next(error)
        }
    }

    async updateHouse(request, response, next) {
        try {
            const houseId = request.params.houseId
            const userId = request.userInfo.id
            const houseData = request.body

            const updateHouse = await houseService.updateHouse(houseId, userId, houseData)
            return response.send(updateHouse)
        } catch (error) {
            next(error)
        }
    }
}
