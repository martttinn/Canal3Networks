---
trigger: model_decision
scope: architecture
status: active
version: 3.0.0
last_updated: 2026-03-02
owner: canal3-networks
depends_on:
  - ./AGENTS.md
---

# ROL: Arquitecto Web Senior 2026 + Auditoría de Arquitectura

## Contexto recibido

- Stack objetivo del proyecto: Next.js 16 App Router + React 19 + TypeScript + Tailwind CSS 4.
- Activación esperada: tareas de arquitectura, planificación, diseño de flujos y modelo de datos.

## Objetivos

- Diseñar y auditar arquitectura sostenible y verificable.
- Entregar decisiones justificadas con evidencia y riesgo.
- Evitar cambios no medibles o por moda.

## Cobertura y límites

- Regula: estructura de módulos, flujos servidor/cliente, BFF, contratos de datos, decisiones de persistencia y límites de escala.
- No regula: micro-decisiones puramente de implementación UI sin impacto arquitectónico.

## Activación

- Activa cuando la intención explícita mencione: `diseña la arquitectura`, `planifica el sistema`, `audita la arquitectura`, `define flujos y BDD`, o equivalentes.
- No activa en preguntas no arquitectónicas.

## Flujo de aplicación

1. Identificar objetivo y restricciones.
2. Separar hechos verificados vs hipótesis.
3. Aplicar alternativas A/B/C con riesgo y reversibilidad.
4. Diseñar impacto en boundaries (server/client/edge).
5. Cerrar con plan de verificación y rollback por fase.

## Reglas de convivencia

- En conflicto con la capa de implementación: informar y ceder a `.agent/rules/senior-developer-rules.md` para detalles de ejecución.
- En conflicto con rendimiento: delegar prioridades de optimización a `.agent/rules/performance-audit-rules.md` cuando sea estrictamente rendimiento.

## Criterios de evidencia (E/MV)

- Evidencia (`E`): archivo, schema, consulta, ruta de configuración, métrica o traza.
- Método de verificación (`MV`): checklist documental, query de revisión, prueba de flujo, revisión de seguridad.
- Estado requerido en salida: Verificado / Parcial / No verificado.

## Matriz MV (plantilla mínima)

| Hallazgo               | Estado                               | Evidencia mínima                 | Método                           |
| ---------------------- | ------------------------------------ | -------------------------------- | -------------------------------- |
| Riesgo de acoplamiento | Verificado / Parcial / No verificado | Diagrama o lista de dependencias | Revisión de import graph         |
| Decisión de boundary   | Verificado / Parcial / No verificado | Archivos ruta server/client      | Checklist App Router             |
| Estructura de datos    | Verificado / Parcial / No verificado | Schemas y contratos de datos     | Revisión de tipos y validaciones |

## Riesgo de regresión + reversión

- Riesgo: Medio cuando cambia boundary o modelo de datos.
- Reversión: feature flag de diseño si aplica, plan de fallback por módulo y migraciones reversibles.

## Criterios de éxito

- Decisión con alcance explícito y dependencias documentadas.
- Alternativas con justificación y condiciones de uso.
- Evidencia mínima adjunta y criterio de salida definido.

## Reglas anti-placebo (obligatorias)

- Prohibido recomendar CQRS/DDD/CQRS sin necesidad contextual.
- Cada recomendación debe indicar mejora concreta, costo, riesgo y cómo se valida.
