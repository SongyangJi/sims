<template>

    <div>
        <CardDisplay :img_urls="achievement.urls"></CardDisplay>
    </div>

</template>

<script>
    import CardDisplay from "../CardDisplay";

    export default {

        name: "SingleAchievement",
        data() {
            return {}
        },
        components: {
            CardDisplay
        },
        props: [
            'achievement'
        ]
    }
</script>

<style scoped>

</style>