let eventBus = new Vue()

Vue.component('notes', {
    data(){
        return{
            listCard: [],

        }
    },
    template:
    `
    <div class="all">
        <div class="all-notes">
        <div class="row">
            <div class="note">
                <cards :listCard="listCard"></cards>
            </div>
            <div class="note">
                <cards></cards>
            </div>
            <div class="note">
                <cards></cards>
            </div>
        </div>
            <div class="from-cards">
                <form-cards></form-cards>
            </div>
        </div>
        <notesForm></notesForm>
    </div>
    `,
    mounted(){
        eventBus.$on('notes-form', cards =>{
            this.listCard.push(cards)
        })
    }
})

Vue.component('cards',{
    props:{
        listCard: {
            type: Array
        }
    },
    template:
    `
        <div class="card" v-for="cards in listCard">
            <ul>
                    <li>
                        <p>{{cards.name }}</p>
                        <p>{{ cards.list }}</p>
                    </li>
            </ul>
        </div>
        
    `,
    data(){
        return{


        }
    },
    computed: {
    },
    methods: {
        

    }
})

Vue.component('form-cards', {

    template:
    `
    <div class="all-form-cards">
    <div class="center">
        <form @submit.prevent="onForm"> 
            <input v-model="name" type="text" placeholder="name" class="input-name" required ><br>
            <label for="list">Enter notes</label><br>
            <textarea v-model="list" id="list" placeholder="Notes" required ></textarea><br>
            <button type="submit" class="button-submit">Add notes</button>
        </form>
        </div>
    </div>
    `,
    data(){
        return{
            name: null,
            list: null,
        }
    },
    methods:{
        onForm(){
            let notesForm = {
                name: this.name,
                list: this.list,
            }
            eventBus.$emit('notes-form', notesForm)
            this.name = null
            this.list = null

        }
    }
})

let app = new Vue({
    el: '#app',
    data:{

    }
})