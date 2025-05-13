'use client'

import { Alert, Avatar, Box, Button, ThemeProvider, Accordion, AccordionSummary, AccordionDetails, Badge, Skeleton, Card, CardContent, Chip, CheckboxProps, Checkbox } from "@mui/material"
import { theme } from "@/app/theme"
import NotificationsIcon from '@mui/icons-material/Notifications'
import MailIcon from '@mui/icons-material/Mail'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import CheckBox from "@mui/icons-material/CheckBox"
import CheckBoxOutlineBlank from "@mui/icons-material/CheckBoxOutlineBlank"
import Favorite from "@mui/icons-material/Favorite"
import FavoriteBorder from "@mui/icons-material/FavoriteBorder"
import StarBorder from "@mui/icons-material/StarBorder"
import { Star } from "lucide-react"

interface PreviewProps {
  data: ComponentData
}

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

export function TabPreview({ data }: PreviewProps) {
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

  const renderPreview = (props: ComponentProps = {}) => {
    switch (data.component.type) {
      case 'Button':  
        return (
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Button {...data.component.defaultProps} {...props}>
              {props?.text || data.codeExample.defaultText || 'Button'}
            </Button>
          </Box>
        )
      case 'Avatar':
        const { loading, ...avatarProps } = props as { loading?: boolean } & ComponentProps;
        return (
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            {loading ? (
              <Skeleton variant="circular">
                <Avatar {...data.component.defaultProps} {...avatarProps}>
                  {avatarProps?.text || data.codeExample.defaultText || 'A'}
                </Avatar>
              </Skeleton>
            ) : (
              <Avatar {...data.component.defaultProps} {...avatarProps}>
                {avatarProps?.text || data.codeExample.defaultText || 'A'}
              </Avatar>
            )}
          </Box>
        )
      case 'Alert':
        return (
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Alert {...data.component.defaultProps} {...props}>
              {props?.text || data.codeExample.defaultText || 'Alert message'}
            </Alert>
          </Box>
        )
      case 'Accordion':
        return (
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Accordion {...data.component.defaultProps} {...props}>
              <AccordionSummary>
                {props?.text || data.codeExample.defaultText || 'Seção do Accordion'}
              </AccordionSummary>
              <AccordionDetails>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
              </AccordionDetails>
            </Accordion>
          </Box>
        )
      case 'Badge':
        return (
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Badge {...data.component.defaultProps} {...props}>
              {getIconComponent(props?.text || data.codeExample.defaultText || 'NotificationsIcon')}
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
            <Chip 
               {...data.component.defaultProps} {...props}
               label={props.text || 'Chip'}
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
    <ThemeProvider theme={theme}>
      <div className="space-y-6">
        <div className="rounded-lg border p-6">
          <h2 className="text-2xl font-semibold mb-2">{data.labels.properties}</h2>
          <p className="text-gray-600 mb-4">{data.labels.propertiesDescription}</p>
          <ul className="list-disc pl-6 space-y-2">
            {data.properties.map((prop) => (
              <li key={prop.name}>
                <code className="text-sm bg-gray-100 dark:bg-gray-500 px-1 py-0.5 rounded">{prop.name}</code> - {prop.description}
                {prop.options && `: ${prop.options.join(", ")}`}
              </li>
            ))}
          </ul>
        </div>

        {data.variants && data.variants.length > 0 && (
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-2">{data.labels.variants}</h2>
            <p className="text-gray-600 mb-4">{data.labels.variantsDescription}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {data.variants.map((variant: { name: string; description: string; example: Record<string, string | boolean | number> }) => (
                <div key={variant.name} className="space-y-2">
                  <h3 className="font-medium">{variant.name}</h3>
                  {renderPreview(variant.example)}
                  <p className="text-sm text-gray-600">{variant.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.colors && data.colors.length > 0 && (
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-2">{data.labels.colors}</h2>
            <p className="text-gray-600 mb-4">{data.labels.colorsDescription}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
              {data.colors.map((color: { name: string; value: string }) => (
                <div key={color.value}>
                  {renderPreview({ color: color.value, text: color.name })}
                </div>
              ))}
            </div>
          </div>
        )}

        {data.sizes && data.sizes.length > 0 && (
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-2">{data.labels.sizes}</h2>
            <p className="text-gray-600 mb-4">{data.labels.sizesDescription}</p>
            <div className="flex items-center gap-4">
              {data.sizes.map((size: { value: string; example: Record<string, string | boolean | number> }) => (
                <div key={size.value}>
                  {renderPreview(size.example)}
                </div>
              ))}
            </div>
          </div>
        )}

        {data.states && Object.keys(data.states).length > 0 && (
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-2">{data.labels.states}</h2>
            <p className="text-gray-600 mb-4">{data.labels.statesDescription}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.isArray(data.states) ? (
              data.states.map((state: { name: string; description: string; examples: Array<Record<string, unknown>> }) => (
                <div key={state.name}>
                  <h3 className="font-medium mb-2">{state.name}</h3>
                  <p className="text-gray-600 mb-2">{state.description}</p>
                  <div className="flex gap-4">
                    {state.examples.map((example: Record<string, unknown>, index: number) => (
                      <div key={index}>
                        {renderPreview(example as ComponentProps)}
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              Object.entries(data.states).map(([name, state]: [string, { description: string; examples: Array<Record<string, unknown>> }]) => (
                <div key={name}>
                  <h3 className="font-medium mb-2">{name}</h3>
                  <p className="text-gray-600 mb-2">{state.description}</p>
                  <div className="flex gap-4">
                    {state.examples.map((example: Record<string, unknown>, index: number) => (
                      <div key={index}>
                        {renderPreview(example as ComponentProps)}
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
            </div>
          </div>
        )}

        {data.bestPractices && data.bestPractices.length > 0 && (
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-2">{data.labels.bestPractices}</h2>
            <div className="space-y-4">
              {data.bestPractices.map((practice: { title: string; description: string; examples: Array<Record<string, string | boolean | number>> }) => (
                <div key={practice.title}>
                  <h3 className="font-medium mb-2">{practice.title}</h3>
                  <p className="text-gray-600 mb-2">{practice.description}</p>
                  <div className="flex gap-4">
                    {practice.examples.map((example: Record<string, string | boolean | number>, index: number) => (
                      <div key={index}>
                        {renderPreview(example)}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ThemeProvider>
  )
} 