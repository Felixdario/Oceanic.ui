interface Component {
  id: string;
  name: string;
  description: string;
  import: string;
  code: string;
  variants?: Array<{ name: string }>;
  sizes?: Array<{ name: string }>;
  states?: Array<{ name: string }>;
  properties?: Array<{
    name: string;
    type: string;
    description: string;
    default?: string;
  }>;
  usageExamples?: Array<{
    title: string;
    description: string;
    code: string;
  }>;
}

const components: Component[] = [
  {
    id: "button",
    name: "Button",
    description: "Um componente de botão interativo com várias variantes e estados.",
    import: `import { Button } from "@/components/ui/button"`,
    code: `// Código do componente Button...`,
    variants: [
      { name: "Default" },
      { name: "Destructive" },
      { name: "Outline" },
      { name: "Secondary" },
      { name: "Ghost" },
      { name: "Link" }
    ],
    sizes: [
      { name: "Default" },
      { name: "Small" },
      { name: "Large" },
      { name: "Icon" }
    ],
    states: [
      { name: "Default" },
      { name: "Disabled" },
      { name: "Loading" }
    ]
  }
];

export function getComponentById(id: string): Component | undefined {
  return components.find(component => component.id === id);
}

export function getAllComponents(): Component[] {
  return components;
} 