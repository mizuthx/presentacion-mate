/**
 * Simulación de Búsqueda de Comida (Foraging Simulation)
 * Agentes simples que buscan comida y se agrupan cuando la encuentran
 */

class Agent {
    constructor(x, y, world) {
        this.x = x;
        this.y = y;
        this.world = world;

        // Movimiento
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.speed = 1.5;
        this.wanderAngle = Math.random() * Math.PI * 2;

        // Estado
        this.hasFood = false;
        this.targetFood = null;
        this.energy = 100;
        this.maxEnergy = 100;

        // Estadísticas
        this.foodCollected = 0;

        // Parámetros de comportamiento
        this.senseRadius = 80;
        this.wanderStrength = 0.3;
    }

    update() {
        // Consumir energía
        this.energy -= 0.05;

        if (this.energy <= 0) {
            this.energy = 0;
            return; // Agente muerto
        }

        if (this.hasFood) {
            // Regresar al nido
            this.moveTowardsHome();
        } else {
            // Buscar comida
            this.searchForFood();
        }

        // Aplicar movimiento
        this.x += this.vx;
        this.y += this.vy;

        // Mantener dentro de los límites
        this.keepInBounds();
    }

    searchForFood() {
        // Buscar comida cercana
        const nearbyFood = this.findNearbyFood();

        if (nearbyFood) {
            // Moverse hacia la comida
            this.targetFood = nearbyFood;
            this.moveTowards(nearbyFood.x, nearbyFood.y);

            // Intentar recoger comida
            const distance = this.distanceTo(nearbyFood.x, nearbyFood.y);
            if (distance < 10) {
                if (this.world.collectFood(nearbyFood)) {
                    this.hasFood = true;
                    this.targetFood = null;
                    this.foodCollected++;
                }
            }
        } else {
            // Movimiento aleatorio (random walk con wandering)
            this.wander();
        }
    }

    moveTowardsHome() {
        const home = this.world.home;
        this.moveTowards(home.x, home.y);

        // Verificar si llegó al nido
        const distance = this.distanceTo(home.x, home.y);
        if (distance < 20) {
            this.hasFood = false;
            this.world.foodInNest++;
            // Restaurar energía al llegar al nido
            this.energy = Math.min(this.maxEnergy, this.energy + 30);
        }
    }

    moveTowards(targetX, targetY) {
        const dx = targetX - this.x;
        const dy = targetY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 0) {
            this.vx = (dx / distance) * this.speed * 1.5;
            this.vy = (dy / distance) * this.speed * 1.5;
        }
    }

    wander() {
        // Wandering behavior (movimiento más natural)
        this.wanderAngle += (Math.random() - 0.5) * this.wanderStrength;

        const targetVx = Math.cos(this.wanderAngle) * this.speed;
        const targetVy = Math.sin(this.wanderAngle) * this.speed;

        // Suavizar el movimiento
        this.vx += (targetVx - this.vx) * 0.1;
        this.vy += (targetVy - this.vy) * 0.1;

        // Limitar velocidad
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (speed > this.speed) {
            this.vx = (this.vx / speed) * this.speed;
            this.vy = (this.vy / speed) * this.speed;
        }
    }

    findNearbyFood() {
        let closest = null;
        let closestDist = this.senseRadius;

        for (const food of this.world.foodSources) {
            if (food.amount > 0) {
                const dist = this.distanceTo(food.x, food.y);
                if (dist < closestDist) {
                    closest = food;
                    closestDist = dist;
                }
            }
        }

        return closest;
    }

    distanceTo(x, y) {
        const dx = x - this.x;
        const dy = y - this.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    keepInBounds() {
        const margin = 10;

        if (this.x < margin) {
            this.x = margin;
            this.vx = Math.abs(this.vx);
            this.wanderAngle = Math.random() * Math.PI * 2;
        }
        if (this.x > this.world.width - margin) {
            this.x = this.world.width - margin;
            this.vx = -Math.abs(this.vx);
            this.wanderAngle = Math.random() * Math.PI * 2;
        }
        if (this.y < margin) {
            this.y = margin;
            this.vy = Math.abs(this.vy);
            this.wanderAngle = Math.random() * Math.PI * 2;
        }
        if (this.y > this.world.height - margin) {
            this.y = this.world.height - margin;
            this.vy = -Math.abs(this.vy);
            this.wanderAngle = Math.random() * Math.PI * 2;
        }
    }

    isAlive() {
        return this.energy > 0;
    }
}

class FoodSource {
    constructor(x, y, amount = 50) {
        this.x = x;
        this.y = y;
        this.amount = amount;
        this.initialAmount = amount;
    }

    collect(amount = 1) {
        if (this.amount > 0) {
            this.amount -= amount;
            return true;
        }
        return false;
    }

    isEmpty() {
        return this.amount <= 0;
    }

    getPercentage() {
        return (this.amount / this.initialAmount) * 100;
    }
}

class ForagingWorld {
    constructor(width, height) {
        this.width = width;
        this.height = height;

        // Nido (hogar)
        this.home = {
            x: width / 2,
            y: height / 2,
            radius: 25
        };

        // Agentes y comida
        this.agents = [];
        this.foodSources = [];

        // Estadísticas
        this.foodInNest = 0;
        this.totalFoodCollected = 0;

        // Configuración
        this.showSenseRadius = false;
        this.showTrails = false;
        this.trails = [];
    }

    addAgent(x, y) {
        if (x === undefined || y === undefined) {
            x = this.home.x + (Math.random() - 0.5) * 40;
            y = this.home.y + (Math.random() - 0.5) * 40;
        }
        this.agents.push(new Agent(x, y, this));
    }

    addAgents(count) {
        for (let i = 0; i < count; i++) {
            this.addAgent();
        }
    }

    addFoodSource(x, y, amount = 50) {
        this.foodSources.push(new FoodSource(x, y, amount));
    }

    collectFood(foodSource) {
        return foodSource.collect(1);
    }

    update() {
        // Actualizar agentes
        for (const agent of this.agents) {
            if (agent.isAlive()) {
                agent.update();

                // Agregar a trails si está activado
                if (this.showTrails) {
                    this.trails.push({
                        x: agent.x,
                        y: agent.y,
                        alpha: 1.0
                    });
                }
            }
        }

        // Actualizar trails
        if (this.showTrails) {
            for (let i = this.trails.length - 1; i >= 0; i--) {
                this.trails[i].alpha -= 0.02;
                if (this.trails[i].alpha <= 0) {
                    this.trails.splice(i, 1);
                }
            }

            // Limitar número de trails
            if (this.trails.length > 1000) {
                this.trails.splice(0, this.trails.length - 1000);
            }
        }

        // Eliminar fuentes de comida vacías
        this.foodSources = this.foodSources.filter(food => !food.isEmpty());
    }

    getStats() {
        const aliveAgents = this.agents.filter(a => a.isAlive()).length;
        const deadAgents = this.agents.length - aliveAgents;
        const totalFood = this.foodSources.reduce((sum, f) => sum + f.amount, 0);
        const avgEnergy = aliveAgents > 0
            ? this.agents.filter(a => a.isAlive()).reduce((sum, a) => sum + a.energy, 0) / aliveAgents
            : 0;

        return {
            aliveAgents,
            deadAgents,
            totalAgents: this.agents.length,
            foodSources: this.foodSources.length,
            totalFood,
            foodInNest: this.foodInNest,
            avgEnergy: avgEnergy.toFixed(1)
        };
    }

    clear() {
        this.agents = [];
        this.foodSources = [];
        this.foodInNest = 0;
        this.trails = [];
    }
}
