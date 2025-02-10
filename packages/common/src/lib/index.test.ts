import { describe, it, expect } from "vitest";
import { fixture, html } from "@open-wc/testing-helpers";
import { CraftzingElement } from "./craftzing-element.js";

describe("CraftzingElement", () => {
  class TestElement extends CraftzingElement {
    static properties = {
      reserved: { type: String, attribute: "reserved" },
    };

    getUndeclaredAttributesForTest() {
      return this.undeclaredAttributes;
    }
  }

  class DependencyElement extends CraftzingElement {}

  class ElementWithDependencies extends CraftzingElement {
    static dependencies = {
      "test-dependency": DependencyElement,
    };
  }

  it("should handle undeclared attributes", async () => {
    TestElement.define("test-element", TestElement);
    const el = (await fixture(
      html`<test-element undeclared="value" reserved="value"></test-element>`
    )) as TestElement;

    expect(el.getUndeclaredAttributesForTest()).toEqual({
      undeclared: "value",
    });
  });

  it("should register dependencies on construction", () => {
    ElementWithDependencies.define(
      "element-with-deps",
      ElementWithDependencies
    );
    new ElementWithDependencies();

    expect(customElements.get("test-dependency")).toBeDefined();
  });
});
