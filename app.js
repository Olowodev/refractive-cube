import texture from './assets/texture.jpg'
import * as THREE from 'three'
import {RoundedBoxGeometry} from 'three/examples/jsm/geometries/RoundedBoxGeometry'



function three() {
    const camera = new THREE.PerspectiveCamera(8, window.innerWidth /window.innerHeight, 0.1, 1000)
    camera.position.z = 15

    const scene = new THREE.Scene()
    const loadedTexture = new THREE.TextureLoader().load(texture)

    const fovRad = camera.fov * (Math.PI / 180)
    const height = Math.abs(camera.position.z * Math.tan(fovRad / 2) * 2)
    const bgGeometry = new THREE.PlaneGeometry(height * camera.aspect, height)
    const bgMaterial = new THREE.MeshBasicMaterial({map: loadedTexture})
    const bgMesh = new THREE.Mesh(bgGeometry, bgMaterial)
    scene.add(bgMesh)

    const geometry = new RoundedBoxGeometry(1, 1, 1)
    const material = new THREE.MeshPhysicalMaterial({
        roughness: 0,
        transmission: 1,
        thickness: 0.5
    })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const light = new THREE.DirectionalLight(0xfff0dd, 1)
    light.position.set(0, 5, 10)
    scene.add(light)


    const renderer = new THREE.WebGLRenderer({ antialias: true})

    renderer.setSize(window.innerWidth, window.innerHeight)

    renderer.setAnimationLoop(animation)

    document.body.appendChild(renderer.domElement)

    function resize() {
        const width = window.innerWidth
        const height = window.innerHeight
        renderer.setSize(width, height)
        camera.aspect = width / height


        camera.updateProjectionMatrix()
    }

    resize()

    window.addEventListener('resize', resize)


    function animation(time) {
        renderer.render(scene, camera)
        mesh.rotation.x += 0.01
        mesh.rotation.y += 0.01
    }
}


const audio = document.getElementById("audio")



const playAudio = () => {
    const button = document.getElementById("button")
    audio.volume = 0.8
    
    
}

audio.volume = 0.8

audio.addEventListener("canplaythrough", ()=> {
    audio.play().catch(e => {
        window.addEventListener('click', ()=>{
            audio.play()
        }, {once: true})
    })
})





// window.addEventListener("load", () => {
//     playAudio()
//     console.log('click')
// })
three()
