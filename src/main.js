import './style.css';
import { inicializarEscena } from './escenaAcuatica.js';
import { Pez } from './PezAgente.js';
import * as THREE from 'three';

const { scene, camera, renderer, controls, limitesEntorno } = inicializarEscena();

const pecesEnjambre = [];
const coloresCuerpo = [0xff1493, 0x00ff7f, 0xffa500, 0x00bfff, 0x9400d3, 0xffff00];

for (let i = 0; i < 6; i++) {
  const nuevoPez = new Pez(coloresCuerpo[i % coloresCuerpo.length], 0xffffff);
  
  const posX = (Math.random() - 0.5) * 40;
  const posY = (Math.random() - 0.5) * 10;
  const posZ = (Math.random() - 0.5) * 40;
  const rotY = Math.random() * Math.PI * 2;
  
  nuevoPez.inicializar(new THREE.Vector3(posX, posY, posZ), rotY);
  
  scene.add(nuevoPez.mesh);
  pecesEnjambre.push(nuevoPez);
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();

  pecesEnjambre.forEach(pez => {
    pez.update(limitesEntorno);
  });

  renderer.render(scene, camera);
}

animate();
