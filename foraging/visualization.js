/**
 * Visualización de la Simulación de Búsqueda de Comida
 */

class ForagingVisualization {
    constructor(canvasId, statsId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.statsDiv = document.getElementById(statsId);

        this.world = null;
        this.isRunning = false;
        this.isPaused = false;
        this.animationId = null;

        // Modo de agregar
        this.addMode = 'food'; // 'food' o 'agent'

        this.setupCanvas();
        this.setupEventListeners();
    }

    setupCanvas() {
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;

        // Crear mundo
        this.world = new ForagingWorld(this.canvas.width, this.canvas.height);
    }

    setupEventListeners() {
        // Click para agregar comida o agentes
        this.canvas.addEventListener('click', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            if (this.addMode === 'food') {
                this.world.addFoodSource(x, y, 50);
            } else if (this.addMode === 'agent') {
                this.world.addAgent(x, y);
            }
        });
    }

    setAddMode(mode) {
        this.addMode = mode;
        this.updateCursor();
    }

    updateCursor() {
        if (this.addMode === 'food') {
            this.canvas.style.cursor = 'crosshair';
        } else if (this.addMode === 'agent') {
            this.canvas.style.cursor = 'pointer';
        } else {
            this.canvas.style.cursor = 'default';
        }
    }

    init(numAgents = 30) {
        this.world.clear();
        this.world.addAgents(numAgents);
    }

    generateRandomFood(count = 5) {
        const margin = 50;
        for (let i = 0; i < count; i++) {
            const x = margin + Math.random() * (this.canvas.width - 2 * margin);
            const y = margin + Math.random() * (this.canvas.height - 2 * margin);
            this.world.addFoodSource(x, y, 30 + Math.random() * 70);
        }
    }

    start() {
        if (this.isRunning) return;

        this.isRunning = true;
        this.isPaused = false;
        this.animate();
    }

    pause() {
        this.isPaused = !this.isPaused;
    }

    stop() {
        this.isRunning = false;
        this.isPaused = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    clear() {
        this.world.clear();
        this.draw();
    }

    animate() {
        if (!this.isRunning) return;

        if (!this.isPaused) {
            this.world.update();
            this.draw();
            this.updateStats();
        }

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    draw() {
        // Limpiar canvas
        this.ctx.fillStyle = '#1a1a2e';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Dibujar trails si está activado
        if (this.world.showTrails) {
            this.drawTrails();
        }

        // Dibujar nido
        this.drawHome();

        // Dibujar fuentes de comida
        this.drawFoodSources();

        // Dibujar agentes
        this.drawAgents();

        // Dibujar instrucciones si no hay nada
        if (this.world.agents.length === 0 && this.world.foodSources.length === 0 && !this.isRunning) {
            this.drawInstructions();
        }
    }

    drawInstructions() {
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        this.ctx.font = '18px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(
            'Presiona "Inicializar" para comenzar o agrega elementos manualmente',
            this.canvas.width / 2,
            this.canvas.height / 2
        );
    }

    drawHome() {
        const home = this.world.home;

        // Círculo exterior (más grande, efecto de brillo)
        const gradient = this.ctx.createRadialGradient(home.x, home.y, 0, home.x, home.y, home.radius + 10);
        gradient.addColorStop(0, 'rgba(46, 204, 113, 0.4)');
        gradient.addColorStop(1, 'rgba(46, 204, 113, 0)');

        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(home.x, home.y, home.radius + 10, 0, Math.PI * 2);
        this.ctx.fill();

        // Círculo del nido
        this.ctx.fillStyle = '#2ecc71';
        this.ctx.beginPath();
        this.ctx.arc(home.x, home.y, home.radius, 0, Math.PI * 2);
        this.ctx.fill();

        // Borde
        this.ctx.strokeStyle = '#27ae60';
        this.ctx.lineWidth = 3;
        this.ctx.stroke();

        // Icono de casa
        this.ctx.fillStyle = '#fff';
        this.ctx.font = 'bold 20px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText('🏠', home.x, home.y);
    }

    drawFoodSources() {
        for (const food of this.world.foodSources) {
            const percentage = food.getPercentage();
            const radius = 8 + (percentage / 100) * 12;

            // Brillo
            const gradient = this.ctx.createRadialGradient(food.x, food.y, 0, food.x, food.y, radius + 5);
            gradient.addColorStop(0, 'rgba(241, 196, 15, 0.6)');
            gradient.addColorStop(1, 'rgba(241, 196, 15, 0)');

            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(food.x, food.y, radius + 5, 0, Math.PI * 2);
            this.ctx.fill();

            // Comida
            this.ctx.fillStyle = '#f1c40f';
            this.ctx.beginPath();
            this.ctx.arc(food.x, food.y, radius, 0, Math.PI * 2);
            this.ctx.fill();

            // Borde
            this.ctx.strokeStyle = '#f39c12';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();

            // Cantidad
            if (radius > 10) {
                this.ctx.fillStyle = '#fff';
                this.ctx.font = 'bold 10px Arial';
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';
                this.ctx.fillText(Math.floor(food.amount), food.x, food.y);
            }
        }
    }

    drawAgents() {
        for (const agent of this.world.agents) {
            if (!agent.isAlive()) continue;

            // Dibujar radio de sensado si está activado
            if (this.world.showSenseRadius) {
                this.ctx.strokeStyle = 'rgba(52, 152, 219, 0.2)';
                this.ctx.lineWidth = 1;
                this.ctx.beginPath();
                this.ctx.arc(agent.x, agent.y, agent.senseRadius, 0, Math.PI * 2);
                this.ctx.stroke();
            }

            // Color según estado
            let color;
            if (agent.hasFood) {
                color = '#e74c3c'; // Rojo si lleva comida
            } else {
                // Color según energía (verde a amarillo)
                const energyPercent = agent.energy / agent.maxEnergy;
                if (energyPercent > 0.5) {
                    color = '#3498db'; // Azul si tiene energía
                } else {
                    color = '#e67e22'; // Naranja si tiene poca energía
                }
            }

            // Agente
            this.ctx.fillStyle = color;
            this.ctx.beginPath();
            this.ctx.arc(agent.x, agent.y, 4, 0, Math.PI * 2);
            this.ctx.fill();

            // Dirección (pequeña línea)
            const dirLength = 8;
            const angle = Math.atan2(agent.vy, agent.vx);
            const endX = agent.x + Math.cos(angle) * dirLength;
            const endY = agent.y + Math.sin(angle) * dirLength;

            this.ctx.strokeStyle = color;
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.moveTo(agent.x, agent.y);
            this.ctx.lineTo(endX, endY);
            this.ctx.stroke();

            // Indicador de comida
            if (agent.hasFood) {
                this.ctx.fillStyle = '#f1c40f';
                this.ctx.beginPath();
                this.ctx.arc(agent.x, agent.y - 6, 2, 0, Math.PI * 2);
                this.ctx.fill();
            }
        }
    }

    drawTrails() {
        for (const trail of this.world.trails) {
            this.ctx.fillStyle = `rgba(155, 89, 182, ${trail.alpha * 0.3})`;
            this.ctx.fillRect(trail.x, trail.y, 1, 1);
        }
    }

    updateStats() {
        if (!this.statsDiv) return;

        const stats = this.world.getStats();

        let html = `
            <div class="stat-item">
                <strong>Agentes Vivos:</strong>
                <span class="stat-value">${stats.aliveAgents}</span>
            </div>
            <div class="stat-item">
                <strong>Agentes Muertos:</strong>
                <span class="stat-value">${stats.deadAgents}</span>
            </div>
            <div class="stat-item">
                <strong>Energía Promedio:</strong>
                <span class="stat-value">${stats.avgEnergy}%</span>
            </div>
            <div class="stat-item">
                <strong>Fuentes de Comida:</strong>
                <span class="stat-value">${stats.foodSources}</span>
            </div>
            <div class="stat-item">
                <strong>Comida Disponible:</strong>
                <span class="stat-value">${Math.floor(stats.totalFood)}</span>
            </div>
            <div class="stat-item">
                <strong>Comida en Nido:</strong>
                <span class="stat-value">${stats.foodInNest}</span>
            </div>
        `;

        this.statsDiv.innerHTML = html;
    }

    toggleSenseRadius() {
        this.world.showSenseRadius = !this.world.showSenseRadius;
    }

    toggleTrails() {
        this.world.showTrails = !this.world.showTrails;
        if (!this.world.showTrails) {
            this.world.trails = [];
        }
    }
}
