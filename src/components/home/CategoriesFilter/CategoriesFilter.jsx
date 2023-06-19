import React, { useEffect, useRef, useState } from "react";
import useCategories from "../../../hooks/queries/useCategories";

// seguir viendo clase 32 2:40:00, considerar volverunos 10 o 15 min para repasar
// Clase 33: empiezo en una hora veinte, creo que seria bueno repasar.......................... 😥😅

const CategoriesFilter = ({
  formId,
  onChangeCategories,
  initialCategories = [],
}) => {
  const { data, isLoading, isError, error } = useCategories();
  const [categoryIdList, setCategoryIdList] = useState(initialCategories);
  const isFirstRender = useRef(true);

  const addIdToList = (categoryId) => {
    const copyList = structuredClone(categoryIdList);
    copyList.push(categoryId);

    // const copyWithoutRepetitions = [...new Set(copyList)]
    const copyWithoutRepetitions = Array.from(new Set(copyList));

    // esta logica es para cuando seleccionemos todas la categorias se nos seleccione automaticamente el boton de all en la sección de categories en el aside del home
    if (copyWithoutRepetitions.length === data.length) setCategoryIdList([]);
    else if (copyWithoutRepetitions.length < data.length)
      setCategoryIdList(copyWithoutRepetitions);
  };
  const removeIdFromList = (categoryId) => {
    const copyListWithoutChoosenId = categoryIdList.filter(
      (id) => id !== categoryId
    );
    setCategoryIdList(copyListWithoutChoosenId);
  };
  const handleChange = (isChecked, categoryId) => {
    if (isChecked) addIdToList(categoryId);
    else removeIdFromList(categoryId);
  };
  const handleEmpty = (isChecked) => {
    if (isChecked) setCategoryIdList([]);
  };
  //fata crear handle empity y en la clase 33 1:21:34... ya esta creada, es decir que debo revisar antes de esto para ponerme al dia.

  useEffect(() => {
    if (isFirstRender.current) isFirstRender.current = false;
    else onChangeCategories();
  }, [categoryIdList, onChangeCategories]);

  if (isLoading) return <p>Loading Catergories...</p>;

  if (isError)
    return (
      <p>{error.message ?? "No se pudo obtener las categorias niue l error"}</p>
    );

  return (
    // la etiqueta <fieldset></fieldset>, esta normalmente se utiliza para encerrar un conjunto de inputs
    <fieldset form={formId}>
      {/* importante pasarle a el <fieldset/> la información de a cuál formulario pertenece ya que NO DISPONGO de esa INFOrmación aquí, debo traerla por medio de las PROPS {} --> const CategoriesFilter = ({ formId }) => {} */}
      <legend>Categories</legend>
      {/* Dentro de todos lo <fieldset></fieldset> debemos tener una etiqueta legend --> <legend>categories</legend>
      la idea es que este input me oriente a el contenido al cual hace refencia el INPUT, en este caso CATEGORIES...*/}
      <div>
        {/* COmo este INPUT esta fuera del formulario, vamos a pasarle el form={formId} al igual que lo hicimos con el fieldset para poder decirle a el input a cual formikario pertenece */}
        {/* Para controlar un INPUT tipo CHECKBOX usamos la propiedad checked={}, la cual nos devuelve un tipo de dato boolean. Adicionalmente necesitaremos una variable de estado para almacenar este boolean, el cual se saca de... */}
        <input
          onChange={(e) => handleEmpty(e.target.checked)}
          checked={categoryIdList.length === 0}
          type="checkbox"
          name="categories"
          value=""
          id="empty-category"
          form={formId}
        />
        {/* Para que los inputs de tipo checkbox esten "sincornizados" ddeben llevar el mismo nombre en la propiedad name="" y al no tener nada asociado un string vacio en value=""  */}
        <label htmlFor="empty-category">All</label>
        {/* htmlFor= " al id del input al que se quiere asociar " */}
      </div>

      {data.map((category) => (
        <div key={category.id}>
          <input
            onChange={(e) => handleChange(e.target.checked, category.id)}
            checked={categoryIdList.includes(category.id)}
            type="checkbox"
            name="categories"
            id={category.id + "category"}
            value={category.id}
            form={formId}
          />
          <label htmlFor={category.id + "category"}> {category.name} </label>
        </div>
      ))}
    </fieldset>
  );
};

export default CategoriesFilter;
