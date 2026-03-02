---
trigger: always_on
scope: global
status: active
version: 3.0.0
last_updated: 2026-03-02
owner: canal3-networks
depends_on: []
---

# AGENTS.md (Rule Engine Root)

## Rol

Actúas bajo este archivo como **único punto de entrada global** para el sistema de reglas.

## Qué regula

- Punto de entrada, catálogo y activación de reglas del repositorio.
- Resolución de conflictos y precedencia entre reglas locales.
- Criterios mínimos de salida: trigger, evidencia, riesgo y reversión.

## Qué NO regula

- Definiciones técnicas de arquitectura, rendimiento, implementación o SEO.
- Esas decisiones permanecen en sus reglas de dominio.

## Catálogo canónico de reglas (solo aquí)

- `.agent/rules/architecture-audit-rules.md`
  - Scope: `architecture`
  - Estado: `active`
  - Propósito: arquitectura, fronteras de sistema y modelo de datos
  - Activación: diseños de arquitectura, planificación sistémica, auditoría de arquitectura, flujo de BDD

- `.agent/rules/agent-rules-confection.md`
  - Scope: `rules_authoring`
  - Estado: `active`
  - Propósito: crear, auditar y normalizar reglas de IA y roles
  - Activación: diseñar reglas, confeccionar instrucciones, normalizar repositorio de reglas

- `.agent/rules/senior-developer-rules.md`
  - Scope: `implementation`
  - Estado: `active`
  - Propósito: decisiones de implementación y entregables técnicos
  - Activación: refactor, implementación, mantenimiento, cambios de código

- `.agent/rules/performance-audit-rules.md`
  - Scope: `performance`
  - Estado: `active`
  - Propósito: auditoría y optimización de rendimiento
  - Activación: audita la codebase, optimiza rendimiento, rendimiento

- `.agent/rules/seo-senior-strategy-rules.md`
  - Scope: `seo`
  - Estado: `active`
  - Propósito: estrategia y auditoría SEO técnico-semántica
  - Activación: audita SEO, estrategia semántica, autoridad temática, optimiza Next SEO

## Regla de precedencia y resolución

- Precedencia obligatoria:
  1. `AGENTS.md` (este archivo)
  2. `.agent/rules/architecture-audit-rules.md`
  3. `.agent/rules/agent-rules-confection.md`
  4. `.agent/rules/senior-developer-rules.md`
  5. `.agent/rules/performance-audit-rules.md`
  6. `.agent/rules/seo-senior-strategy-rules.md`

- No se ejecuta ninguna regla con `status: deprecated`.
- En conflicto, gana la primera regla activa de esta lista.

## Método de activación por intención

- Detecta la intención del usuario y clasifícala en uno o más scopes:
  - `architecture`, `rules_authoring`, `implementation`, `performance`, `seo`.
- Ejecuta solo las reglas `active` del scope detectado.
- Si la intención encaja en varios scopes, aplica precedencia de esta sección.
- Si la intención es ambigua, pide una única aclaración antes de aplicar cambios.

## Verificación canónica mínima (E/MV)

- Toda acción debe incluir:
  - Regla(s) activadas
  - Evidencia mínima (`E`) y método de validación (`MV`)
- Estado de verificación (`Verificado / Parcial / No verificado`)
- Riesgo de regresión y plan de reversión.

## Criterios de éxito del motor de reglas

- Selección de reglas sin ambigüedad por alcance.
- Sin duplicación de reglas activables desde otros puntos de entrada.
- Salida trazable: evidencia, MV, riesgo y rollback por fase.
