import { render, screen } from '@testing-library/react';
import App from './App';
import DetalleOfertaTwo from "./pages/Grupo/Solicitud/DetalleOfertaTwo";


import { shallow, mount } from 'enzyme';


describe("My Tests", ()=>{
  
  let wrapper;
  beforeEach(()=>{
    wrapper = shallow(<DetalleOfertaTwo/>)
  })

  test('renders the title of Counter', () => {
    
    //const wrapper  = shallow(<App/>);
    expect(wrapper.find("#title").text()).toContain("Title");
    //console.log(wrapper.debug())
  });


})

