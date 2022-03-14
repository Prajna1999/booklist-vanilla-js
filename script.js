// Create book class to dynamically add properties.
class Book{
    constructor(title, author, isbn){
        this.title=title,
        this.author=author,
        this.isbn=isbn
    }
}

// Class to handle UI tasks.
class UI{
    // Dont want to be instanitated everytime. 
    // This static method is required so that book list does not get recycled 
    // everytime the page refreshes. Objects to be added to the local memory.
    static displayBoooks(){
        const storedBooks=[
            // {
            //     title:"Book One",
            //     author: 'John Doe',
            //     isbn:'23432432'
            // },
            // {
            //     title:"Book Two",
            //     author: "Jane Doe",
            //     isbn:"21308"
            // }
        ];
        const books=storedBooks;
        books.forEach((book)=>UI.addBookToList(book));
    }
    // Add a clear filed method.
    static clearFields(){
        document.querySelector("#title").value="";
        document.querySelector("#author").value="";
        document.querySelector("#isbn").value="";

    }
    // show alert messages.
    static showMessage(message){
        const alertDiv= document.createElement('div');
        alertDiv.className='col s6 offset-s3 red darken-2';
        alertDiv.appendChild(document.createTextNode(message));
    }
    // Add a delete functioa
    static deleteBook(el){
        
        if(el.classList.contains("delete")){
            el.parentElement.parentElement.remove();
        }
    }
    // add book to the UI
    static addBookToList(book){
        // create row to put inside the tbody..
        const list=document.querySelector("#book-list");
        // create a tr.
        const row=document.createElement("tr");

        // Add columns.
        row.innerHTML=`
           <td>${book.title}</td> 
           <td>${book.author}</td>
           <td>${book.isbn}</td>
           <td><a href="#" class="btn-small red lighten-1 white-text delete">X</td>
        
        
        `;
        list.appendChild(row);
    }
}
// event: display books.
document.addEventListener("DOMContentLoaded", UI.displayBoooks);

// Event: click Submit.
document.querySelector("#book-form").addEventListener("submit", (e)=>{
    e.preventDefault();
    const title=document.querySelector("#title").value;
    const author=document.querySelector("#author").value;
    const isbn=document.querySelector('#isbn').value;

    //Validation. All book form fields must be filled.
    if(title==="" || author==="" || isbn===""){
    //  const alertDiv=  document.createElement('div');
    //  const alertText=document.createTextNode("sdfsdhfop");
    //  alertDiv.appendChild(alertText);
    // alertDiv.innerText="Something";
    alert("Fill in every field, you shithead.")
   
        
    }else{
            // instantiate a book object (class).
    const book=new Book(title, author, isbn);

    // Add to the list and show.
    UI.addBookToList(book);

    // clear form fileds after submitting.
    UI.clearFields();
    }




})

// Event: delete event.
document.querySelector("#book-list").addEventListener('click', (e)=>{
    UI.deleteBook(e.target);
})


