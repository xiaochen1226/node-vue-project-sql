const userService = require('../service/user.service')
const fileService = require('../service/file.service')
const { PRIVATE_KEY } = require('../app/config')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const { AVATAR_PATH } = require('../constants/file-path')

class UserController {
    async register(ctx,next) {
        const user = ctx.request.body

        const result = await userService.register(user)

        ctx.body = result
    }

    async login(ctx, next) {
        const { id, name } = ctx.user

        const token = jwt.sign({ id, name }, PRIVATE_KEY, {
            expiresIn: 60 * 60 * 24 * 7,
            algorithm: 'RS256'
        })

        ctx.body = { id, name, token }
    }

    async avatarInfo(ctx, next) {
        const { userId } = ctx.params
        const avatarInfo = await fileService.getAvatarByUserId(userId)

        ctx.response.set('content-type', avatarInfo.mimetype)
        ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`)
    }
}

module.exports = new UserController()