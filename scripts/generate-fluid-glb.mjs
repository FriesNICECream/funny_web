import fs from "node:fs";
import path from "node:path";
import * as THREE from "three";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";

globalThis.FileReader = class FileReader {
  constructor() {
    this.result = null;
    this.onloadend = null;
  }

  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then((buffer) => {
      this.result = buffer;

      if (typeof this.onloadend === "function") {
        this.onloadend();
      }
    });
  }
};

const outputDir = path.resolve("public/assets/3d");
fs.mkdirSync(outputDir, { recursive: true });

const exporter = new GLTFExporter();

const items = [
  {
    fileName: "lens.glb",
    meshName: "Cylinder",
    geometry: new THREE.CylinderGeometry(1.6, 1.6, 0.9, 96),
  },
  {
    fileName: "cube.glb",
    meshName: "Cube",
    geometry: new THREE.BoxGeometry(2.4, 2.4, 2.4, 12, 12, 12),
  },
  {
    fileName: "bar.glb",
    meshName: "Cube",
    geometry: new THREE.BoxGeometry(10, 1.05, 1.6, 18, 4, 6),
  },
];

for (const item of items) {
  const scene = new THREE.Scene();
  const mesh = new THREE.Mesh(item.geometry, new THREE.MeshStandardMaterial({ color: "#ffffff" }));
  mesh.name = item.meshName;
  scene.add(mesh);

  const arrayBuffer = await exportBinary(exporter, scene);
  fs.writeFileSync(path.join(outputDir, item.fileName), Buffer.from(arrayBuffer));
}

function exportBinary(currentExporter, input) {
  return new Promise((resolve, reject) => {
    currentExporter.parse(
      input,
      (result) => resolve(result),
      (error) => reject(error),
      { binary: true },
    );
  });
}
