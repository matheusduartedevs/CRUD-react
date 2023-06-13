import React from 'react'
import { Table, Button, Form, Modal } from 'react-bootstrap'

class Alunos extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            id: 0,
            nome: '',
            email: '',
            alunos: [],
            modalAberto: false
        }
    }

    buscarAluno = () => {
        fetch('http://localhost:3000/alunos')
            .then(res => res.json())
            .then(data => {
                this.setState({ alunos: data })
            })
    }

    carregarDados = (id) => {
        fetch('http://localhost:3000/alunos/' + id, { method: 'GET' })
            .then(res => res.json())
            .then(aluno => {
                this.setState({
                    id: aluno.id,
                    nome: aluno.nome,
                    email: aluno.email
                })
                this.abrirModal()
            })
    }

    cadastrarAluno = (aluno) => {
        fetch('http://localhost:3000/alunos', {
            method: 'POST',
            headers: { 'Content-Type':'application/json' },
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

    atualizarAluno = (aluno) => {
        fetch('http://localhost:3000/alunos/' + aluno.id, {
            method: 'PUT',
            headers: { 'Content-Type':'application/json' },
            body: JSON.stringify(aluno)
        })
            .then(res => {
                if (res.ok) {
                    this.buscarAluno()
                } else {
                    alert('Não foi possível atualizar os dados do aluno!')
                }
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
                                <tr key={aluno.id}>
                                    <td>{aluno.nome}</td>
                                    <td>{aluno.email}</td>
                                    <td>
                                        <Button variant="secondary" onClick={() => this.carregarDados(aluno.id)}>Atualizar</Button>
                                        <Button variant="danger" onClick={() => this.deletarAluno(aluno.id)}>Excluir</Button>
                                    </td>
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
        if (this.state.id == 0) {
            const aluno = {
                nome: this.state.nome,
                email: this.state.email
            }

            this.cadastrarAluno(aluno)
        } else {
            const aluno = {
                id: this.state.id,
                nome: this.state.nome,
                email: this.state.email
            }

            this.atualizarAluno(aluno)
        }
        this.fecharModal()
    }

    reset = () => {
        this.setState(
            {
                id: 0,
                nome: '',
                email: ''
            }
        )
        this.abrirModal()
    }

    fecharModal = () => {
        this.setState(
            {
                modalAberto: false
            }
        )
    }

    abrirModal = () => {
        this.setState(
            {
                modalAberto: true
            }
        )
    }

    render() {
        return (
            <div>
                <Modal show={this.state.modalAberto} onHide={this.fecharModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>DADOS DO ALUNO</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>ID</Form.Label>
                                <Form.Control type="text" value={this.state.id} readOnly={true} />
                            </Form.Group>

                            <Form.Group className="mb-3">
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
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.fecharModal}>
                            Fechar
                        </Button>
                        <Button variant="primary" onClick={this.submit} >
                            Salvar
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Button variant="warning" onClick={this.reset} >
                    Novo
                </Button>

                {this.renderTabela()}
            </div>
        )
    }
}

export default Alunos