/**
 * Visualización del Algoritmo de Colonia de Hormigas
 */

class ACOVisualization {
    constructor(canvasId, statsId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.statsDiv = document.getElementById(statsId);

        this.aco = null;
        this.cities = [];
        this.currentAnts = [];
        this.isRunning = false;
        this.isPaused = false;
        this.animationSpeed = 100;

        this.setupCanvas();
    }

    /**
     * Configura el canvas
     */
    setupCanvas() {
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;

        // Evento para agregar ciudades
        this.canvas.addEventListener('click', (e) => {
            if (!this.isRunning) {
                const rect = this.canvas.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                this.addCity(x, y);
            }
        });
    }

    /**
     * Agrega una ciudad
     */
    addCity(x, y) {
        this.cities.push({ x, y });
        this.draw();
    }

    /**
     * Genera ciudades aleatorias
     */
    generateRandomCities(numCities) {
        this.cities = [];
        const margin = 50;

        for (let i = 0; i < numCities; i++) {
            this.cities.push({
                x: margin + Math.random() * (this.canvas.width - 2 * margin),
                y: margin + Math.random() * (this.canvas.height - 2 * margin)
            });
        }

        this.draw();
    }

    /**
     * Limpia el canvas
     */
    clear() {
        this.cities = [];
        this.aco = null;
        this.currentAnts = [];
        this.isRunning = false;
        this.isPaused = false;
        this.draw();
        this.updateStats();
    }

    /**
     * Inicia el algoritmo
     */
    async start(options) {
        if (this.cities.length < 3) {
            alert('Necesitas al menos 3 ciudades para ejecutar el algoritmo');
            return;
        }

        this.isRunning = true;
        this.isPaused = false;
        this.aco = new AntColonyOptimization(this.cities, options);

        // Ejecutar iteración por iteración para animar
        for (let iteration = 0; iteration < options.numIterations; iteration++) {
            if (!this.isRunning) break;

            while (this.isPaused) {
                await this.sleep(100);
            }

            // Crear hormigas
            const ants = this.aco.createAnts();

            // Construir soluciones
            for (let ant of ants) {
                this.aco.constructSolution(ant);
            }

            // Actualizar feromonas
            this.aco.updatePheromones(ants);

            // Guardar historial
            this.aco.history.push({
                iteration: iteration,
                bestDistance: this.aco.bestDistance,
                bestTour: [...this.aco.bestTour]
            });

            this.currentAnts = ants;

            // Dibujar y actualizar estadísticas
            this.draw();
            this.updateStats(iteration);

            await this.sleep(this.animationSpeed);
        }

        this.isRunning = false;
        this.draw();
    }

    /**
     * Pausa/Reanuda el algoritmo
     */
    togglePause() {
        this.isPaused = !this.isPaused;
    }

    /**
     * Detiene el algoritmo
     */
    stop() {
        this.isRunning = false;
        this.isPaused = false;
    }

    /**
     * Establece la velocidad de animación
     */
    setSpeed(speed) {
        this.animationSpeed = speed;
    }

    /**
     * Dibuja todo en el canvas
     */
    draw() {
        // Limpiar canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.cities.length === 0) {
            this.drawInstructions();
            return;
        }

        // Dibujar feromonas si hay ACO activo
        if (this.aco) {
            this.drawPheromones();
        }

        // Dibujar mejor tour
        if (this.aco && this.aco.bestTour) {
            this.drawTour(this.aco.bestTour, '#2ecc71', 3);
        }

        // Dibujar tours de hormigas actuales (más tenue)
        if (this.currentAnts.length > 0 && this.isRunning) {
            for (let ant of this.currentAnts.slice(0, 5)) { // Solo las primeras 5
                this.drawTour(ant.tour, 'rgba(52, 152, 219, 0.3)', 1);
            }
        }

        // Dibujar ciudades
        this.drawCities();
    }

    /**
     * Dibuja instrucciones
     */
    drawInstructions() {
        this.ctx.fillStyle = '#95a5a6';
        this.ctx.font = '18px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(
            'Haz click para agregar ciudades o usa el botón "Generar Aleatorio"',
            this.canvas.width / 2,
            this.canvas.height / 2
        );
    }

    /**
     * Dibuja las ciudades
     */
    drawCities() {
        for (let i = 0; i < this.cities.length; i++) {
            const city = this.cities[i];

            // Círculo de la ciudad
            this.ctx.beginPath();
            this.ctx.arc(city.x, city.y, 8, 0, Math.PI * 2);
            this.ctx.fillStyle = '#e74c3c';
            this.ctx.fill();
            this.ctx.strokeStyle = '#c0392b';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();

            // Número de la ciudad
            this.ctx.fillStyle = '#fff';
            this.ctx.font = 'bold 12px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(i, city.x, city.y);
        }
    }

    /**
     * Dibuja un tour
     */
    drawTour(tour, color, lineWidth) {
        if (!tour || tour.length === 0) return;

        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = lineWidth;
        this.ctx.beginPath();

        for (let i = 0; i < tour.length; i++) {
            const city = this.cities[tour[i]];

            if (i === 0) {
                this.ctx.moveTo(city.x, city.y);
            } else {
                this.ctx.lineTo(city.x, city.y);
            }
        }

        // Cerrar el tour
        const firstCity = this.cities[tour[0]];
        this.ctx.lineTo(firstCity.x, firstCity.y);
        this.ctx.stroke();
    }

    /**
     * Dibuja las feromonas
     */
    drawPheromones() {
        if (!this.aco) return;

        // Encontrar el máximo nivel de feromonas
        let maxPheromone = 0;
        for (let i = 0; i < this.cities.length; i++) {
            for (let j = i + 1; j < this.cities.length; j++) {
                const level = this.aco.getPheromoneLevel(i, j);
                if (level > maxPheromone) maxPheromone = level;
            }
        }

        // Dibujar líneas de feromonas
        for (let i = 0; i < this.cities.length; i++) {
            for (let j = i + 1; j < this.cities.length; j++) {
                const level = this.aco.getPheromoneLevel(i, j);
                const normalized = level / maxPheromone;

                if (normalized > 0.1) { // Solo dibujar si hay suficiente feromona
                    const city1 = this.cities[i];
                    const city2 = this.cities[j];

                    this.ctx.beginPath();
                    this.ctx.moveTo(city1.x, city1.y);
                    this.ctx.lineTo(city2.x, city2.y);
                    this.ctx.strokeStyle = `rgba(155, 89, 182, ${normalized * 0.5})`;
                    this.ctx.lineWidth = normalized * 3;
                    this.ctx.stroke();
                }
            }
        }
    }

    /**
     * Actualiza las estadísticas
     */
    updateStats(iteration = 0) {
        if (!this.statsDiv) return;

        let html = `<div class="stat-item"><strong>Ciudades:</strong> ${this.cities.length}</div>`;

        if (this.aco) {
            html += `
                <div class="stat-item"><strong>Iteración:</strong> ${iteration + 1} / ${this.aco.numIterations}</div>
                <div class="stat-item"><strong>Mejor Distancia:</strong> ${this.aco.bestDistance.toFixed(2)}</div>
                <div class="stat-item"><strong>Hormigas:</strong> ${this.aco.numAnts}</div>
                <div class="stat-item"><strong>Alpha (α):</strong> ${this.aco.alpha}</div>
                <div class="stat-item"><strong>Beta (β):</strong> ${this.aco.beta}</div>
                <div class="stat-item"><strong>Evaporación:</strong> ${this.aco.evaporation}</div>
            `;

            // Gráfica de convergencia
            if (this.aco.history.length > 0) {
                html += this.generateConvergenceChart();
            }
        }

        this.statsDiv.innerHTML = html;
    }

    /**
     * Genera una mini gráfica de convergencia
     */
    generateConvergenceChart() {
        if (!this.aco || this.aco.history.length === 0) return '';

        const chartHeight = 100;
        const chartWidth = 300;
        const history = this.aco.history;

        const maxDist = Math.max(...history.map(h => h.bestDistance));
        const minDist = Math.min(...history.map(h => h.bestDistance));
        const range = maxDist - minDist;

        let path = '';
        for (let i = 0; i < history.length; i++) {
            const x = (i / (history.length - 1)) * chartWidth;
            const y = chartHeight - ((history[i].bestDistance - minDist) / range) * chartHeight;
            if (i === 0) {
                path += `M ${x} ${y}`;
            } else {
                path += ` L ${x} ${y}`;
            }
        }

        return `
            <div class="stat-item">
                <strong>Gráfica de Convergencia:</strong>
                <svg width="${chartWidth}" height="${chartHeight}" style="border: 1px solid #ddd; background: #f9f9f9; margin-top: 10px;">
                    <path d="${path}" fill="none" stroke="#3498db" stroke-width="2"/>
                </svg>
            </div>
        `;
    }

    /**
     * Utilidad para pausar ejecución
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
