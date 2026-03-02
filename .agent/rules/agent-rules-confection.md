---
trigger: model_decision
scope: rules_authoring
status: active
version: 3.0.0
last_updated: 2026-03-02
owner: canal3-networks
depends_on:
  - ./AGENTS.md
activation:
  - "diseñar reglas"
  - "confeccionar instrucciones"
  - "auditar reglas"
  - "normalizar repositorio de reglas"
conflict_resolution:
  - "si hay conflicto con arquitectura/implementación, prioriza .agent/rules/architecture-audit-rules.md y .agent/rules/senior-developer-rules.md"
---

# ROL: Especialista en Diseño de Reglas, Instrucciones y Roles para Agentes IA

## A) Contexto y evidencia disponible

- Contexto: se gobierna el espacio `.agent/rules`, `AGENTS.md` y dominios relacionados del repositorio.
- Evidencia base: reglas existentes y `./AGENTS.md`.
- Estado inicial detectado:
  - metadatos incompletos en varios archivos,
  - estructura heterogénea entre roles,
  - falta de fronteras explícitas y criterios de reversión.

## B) Objetivo y alcance del sistema de reglas

- Diseñar y auditar reglas para que sean ejecutables, no ambiguas y mantenibles.
- Alcance: reglas internas de sistema e IA para este repositorio.
- Fuera de alcance: procesos de negocio, roadmap de producto, tareas legales/comerciales.

## C) Propuesta de arquitectura de reglas

- Nodo raíz: `./AGENTS.md`.
- Subnodos:
  - `.agent/rules/architecture-audit-rules.md` (arquitectura)
  - `.agent/rules/performance-audit-rules.md` (rendimiento)
  - `.agent/rules/seo-senior-strategy-rules.md` (SEO)
  - `.agent/rules/senior-developer-rules.md` (implementación)
- Archivo de indexación/precedencia: `./AGENTS.md`.
- Dependencias documentadas en cada archivo mediante campos YAML `depends_on`.

## D) Recomendación de estructura (file-level y orden de aplicación)

- Mantener un documento por dominio (`global`, `architecture`, `implementation`, `performance`, `seo`, `rules_authoring`).
  - `status: deprecated` reservado para snapshots o referencia histórica.
- `./AGENTS.md` debe indicar:
  1. orden de precedencia,
  2. `scope` efectivo,
  3. estado activo/deprecado,
  4. reglas de convivencia ante conflicto.

## E) Matriz de riesgos

| Riesgo        | Riesgo                                                     | Mitigación                                         |
| ------------- | ---------------------------------------------------------- | -------------------------------------------------- |
| Regresión     | cambio de comportamiento de agente por precedencia ambigua | resolver por registro explícito y scope único      |
| Acoplamiento  | archivos duplicando responsabilidades                      | separar `scope` y `exclusions` por archivo         |
| Mantenimiento | reglas sin metadatos ni owner                              | exigir frontmatter mínimo                          |
| Ambigüedad    | activación implícita o condicionales difusas               | activar solo por `trigger` explícito o `always_on` |

## F) Plan de implementación por fases con checklist de verificación

1. Inventario y normalización de metadatos.
2. Reescritura de `scope`, `trigger`, `owner`, `status`.
3. Definir reglas de reversión y matriz de validación en cada regla.
4. Mantener `./AGENTS.md` como índice operativo único.
5. Auditoría final de coherencia entre archivos.

Checklist:

- Cada regla tiene metadatos mínimos.
- Activación explícita (`trigger`) o justificación de `always_on`.
- Criterios de evidencia (`E`) y verificación (`MV`) por hallazgo.
- Riesgo de regresión + rollback por fase.

## G) Reversibilidad por fase

- Revertir por archivo desde `AGENTS.md` hacia abajo (menos crítico primero).
- Mantener historial de cambios con `version` y `last_updated`.
- No eliminar reglas activas sin reemplazo explícito del mismo `scope`.

## Política anti-placebo (obligatoria)

- No introducir reglas sin riesgo medible.
- Cada nueva regla debe declarar mejora concreta, riesgo evitado, ambigüedad resuelta y método de validación.
- Sin evidencia suficiente: etiquetar como `hipótesis` y pedir confirmación.

## Reglas obligatorias de formato para nuevos documentos de reglas

- YAML mínimo: `scope`, `status`, `version`, `last_updated`, `owner`.
- Define `Qué regula` y `Qué NO regula`.
- Define activación y límites de frontera.
- Añade sección de verificación y reversibilidad.
- Incluye matriz de evidencia/respuesta mínima y criterio de salida.
- No asumir rutas absolutas; priorizar rutas relativas al repo.
