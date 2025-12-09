# 🐜 Algoritmo de Colonia de Hormigas (ACO)

## Ant Colony Optimization - Visualización Web Interactiva

Una implementación completa del algoritmo de Colonia de Hormigas para resolver el Problema del Viajante (TSP - Traveling Salesman Problem) con visualización web interactiva en tiempo real.

---

## 📋 Descripción

El **Algoritmo de Colonia de Hormigas** (Ant Colony Optimization - ACO) es una técnica metaheurística de optimización inspirada en el comportamiento de las hormigas reales cuando buscan comida. Este proyecto implementa ACO para resolver el problema del viajante, donde el objetivo es encontrar la ruta más corta que visite todas las ciudades exactamente una vez y regrese al punto de inicio.

### ¿Cómo funciona?

1. **Hormigas Artificiales**: Agentes que construyen soluciones paso a paso
2. **Feromonas Digitales**: Valores numéricos que representan la "calidad" de las rutas
3. **Construcción Probabilística**: Las hormigas eligen la siguiente ciudad basándose en:
   - **Feromonas** (α): Rutas con más feromonas son más atractivas
   - **Distancia** (β): Ciudades más cercanas son preferidas
4. **Evaporación**: Las feromonas se reducen con el tiempo para evitar convergencia prematura
5. **Refuerzo**: Las mejores rutas reciben más feromonas

---

## 🚀 Características

- ✅ **Visualización en Tiempo Real**: Observa cómo las hormigas encuentran la mejor ruta
- ✅ **Interfaz Interactiva**: Agrega ciudades haciendo click en el canvas
- ✅ **Generación Aleatoria**: Crea ciudades aleatorias automáticamente
- ✅ **Parámetros Ajustables**: Controla todos los parámetros del algoritmo
- ✅ **Gráfica de Convergencia**: Visualiza cómo mejora la solución
- ✅ **Control de Animación**: Pausa, reanuda y controla la velocidad
- ✅ **Visualización de Feromonas**: Las líneas moradas muestran los niveles de feromonas
- ✅ **Mejor Ruta**: La línea verde muestra la mejor ruta encontrada

---

## 📁 Estructura del Proyecto

```
aco/
├── index.html          # Interfaz web principal
├── aco.js             # Implementación del algoritmo ACO
├── visualization.js   # Lógica de visualización Canvas
└── README.md         # Documentación
```

---

## 🎯 Uso

### 1. Abrir el Archivo

Simplemente abre `index.html` en tu navegador web moderno (Chrome, Firefox, Edge, Safari).

### 2. Agregar Ciudades

Tienes dos opciones:
- **Manual**: Haz click en el canvas para agregar ciudades una por una
- **Automático**: Usa el botón "🎲 Generar Aleatorio" y especifica el número de ciudades

### 3. Configurar Parámetros

Ajusta los parámetros del algoritmo según tus necesidades:

| Parámetro | Descripción | Rango | Valor Recomendado |
|-----------|-------------|-------|-------------------|
| **Hormigas** | Número de hormigas por iteración | 10-100 | 50 |
| **Iteraciones** | Número de iteraciones del algoritmo | 10-300 | 100 |
| **Alpha (α)** | Peso de las feromonas | 0-5 | 1.0 |
| **Beta (β)** | Peso de la distancia | 0-10 | 5.0 |
| **Evaporación** | Tasa de evaporación de feromonas | 0-1 | 0.5 |
| **Velocidad** | Velocidad de la animación (ms) | 10-500 | 100 |

### 4. Ejecutar

Presiona el botón **"▶️ Iniciar"** para ejecutar el algoritmo.

### 5. Controlar

- **⏸️ Pausar**: Pausa la ejecución
- **▶️ Reanudar**: Reanuda desde donde se pausó
- **⏹️ Detener**: Detiene completamente la ejecución

---

## 🔬 Parámetros Explicados

### Alpha (α) - Peso de Feromonas

- **Valor bajo (< 1)**: Las hormigas dan menos importancia a las feromonas → más exploración
- **Valor alto (> 2)**: Las hormigas siguen fuertemente las feromonas → más explotación
- **Recomendado**: 1.0

### Beta (β) - Peso de Distancia

- **Valor bajo (< 2)**: La distancia es menos importante → más exploración
- **Valor alto (> 5)**: Las hormigas prefieren ciudades cercanas → búsqueda más greedy
- **Recomendado**: 5.0

### Evaporación

- **Valor bajo (< 0.3)**: Las feromonas persisten más tiempo → convergencia más lenta
- **Valor alto (> 0.7)**: Las feromonas desaparecen rápido → más exploración
- **Recomendado**: 0.5

---

## 🎨 Interpretación Visual

### Colores

- 🔴 **Círculos Rojos**: Ciudades
- 🟢 **Línea Verde Gruesa**: Mejor ruta encontrada
- 🟣 **Líneas Moradas**: Niveles de feromonas (más gruesas = más feromonas)
- 🔵 **Líneas Azules Tenues**: Rutas de hormigas individuales (durante ejecución)

### Números

- Los números en las ciudades indican su índice
- La distancia en las estadísticas es la longitud total de la mejor ruta

---

## 📊 Estadísticas

El panel de estadísticas muestra:

- **Ciudades**: Número total de ciudades
- **Iteración**: Iteración actual / total
- **Mejor Distancia**: Distancia de la mejor ruta encontrada
- **Hormigas**: Número de hormigas por iteración
- **Alpha, Beta, Evaporación**: Parámetros actuales
- **Gráfica de Convergencia**: Muestra cómo mejora la solución con el tiempo

---

## 💡 Ejemplos de Configuración

### Exploración Agresiva
```
Hormigas: 100
Iteraciones: 200
Alpha: 0.5
Beta: 3.0
Evaporación: 0.7
```
Mayor diversidad de soluciones, puede encontrar mejores resultados pero toma más tiempo.

### Convergencia Rápida
```
Hormigas: 30
Iteraciones: 50
Alpha: 2.0
Beta: 7.0
Evaporación: 0.3
```
Converge rápidamente pero puede quedarse en óptimos locales.

### Balanceado (Recomendado)
```
Hormigas: 50
Iteraciones: 100
Alpha: 1.0
Beta: 5.0
Evaporación: 0.5
```
Buen balance entre exploración y explotación.

---

## 🧪 Casos de Prueba

### Caso 1: Pocas Ciudades (5-10)
- **Hormigas**: 30
- **Iteraciones**: 50
- **Resultado esperado**: Solución óptima o muy cercana

### Caso 2: Ciudades Medias (15-25)
- **Hormigas**: 50
- **Iteraciones**: 100
- **Resultado esperado**: Buena solución en tiempo razonable

### Caso 3: Muchas Ciudades (30-50)
- **Hormigas**: 100
- **Iteraciones**: 200
- **Resultado esperado**: Solución aceptable, puede no ser óptima

---

## 🔧 Tecnologías Utilizadas

- **HTML5**: Estructura y Canvas para visualización
- **CSS3**: Diseño moderno y responsivo
- **JavaScript ES6+**: Lógica del algoritmo y visualización
- **Canvas API**: Renderizado de gráficos

---

## 📚 Aplicaciones del ACO

El algoritmo de colonia de hormigas tiene múltiples aplicaciones:

1. **Optimización de Rutas**
   - Logística y distribución
   - Planificación de rutas de vehículos
   - Enrutamiento de redes

2. **Scheduling**
   - Asignación de tareas
   - Planificación de producción
   - Horarios de trabajo

3. **Telecomunicaciones**
   - Enrutamiento de datos
   - Optimización de redes
   - Balanceo de carga

4. **Diseño**
   - Diseño de circuitos
   - Layout de chips
   - Arquitectura de redes

---

## 🎓 Referencias Académicas

- **Dorigo, M., & Stützle, T. (2004)**. *Ant Colony Optimization*. MIT Press.
- **Dorigo, M., Maniezzo, V., & Colorni, A. (1996)**. *Ant system: optimization by a colony of cooperating agents*. IEEE Transactions on Systems, Man, and Cybernetics.

---

## 🤝 Contribuciones

Este proyecto es de código abierto y educativo. Siéntete libre de:

- Mejorar el algoritmo
- Agregar nuevas visualizaciones
- Implementar variantes del ACO (Elitist AS, Max-Min AS, etc.)
- Resolver otros problemas de optimización

---

## 📝 Notas Técnicas

### Complejidad

- **Tiempo**: O(iteraciones × hormigas × n²) donde n es el número de ciudades
- **Espacio**: O(n²) para las matrices de distancias y feromonas

### Limitaciones

- Para problemas muy grandes (>100 ciudades), puede ser lento
- No garantiza encontrar el óptimo global
- Sensible a la configuración de parámetros

### Optimizaciones Posibles

- Implementar listas de candidatos
- Usar estrategia elitista
- Implementar búsqueda local (2-opt, 3-opt)
- Paralelizar el cálculo de rutas

---

## 🐛 Troubleshooting

**Problema**: El algoritmo no encuentra buenas soluciones
- **Solución**: Aumenta el número de iteraciones o hormigas

**Problema**: La convergencia es muy lenta
- **Solución**: Aumenta Beta o disminuye Alpha

**Problema**: El algoritmo converge demasiado rápido a una solución mala
- **Solución**: Aumenta la tasa de evaporación o disminuye Alpha

**Problema**: Las feromonas no son visibles
- **Solución**: Ejecuta más iteraciones para que se acumulen feromonas

---

## 📄 Licencia

Este proyecto es de uso educativo y libre. Puedes usarlo, modificarlo y distribuirlo libremente.

---

## 👨‍💻 Autor

Desarrollado como proyecto educativo para demostrar el funcionamiento del Algoritmo de Colonia de Hormigas con visualización interactiva.

---

**¡Disfruta explorando el fascinante mundo de la optimización bioinspirada! 🐜✨**
