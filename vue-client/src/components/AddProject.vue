<template>
    <div>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group id="input-group-1" label="Project Name:" label-for="input-1">
                <b-form-input
                id="input-1"
                v-model="form.name"
                placeholder="Enter project name"
                required
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Description:" label-for="input-2">
                <b-form-textarea
                id="input-2"
                v-model="form.description"
                placeholder="Describe project"
                ></b-form-textarea>
            </b-form-group>

            <b-form-group id="input-group-3" label="Default language:" label-for="input-3">
                <b-form-select
                id="input-3"
                v-model="form.language"
                :options="languages"
                required
                ></b-form-select>
            </b-form-group>

            

            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger" class="ml-3">Reset</b-button>
        </b-form>
    </div>
</template>
<script>
import projectData from '../../services/ProjectDataService';
import langData from '../../ressources/lang.json'
export default {
    data() {
        return {
            form: {
                name: '',
                description: '',
                language: null,
            },
            languages: [
                { value: null, text: 'Please select an option',disabled: true }
            ], 
            show: true
        }   
    },
    mounted() {
        //Set select inpout from json lang file
        Object.entries(langData).forEach(([key, value]) => {
            this.languages.push({value:key, text:value.name});
        });
    },
    methods: {
        onSubmit(event) {
            event.preventDefault()
            projectData.create(this.form).then(res => {
                if(res.status == 200){
                    this.$router.push('projects');
                }
                else{
                    alert("Something failed");
                }
            });
        },
        onReset(event) {
            event.preventDefault();
            // Reset our form values
            this.form.name = ''
            this.form.description = ''
            this.form.language = null
            // Trick to reset/clear native browser form validation state
            this.show = false
            this.$nextTick(() => {
                this.show = true
            })
        }
    }
}
</script>

<style>
</style>