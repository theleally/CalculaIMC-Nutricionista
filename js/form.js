var botaoAdicionar = document.querySelector("#adicionar-paciente");

botaoAdicionar.addEventListener("click", function(event) {
  event.preventDefault();

  var form = document.querySelector("#form-adiciona");
  //Extraindo informações do paciente do form
  var paciente = obtemPacienteDoFormulario(form);
  //Cria a tr e a td do paciente
  var pacienteTr = montaTr(paciente);
  
  var erros = validaPaciente(paciente);
  console.log(erros);

  if(erros.length > 0) {
    exibeMensagensDeErro(erros);
    return;
  }

  //Adicionando o paciente na tabela
  adicionaPacienteNaTabela(paciente);

  form.reset();

  var mensagensErro = document.querySelector("#mensagens-erro");
  mensagensErro.innerHTML = "";

});











function adicionaPacienteNaTabela(paciente) {
  var pacienteTr = montaTr(paciente);
  var tabela = document.querySelector("#tabela-pacientes");
  tabela.appendChild(pacienteTr);
}

function exibeMensagensDeErro(erros) {
  var ul = document.querySelector("#mensagens-erro");
  ul.innerHTML = "";

  erros.forEach(function(erro) {
    var li = document.createElement("li"); // <li></li>
    li.textContent = erro; // <li>erro</li>
    ul.appendChild(li); // <ul id="mensagens-erro"> <li>erro</li> </ul>
  });
}

function obtemPacienteDoFormulario(form) {

  var paciente = {
    nome: form.nome.value,
    peso: form.peso.value,
    altura: form.altura.value,
    gordura: form.gordura.value,
    imc: calculaImc(form.peso.value, form.altura.value)
  }

  return paciente;
}

function montaTr(paciente) {
  var pacienteTr = document.createElement("tr"); // <tr></tr>
  pacienteTr.classList.add("paciente"); // <tr class="paciente"></tr>

  pacienteTr.appendChild(montaTd(paciente.nome, "info-nome")); // <tr class="paciente"><td class="info-nome">nome</td></tr>
  pacienteTr.appendChild(montaTd(paciente.peso, "info-peso"));
  pacienteTr.appendChild(montaTd(paciente.altura, "info-altura"));
  pacienteTr.appendChild(montaTd(paciente.gordura, "info-gordura"));
  pacienteTr.appendChild(montaTd(paciente.imc, "info-imc"));

  return pacienteTr;
}

function montaTd(dado, classe) {
  var td = document.createElement("td"); // <td></td>
  td.textContent = dado; // <td>dado</td>
  td.classList.add(classe); // <td class="classe">dado</td>

  return td;
}

function validaPaciente(paciente){

  var erros = [];

  if (paciente.nome.length == 0) {
    erros.push("O nome não pode estar em branco");
  }

  if (paciente.gordura.length == 0) {
    erros.push("A gordura não pode estar em branco");
  }

  if (paciente.peso.length == 0) {
    erros.push("O peso não pode estar em branco");
  }

  if (paciente.altura.length == 0) {
    erros.push("A altura não pode estar em branco");
  }

  if (!validaPeso(paciente.peso)) {
      erros.push("Peso é inválido");
  }

  if (!validaAltura(paciente.altura)) {
      erros.push("Altura é inválida");
  }

  return erros;
}
