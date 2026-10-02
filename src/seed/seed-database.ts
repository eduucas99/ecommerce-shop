import { initialData } from "./seed.ts";
import { db } from "../prisma/db.ts";

async function main() {
    //! Borrar registros previos
    await Promise.all([
        await db.orm.public!.User!.where({}).deleteAll(),
        await db.orm.public!.ProductImage!.where({}).deleteAll(),
        await db.orm.public!.Product!.where({}).deleteAll(),
        await db.orm.public!.Category!.where({}).deleteAll(),
        await db.orm.public!.Country!.where({}).deleteAll(),
    ]);

    const {categories, products, users, countries} = initialData;
    
    //* Inserto Usuarios 
    await db.orm.public!.User!.createAll(users);
    
    //* Inserto Categorias
    const categoriesData = categories.map( c =>({
        name: c
    })) // ? podemos agregar (( name ) => ({ name }))


    await db.orm.public!.Category!.createAll(categoriesData);

    const categoriesDB = await db.orm.public!.Category!.all();

    const categoriesMap = categoriesDB.reduce( (map, category) => {
        map[category.name.toLowerCase()] = category.id;

        return map;
    }, {} as Record<string, string>)

    //* Inserto Productos
    products.forEach(async (p) => {
        const {type, images, ...rest} = p;
        const categoryId = categoriesMap[type];

        if (!categoryId) {
            throw new Error(`No se encontró la categoría "${type}"`);
        }

        const dbProduct = await db.orm.public!.Product!.create({
            ...rest,
            categoryId
        });

        //* Inserto Imagenes
        const imagesData = images.map(image => ({
            url: image,
            productId: dbProduct.id
        }));

        await db.orm.public!.ProductImage!.createAll(imagesData);
    });

    //* Inserto los paises
    const insertCountries = countries.map( c => ({
        id: c.id,
        name: c.name,
    }));

    await db.orm.public!.Country!.createAll(insertCountries);

    console.log("Seed ejecutado correctamente!");
}

(()=>{
    if(process.env.NODE_ENV === 'production') return;

    main();
})();