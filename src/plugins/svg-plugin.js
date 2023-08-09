import { svgService } from '../services/svg-service.js'

export default {
    install: app => {
        app.config.globalProperties.$svg = iconName => {
            return svgService.getSvg(iconName)
        }
    },
}
