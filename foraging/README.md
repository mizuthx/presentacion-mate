# 🐜 Simulación de Búsqueda de Comida (Foraging Simulation)

## Comportamiento Colectivo de Agentes - Visualización Web Interactiva

Una simulación completa de búsqueda de comida donde agentes simples (hormigas) buscan alimento y lo llevan de vuelta a su nido, demostrando comportamiento colectivo emergente.

---

## 📋 Descripción

Esta **Simulación de Foraging** modela el comportamiento de agentes que buscan comida de manera descentralizada. Cada agente sigue reglas simples:

1. **Movimiento aleatorio** cuando no detecta comida
2. **Búsqueda activa** dentro de su radio de sensado
3. **Recolección** cuando encuentra comida
4. **Retorno al nido** con la comida
5. **Gestión de energía** que requiere regresar al nido

A pesar de estas reglas simples, emerge un comportamiento colectivo complejo donde los agentes se agrupan eficientemente alrededor de las fuentes de comida.

---

## 🎯 Características

### Comportamiento de Agentes

✅ **Movimiento Natural**:
- Random walk con wandering behavior
- Detección de comida en radio configurable
- Navegación hacia objetivos

✅ **Sistema de Energía**:
- Los agentes consumen energía al moverse
- Deben regresar al nido para recuperar energía
- Mueren si se quedan sin energía

✅ **Estados Visuales**:
- 🔵 Azul: Agente con energía buscando
- 🟠 Naranja: Agente con poca energía
- 🔴 Rojo: Agente llevando comida

✅ **Comportamientos Emergentes**:
- Agrupación alrededor de fuentes de comida
- Formación de caminos entre nido y comida
- Competencia por recursos limitados

### Visualización

✅ **Canvas Interactivo**:
- Click para agregar comida o agentes
- Fondo oscuro para mejor contraste
- Animación fluida en tiempo real

✅ **Elementos Visuales**:
- 🏠 Nido verde con efecto de brillo
- 🍎 Fuentes de comida amarillas (tamaño según cantidad)
- 🐜 Agentes con indicadores de dirección y estado
- 👁️ Radio de sensado opcional
- 🌟 Rastros de movimiento opcionales

✅ **Estadísticas en Tiempo Real**:
- Agentes vivos y muertos
- Energía promedio
- Fuentes de comida activas
- Comida disponible y recolectada

---

## 🚀 Cómo Usar

### 1. Abrir el Archivo

Abre `index.html` en tu navegador web moderno.

### 2. Inicializar la Simulación

**Opción A - Automático**:
1. Ajusta el número de agentes (1-200)
2. Presiona **"🔄 Inicializar"**
3. Presiona **"🍎 Generar Comida Aleatoria"**
4. Presiona **"▶️ Iniciar"**

**Opción B - Manual**:
1. Selecciona modo **"🍎 Comida"** o **"🐜 Agente"**
2. Haz click en el canvas para agregar elementos
3. Presiona **"▶️ Iniciar"**

### 3. Controles de Simulación

| Botón | Función |
|-------|---------|
| ▶️ Iniciar | Comienza la simulación |
| ⏸️ Pausar | Pausa/Reanuda la simulación |
| ⏹️ Detener | Detiene completamente |
| 🗑️ Limpiar Todo | Reinicia el canvas |

### 4. Opciones Visuales

- **Radio de Sensado**: Muestra círculos azules indicando el rango de detección
- **Rastros**: Deja un rastro morado del movimiento de los agentes

---

## 🎮 Escenarios Sugeridos

### Escenario 1: Búsqueda Básica
```
Agentes: 20
Fuentes de comida: 3-5 (aleatorio)
```
Observa cómo los agentes descubren y explotan las fuentes de comida.

### Escenario 2: Competencia por Recursos
```
Agentes: 50
Fuentes de comida: 2 (manual, lejos del nido)
```
Los agentes compiten por recursos limitados. Algunos morirán antes de llegar.

### Escenario 3: Abundancia
```
Agentes: 30
Fuentes de comida: 10 (aleatorio)
```
Con muchas fuentes, observa cómo se distribuyen los agentes.

### Escenario 4: Supervivencia
```
Agentes: 100
Fuentes de comida: 1 (lejos del nido)
```
Desafío de supervivencia. ¿Cuántos agentes lograrán llevar comida?

---

## 🧠 Conceptos Ilustrados

### 1. Comportamiento Emergente

Reglas simples → Comportamiento complejo colectivo

Cada agente sigue reglas básicas, pero el grupo muestra:
- Optimización de rutas
- Distribución eficiente
- Adaptación a cambios

### 2. Sistemas Multi-Agente

- **Autonomía**: Cada agente decide independientemente
- **Interacción**: Compiten por recursos
- **Emergencia**: Patrones que ningún agente planificó

### 3. Foraging en la Naturaleza

Esta simulación modela comportamientos reales:
- Hormigas buscando comida
- Abejas recolectando néctar
- Animales cazando/recolectando

### 4. Optimización Descentralizada

No hay coordinación central, pero el sistema:
- Encuentra comida eficientemente
- Optimiza rutas al nido
- Balancea exploración vs. explotación

---

## 🎨 Interpretación Visual

### Colores de Agentes

| Color | Significado |
|-------|-------------|
| 🔵 Azul | Buscando comida, energía > 50% |
| 🟠 Naranja | Buscando comida, energía < 50% |
| 🔴 Rojo | Llevando comida al nido |

### Tamaño de Comida

El tamaño de las fuentes de comida refleja la cantidad disponible:
- **Grande**: Mucha comida (>75%)
- **Mediano**: Cantidad moderada (25-75%)
- **Pequeño**: Poca comida (<25%)

### Indicadores

- **Línea saliendo del agente**: Dirección de movimiento
- **Punto amarillo sobre agente rojo**: Comida transportada
- **Círculo azul tenue**: Radio de sensado (si está activado)

---

## 🔧 Parámetros Internos

### Agentes

```javascript
senseRadius: 80        // Radio de detección de comida
speed: 1.5            // Velocidad de movimiento
energy: 100           // Energía inicial
energyConsumption: 0.05  // Energía por frame
```

### Mundo

```javascript
homeRadius: 25        // Radio del nido
homePosition: center  // Centro del canvas
energyRestore: 30     // Energía restaurada en el nido
```

### Comida

```javascript
initialAmount: 50     // Cantidad inicial por fuente
collectionRate: 1     // Unidades recolectadas por agente
```

---

## 📊 Estadísticas

La simulación rastrea:

- **Agentes Vivos**: Agentes con energía > 0
- **Agentes Muertos**: Agentes que se quedaron sin energía
- **Energía Promedio**: Energía media de agentes vivos
- **Fuentes Activas**: Fuentes con comida disponible
- **Comida Disponible**: Total en fuentes activas
- **Comida en Nido**: Total recolectado exitosamente

---

## 🎓 Aplicaciones Educativas

### Inteligencia Artificial

- Sistemas multi-agente
- Comportamiento emergente
- Algoritmos de búsqueda descentralizada

### Biología

- Comportamiento de colonias de insectos
- Estrategias de foraging
- Optimización evolutiva

### Optimización

- Algoritmos bioinspirados
- Optimización distribuida
- Swarm intelligence

### Robótica

- Robots autónomos
- Navegación sin mapa
- Coordinación de enjambres

---

## 🧪 Experimentos Propuestos

### Experimento 1: Radio de Sensado

1. Ejecuta con radio de sensado pequeño (modifica en código: 30)
2. Ejecuta con radio grande (modifica en código: 150)
3. Compara eficiencia de recolección

**Pregunta**: ¿Mayor sensado siempre es mejor?

### Experimento 2: Energía Inicial

1. Aumenta energía inicial a 200
2. Reduce energía inicial a 50
3. Observa tasa de supervivencia

**Pregunta**: ¿Cómo afecta la energía a la estrategia de búsqueda?

### Experimento 3: Distribución de Comida

1. Concentra toda la comida en un punto
2. Distribuye uniformemente
3. Crea clusters de comida

**Pregunta**: ¿Qué distribución maximiza la recolección?

---

## 💡 Mejoras Posibles

### Funcionalidades Adicionales

- [ ] Comunicación entre agentes (feromonas químicas)
- [ ] Diferentes tipos de agentes (exploradores, recolectores)
- [ ] Obstáculos en el camino
- [ ] Múltiples nidos compitiendo
- [ ] Depredadores que eliminan agentes
- [ ] Reproducción de agentes exitosos
- [ ] Mapa de calor de actividad
- [ ] Exportación de estadísticas

### Optimizaciones

- [ ] Spatial hashing para detección eficiente
- [ ] Web Workers para simulación en paralelo
- [ ] Renderizado con WebGL para más agentes

---

## 🔬 Fundamento Teórico

### Algoritmos Relacionados

Esta simulación está relacionada con:

1. **Ant Colony Optimization (ACO)**: Usa feromonas y decisiones probabilísticas
2. **Particle Swarm Optimization (PSO)**: Partículas que buscan óptimos
3. **Boids**: Comportamiento de bandadas/cardúmenes
4. **Foraging Theory**: Teoría de búsqueda óptima

### Referencias

- **Bonabeau, E., et al. (1999)**. *Swarm Intelligence: From Natural to Artificial Systems*
- **Kennedy, J., & Eberhart, R. (1995)**. *Particle Swarm Optimization*
- **Charnov, E. L. (1976)**. *Optimal Foraging Theory*

---

## 🐛 Troubleshooting

**Los agentes mueren muy rápido**
- Aumenta la energía inicial en el código
- Reduce el consumo de energía
- Coloca comida más cerca del nido

**Los agentes no encuentran la comida**
- Aumenta el radio de sensado
- Agrega más fuentes de comida
- Aumenta el número de agentes

**La simulación va lenta**
- Reduce el número de agentes
- Desactiva los rastros
- Usa navegador moderno actualizado

**No se ve nada**
- Asegúrate de haber inicializado
- Agrega comida y agentes
- Presiona "Iniciar"

---

## 📁 Estructura del Código

```
foraging/
├── index.html          # Interfaz principal
├── foraging.js        # Lógica de agentes y mundo
├── visualization.js   # Renderizado y animación
└── README.md         # Esta documentación
```

### Clases Principales

- **Agent**: Representa un agente individual
- **FoodSource**: Representa una fuente de comida
- **ForagingWorld**: Maneja la simulación completa
- **ForagingVisualization**: Maneja el canvas y UI

---

## 🤝 Contribuciones

Posibles extensiones:

- Agregar diferentes comportamientos de búsqueda
- Implementar aprendizaje por refuerzo
- Agregar comunicación entre agentes
- Crear niveles/desafíos predefinidos
- Comparar con otros algoritmos

---

## 📄 Licencia

Este proyecto es de uso educativo y libre. Úsalo, modifícalo y compártelo.

---

## 🎯 Conclusión

Esta simulación demuestra cómo reglas simples pueden generar comportamientos complejos y eficientes. Es una excelente herramienta para:

- Entender sistemas multi-agente
- Visualizar algoritmos bioinspirados
- Aprender sobre comportamiento emergente
- Experimentar con optimización descentralizada

**¡Experimenta y observa cómo pequeñas hormigas resuelven grandes problemas! 🐜✨**
