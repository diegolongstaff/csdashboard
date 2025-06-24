export default {
	limpiarFormularioReceta: () => {
		resetWidget([
			"Input_nombre",
			"Input_descripcion",
			"Input_ingredientes",
			"Input_porciones",
			"Input_tiempo",
			"Input_calorias",
			"Input_proteinas",
			"Input_grasas",
			"Input_carbohidratos",
			"Input_imagen"
		]);
	},

	actualizarTitulo: () => {
		const id = tabla_recetas.selectedRow?.id;
		const nuevoTexto = id
		? `Editando receta ID: ${id}`
		: "Creando nueva receta...";
		Text2.setText(nuevoTexto);
	},

	guardarReceta: () => {
		if (appsmith.store.modo === "nueva") {
			insert_receta.run(
				() => {
					storeValue("modo", "editar");
					showAlert("Receta guardada correctamente", "success");
					get_recetas.run();
				},
				(error) => {
					showAlert("Error al crear la receta: " + error.message, "error");
				}
			);
		} else {
			update_receta.run(
				() => {
					storeValue("modo", "editar");
					showAlert("Cambios guardados correctamente", "success");
					get_recetas.run();
				},
				(error) => {
					showAlert("Error al actualizar la receta: " + error.message, "error");
				}
			);
		}
	},

	nuevaReceta: () => {
		storeValue("modo", "nueva");

		setTimeout(() => {
			resetWidget("Input_nombre");
			resetWidget("Input_descripcion");
			resetWidget("Input_ingredientes");
			resetWidget("Input_porciones");
			resetWidget("Input_tiempo");
			resetWidget("Input_calorias");
			resetWidget("Input_proteinas");
			resetWidget("Input_grasas");
			resetWidget("Input_carbohidratos");
			resetWidget("Input_imagen");
		}, 100);
	},

	eliminarReceta: () => {
		delete_receta.run(
			() => {
				closeModal("modal_confirmar_eliminacion");
				showAlert("Receta eliminada con éxito", "success");

				get_recetas.run(() => {
					const primeraReceta = get_recetas.data[0];

					if (primeraReceta) {
						storeValue("modo", "editar");
						Text2.setText(`Editando receta ID: ${primeraReceta.id}`);
					} else {
						// Si no quedan recetas, limpiar formulario y actualizar título
						resetWidget([
							"Input_nombre",
							"Input_descripcion",
							"Input_ingredientes",
							"Input_porciones",
							"Input_tiempo",
							"Input_calorias",
							"Input_proteinas",
							"Input_grasas",
							"Input_carbohidratos",
							"Input_imagen"
						]);

						Text2.setText("No hay recetas disponibles");
					}
				});
			},
			(error) => {
				showAlert("Error al eliminar la receta: " + error.message, "error");
			}
		);
	}

};
