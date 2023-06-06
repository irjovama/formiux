forma de uso
function App() {

return (
<div>
<Formiux  
 onError={(e) =>{
console.log(e)
}}
onSuccess={(v)=>{
v.forEach(e=>{
console.log(e)
})
}} >

      <input type="number" validate={[/^\d{4}$/, "El campo debe contener 4 dígitos"]} label={<p>Usuario</p>} />
      <select validate={[Validations.REQUIRED, "El campo no puede quedar vacío"]} label={<p>Selecct:</p>}>
        <option></option>
        <option>1</option>
        <option>2</option>
      </select>
      <textarea validate={[Validations.REQUIRED, "El campo no puede quedar vacio"]} label={<p>TextArea</p>} />
      <button>Guardar</button>
    </Formiux>

  </div>
  )
}
