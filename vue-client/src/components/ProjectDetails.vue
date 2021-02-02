<template>
    <div>
        <div>
            <b-jumbotron :header="project.name" :lead="project.description">
            </b-jumbotron>
        </div>
        <div>
            <b-tabs content-class="mt-3">
                <b-tab title="Language" active>
                    <b-table
                    :items="language.items"
                    :fields="language.fields"
                    responsive="sm"
                    ></b-table>
                </b-tab>
                <b-tab title="Keys">
                    <p>I'm the second tab</p>
                </b-tab>
            </b-tabs>
        </div>
        
        
    </div>
</template>

<script>
import projectData from "../../services/ProjectDataService"
import translationData from "../../services/TranslationDataService"
export default {
    data() {
        return {
            project:{
                name:"Loading...",
                description:"Loading...",
            },
            language:{
                items:[],
                fields: [
                    { key: 'language',label: 'Order by language', sortable: true },
                    { key: 'progress',label: 'Ordre by progress', sortable: true },
                ]
            },
            keys:{
            }
        }
    },
    mounted() {
        projectData.get(this.$route.params.idProject).then(res=>{
            if(res.status == 200){
                this.project = res.data;
                translationData.getFromProject(this.$route.params.idProject).then(res=>{
                    res.data.forEach(translation => {
                        this.language.items.push(
                            {
                                language:translation.language,
                                progress:99
                            }
                        );
                    });
                });
            }
        })
    },
}
</script>

<style lang="">
    
</style>