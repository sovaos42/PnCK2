let eventBus = new Vue()

Vue.component('notes', {
    data(){
        return{
            notes:[{
                notes1: [],
                notes2: [],
                notes3:[]
            }]
        }
    },
    template:
        `
    <div class="all">
        <div class="all-notes" >
        <div class="row" >
            <div class="note1" v-for="(variant, index) in notes" :key="variant.notes1">
                <cards></cards>
            </div>
            <div class="note2" v-for="(variant, index) in notes" :key="variant.notes2">
                
            </div>
            <div class="note3" v-for="(variant, index) in notes" :key="variant.notes3">
              
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

    },
    methods:{

    }

})

Vue.component('cards',{

    data(){
        return{
            arrNote:[],
            listNote: [],
            listCard: []
        }
    },

    template:
        `
        <div class="card">
            <div class="conc" v-for="cards in listCard">
                    <p>{{ cards.name }}</p>
                    <p style="white-space: pre-line;"> {{ cards.list }}</p>
            </div>
        </div>
        
    `,

    computed: {
    },
    methods: {
        addList(item) {
            this.listNote.push(item)
            console.log("1")
        }
    },
    mounted() {
        eventBus.$on('notes-form', cards =>{
            this.listCard.push(cards)
            console.log(this.listCard)
        })
    }
})

Vue.component('form-cards', {
    props:{
        notes: {
            type: Array
        }
    },
    template:
        `
    <div class="all-form-cards">
    <div class="center">
   <form @submit.prevent="onForm" v-if="!this.notes1 < 2"> 
            <input v-model="name" type="text" placeholder="name" class="input-name"><br>
            <label for="list">Enter notes</label><br>
            <textarea v-model="list" id="list" placeholder="Notes"></textarea><br>
            <button type="submit" class="button-submit">Add notes</button>
        </form>
        </div>
         <p v-if="errors.length">
             <b>Please correct the following error(s):</b>
             <ul>
               <li v-for="error in errors">{{ error }}</li>
             </ul>
            </p>
        
    </div>
    `,
    data(){
        return{
            name: null,
            list: null,
            errors: []
        }
    },
    methods:{

        onForm(){
            if(this.name && this.list && 3 <= this.list.split("\n").length && this.list.split("\n").length <= 5){

                let notesForm = {
                    name: this.name,
                    list: this.list,
                }
                eventBus.$emit('notes-form', notesForm)
                this.name = null
                this.list = null
            }
            else{
                this.errors = []
                if(!this.name) this.errors.push("Введите заголовок.")
                if(!this.list) this.errors.push("Введите текст.")
                if(this.list.split("\n").length <= 3) this.errors.push("Минимум 3.")
                if(this.list.split("\n").length >= 5) this.errors.push("Максимум 5.")
            }
        },

    }
})

let app = new Vue({
    el: '#app',
    data:{

    },

})