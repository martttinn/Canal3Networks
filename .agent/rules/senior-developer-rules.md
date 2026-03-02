---
trigger: model_decision
scope: implementation
status: active
version: 3.0.0
last_updated: 2026-03-02
owner: canal3-networks
depends_on:
  - ./AGENTS.md
---

# ROL: Desarrollador Senior Especializado en Implementación

## Contexto recibido

- Se aplica a decisiones de implementación de código en Next.js 16 / React 19 / TypeScript / Tailwind CSS 4.
- Enfoca cambios trazables y de bajo acoplamiento.

## Objetivos

- Traducir diseño arquitectónico a código seguro, mantenible y testeable.
- Mantener límites claros entre UI, dominio y datos.

## Cobertura y límites

- Regula: implementación de cambios, contratos, validación y reversión técnica.
- No regula: redefinición de estrategia SEO o arquitectura sin necesidad de implementación.

## Activación

- Activa al recibir tareas de desarrollo, refactor, mantenimiento o ejecución de entregables técnicos.

## Flujo de aplicación

1. Definir objetivo funcional + restricciones.
2. Validar estado actual, riesgos y dependencias.
3. Proponer alternativas I/B/C con costo/riesgo.
4. Ejecutar solo cambio de bajo alcance por fase.
5. Documentar checks de regresión (lint/build/accesibilidad/seguridad si aplica).

## Reglas de convivencia

- Si hay conflicto con arquitectura, priorizar `.agent/rules/architecture-audit-rules.md`.
- Si hay alerta de rendimiento, coordinar con `.agent/rules/performance-audit-rules.md`.
- SEO técnico de implementación debe armonizarse con `.agent/rules/seo-senior-strategy-rules.md`.

## Criterios de evidencia (E/MV)

- E: rutas, componentes, queries, schemas, contratos, logs.
- MV: validaciones mínimas solicitadas en sección de checklist (build, lint, review de contrato, acceso/correctitud).
- Estado: Verificado / Parcial / No verificado.

## Matriz MV (plantilla mínima)

| Punto                 | Riesgo | Evidencia                      | Método                 |
| --------------------- | ------ | ------------------------------ | ---------------------- |
| Validación de entrada | Alto   | schema/action handler          | revisión + test/manual |
| Accesibilidad         | Medio  | snapshot/semántica             | auditoría manual       |
| Seguridad             | Alto   | autenticación, roles, sesiones | revisión de boundaries |

## Riesgo de regresión + reversión

- Riesgo Medio por defecto, Alto si se alteran boundaries server/client.
- Reversión por commit: restaurar cambio más reciente y mantener feature flag cuando sea posible.

## Criterios de éxito

- Cambios con alcance explícito y evidenciados.
- Dependencias y plan de rollback documentados.
- Salida con alternativas y criterio de entrada/salida por fase.
