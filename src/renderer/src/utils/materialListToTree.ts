import { IMaterialItem } from "@/materials/utils/createMaterial";
import { EMaterialName } from "@/materials/types/material";

export default function materialListToTree(materials: IMaterialItem[]) {
    const standaloneMaterials = materials.filter((m) => m.parentId === null);
    const childMaterials = materials.filter((m) => m.parentId !== null);
  
    childMaterials.forEach((m1) => {
      childMaterials.forEach((m2) => {
        if (m1.parentId === m2.id && m2.name === EMaterialName.Box) {
          const children = m2.children || [];
          if (children.some((item) => item.id === m1.id)) {
            const index = children.findIndex((item) => item.id === m1.id);
            children.splice(index, 1);
          }
          children.push(m1);
          m2.children = children;
        }
      });
    });
    childMaterials.map((child) => {
      standaloneMaterials.forEach((s) => {
        if (child.parentId === s.id && s.name === EMaterialName.Box) {
          const children = s.children || [];
          if (children.some((item) => item.id === child.id)) {
            const index = children.findIndex((item) => item.id === child.id);
            children.splice(index, 1);
          }
          children.push(child);
          s.children = children;
        }
      });
    });
  
    return standaloneMaterials;
  }