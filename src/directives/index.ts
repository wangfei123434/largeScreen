import autoRoll from './auto-roll'
export default {
    install(app){
        app.directive(autoRoll.name,autoRoll)
    }
}
