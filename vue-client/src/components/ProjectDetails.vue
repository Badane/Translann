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
                    sort-icon-left
                    ></b-table>
                    <div>
                        <b-collapse id="collapse-1" class="mt-1 mb-2">
                            <b-card>
                                <b-form-group
                                id="alias-language"
                                label-cols-sm="4"
                                label-cols-lg="3"
                                content-cols-sm
                                content-cols-lg="7"
                                label="Add new language"
                                label-for="input-language">
                                    <b-input-group class="mb-4">
                                        <b-form-select
                                            id="input-language"
                                            v-model="language.newLanguage"
                                            :options="language.list"
                                            required
                                            ></b-form-select>
                                            <b-button class="ml-4" type="submit" variant="success">Add</b-button>
                                    </b-input-group>
                                </b-form-group>
                            </b-card>
                        </b-collapse>

                        <div class="d-flex flex-row-reverse mb-4">
                            <b-button v-b-toggle.collapse-1 variant="success">
                                <span class="when-open">Close</span><span class="when-closed">Add new language</span>
                            </b-button>
                        </div>
                    </div>
                </b-tab>
                <b-tab title="Keys">
                    <b-table
                    :items="keys.items"
                    :fields="keys.fields"
                    responsive="sm"
                    thead-class="d-none"
                    ></b-table>
                    Add new key
                    <div>
                        <b-form @submit="onKeySubmit">
                            <b-row>
                                <b-col col lg="4" >
                                    <b-form-input v-model="keys.newKey" placeholder="New Key"></b-form-input>
                                </b-col>
                                <b-col col lg="8">
                                    <b-input-group class="mb-4">
                                        <b-form-input v-model="keys.newKeyTranslation" :placeholder="keys.newKeyLanguage"></b-form-input>
                                        <b-button class="ml-4" type="submit" variant="success">Submit</b-button>
                                    </b-input-group>
                                </b-col>
                            </b-row>
                        </b-form>
                    </div>
                </b-tab>
            </b-tabs>
        </div>
        
        
    </div>
</template>

<script>
import projectData from "../../services/ProjectDataService"
import translationData from "../../services/TranslationDataService"
import langData from "../../ressources/lang.json"
export default {
    data() {
        return {
            project:{
                name:"Loading...",
                description:"Loading...",
                key:[]
            },
            language:{
                items:[],
                fields: [
                    { key: 'language',label: 'Order by language', sortable: true },
                    { key: 'progress',label: 'Ordre by progress', sortable: true },
                ],
                list:[
                    { value: null, text: 'Please select an option',disabled: true }
                ],
                newLanguage:null
            },
            keys:{
                items:[],
                fields: [
                    { key: 'key',label: 'Key'},
                ],
                newKeyLanguage:"(optional) Translation in ",
                newKey:"",
                newKeyTranslation:""
            }
        }
    },
    mounted() {
        //Get project data
        projectData.get(this.$route.params.idProject).then(res=>{
            if(res.status == 200){
                this.project = res.data;
                this.keys.newKeyLanguage+=res.data.default;
                
                //Get project' translations
                translationData.getFromProject(this.$route.params.idProject).then(res=>{
                    res.data.forEach(translation => {
                        this.language.items.push(
                            {
                                language:langData[translation.language].name,
                                progress:99
                            }
                        );
                    });
                });

                //format project keys to insert it in table
                this.project.keys.forEach((element,index) =>{
                    this.keys.items.push({
                        key : element,
                        index : index
                    })
                });
            }
        });

        //Set select inpout from json lang file
        Object.entries(langData).forEach(([key, value]) => {
            this.language.list.push({value:key, text:value.name});
        });
    },
    methods: {
        onKeySubmit(event){
            event.preventDefault();
            //create new project key
            projectData.setKey(this.$route.params.idProject,JSON.stringify({newKey:this.keys.newKey})).then(res=>{
                if(res.status == 200 && res.data.keys.length > 0 && this.keys.newKeyTranslation != ""){
                    const data = {
                        language:this.project.default,
                        translation:this.keys.newKeyTranslation,
                        index: res.data.keys.length-1
                    }
                    //create new transaltion key
                    translationData.setKeyFromProject(this.$route.params.idProject,data).then((res)=>{
                        if(res.status == 200){
                            console.log('tout bon');
                            this.keys.items.push({key:this.keys.newKey});
                            this.keys.newKey = "";
                            this.keys.newKeyTranslation = "";
                        }
                    });
                }else if(this.keys.newKeyTranslation == ""){
                    this.keys.items.push({key:this.keys.newKey});
                    this.keys.newKey = "";
                    this.keys.newKeyTranslation = "";
                }
            });
        }
    },  
}
</script>

<style >
.collapsed > .when-open,
.not-collapsed > .when-closed {
    display: none;
}
</style>