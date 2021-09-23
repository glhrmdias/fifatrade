class Trade {

    constructor() {
        this.id = 1;
        this.arrayTrades = [];
        this.lucro = 0;
        this.porcentagem = 0;
        this.venda = 0;
        this.editId = null;
    }

    salvar() {
        let trade = this.lerDados();

        if (this.validaCampos(trade)) {
            if(this.editId == null){
                this.adicionar(trade)
            } else{
                this.atualizar(this.editId, trade);
            }
            
        }

        this.listaTabela();
        this.cancelar();
    }

    listaTabela() {
        let tbody = document.getElementById('tbody');
        tbody.innerText = '';

        for (let i = 0; i < this.arrayTrades.length; i++) {
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_nome = tr.insertCell();
            let td_over = tr.insertCell();
            let td_valorCompra = tr.insertCell();
            let td_porcentagem = tr.insertCell();
            let td_valorVenda = tr.insertCell();
            let td_lucro = tr.insertCell();
            let td_acoes = tr.insertCell();

            td_id.innerText = this.arrayTrades[i].id;
            td_nome.innerText = this.arrayTrades[i].nome;
            td_over.innerText = this.arrayTrades[i].over;
            td_valorCompra.innerText = this.arrayTrades[i].valorCompra;
            td_porcentagem.innerText = this.arrayTrades[i].porcentagem;
            td_lucro.innerText = this.arrayTrades[i].lucro;
            td_valorVenda.innerText = this.arrayTrades[i].venda;

            td_id.classList.add('center');
            td_over.classList.add('center');
            td_valorCompra.classList.add('center');
            td_porcentagem.classList.add('center');
            td_valorVenda.classList.add('center');
            td_lucro.classList.add('center');
            td_acoes.classList.add('center');

            let imgEdit = document.createElement('img');
            imgEdit.src = 'img/edit.svg';
            imgEdit.setAttribute("onClick", "trade.editar(" + JSON.stringify(this.arrayTrades[i]) + ")");

            let imgDelete = document.createElement('img');
            imgDelete.src = 'img/delete.svg';
            imgDelete.setAttribute("onClick", "trade.deletar(" + this.arrayTrades[i].id + ")");

            let imgCoin = document.createElement('img');
            imgCoin.src = 'img/coin.svg';

            let imgCoin2 = document.createElement('img');
            imgCoin2.src = 'img/coin2.svg';

            let imgCoin3 = document.createElement('img');
            imgCoin3.src = 'img/coin3.svg';

            td_acoes.appendChild(imgEdit);
            td_acoes.appendChild(imgDelete);
            td_valorCompra.appendChild(imgCoin);
            td_lucro.appendChild(imgCoin2);
            td_valorVenda.appendChild(imgCoin3);
        }
    }

    adicionar(trade) {
        trade.valorCompra = parseFloat(trade.valorCompra);
        this.arrayTrades.push(trade);
        this.id++;
    }

    atualizar(id, trade) {
        for(let i = 0; i < this.arrayTrades.length; i++) {
            if(this.arrayTrades[i].id == id){
                this.arrayTrades[i].nome = trade.nome;
                this.arrayTrades[i].over = trade.over;
                this.arrayTrades[i].valorCompra = trade.valorCompra;
                this.arrayTrades[i].porcentagem = trade.porcentagem;
                this.arrayTrades[i].venda = trade.venda;
                this.arrayTrades[i].lucro = trade.lucro;
            }
        }
    }

    lerDados() {
        let trade = {}

        trade.id = this.id;
        trade.nome = document.getElementById('nome').value;
        trade.over = document.getElementById('over').value;
        trade.valorCompra = document.getElementById('valorCompra').value;

        if (trade.over >= 75 && trade.over <= 79) {
            var porcentagem = 1.15;
            var compra = trade.valorCompra;
            var venda = compra * porcentagem;
            var lucro = venda - compra;

            trade.porcentagem = porcentagem;
            trade.venda = Math.round(venda);
            trade.lucro = Math.round(lucro);
        }

        if (trade.over >= 80 && trade.over <= 85) {
            var porcentagem = 1.25;
            var compra = trade.valorCompra;
            var venda = compra * porcentagem;
            var lucro = venda - compra;

            trade.porcentagem = porcentagem;
            trade.venda = Math.round(venda);
            trade.lucro = Math.round(lucro);
        }

        if (trade.over >= 86 && trade.over <= 90) {
            var porcentagem = 1.37;
            var compra = trade.valorCompra;
            var venda = compra * porcentagem;
            var lucro = venda - compra;

            trade.porcentagem = porcentagem;
            trade.venda = Math.round(venda);
            trade.lucro = Math.round(lucro);
        }

        if (trade.over >= 91) {
            var porcentagem = 1.45;
            var compra = trade.valorCompra;
            var venda = compra * porcentagem;
            var lucro = venda - compra;

            trade.porcentagem = porcentagem;
            trade.venda = Math.round(venda);
            trade.lucro = Math.round(lucro);
        }

        return trade;
    }

    validaCampos(trade) {
        let msg = '';

        if (trade.nome == '') {
            msg += '- Informe o nome do jogador.\n';
        }

        if (trade.over == '') {
            msg += '- Informe o over do jogador.\n';
        }

        if (trade.valorCompra == '') {
            msg += '- Informe o valor da compra do jogador.\n';
        }

        if (msg != '') {
            alert(msg);
            return false
        }

        return true;
    }

    cancelar() {
        document.getElementById('nome').value = '';
        document.getElementById('over').value = '';
        document.getElementById('valorCompra').value = '';

        document.getElementById('btn1').innerText = 'Adicionar';
        this.editId == null;
    }

    deletar(id) {
        if (confirm("Deseja deletar o item?")) {
            let tbody = document.getElementById('tbody');

            for (let i = 0; i < this.arrayTrades.length; i++) {
                if (this.arrayTrades[i].id == id) {
                    this.arrayTrades.splice(i, 1);
                    tbody.deleteRow(i);
                }
            }
        }
    }

    editar(dados) {
        this.editId = dados.id;

        document.getElementById('nome').value = dados.nome;
        document.getElementById('over').value = dados.over;
        document.getElementById('valorCompra').value = dados.valorCompra;

        document.getElementById('btn1').innerText = 'Atualizar';

    }

}

var trade = new Trade();