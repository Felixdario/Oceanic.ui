'use client'

import { useState } from "react"
import { Checkbox, FormControlLabel, Box, Button, Avatar, Alert, Accordion, AccordionSummary, AccordionDetails, Badge, Card, CardContent, Chip, CheckboxProps } from "@mui/material"
import { CodeBlock } from "@/components/code-block"
import { Dropdown } from "@/app/components/ui/dropdown"
import NotificationsIcon from '@mui/icons-material/Notifications'
import MailIcon from '@mui/icons-material/Mail'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import Favorite from '@mui/icons-material/Favorite'
import StarBorder from '@mui/icons-material/StarBorder'
import Star from '@mui/icons-material/Star'
import CheckBoxOutlineBlank from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBox from '@mui/icons-material/CheckBox'

interface ComponentData {
  name: string;
  description: string;
  component: {
    type: string;
    import: string;
    defaultProps: ComponentProps;
  };
  labels: Record<string, string>;
  codeExample: {
    import: string;
    component: string;
    props: string[];
    defaultText: string;
  };
  properties: Array<{
    name: string;
    type: string;
    description: string;
    options?: string[];
  }>;
  variants?: Array<{
    name: string;
    description: string;
    example: Record<string, string | boolean | number>;
  }>;
  colors?: Array<{
    name: string;
    value: string;
  }>;
  sizes?: Array<{
    name: string;
    value: string;
    example: Record<string, string | boolean | number>;
  }>;
  states?: Array<{
    name: string;
    description: string;
    examples: Array<{
      variant?: string;
      color?: string;
      severity?: string;
      text?: string;
      disabled?: boolean;
      loading?: boolean;
      [key: string]: unknown;
    }>;
  }> | {
    [key: string]: {
      description: string;
      examples: Array<{
        variant?: string;
        color?: string;
        severity?: string;
        text?: string;
        disabled?: boolean;
        loading?: boolean;
        [key: string]: unknown;
      }>;
    };
  };
  bestPractices?: Array<{
    title: string;
    description: string;
    examples: Array<Record<string, string | boolean | number>>;
  }>;
}

interface ComponentProps {
  [key: string]: unknown;
  text?: string;
}

interface CodeProps {
  data: ComponentData
}

type BadgeVariant = 'standard' | 'dot';
type BadgeColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';

interface BadgeProps extends ComponentProps {
  children?: string;
  variant?: BadgeVariant;
  color?: BadgeColor;
  badgeContent?: React.ReactNode;
  overlap?: 'circular' | 'rectangular';
}

export function TabCode({ data }: CodeProps) {
  const [componentProps, setComponentProps] = useState<ComponentProps>({
    ...data.component.defaultProps,
    text: data.codeExample.defaultText
  })

  const generateCode = (props: ComponentProps) => {
    const formatSxProp = (sx: Record<string, string | number> | undefined) => {
      if (!sx) return '{}'
      return `{
        ${Object.entries(sx)
          .map(([key, value]) => `${key}: "${value}"`)
          .join(',\n        ')}
      }`
    }

    const currentIcon = (props as BadgeProps).children || 'NotificationsIcon'
    const iconImport = data.component.type === 'Badge' 
      ? `\nimport ${currentIcon} from '@mui/icons-material/${currentIcon}'`
      : ''

    const icons = new Set<string>();
    if (props.icon) icons.add(props.icon as string);
    if (props.checkedIcon) icons.add(props.checkedIcon as string);
    
    const iconImports = Array.from(icons)
      .map(icon => `import ${icon} from '@mui/icons-material/${icon}'`)
      .join('\n');

    const baseImport = data.codeExample.import.split('\n')[0];
    const imports = iconImports ? `${baseImport}\n${iconImports}` : baseImport;

    const propsString = Object.entries(props)
      .filter(([key]) => data.codeExample.props.includes(key))
      .map(([key, value]) => {
        if (key === 'sx') {
          return `      sx={${formatSxProp(value as Record<string, string | number> | undefined)}}`
        }
        if (key === 'icon' || key === 'checkedIcon') {
          return `      ${key}={${value}}`
        }
        if (typeof value === 'string') {
          return `      ${key}="${value}"`
        }
        if (typeof value === 'boolean') {
          return value ? `      ${key}` : ''
        }
        if (typeof value === 'function') {
          return `      ${key}={${value.toString()}}`
        }
        return `      ${key}={${value}}`
      })
      .filter(Boolean)
      .join('\n')

    const isSelfClosing = ['Chip', 'Checkbox'].includes(data.component.type)
    const childrenContent = data.component.type === 'Badge'
      ? `      <${currentIcon} />`
      : `      ${data.codeExample.defaultText}`

    return `${imports}${iconImport}

const ${data.codeExample.component}Example = () => {
  return (
    <${data.codeExample.component}
${propsString}${isSelfClosing ? ' />' : `>
${childrenContent}
    </${data.codeExample.component}>`}
  )
}

export default ${data.codeExample.component}Example`
  }

  const renderPropertyInput = (prop: ComponentData['properties'][0]) => {
    switch (prop.type) {
      case 'string':
        if (prop.options) {
          return (
            <Dropdown<string>
              label={prop.name}
              options={prop.options.map(opt => ({ value: opt, label: opt }))}
              value={componentProps[prop.name] as string || ''}
              onChange={(value) => setComponentProps(prev => ({ ...prev, [prop.name]: value }))}
            />
          )
        }
        return (
          <div>
            <label className="text-sm font-medium block mb-2">{prop.name}</label>
            <input
              type="text"
              className="w-full rounded-md border border-input bg-background px-3 py-2"
              value={componentProps[prop.name] as string || ''}
              onChange={(e) => setComponentProps(prev => ({ ...prev, [prop.name]: e.target.value }))} />
          </div>
        )
      case 'boolean':
        return (
          <FormControlLabel
            control={
              <Checkbox
                checked={componentProps[prop.name] as boolean || false}
                onChange={(e) => setComponentProps(prev => ({ ...prev, [prop.name]: e.target.checked }))}
              />
            }
            label={prop.name}
          />
        )
      case 'object':
        return (
          <div className="space-y-2">
            <label className="text-sm font-medium block">{prop.name}</label>
            <div className="space-y-2 p-3 border border-input rounded-md bg-background">
              {Object.entries(componentProps[prop.name] as Record<string, string | number> || {}).map(([key, value]) => (
                <div key={key} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Propriedade"
                    className="w-1/3 rounded-md border border-input bg-background px-2 py-1 text-sm"
                    value={key}
                    onChange={(e) => {
                      const newKey = e.target.value;
                      const currentValue = (componentProps[prop.name] as Record<string, string | number>) || {};
                      const newValue = { ...currentValue };
                      delete newValue[key];
                      newValue[newKey] = value;
                      setComponentProps(prev => ({ ...prev, [prop.name]: newValue }));
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Valor"
                    className="w-2/3 rounded-md border border-input bg-background px-2 py-1 text-sm"
                    value={value}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      const currentValue = (componentProps[prop.name] as Record<string, string | number>) || {};
                      setComponentProps(prev => ({
                        ...prev,
                        [prop.name]: { ...currentValue, [key]: newValue }
                      }));
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'NotificationsIcon':
        return <NotificationsIcon />
      case 'MailIcon':
        return <MailIcon />
      case 'ShoppingCartIcon':
        return <ShoppingCartIcon />
      case 'AccountCircleIcon':
        return <AccountCircleIcon />
      case 'FavoriteBorder':
        return <FavoriteBorder />
      case 'Favorite':
        return <Favorite />
      case 'StarBorder':
        return <StarBorder />
      case 'Star':
        return <Star />
      case 'CheckBoxOutlineBlank':
        return <CheckBoxOutlineBlank />
      case 'CheckBox':
        return <CheckBox />
      default:
        return <NotificationsIcon />
    }
  }

  const renderPreview = (props: ComponentProps) => {
    switch (data.component.type) {
      case 'Button':
        return (
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Button {...data.component.defaultProps} {...props}>{typeof props.text === 'string' ? props.text : 'Button'}</Button>
          </Box>
        )
      case 'Avatar':
        return (
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Avatar {...data.component.defaultProps} {...props}>{typeof props.text === 'string' ? props.text : 'A'}</Avatar>
          </Box>
        )
      case 'Alert':
        return (
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Alert {...data.component.defaultProps} {...props}>{typeof props.text === 'string' ? props.text : 'Alert message'}</Alert>
          </Box>
        )
      case 'Accordion':
        return (
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Accordion {...data.component.defaultProps} {...props}>
              <AccordionSummary>Seção do Accordion</AccordionSummary>
              <AccordionDetails>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
              </AccordionDetails>
            </Accordion>
          </Box>
        )
      case 'Badge':
        const badgeProps = props as BadgeProps;
        return (
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Badge 
               {...data.component.defaultProps} {...props}
            >
              {getIconComponent(badgeProps.children || 'NotificationsIcon')}
            </Badge>
          </Box>
        )
        case 'Card':
        return (
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Card 
               {...data.component.defaultProps} {...props}
            >
              <CardContent>Conteúdo do Card</CardContent>
            </Card>
          </Box>
        )
        case 'Chip':
        return (
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={!!componentProps.onDelete}
                  onChange={(e) => setComponentProps(prev => ({ 
                    ...prev, 
                    onDelete: e.target.checked ? () => console.log('onDelete') : undefined 
                  }))}
                />
              }
              label="Mostrar botão de deletar"
            />
            <Chip 
               {...data.component.defaultProps} {...props}
               label={String(props.label || props.text || 'Chip')}
            />
          </Box>
        )
        case 'Checkbox':
        const validProps = Object.fromEntries(
          Object.entries(props).filter(([key]) => ['color', 'size', 'disabled', 'checked', 'onChange', 'icon', 'checkedIcon'].includes(key))
        ) as Partial<CheckboxProps>;
        
        const iconProps = {
          ...validProps,
          icon: props.icon ? getIconComponent(props.icon as string) : undefined,
          checkedIcon: props.checkedIcon ? getIconComponent(props.checkedIcon as string) : undefined
        };

        return (
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Checkbox 
               {...data.component.defaultProps} {...iconProps}
            />
          </Box>
        )
      default:
        return null
    }
  }

  return (
    <div className="rounded-lg border p-6">
      <h2 className="text-2xl font-semibold mb-2">{data.labels.code}</h2>
      <p className="text-gray-600 mb-4">O código do componente {data.name}.</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">{data.labels.implementation}</h3>
          <CodeBlock
            code={generateCode(componentProps)}
            language="javascript"
            title={`${data.name}.tsx`}
          />
        </div>
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-4">{data.labels.customization}</h3>
            <div className="space-y-4">
              {data.properties.map(prop => (
                <div key={prop.name}>
                  {renderPropertyInput(prop)}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-4">{data.labels.preview}</h3>
            <div className="rounded-lg border p-8 flex items-center justify-center bg-zinc-50 dark:bg-zinc-900">
              {renderPreview(componentProps)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 