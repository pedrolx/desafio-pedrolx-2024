import { Bioma, Animal, ZooError } from "./data";

class RecintosZoo {

    analisaRecintos(animal, quantidade) {
        const bioma = this.inicializaBiomas();

        const animalValido = new Animal(animal);

        if (animalValido instanceof ZooError) {
            return animalValido
        }

        if (quantidade <= 0) {
            return new ZooError("Quantidade inválida");
        }

        const animaisParaAcomodacao = this.retornaAnimais(quantidade, animal);

        const resultadoAcomodacao = bioma.acomodaAnimais(animaisParaAcomodacao,
            quantidade);

        return resultadoAcomodacao;
    }

    inicializaBiomas() {
        const bioma = new Bioma;
        const animaisExistentes = {
            macacos: this.retornaAnimais(3, "MACACO"),
            gazela: this.retornaAnimais(1, "GAZELA"),
            leao: this.retornaAnimais(1, "LEAO"),
        }

        bioma.savana.animais.push(...animaisExistentes.macacos);
        bioma.atualizarOcupacao();
        bioma.savanaRio.animais.push(...animaisExistentes.gazela);
        bioma.atualizarOcupacao();
        bioma.outraSavana.animais.push(...animaisExistentes.leao);
        bioma.atualizarOcupacao();

        return bioma;
    }

    retornaAnimais(numero, animal) {
        const animais = Array.from({ length: numero }, () => new Animal(animal));
        return animais
    }

}

export { RecintosZoo as RecintosZoo };
