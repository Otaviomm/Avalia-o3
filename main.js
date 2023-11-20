const conteudo = document.querySelector('#conteudo');
function menu(link){
    
   fetch('pages/' + link + '.html')
   .then(response => response.text())
   .then(html => conteudo.innerHTML = html)
   .catch(error => console.innerHTML = 'Página não encontrada');
}
const tbody = document.querySelector('#dados');
const url = 'https://teste-d1f43-default-rtdb.firebaseio.com/'
const nome = document.querySelector('#nome');
const email = document.querySelector('#email');
const senha = document.querySelector('#senha');
const id = document.querySelector('#id');

var clientes = [];
const render = () => {

    tbody.innerHTML = '';
    clientes.sort().forEach(usuario => {
        const tr = document.createElement('tr');
        const tdId = document.createElement('td');
        const tdNome = document.createElement('td');
        const tdEmail = document.createElement('td');
        const tdSenha = document.createElement('td');
        const tdAcoes = document.createElement('td');

        tdId.innerHTML = usuario.id;
        tdNome.innerHTML = usuario.nome;
        tdEmail.innerHTML = usuario.email;
        tdSenha.innerHTML = usuario.senha;

        const iconeEditar = document.createElement('i');
        const iconeRemover = document.createElement('i');

        iconeEditar.className = 'mdi mdi-pencil';
        iconeRemover.className = 'mdi mdi-delete';

        iconeEditar.addEventListener('click', () => loadEdit(usuario.id));
        iconeRemover.addEventListener('click', () => Delete(usuario.id));

        tdAcoes.appendChild(iconeEditar);
        tdAcoes.appendChild(iconeRemover);

        tr.appendChild(tdId);
        tr.appendChild(tdNome);
        tr.appendChild(tdEmail);
        tr.appendChild(tdSenha);
        tr.appendChild(tdAcoes);
        tbody.appendChild(tr);
    });
}
render();

function loadEdit(key) {
    const clienteEdit = clientes.find(cliente => cliente.id === key);
    nome.value = clienteEdit.nome;
    email.value = clienteEdit.email;
    senha.value = clienteEdit.senha;
    id.value = clienteEdit.id;
}

function Save() {
    (id.value == '') ? Create() : Update(); 
}

function Create() {
    const cliente = {
        nome: nome.value,
        email: email.value,
        senha: senha.value
    }

    fetch(url + '/clientes.json', {
        method: 'POST', 
        body: JSON.stringify(cliente) 
    }) 
        .then(response => response.json) 
        .then(() => {
            nome.value = ''
            email.value = ''
            senha.value = ''
            Read();
        }) 
        .catch(error => console.log(error)); 
}
function Read() {
    fetch(url + '/clientes.json', {
        method: 'GET'
    })
        .then(response => response.json())
        .then(response => {
            clientes = [];
            for (const id in response) {
                response[id].id = id
                clientes.push(response[id])
            }
            render();
        })
        .catch();
}
function Update() {
    const cliente = {
        nome: nome.value,
        email: email.value,
        senha: senha.value
    }
    fetch(url + '/clientes/' + id.value + '.json', {
        method: 'PUT',
        body: JSON.stringify(cliente)
    })
        .then(() => Read())
        .catch(error => console.log(error));
}
function Delete(id) {
    fetch(url + '/clientes/' + id + '.json', {
        method: 'DELETE'
    })
        .then(() => Read())
        .catch(error => console.log(error));
}