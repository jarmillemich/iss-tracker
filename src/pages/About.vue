<template>
    <div class="main-content">
        <div class="content-box">
            <div class="cards">
                <div class="content-box" v-for="(value, key, index) in about.sections">
                    <h2>{{ key }}</h2>
                    <div class="content">
                        <p>{{value.text}}</p>
                        <h4 v-if="value">Initial Features</h4>
                        <div class="initial-features" v-for="feature in value.features.initial">
                            {{ feature.header }}
                            {{feature.text}}
                        </div>
                        <h4>Planned Features</h4>
                        <div class="planned-features" v-for="feature in value.features.planned">
                            {{ feature.header }}
                            {{feature.text}}
                        </div>
                    </div>
                    <div v-if="index != objectLength()" class="border-bottom">
                        <div class="border-line"></div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
  
<script lang="ts" setup>
    import about from '../../public/assets/content/about.json'
    function objectLength(){
        return Object.keys(about.sections).length - 1;
    }

    function featureLength(value: any){
        console.log(value.initial.length);
        return value.features.initial.length;
    }
</script>
<style scoped lang="scss">
    .main-content{
        display: flex;
        margin: 0px 10%;
        margin-bottom: 100px;
    }

    .content-box{
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .content{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0px 30%;
    }

    .cards {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto auto auto;
        row-gap: 75px;
        margin-top: 35px;
        margin-bottom: 200px;
    }

    .border-line {
        margin-top: 35px;
        border-bottom: 3px solid #93CDDD;
        width: 100px;
    }
</style>