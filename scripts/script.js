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
                    <ul>
                        <li v-for="list in formCards.arrList">
                                {{list.title}}
                            </div>
                            
                        </li>
                    </ul>
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
    </div>
    <div class="all-form-cards">
    <div class="center">
   <form @submit.prevent="onForm"> 
            <label for="name">Имя заметки</label>
            <input v-model="name" id="name" type="text" placeholder="name" class="input-name"><br>
            <input v-model="listOne" type="text" placeholder="Заметка 1">
            <input v-model="listTwo" type="text" placeholder="Заметка 2">
            <input v-model="listThree" type="text" placeholder="Заметка 3">
            <input v-model="listFour" type="text" placeholder="Заметка 4">
            <input v-model="listFive" type="text" placeholder="Заметка 5">
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
            listOne: null,
            listTwo: null,
            listThree: null,
            listFour: null,
            listFive: null,
            errors: [],
        }
    },
    methods:{
        onForm(){
            if(this.listOne && this.listTwo && this.listThree){
                let formCards = {
                    name: this.name,
                    arrList:[
                        {title: this.listOne, complete: false},
                        {title: this.listTwo, complete: false},
                        {title: this.listThree, complete: false},
                        {title: this.listFour, complete: false},
                        {title: this.listFive, complete: false},
                    ]
                }
                eventBus.$emit('notes-form', formCards)

                this.name = null
                this.listOne = null
                this.listTwo = null
                this.listThree = null
                this.listFour = null
                this.listFive = null
            }
            else{
                
                if(!this.name) this.errors.push("Введите заголовок.")
                if(!this.listOne) this.errors.push("Заполните заметку 1.")
                if(!this.listTwo) this.errors.push("Заполните заметку 2.")
                if(!this.listThree) this.errors.push("Заполните заметку 3.")
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