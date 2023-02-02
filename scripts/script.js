Vue.component('notes', {

    template:
    `
    <div class="all">
        <div class="all-notes">
        <div class="row">
            <div class="note">
                <cards></cards>
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
        
    </div>
    `,

})

Vue.component('cards',{

    template:
    `
    <div class="card">
    <h3>Card</h3>
    
       <div>
       
                <ul>
                      <li v-for="form in forms">
                          <p>{{ form.name }}</p>
                          <p>{{ form.list }}</p>
                      </li>
                </ul>
        </div>
        <notesForm @notes-form="addForm"></notesForm>
    </div>
    `,
    data(){
        return{

            forms: []

        }
    },
    computed: {
    },
    methods: {
        addForm(notesForm) {
            this.forms.push(notesForm)
        }

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
            this.$emit('notes-form', notesForm)
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