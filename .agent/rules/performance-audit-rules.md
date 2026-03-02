---
trigger: model_decision
scope: performance
status: active
version: 3.0.0
last_updated: 2026-03-02
owner: canal3-networks
depends_on:
  - ./AGENTS.md
---

# Performance Audit Rules

## Contexto recibido

- Se activa para tareas de optimización o auditoría de rendimiento en Next.js 16, React 19 y Tailwind CSS 4.
- Sin evidencia técnica suficiente, se indica estado `No verificado`.

## Objetivos

- Detectar cuellos de botella reales.
- Proponer mejoras con evidencia y riesgo controlado.
- Mantener fidelidad visual salvo petición explícita.

## Cobertura y límites

- Regula: análisis de rendimiento, priorización por impacto y mitigación medible.
- No regula: rediseños de UI sin motivo de rendimiento.

## Activación

- Activa al recibir intenciones: `audita la codebase`, `optimiza rendimiento`, `performance`, o peticiones equivalentes.

## Flujo de aplicación

1. Estado de evidencia base (métrica/código/comportamiento).
2. Identificar hipótesis con síntomas observables.
3. Proponer cambios atómicos, sin mezclarlos.
4. Documentar impacto CPU/ram/latencia/hidratación.
5. Definir validación y reversión.

## Reglas de convivencia

- Si la causa principal es arquitectura, delegar o coordinar con `.agent/rules/architecture-audit-rules.md`.
- En cambios de implementación, alinear con `.agent/rules/senior-developer-rules.md`.

## Criterios de evidencia (E/MV)

- E: benchmark, bloque de código, métrica de rendimiento, captura de perfilado o reportes.
- MV: qué herramienta verifica la hipótesis (Lighthouse, profiler, logging, DevTools).
- Estado: Verificado / Parcial / No verificado.

## Matriz MV (plantilla mínima)

| Hallazgo             | Evidencia                        | Método de verificación               | Estado     | Riesgo     |
| -------------------- | -------------------------------- | ------------------------------------ | ---------- | ---------- |
| Re-render costoso    | profiling / flamegraph           | profiler React + tracing             | Verificado | Bajo-Medio |
| Bundle size excesivo | análisis de bundle, tree-shaking | webpack-bundle-analyzer / next build | Verificado | Medio      |
| Hydration/SSR        | consola, route traces            | pruebas de hidratación               | Parcial    | Alto       |

## Recomendaciones de salida obligatoria

- Hallazgos clasificados por severidad.
- Cada recomendación con:
  - Riesgo de regresión,
  - Límite sin cambio visual,
  - Difícil retorno y rollback.
- Rechazar cambios sin síntoma comprobable.

## Riesgo de regresión + reversión

- Riesgo Alto si afecta render loops o lifecycle de componentes críticos.
- Revertir de forma aislada: un cambio por commit y validación inmediatamente posterior.

## Criterios de éxito

- Mejora esperada medible.
- Estado de verificación explícito por hallazgo.
- Ausencia de degradación visual no autorizada.
