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
                <cards :cardList="notes1" :AlertList="AlertList"></cards>
            </div>
            <div class="note2">
                <cards :cardList="notes2" :AlertList="AlertList"></cards>
            </div>
            <div class="note3">
                <cards :cardList="notes3" :AlertList="AlertList"></cards>
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
    methods: {
        AlertList(cards, note) {

            let count = 0; 
            let num = 0; 

            for (let i in cards.arrList) {
                if (cards.arrList[i].title != null) 
                    count++;

                if (cards.arrList[i].title == note) 
                    num = i;
            }
            
            if (this.notes1.indexOf(cards) >= 0) { 
                if (this.notes2.length < 5) { 
                    if ((100 / count) * cards.count_t > 50) {
                        this.notes2.push(cards);
                        this.notes1.splice(this.notes1.indexOf(cards), 1)

                        if (this.check == false && this.notes1.length != 3) 
                            this.check = true;
                    }
                } else {
                    cards.arrList[num].complete = false;
                    cards.count_t -= 1;
                    return;
                }
            }

            if (this.notes2.indexOf(cards) >= 0) { 
                if ((100 / count) * cards.count_t == 100) {
                    cards.date = new Date().toLocaleString();
                    this.notes3.push(cards);
                    this.notes2.splice(this.notes2.indexOf(cards), 1);
                }

                return;
            }

            if (this.notes3.indexOf(cards) >= 0) {
                cards.count_t -= 1;
                return;
            }
        }
    }

})

Vue.component('cards',{
    props: {
        formCards: {
            type: Object
        },
        cardList:[],
        AlertList:{
            type: Function
        }
    },

    template:
        `
        <div class="card">
            <div class="conc" v-for="formCards in cardList">
                    <p>{{ formCards.names }}</p>
                    <ul>
                        <li class="notess" v-for="list in formCards.arrList">
                        <div
                            @click="formCards.count_t = check(list.complete, formCards.count_t),
                            list.complete = true, AlertList(formCards, list.title)">
                            {{list.title}}
                        </div>
                        <div v-if="list.title != null && list.complete === false">-</div >
                        <div v-else-if="list.complete == true">+</div>
                        </li>
                    </ul>
                    <div v-if="formCards.date != null">
                        {{formCards.date}}
                    </div>
            </div>
        </div>  
    `,
    methods:{
        check(compl, count_t){
            if(compl == false){
                count_t++;
                return count_t;
            }
            return count_t;
        }
    }
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
            <input v-model="names" id="name" type="text" placeholder="name" class="input-name"><br>
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
            names: null,
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
                    names: this.names,
                    arrList:[
                        {title: this.listOne, complete: false},
                        {title: this.listTwo, complete: false},
                        {title: this.listThree, complete: false},
                        {title: this.listFour, complete: false},
                        {title: this.listFive, complete: false},
                    ],
                    count_t: 0,
                    date: null
                }
                eventBus.$emit('notes-form', formCards)

                this.names = null
                this.listOne = null
                this.listTwo = null
                this.listThree = null
                this.listFour = null
                this.listFive = null
            }
            else{
                
                if(!this.names) this.errors.push("Введите заголовок.")
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