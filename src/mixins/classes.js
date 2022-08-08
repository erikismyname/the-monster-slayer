export default {
    computed: {
        classes() {
            return {
                container: true,
                dark: this.isDarkModeOn,
            };
        },
    }
};