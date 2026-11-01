import { db } from "./db";

async function main() {
  // 1. Dashboard (raíz, sin padre)
  await db.orm.public.Module.create({
    code: "DASHBOARD",
    name: "Dashboard",
    route: "/dashboard",
    icon: "home",
    displayOrder: 1,
    isActive: true,
  });

  // 2. Seguridad (raíz, padre de Usuarios)
  const seguridad = await db.orm.public.Module.create({
    code: "SEGURIDAD",
    name: "Seguridad",
    route: null,
    icon: "shield",
    displayOrder: 2,
    isActive: true,
  });

  // 3. Usuarios (hijo de Seguridad)
  await db.orm.public.Module.create({
    code: "USUARIOS",
    name: "Usuarios",
    route: "/seguridad/usuarios",
    icon: "users",
    displayOrder: 1,
    isActive: true,
    parentId: seguridad.id,
  });

  console.log("Seed completado");
  await db.close(); // En scripts de un solo uso sí se cierra
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
