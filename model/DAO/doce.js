/****************************************************************************************
 * Objetivo: Arquivo responsável pela realização do CRUD no Banco de Dados MySQL
 * Data: 26/05/2026
 * Autor: Giovana
 * Versão: 1.0
 ****************************************************************************************/

//importa a conexão do knex
const db = require('../connection.js')

//Retorna todos os doces do banco de dados 
const getSelectAllCandys = async function () {
    try{
       
        //Executa no bc o script sql
        let result = await db('tbl_doce').orderBy('id_doce', 'desc')        
            return result
    } catch (error) {
        return false 
    }
}

const getSelectByIdCandy = async function (id) {

    try {

       

        //Executa no BD o script SQL
        let result = await db('tbl_doce').where('id_doce', id);
            return result
       
    } catch (error) {
        return false
    }
    
}

const setInsertCandys = async function (doce) {
    try{

        let result = await db('tbl_doce').insert({

        tipo: doce.tipo, 
        nome: doce.nome, 
        massa: doce.massa, 
        recheio: doce.recheio, 
        cobertura: doce.cobertura, 
        qtd: doce.qtd, 
        peso: doce.peso, 
        porcao: doce.porcao, 
        preco: doce.preso,
        data_validade: doce.data_validade, 
        status: doce.status || 'Disponível'
       
        })
       
        return result.length > 0
    } catch (error) {
        return false
    }
}

const setUpdateCandys = async function (doce) {

    try{

        let sql = `update tbl_doce set
        tipo,               =   '${doce.tipo}',
        nome                =   '${doce.nome}',
        massa               =   '${doce.massa}'
        recheio             =   '${doce.recheio}'
        cobertura           =   '${doce.cobertura}'
        qtd                 =   '${doce.qtd}'
        peso                =   '${doce.peso}'
        preco               =   '${doce.preco}'
        data_validade       =   '${doce.data_validade}'
        status              =   '${doce.status}'
        where id_doce = ${doce.id_doce}`

        
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
        return false
        
} catch (error) {
    return false
}

}

const setDeleteCandys = async function (id) {
    
    try {
        let sql = `delete from tbl_doce where id_doce = ${id}`


        let result = await prisma.$executeRawUnsafe(sql)

        if(result > 0)
            return true
        else 
        return false 

    } catch (error){
        return false
    }
    
}

module.exports = {
    getSelectAllCandys,
    getSelectByIdCandy,
    setInsertCandys,
    setUpdateCandys,
    setDeleteCandys
}