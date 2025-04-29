import { LitElement } from "lit";

export class CraftzingElement extends LitElement {
  constructor() {
    super();
    Object.entries(
      (this.constructor as typeof CraftzingElement).dependencies
    ).forEach(([name, component]) => {
      (this.constructor as typeof CraftzingElement).define(name, component);
    });
  }

  static dependencies: Record<string, typeof CraftzingElement> = {};

  // We try to register as the actual class first. If for some reason that fails, we fall back to anonymous classes.
  // customElements can only have 1 class of the same "object id" per registry, so that is why the try {} catch {} exists.
  // Some tools like Jest Snapshots and if you import the constructor and call `new ChButton()` they will fail with the anonymous class version.
  // based on https://github.com/shoelace-style/shoelace/blob/v2.19.1/src/internal/shoelace-element.ts
  static define(
    name: string,
    elementConstructor = this,
    options: ElementDefinitionOptions = {}
  ) {
    const currentlyRegisteredConstructor = customElements.get(name) as
      | CustomElementConstructor
      | typeof CraftzingElement;

    if (!currentlyRegisteredConstructor) {
      try {
        customElements.define(name, elementConstructor, options);
      } catch {
        customElements.define(
          name,
          class extends elementConstructor {},
          options
        );
      }
      return;
    }
  }

  protected get undeclaredAttributes(): Record<string, string | null> {
    return Array.from(this.attributes)
      .filter(
        (attr) =>
          attr.name !== "class" &&
          !(this.constructor as typeof CraftzingElement).elementProperties.has(
            attr.name
          )
      )
      .reduce((acc, attr) => {
        acc[attr.name] = attr.value;
        return acc;
      }, {} as Record<string, string | null>);
  }
}
