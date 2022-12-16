import React from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
//import "../styles/globals.css"

type Inputs = {
  example: string,
  exampleRequired: string,
};

export default function Register() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

  console.log(watch("example")) // watch input value by passing the name of it

  {
    "Nombre": "",
    "Apellido": "",
    "Email": "",
    "Teléfono Celular ": "",
    "Provincia": ""
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="undefined" placeholder="Nombre" {...register} />
      <input type="undefined" placeholder="Apellido" {...register} />
      <input type="undefined" placeholder="Email" {...register} />
      <input type="undefined" placeholder="Teléfono Celular" {...register} />
      <select {...register("Provincia")}>
        <option value="Buenos Aires">Buenos Aires</option>
        <option value=" Catamarca"> Catamarca</option>
        <option value=" Chaco"> Chaco</option>
        <option value=" Chubut"> Chubut</option>
        <option value=" Ciudad Autónoma de Buenos Aires"> Ciudad Autónoma de Buenos Aires</option>
        <option value=" Córdoba"> Córdoba</option>
        <option value=" Corrientes"> Corrientes</option>
        <option value=" Entre Ríos"> Entre Ríos</option>
        <option value=" Formosa"> Formosa</option>
        <option value=" Jujuy"> Jujuy</option>
        <option value=" La Pampa"> La Pampa</option>
        <option value=" La Rioja"> La Rioja</option>
        <option value=" Mendoza"> Mendoza</option>
        <option value=" Misiones"> Misiones</option>
        <option value=" Neuquén"> Neuquén</option>
        <option value=" Río Negro"> Río Negro</option>
        <option value=" Salta"> Salta</option>
        <option value=" San Juan"> San Juan</option>
        <option value=" San Luis"> San Luis</option>
        <option value=" Santa Cruz"> Santa Cruz</option>
        <option value=" Santa Fe"> Santa Fe</option>
        <option value=" Santiago del Estero"> Santiago del Estero</option>
        <option value=" Tierra del Fuego"> Tierra del Fuego</option>
        <option value=" Tucumán"> Tucumán</option>
      </select>

      <input type="submit" />
    </form>
  );
}