# Data Directory

This directory contains all static data used throughout the application.

## Structure

### `/apiReference`
Contains API reference data for components used by the generic `ApiReference` component.

- `ButtonApiData.ts` - API documentation data for the CButton component
- `IconApiData.ts` - API documentation data for the CIcon component
- `index.ts` - Central export for all API reference data and types

## Usage

```typescript
// Import all API reference data
import { buttonApiData, iconApiData } from '@/data/apiReference'

// Or import from the main data index
import { buttonApiData, iconApiData } from '@/data'

// Use with the ApiReference component
<ApiReference v-bind="buttonApiData" />
```

## Adding New Component API Data

1. Create a new file `YourComponentApiData.ts` in the `apiReference` directory
2. Export the data object with the required structure:

```typescript
export const yourComponentApiData = {
  title: 'YourComponent API Reference',
  componentProps: [
    {
      name: 'propName',
      type: 'string',
      required: false,
      description: 'Description of the prop',
      default: 'defaultValue'
    }
  ],
  componentEvents: [
    {
      name: '@eventName',
      description: 'Description of the event',
      payload: 'EventType',
      usage: '@eventName="handler"'
    }
  ],
  componentSlots: [
    {
      name: 'slotName',
      description: 'Description of the slot',
      content: 'Content type',
      example: '<template #slotName>Content</template>'
    }
  ],
  usageExamples: [
    {
      title: 'Basic Usage',
      code: '<YourComponent prop="value">Content</YourComponent>'
    }
  ]
}
```

3. Add the export to the `index.ts` file in the `apiReference` directory
