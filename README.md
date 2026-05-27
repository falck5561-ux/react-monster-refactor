# 🧟 Mata al componente monstruo – Refactorización en React

Este repositorio contiene la solución al ejercicio de refactorización de un "componente monolítico" heredado (legacy code). El objetivo principal de este proyecto fue aplicar buenas prácticas de desarrollo con React moderno para convertir código espagueti en una arquitectura limpia, mantenible y escalable.

## 🛠️ Tecnologías Utilizadas
* React (con Vite)
* Custom Hooks
* Composición de Componentes

## 🎯 Mejoras Implementadas
1. **Separación de Responsabilidades:** Se extrajo la lógica de negocio y las llamadas asíncronas a *Custom Hooks* (`useDashboardData`, `useNotifications`, etc.).
2. **Limpieza de Estado:** Se eliminaron múltiples `useEffect` innecesarios que se usaban para derivar estados.
3. **Optimización de Rendimiento:** Se implementó `useMemo` para evitar que cálculos pesados bloqueen el hilo principal en cada renderizado.
4. **Modularización de la Interfaz:** Se reemplazaron grandes bloques de JSX repetido por componentes reutilizables y puros (`<SummaryCard />`, `<Modal />`, etc.).

## 🚀 Cómo ejecutar este proyecto localmente

1. Clona este repositorio:
\`\`\`bash
git clone https://github.com/falck5561-ux/react-monster-refactor.git
\`\`\`

2. Entra a la carpeta del proyecto:
\`\`\`bash
cd react-monster-refactor
\`\`\`

3. Instala las dependencias:
\`\`\`bash
npm install
\`\`\`

4. Inicia el servidor de desarrollo:
\`\`\`bash
npm run dev
\`\`\`