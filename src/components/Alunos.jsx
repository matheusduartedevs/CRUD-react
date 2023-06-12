import React from 'react'
import { Table, Button, Form } from 'react-bootstrap'

class Alunos extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            nome: '',
            email: '',
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

    cadastrarAluno = (aluno) => {
        fetch('http://localhost:3000/alunos', {
            method: 'POST',
            headers: {'Content-Type':'application/json' },
            body: JSON.stringify(aluno)
        })
        .then(res => {
            if (res.ok) {
                this.buscarAluno()
            } else {
                alert('Não foi possível adicionar o aluno!')
            }
        })
    }

    componentDidMount() {
        this.buscarAluno()
    }

    renderTabela() {
        return (
            <div>
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
            </div>

        )
    }

    atualizaNome = (e) => {
        this.setState(
            {
                nome: e.target.value
            }
        )
    }

    atualizaEmail = (e) => {
        this.setState(
            {
                email: e.target.value
            }
        )
    }

    submit = () => {
        const aluno = {
            nome: this.state.nome,
            email: this.state.email
        }

        this.cadastrarAluno(aluno)
    }

    render() {
        return (
            <div>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="text" placeholder="Digite o nome do aluno" value={this.state.nome} onChange={this.atualizaNome} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Digite o e-mail do aluno" value={this.state.email} onChange={this.atualizaEmail} />
                        <Form.Text className="text-muted">
                            Utilize o e-mail institucional.
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type='submit' onClick={this.submit} >
                        Salvar
                    </Button>
                </Form>

                {this.renderTabela()}
            </div>

        )
    }
}

export default Alunos