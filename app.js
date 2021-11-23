const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const particlesArray = []
let hue = 0;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

})

const mouse = {
  x: null,
  y: null,
}

canvas.addEventListener('click', (event) => {
  mouse.x = event.x
  mouse.y = event.y
  particlesArray.push(new Particle())
  // for (let i = 0; i < 30; i++) {
  //   particlesArray.push(new Particle())
  // }
})

canvas.addEventListener('mousemove', (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
  particlesArray.push(new Particle())
  // for (let i = 0; i < 10; i++) {
  //   particlesArray.push(new Particle())
  // }
})

class Particle {
  constructor () {
    this.x = mouse.x
    this.y = mouse.y
    this.radius = Math.random() * (20 - 5) + 5 // between 40 and 5
    this.startAngle = 0
    this.endAngle = Math.PI * 2
    this.speedX = Math.random() * 3 - 1.5; // between 1.5 and -1.5
    this.speedY = Math.random() * 3 - 1.5; // between 1.5 and -1.5
    this.color = `hsl(${hue}, 100%, 50%)`
  }
  draw() {
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle)
    ctx.fill()
  }
  update() {
    this.draw()
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.radius > .2) this.radius -= .05
  }
}

// const init = () => {
//   for (let i = 0; i < 100; i++) {
    // particlesArray.push(new Particle())
//   }
// }

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  // ctx.fillStyle = 'rgba(0,0,0,0.03)'
  // ctx.fillRect(0, 0, canvas.width, canvas.height)

  particlesArray.forEach((particle, index) => {
    particle.update()

    particlesArray.forEach((particle, j) => {
      const dx = particlesArray[index].x - particlesArray[j].x
      const dy = particlesArray[index].y - particlesArray[j].y
      const distance = Math.sqrt((dx * dx) + (dy * dy))
      if (distance < 100) {
        ctx.beginPath()
        ctx.strokeStyle = particlesArray[index].color;
        ctx.lineWidth = particlesArray[index].radius / 20;
        ctx.moveTo(particlesArray[index].x, particlesArray[index].y)
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y)
        ctx.stroke();
      }
    })

    if (particle.radius < 0.25) {
      particlesArray.splice(index, 1)
    }

  })
  hue+=2;
  requestAnimationFrame(animate)
}

animate()
// init()
