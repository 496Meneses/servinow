import { Dialog, DialogContent, DialogTitle } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Alert, Button, Input } from 'reactstrap'
import { AlertView } from '../../../../../components/Alert'
import { EditarOfertaService } from '../../../services'

export const EditarOfertaDialog = ({ openEditar, setOpenEditar, oferta, editarOferta }) => {



    const [state, setState] = useState(openEditar)

    //OFERTA
    const [open, setOpen] = useState(false);
    const [typeAlert, setTypeAlert] = useState("success");
    const [message, setMessage] = useState("");


    const [titulo, setTitulo] = useState(oferta.titulo)
    const [descripcion, setDescripcion] = useState(oferta.descripcion)
    const [valor, setValor] = useState(oferta.valor)

    const [estado, setEstado] = useState(oferta.estado)

    const [direccion, setDireccion] = useState('oferta.direccion')// Todo Direcion
    const [fechaInicio, setFechaInicio] = useState(oferta.fecha_inicio)
    const [fechaFin, setFechaFin] = useState(oferta.fecha_fin)
    const [id, setId] = useState(oferta.id_oferta)
    const [imagen, setImagen] = useState(oferta.imagen)
    const [imagenSeleccionada, setImagenSeleccionada] = useState(
        "Seleccione una imagen"
      );
    const handleClose = () => {
        setState(!state)
        setOpenEditar(s => !s)

    }


    useEffect(() => {
        setState(openEditar)
        console.log(oferta, 'oferta efecto')
    }, [openEditar])


    const onChangeInputFile = async (e) => {
        setOpen(false)
        
        setImagen(e.target.files);
        setImagenSeleccionada("Imagen Seleccionada");
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = function () {
          setImagen(reader.result);
          setOpen(true)
          setMessage("imagen seleccionada")
          setTypeAlert("success")
        };
      };

    const handleChangeInput = (e) => {
        switch (e.target.name) {
            case "fechaInicio":
                setFechaInicio(parseDate(e.target.value));
                break;
            case "fechaFin":
                setFechaFin(parseDate(e.target.value));
                break;
            default:
                break;
        }
    };
    const parseDate = (fecha) => {
        return (
            fecha.split("-")[0] +
            "/" +
            fecha.split("-")[1] +
            "/" +
            fecha.split("-")[2].split("T")[0] +
            " " +
            fecha.split("-")[2].split("T")[1] +
            ":01"
        );
    };

    const EditarOfertaFuncion = (e) => {
        e.preventDefault();

        EditarOfertaService({
            "id_oferta": id,
            "titulo": titulo,
            "descripcion": descripcion,
            "valor": valor,
            "direccion": direccion, // TODO DIRECCION
            "estado": estado,
            "fecha_inicio": fechaInicio,
            "fecha_fin": fechaFin,
            "url_imagen": imagen
        }
        ).then((res) => handleClose(),
        
            alert('SE EDITO')
        
        )



    }
    return (


        <Dialog
            open={state}
            onClose={handleClose}
            fullWidth={true}
            maxWidth="md"


        >
            <DialogTitle>Editar Oferta</DialogTitle>
            <DialogContent>
                <form>
                    <label>Titulo</label>
                    <Input type="text" placeholder="nombre" value={titulo} onChange={e => setTitulo(e.target.value)}></Input>
                    <br />
                    <label>Descripcion</label>
                    <textarea className='textAreaSolicitud' value={descripcion} onChange={e => setDescripcion(e.target.value)}></textarea>
                    <br />
                    <label>Valor</label>
                    <Input
                        type="text"
                        placeholder="valor"
                        value={valor}
                        onChange={e => setValor(e.target.value)}></Input>

                    <label>Direccion</label>
                    <Input
                        type="text"
                        placeholder="direccion"
                        value={direccion}
                        onChange={e => setDireccion(e.target.value)}></Input>

                    <h6>Fecha y hora inicio</h6>
                    <Input
                        name="fechaInicio"
                        type="datetime-local"
                        defaultValue={fechaInicio}
                        required
                        variant="outlined"
                        onChange={(e) => {
                            // handleChange(e);
                            handleChangeInput(e);
                        }}
                    />

                    <h6>Fecha y hora Fin</h6>
                    <Input
                        fullWidth
                        name="fechaFin"
                        type="datetime-local"
                        required
                        variant="outlined"
                        onChange={(e) => {
                            // handleChange(e);
                            handleChangeInput(e);
                        }}
                    />
                    <div className="imagenPrev">
                        <h6><b>Imagen descriptiva </b></h6>
                        <img className="imagenPrev__img" src={imagen}></img>
                    </div>
                    <div className="custom-file">
                        <input
                            type="file"
                            className="custom-file-input"
                            id="img-file"
                            onChange={(e) => onChangeInputFile(e)}
                            required
                            variant="outlined"
                        />

                        <label className="custom-file-label">
                            {imagenSeleccionada}
                        </label>
                        {/* TODO IMG */}
                    </div>



                    <Button onClick={EditarOfertaFuncion}  >Aceptar</Button>

                </form>
            </DialogContent>







      <AlertView open={open} typeAlert={typeAlert} message={message} />

        </Dialog>


    )
}
