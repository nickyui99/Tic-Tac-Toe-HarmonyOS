import featureAbility from '@ohos.ability.featureAbility'
import router from '@system.router';

export default {
    data: {
        title: ""
    },
    onInit() {
        this.title = this.$t('strings.world');
    },
    onStartGameClick() {
        router.push({
            uri: "pages/TicTacToe/TicTacToe"
        })
    },
}
