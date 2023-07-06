// ------------------------------ SELEÇÃO DE ELEMENTOS --------------- 
const addForm = document.querySelector("#add-form");
const addInput = document.querySelector("#add-input");
const addList = document.querySelector("#list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

let oldInputValue;

// ------------------------------ FUNÇÕES --------------- 

// Novo Livro
const saveValue = (text) => {

    // Criação do HTML
    const addi = document.createElement("div");
    addi.classList.add('to-read');

    const bookTitle = document.createElement("h3");
    bookTitle.innerText = text;
    addi.appendChild(bookTitle);

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-book");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    addi.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-book");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    addi.appendChild(editBtn);

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-book");
    removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    addi.appendChild(removeBtn);

    addList.appendChild(addi);

    addInput.value = "";
    addInput.focus();
};

// Mudança de forms

const toggleForms = () => {
    editForm.classList.toggle("hide");
    addForm.classList.toggle("hide");
    addList.classList.toggle("hide");
};

// Atualização de um Livro 
const updateBook = (text) => {
    const books = document.querySelectorAll(".to-read")

    books.forEach((book) => {
        let bookTitle = book.querySelector("h3")

        if(bookTitle.innerText === oldInputValue) {
            bookTitle.innerText = text; 
        }
    })
};

// ------------------------------ EVENTOS ---------------

// Novo Livro
addForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = addInput.value;

    // Validação 
    if (inputValue) {
        saveValue(inputValue);
    }
});

// Botões da Listagem
document.addEventListener("click", (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    let bookTitle;

    if (parentEl && parentEl.querySelector("h3")) {
        bookTitle = parentEl.querySelector("h3").innerText;
    }

    if (targetEl.classList.contains("finish-book")) {
        parentEl.classList.toggle("done");
    };

    if (targetEl.classList.contains("remove-book")) {
        parentEl.remove();
    };

    if (targetEl.classList.contains("edit-book")) {
        toggleForms();

        editInput.value = bookTitle;
        oldInputValue = bookTitle;
    };

});

// Botões da Edição
cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();

    toggleForms();
})

editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const editInputValue = editInput.value;

    if(editInputValue) {
        updateBook(editInputValue)
    };

    toggleForms();
})