const fileService = require('../service/file.service')
const userService = require('../service/user.service')
const { APP_HOST, APP_PORT } = require('../app/config')

class FileController {
    async saveAvatarInfo(ctx,next) {
        const { filename, mimetype, size } = ctx.req.file
        const { id } = ctx.user

        await fileService.uploadAvatar(filename, mimetype, size, id)
        const avatar = `${APP_HOST}:${APP_PORT}/user/${id}/avatar`
        await userService.updateAvatarUrlById(avatar, id)

        ctx.body = '上传头像成功'
    }
}

module.exports = new FileController()