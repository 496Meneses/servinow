import React, { useEffect,useState} from 'react'
import TextField from '@material-ui/core/TextField';
import {ConsultarHabilidadesPorCategoriaService} from '../services'
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputAdornment from '@material-ui/core/InputAdornment';
export const Habilidades = ({idCategoria, callback}) => {
    const [habilidades, setHabilidades] = useState([]);
    useEffect(() => {
      console.log('buscando Habilidades ');
      console.log(idCategoria);
      ConsultarHabilidadesPorCategoriaService(idCategoria).then(result =>
        setHabilidades(result.data)
      );
    }, [idCategoria]);
  
    const getIdHabilidad = name => {
      console.log(name);
      let find = habilidades.find(habilidad => habilidad.nombre === name);
      if (find === undefined) {
      } else {
        callback(find.id_habilidad);
      }
    };
    return (
      <Autocomplete
        id="searchHabilidades"
        options={habilidades}
        getOptionLabel={option => option.nombreHabilidad}
        style={{ marginBottom: 10, marginTop: 10 }}
        renderInput={params => (
          <TextField
            id="inputOptionHabilidades"
            {...params}
            label="Habilidad"
            variant="outlined"
            required
          />
        )}
        onInputChange={(e, input) => getIdHabilidad(input)}
        onChange={(e, input) => getIdHabilidad(input)}
      />
    );
}
