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
        preco: doce.preco,
        data_validade: doce.data_validade, 
        status: doce.status || 'Disponível'
       
        })
       
        return result.length > 0
    } catch (error) {
        console.log("Qual erro?:", error)
        return false
    }
}

const setUpdateCandys = async function (doce) {

    try{

        let result = await db('tbl_doce').where('id_doce', doce.id_doce).update({

        tipo: doce.tipo,             
        nome: doce.nome,  
        massa: doce.massa,          
        recheio: doce.recheio,            
        cobertura: doce.cobertura,           
        qtd: Number(doce.qtd),
        peso: Number(doce.peso), 
        porcao: Number(doce.porcao),            
        preco: Number(doce.preco),     
        data_validade: doce.data_validade,  
        status: doce.status
        })
        
        if(result !== undefined){
            return true
        }
        return false
            
} catch (error) {
   console.log(error.sqlMessage || error)
    return false
}

}

const setDeleteCandys = async function (id) {
    
    try {
        let result = await db('tbl_doce').where('id_doce', id).del()

            return result > 0
        

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