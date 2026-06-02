/****************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a Model
 * (validações, tratamento de dados, tratamento de erros, etc)
 * Data: 29/05/2026
 * Autor: Giovana
 * Versão: 1.0
 ****************************************************************************************/ 


const funcionarioDAO = require('../model/DAO/funcionario.js')


const MESSAGE_DEFAULT = require('./modulo/config_messages.js')

const fazerLogin = async (login) => {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))
    try{
        if(!login.email || login.email == ''|| !login.senha || login.senha == '') {
           return MESSAGE.ERROR_REQUIRED_FIELDS
        }

        const funcionario = await funcionarioDAO.getSelectByEmailFuncionario(login.email)

        if(!funcionario){
            return {status: false, status_code: 401, message: "Usuário ou senha inválidos!"}
        }

        const dadosFuncionario = Array.isArray(funcionario) ? funcionario[0] : funcionario
        // validação direta da senha 
        if(login.senha !== funcionario.senha) {
            return{ status: false, status_code: 401, message: "Usuário ou senha inválidos."}
        }

        const {senha, ...usuarioLogado} = funcionario
        return {
            status: true,
            status_code: 200,
            message: "Login efetuado com sucesso!",
            usuario: usuarioLogado
        }
    } catch (error) {
        return {status: false, status_code: 500, message: "Erro interno na controller" + error.message}
    }
}

module.exports = {
    fazerLogin
}