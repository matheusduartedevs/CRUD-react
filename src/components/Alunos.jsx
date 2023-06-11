import React from 'react'
import { Table } from 'react-bootstrap'

class Alunos extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            alunos: [
                { 'id': 1, 'nome': 'Miguel Duarte', 'email': 'miguel@teste.com' },
                { 'id': 2, 'nome': 'Matheus Duarte', 'email': 'matheus@teste.com'},
                { 'id': 3, 'nome': 'Browser Junior', 'email': 'browserjr@teste.com'}
            ]
        }
    }

    render() {
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    this.state.alunos.map((aluno) => 
                        <tr>
                            <td>{aluno.nome}</td>
                            <td>{aluno.email}</td>
                            <td>Atualizar Excluir</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        )
    }
}

export default Alunos