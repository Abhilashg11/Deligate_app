export function normalizeWorkflow(workflow) {

  return {
    ...workflow,
    steps: workflow.steps?.map((step, stepIndex) => ({
      id: step.id ?? `step-${stepIndex}`,
      ...step,

      cards: step.cards?.map((card, cardIndex) => ({
        id: card.id ?? `card-${stepIndex}-${cardIndex}`,
        ...card,

        sections: card.sections?.map((section, sectionIndex) => ({
          id: section.id ?? `section-${stepIndex}-${cardIndex}-${sectionIndex}`,
          ...section,

          fields: section.fields?.map((field, fieldIndex) => ({
            id: field.id ?? field.name ?? `field-${fieldIndex}`,
            ...field
          }))

        }))

      }))

    }))
  };
}