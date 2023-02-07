let eventBus = new Vue()

Vue.component('notes', {
    props:{
        check:{
            type: Boolean,
        }
    },

    data(){
        return{
            notes1:[],
            notes2:[],
            notes3:[],            
        }
    },

    template:
        `
    <div class="all">
        <div class="all-notes">
        <div class="row" >
            <div class="note1">
                <cards v-for="formCards in notes1" :formCards="formCards"></cards>
            </div>
            <div class="note2">
                <cards v-for="formCards in notes2" :formCards="formCards"></cards>
            </div>
            <div class="note3">
                <cards v-for="formCards in notes3" :formCards="formCards"></cards>
            </div>
        </div>
            <div class="from-cards">
                <form-cards :check="check"></form-cards>
            </div>
        </div>

    </div>
    `,
    mounted() {
        eventBus.$on('notes-form', formCards =>{
            if(this.notes1.length <= 2){
                this.notes1.push(formCards)
                if(this.notes1.length == 3){
                    this.check = false
                }
            }
        })
    },
    methods:{
    
    }

})

Vue.component('cards',{
    props: {
        formCards: {
            type: Object
        }
    },

    template:
        `
        <div class="card">
            <div class="conc">
                    <p>{{ formCards.name }}</p>
                    <p style="white-space: pre-line;"> {{ formCards.list }}</p>
            </div>
        </div>
        
    `
})

Vue.component('form-cards', {
    props:{
        check:{
            type: Boolean,
        }
    },

    template:
        `
    <div class="all-form-cards">
    <div class="center">
   <form @submit.prevent="onForm"> 
            <input v-model="name" type="text" placeholder="name" class="input-name" :disabled="!check"><br>
            <label for="list">Enter notes</label><br>
            <textarea v-model="list" id="list" placeholder="Notes" :disabled="!check"></textarea><br>
            <button type="submit" class="button-submit" :disabled="!check">Add notes</button>
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
            errors: [],
        }
    },
    methods:{

        onForm(){
            if(this.name && this.list && 3 <= this.list.split("\n").length && this.list.split("\n").length <= 5){

                let formCards = {
                    name: this.name,
                    list: this.list,
                }
                eventBus.$emit('notes-form', formCards)
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
    data(){
        return{
            check: true
        }
    },

})