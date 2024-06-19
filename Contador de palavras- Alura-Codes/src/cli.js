import fs from 'fs';
import path from 'path';
import trataErros from './erros/funcaoerro.js';
import { contaPalavras } from './index.js';
import { montaTextoFinal } from './helpers.js';
import { Command } from 'commander';
import chalk from 'chalk';

const program = new Command();

program
    .version('0.0.1')
    .option('-t, --texto <string>', 'caminho do texto')
    .option('-d, --destino <string>', 'Destino do texto')
    .action((options) => {
        const { texto, destino } = options;

        if (!texto || !destino){
            console.error(chalk.red('Erro: favor inserir os dados corretos'))
            program.help();
            return;
        }
            const caminhoTexto = path.resolve(texto);
            const caminhoDestino = path.resolve(destino);
        try {
            processaArquivo(caminhoTexto, caminhoDestino);
            console.log(chalk.green('Operação bem-sucedida.'))
        } catch (erro) {
            console.log(chalk.red('Ocorreu erro no processamento', erro));
        }
    })



program.parse();

function processaArquivo(texto, destino){
    fs.readFile(texto, 'utf-8', (erro, texto) => {
        try {
            if (erro) throw erro
            const resultado = contaPalavras(texto);
            createAndSave(resultado, destino);
        } catch(erro) {
            trataErros(erro);
        }
    })

}


async function createAndSave(listaPalavras, endereco) {
    const arquivoNovo = `${endereco}/resultado.txt`;
    const textoPalavras = montaTextoFinal(listaPalavras);
    try {
        await fs.promises.writeFile(arquivoNovo, textoPalavras);
        console.log(chalk.blue('Arquivo criado em ', arquivoNovo));
    } catch(erro) { 
        throw erro;
    }
}
