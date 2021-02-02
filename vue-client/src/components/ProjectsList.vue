<template>
    <div>
        <b-card-group deck>
            <b-card
            tag="article"
            class="mb-2 col5"
            body-class="text-center"
            v-for="project in projects"
            :key="project.id">
                <b-card-title :title="project.name" style="text-align:left;"></b-card-title>
                <b-card-text>
                    {{project.description}}
                </b-card-text>
                <b-button :to="{ name: 'project-details', params: { idProject: project._id}}" variant="light">Edit</b-button>
            </b-card>
            
            <b-card
                tag="article"
                class="mb-2 col5"
                body-class="text-center">
                <b-card-text>
                    <b-icon icon="clipboard-plus" animation="throb" font-scale="4"></b-icon>
                </b-card-text>

                <b-button :to="{name :'add-project'}" variant="primary">Add new project</b-button>
            </b-card>
        </b-card-group>
    </div>
</template>

<script>
import projectData from '../../services/ProjectDataService';
export default {
    data() {
        return {
            projects : null
        }
    },
    mounted() {
        projectData.getAll().then(res=>{
            if (res.status == 200)
                this.projects = res.data;
        });
    },
}
</script>

<style>
    .col5{
        min-width: calc(20% - 30px);
        max-width: calc(20% - 30px);
    }
</style>