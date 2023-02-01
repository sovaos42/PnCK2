Vue.component('notes', {

    template:
    `
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
    `

})

Vue.component('cards',{

    template:
    `
    
    <div class="card">
    <h3>Card</h3>
        <ul>
            <li>drfbeegeer</li>
            <li>ewgw</li>
            <li>ewgweg</li>
        </ul>
    </div>
    `
})

Vue.component('form-cards', {

    template:
    `
    <div class="all-form-cards">
        <form> 
            <input type="text" placeholder="name">
            <label for="list">Enter notes</label>
            <textarea id="list" placeholder="Notes"></textarea>
            <button type="submit">Add notes</button>
        </form>
    </div>
    `
})

let app = new Vue({
    el: '#app',

})