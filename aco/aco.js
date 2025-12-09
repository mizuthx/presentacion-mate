/**
 * Algoritmo de Colonia de Hormigas (Ant Colony Optimization)
 * Implementación para resolver el Problema del Viajante (TSP)
 */

class AntColonyOptimization {
    constructor(cities, options = {}) {
        this.cities = cities;
        this.numCities = cities.length;

        // Parámetros del algoritmo
        this.numAnts = options.numAnts || 50;
        this.numIterations = options.numIterations || 100;
        this.alpha = options.alpha || 1.0;        // Importancia de feromonas
        this.beta = options.beta || 5.0;          // Importancia de la distancia
        this.evaporation = options.evaporation || 0.5;  // Tasa de evaporación
        this.Q = options.Q || 100;                // Constante de depósito de feromonas

        // Matrices de distancia y feromonas
        this.distances = this.calculateDistances();
        this.pheromones = this.initializePheromones();

        // Mejores resultados
        this.bestTour = null;
        this.bestDistance = Infinity;
        this.history = [];
    }

    /**
     * Calcula la matriz de distancias entre todas las ciudades
     */
    calculateDistances() {
        const distances = Array(this.numCities).fill(null)
            .map(() => Array(this.numCities).fill(0));

        for (let i = 0; i < this.numCities; i++) {
            for (let j = i + 1; j < this.numCities; j++) {
                const dx = this.cities[i].x - this.cities[j].x;
                const dy = this.cities[i].y - this.cities[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                distances[i][j] = distance;
                distances[j][i] = distance;
            }
        }

        return distances;
    }

    /**
     * Inicializa la matriz de feromonas
     */
    initializePheromones() {
        const initialPheromone = 1.0;
        return Array(this.numCities).fill(null)
            .map(() => Array(this.numCities).fill(initialPheromone));
    }

    /**
     * Ejecuta el algoritmo
     */
    run(callback) {
        for (let iteration = 0; iteration < this.numIterations; iteration++) {
            const ants = this.createAnts();

            // Cada hormiga construye una solución
            for (let ant of ants) {
                this.constructSolution(ant);
            }

            // Actualizar feromonas
            this.updatePheromones(ants);

            // Guardar historial
            this.history.push({
                iteration: iteration,
                bestDistance: this.bestDistance,
                bestTour: [...this.bestTour]
            });

            // Callback para actualizar visualización
            if (callback) {
                callback(iteration, ants);
            }
        }

        return {
            tour: this.bestTour,
            distance: this.bestDistance,
            history: this.history
        };
    }

    /**
     * Crea las hormigas para una iteración
     */
    createAnts() {
        const ants = [];
        for (let i = 0; i < this.numAnts; i++) {
            ants.push({
                tour: [],
                visited: new Set(),
                distance: 0
            });
        }
        return ants;
    }

    /**
     * Construye la solución para una hormiga
     */
    constructSolution(ant) {
        // Empezar en una ciudad aleatoria
        const startCity = Math.floor(Math.random() * this.numCities);
        ant.tour.push(startCity);
        ant.visited.add(startCity);

        // Construir el tour completo
        while (ant.tour.length < this.numCities) {
            const currentCity = ant.tour[ant.tour.length - 1];
            const nextCity = this.selectNextCity(ant, currentCity);

            ant.tour.push(nextCity);
            ant.visited.add(nextCity);
            ant.distance += this.distances[currentCity][nextCity];
        }

        // Volver al inicio
        const lastCity = ant.tour[ant.tour.length - 1];
        ant.distance += this.distances[lastCity][startCity];

        // Actualizar mejor solución
        if (ant.distance < this.bestDistance) {
            this.bestDistance = ant.distance;
            this.bestTour = [...ant.tour];
        }
    }

    /**
     * Selecciona la siguiente ciudad usando probabilidades basadas en feromonas y distancia
     */
    selectNextCity(ant, currentCity) {
        const probabilities = [];
        let total = 0;

        // Calcular probabilidades para cada ciudad no visitada
        for (let city = 0; city < this.numCities; city++) {
            if (!ant.visited.has(city)) {
                const pheromone = Math.pow(this.pheromones[currentCity][city], this.alpha);
                const visibility = Math.pow(1.0 / this.distances[currentCity][city], this.beta);
                const probability = pheromone * visibility;

                probabilities.push({ city, probability });
                total += probability;
            }
        }

        // Selección por ruleta
        let random = Math.random() * total;
        for (let { city, probability } of probabilities) {
            random -= probability;
            if (random <= 0) {
                return city;
            }
        }

        // Fallback: retornar la última ciudad disponible
        return probabilities[probabilities.length - 1].city;
    }

    /**
     * Actualiza las feromonas
     */
    updatePheromones(ants) {
        // Evaporación
        for (let i = 0; i < this.numCities; i++) {
            for (let j = 0; j < this.numCities; j++) {
                this.pheromones[i][j] *= (1 - this.evaporation);
            }
        }

        // Depósito de feromonas por cada hormiga
        for (let ant of ants) {
            const deposit = this.Q / ant.distance;

            for (let i = 0; i < ant.tour.length; i++) {
                const from = ant.tour[i];
                const to = ant.tour[(i + 1) % ant.tour.length];

                this.pheromones[from][to] += deposit;
                this.pheromones[to][from] += deposit;
            }
        }
    }

    /**
     * Obtiene el nivel de feromonas entre dos ciudades
     */
    getPheromoneLevel(city1, city2) {
        return this.pheromones[city1][city2];
    }
}
