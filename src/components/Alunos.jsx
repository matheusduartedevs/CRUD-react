import React from 'react'
import { Table, Button } from 'react-bootstrap'

class Alunos extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            alunos: []
        }
    }

    buscarAluno = () => {
        fetch('http://localhost:3000/alunos')
            .then(res => res.json())
            .then(data => {
                this.setState({ alunos: data })
            })
    }

    deletarAluno = (id) => {
        fetch('http://localhost:3000/alunos/' + id, { method: 'DELETE' })
            .then(res => {
                if (res.ok) {
                    this.buscarAluno()
                }
            })
    }

    componentDidMount() {
        this.buscarAluno()
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
                                <td>Atualizar <Button variant="danger" onClick={() => this.deletarAluno(aluno.id)}>Excluir</Button></td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        )
    }
}

export default Alunos