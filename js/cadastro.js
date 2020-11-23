class Vinil {
    constructor(){
        this.vinis = localStorage.getItem('tbVinis') === null
        ? []
        : JSON.parse(localStorage.getItem('tbVinis'))
    }

    salva(vinil){                                                                       
        if(document.getElementById('codigo').getAttribute('disabled')==='disabled'){      
            this.apaga(vinil.codigo)                                                    
        }                                                                                   
        this.vinis.push(vinil) //adicionar um novo registro no fim do array            
        localStorage.setItem('tbVinis',JSON.stringify(this.vinis)) 
        document.getElementById('alertas').innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>Vinil salvo com sucesso!
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`           
    }

    apaga(codigo){                                                                          
        let index = this.vinis.findIndex(vinil => vinil.codigo == codigo)            
        //primeiro parametro é o indice do array e o segundo é o número de itens removidos
        this.vinis.splice(index, 1)
        localStorage.setItem('tbVinis',JSON.stringify(this.vinis))
        document.getElementById('alertas').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Vinil apagado!
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`  
        vinil.atualiza()
    }

    edita(vinil){
        document.getElementById('codigo').value = vinil.codigo
        document.getElementById('codigo').setAttribute('disabled','disabled')
        document.getElementById('titulo').value = vinil.titulo
        document.getElementById('artista').value = vinil.artista
        document.getElementById('gravadora').value = vinil.gravadora
        document.getElementById('anoGravacao').value = vinil.anogravacao
        document.getElementById('valor').value = vinil.valor
    }

    lista(){
        const listagem = this.vinis.map((vinil) => (`
        <tr>
            <td>${vinil.codigo}</td>
            <td>${vinil.titulo}</td>
            <td>${vinil.artista}</td>
            <td>${vinil.gravadora}</td>
            <td>${vinil.anogravacao}</td>
            <td>R$ ${vinil.valor}</td>
            <td>
                <button id="apagar" type="button" class="btn btn-danger" onClick='vinil.apaga(${vinil.codigo})'>🗑 Apagar</button>
                <button id="editar" type="button" class="btn btn-warning" onClick='vinil.edita(${JSON.stringify(vinil)})'>🗒 Editar</button>
            </td>
        </tr>
        `)).join("")
        return (`
        <table border='1' class="table table-striped table-borderless">
            <caption>Relação dos Vinis Cadastrados</caption>
            <thead class="thead-dark">
                <th>Código</th>
                <th>Título</th> 
                <th>Artista</th>
                <th>Gravadora</th>
                <th>Ano Gravação</th>
                <th>Valor</th>
                <th>Opções</th>
            </thead>
            <tbody>${listagem}</tbody>
        </table>
        `)
    }
    atualiza(){
        document.getElementById('listagem').innerHTML = vinil.lista()
    }
    cancela(){
        document.getElementById('codigo').removeAttribute('disabled')
        document.getElementById('codigo').value=''
        document.getElementById('titulo').value=''
        document.getElementById('artista').value=''
        document.getElementById('gravadora').value=''
        document.getElementById('anoGravacao').value=''
        document.getElementById('valor').value=''
        document.getElementById('alertas').innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Edição Cancelada!
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`
    }
    limpa(){
        document.getElementById('codigo').removeAttribute('disabled')
        document.getElementById('codigo').value=''
        document.getElementById('titulo').value=''
        document.getElementById('artista').value=''
        document.getElementById('gravadora').value=''
        document.getElementById('anoGravacao').value=''
        document.getElementById('valor').value=''
    }
}

//instanciamos um novo objeto
const vinil = new Vinil()

//Tratando o btnSalvar
document.getElementById('salvar').onclick = function(){
    const registro = {
        codigo: document.getElementById('codigo').value,
        titulo: document.getElementById('titulo').value,
        artista: document.getElementById('artista').value,
        gravadora: document.getElementById('gravadora').value,
        anogravacao: document.getElementById('anoGravacao').value,
        valor: document.getElementById('valor').value
    }
    if(registro.codigo === ''){
        document.getElementById('alertas').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>O código do vinil é obrigatório!
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`
        return false;
    }
    vinil.salva(registro)
    vinil.limpa()
    vinil.atualiza()
}

//Tratando btnCancelar
document.getElementById('cancelar').onclick = function(){
        vinil.cancela()
        vinil.atualiza()
}

//Tratando a listagem
window.onload = function(){
    vinil.atualiza()
}
