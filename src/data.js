class Bioma {
    constructor() {
        this.savana = { id: 1, nome: "savana", tamanho: 10, animais: [] };
        this.floresta = { id: 2, nome: "floresta", tamanho: 5, animais: [] };
        this.savanaRio = { id: 3, nome: "savanaRio", tamanho: 7, animais: [] };
        this.rio = { id: 4, nome: "rio", tamanho: 8, animais: [] };
        this.outraSavana = { id: 5, nome: "outraSavana", tamanho: 9, animais: [] };

        this.atualizarOcupacao();
    }

    atualizarOcupacao() {
        this.savana.ocupacao = this.savana.animais.reduce((acc, animal) => {
            return acc + animal.tamanho
        }, 0);
        this.floresta.ocupacao = this.floresta.animais.reduce((acc, animal) => {
            return acc + animal.tamanho
        }, 0);
        this.savanaRio.ocupacao = this.savanaRio.animais.reduce((acc, animal) => {
            return acc + animal.tamanho
        }, 0);
        this.rio.ocupacao = this.rio.animais.reduce((acc, animal) => {
            return acc + animal.tamanho
        }, 0);
        this.outraSavana.ocupacao = this.outraSavana.animais.reduce((acc, animal) => {
            return acc + animal.tamanho
        }, 0);
    }

    acomodaAnimais(animais, quantidade) {
        const animalControle = animais[0];
        const recintos = [this.savana, this.floresta, this.savanaRio, this.rio, this.outraSavana];
        const recintosViaveis = [];

        recintos.forEach(recinto => {
            const biomaCompativelComAnimalControle = recinto.nome.toLowerCase().includes(animalControle.bioma.toLowerCase()) ||
                (animalControle.biomaSecundario && recinto.nome.toLowerCase().includes(animalControle.biomaSecundario.toLowerCase()));

            if (!biomaCompativelComAnimalControle) return;

            let espacoNecessario = quantidade * animalControle.tamanho;
            const ocupacaoAtual = recinto.ocupacao;
            const espacoDisponivel = recinto.tamanho - ocupacaoAtual;

            const diferentesEspecies = recinto.animais.some(a => a.nome !== animalControle.nome);
            if (diferentesEspecies) espacoNecessario += 1;

            if (animalControle.comportamentoAlimentar === 'Carnívoro' && diferentesEspecies) return;
            if (animalControle.nome === 'HIPOPOTAMO' && diferentesEspecies && recinto.nome !== 'savanaRio') return;
            if (animalControle.nome === 'MACACO' && quantidade === 1 && recinto.animais.length === 0) return;

            if (espacoDisponivel >= espacoNecessario) {
                const espacoLivre = espacoDisponivel - espacoNecessario;
                recintosViaveis.push(`Recinto ${recinto.id} (espaço livre: ${espacoLivre} total: ${recinto.tamanho})`);
            }
        });

        if (recintosViaveis.length === 0) {
            return new ZooError("Não há recinto viável");
        }

        return {
            erro: false,
            recintosViaveis: recintosViaveis.slice(0, 3)
        };

    }
}

class Animal {
    constructor(nome) {
        switch (nome) {
            case "LEAO":
                this.nome = nome;
                this.tamanho = 3;
                this.bioma = "savana";
                this.comportamentoAlimentar = "Carnívoro";
                break;
            case "LEOPARDO":
                this.nome = nome;
                this.tamanho = 2;
                this.bioma = "savana";
                this.comportamentoAlimentar = "Carnívoro";
                break;
            case "CROCODILO":
                this.nome = nome;
                this.tamanho = 3;
                this.bioma = "rio";
                this.comportamentoAlimentar = "Carnívoro";
                break;
            case "MACACO":
                this.nome = nome;
                this.tamanho = 1;
                this.bioma = "savana";
                this.biomaSecundario = "floresta";
                this.comportamentoAlimentar = "Onivoro";
                break;
            case "GAZELA":
                this.nome = nome;
                this.tamanho = 2;
                this.bioma = "savana";
                this.comportamentoAlimentar = "Herbívoro";
                break;
            case "HIPOPOTAMO":
                this.nome = nome;
                this.tamanho = 4;
                this.bioma = "savana";
                this.biomaSecundario = "rio";
                this.comportamentoAlimentar = "Herbívoro";
                break;
            default:
                return new ZooError("Animal inválido");

        }
    }
}

class ZooError {
    constructor(nome) {
        switch (nome) {
            case "Animal inválido":
                this.erro = "Animal inválido";
                this.recintosViaveis = false;
                break;
            case "Quantidade inválida":
                this.erro = "Quantidade inválida";
                this.recintosViaveis = false;
                break;
            case "Não há recinto viável":
                this.erro = "Não há recinto viável";
                this.recintosViaveis = false;
                break;
            default:
                break;
        }
    }
}

export { Bioma, Animal, ZooError };