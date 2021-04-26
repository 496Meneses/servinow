

    import React, { useState } from 'react'

    import { Redirect, Link } from 'react-router-dom'
    
    import { Container, Row, Col, Card, CardBody, Label, FormGroup, Button, Alert, InputGroup, InputGroupAddon } from 'reactstrap';
    import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
    import { Mail, Lock } from 'react-feather';
    import {useAuth} from '../../components/UserContext' 
   
    
    
    export const Login = () => {
        const auth = useAuth()
        
        const [userName, setUserName] = useState(null)
        const [password, setPassword] = useState(null)

        const handleValidSubmit = (event, values) => {

            auth.login(userName, password);
            return <Redirect to='/ofertas' />
        }

        const renderRedirectToRoot = () => {

            if (auth.user) {
                
                return <Redirect to='/ofertas' />
            }
        }


        return (
            <React.Fragment>
                {renderRedirectToRoot()}
                <div className="account-pages my-5">
                    <Container>
                        <Row className="justify-content-center">
                            <Col xl={10}>
                                <Card className="">
                                    <CardBody className="p-0">
                                        <Row>
                                            <Col md={6} className="p-5 position-relative">
                                                
    
                                                <div className="mx-auto mb-5">
                                                    <a href="/">

                                                        <h3 className="d-inline align-middle ml-1 text-logo">SERVINOW</h3>
                                                    </a>
                                                </div>
    
                                                <p className="text-muted mt-1 mb-4">Ingresa tus credenciales para autenticarte!</p>

    
                                                <AvForm onSubmit={ e => handleValidSubmit()}  className="authentication-form">
                                                    <AvGroup className="">
                                                        <Label for="username">Username</Label>
                                                        <InputGroup>
                                                            <InputGroupAddon addonType="prepend">
                                                                <span className="input-group-text">
                                                                    <Mail className="icon-dual" />
                                                                </span>
                                                            </InputGroupAddon>
                                                            <AvInput type="text" name="username" id="username" placeholder="correo@unicauca.com"  value={userName} onChange={ e => setUserName(e.target.value)} required />
                                                        </InputGroup>
    
                                                        <AvFeedback>Este Campo es invalido</AvFeedback>
                                                    </AvGroup>
    
    
                                                    <AvGroup className="mb-3">
                                                        <Label for="password">Password</Label>
                                    
                                                        <InputGroup>
                                                            <InputGroupAddon addonType="prepend">
                                                                <span className="input-group-text">
                                                                    <Lock className="icon-dual" />
                                                                </span>
                                                            </InputGroupAddon>
                                                            <AvInput type="password" name="password" id="password" placeholder="Ingresa tu contraseña" value={password} onChange={ e => setPassword(e.target.value)} required />
                                                        </InputGroup>
                                                        <AvFeedback>Este campo es invalido</AvFeedback>
                                                    </AvGroup>
    
                                                    <FormGroup className="form-group mb-0 text-center">
                                                        <Button color="primary" className="btn-block">Iniciar Sesion</Button>
                                                    </FormGroup>

                                                </AvForm>

                                                
                                            </Col>
    
    
                                            <Col md={6} className="d-none d-md-inline-block">
                                                <div className="auth-page-sidebar">
                                                    <div className="overlay"></div>
                                                    <div className="auth-user-testimonial">
                                                        <p className="font-size-24 font-weight-bold text-white mb-1">I simply love it!</p>
                                                        <p className="lead">"It's a elegent templete. I love it very much!"</p>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
    
    
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
    
                        <Row className="mt-3">
                            <Col className="col-12 text-center">
                                <p className="text-muted">No tienes una cuenta? <Link to="/account/register" className="text-primary font-weight-bold ml-1">Registrarse</Link></p>
                            </Col>
                        </Row>
    
                    </Container>
                </div>

            </React.Fragment>
        )
    }


    export default Login;