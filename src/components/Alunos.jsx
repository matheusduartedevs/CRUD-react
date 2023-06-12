import React from 'react'
import { Table } from 'react-bootstrap'

class Alunos extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            alunos: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:3000/alunos')
        .then(res => res.json())
        .then(data => {
            this.setState({ alunos: data })
        })
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