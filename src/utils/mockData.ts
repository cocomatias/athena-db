import { GroupedDataObject, SupabaseData } from '@types';

export const mockDBDataWithoutTokens = [
  {
    id: 1,
    name: 'Laptop',
    category: 'Electronics',
    price: 999.99,
    description: 'Powerful laptop with high-performance specifications.',
  },
  {
    id: 2,
    name: 'Smartphone',
    category: 'Electronics',
    price: 699.99,
    description: 'The latest smartphone with advanced features.',
  },
  {
    id: 3,
    name: 'Headphones',
    category: 'Electronics',
    price: 99.99,
    description: 'Noise-canceling headphones for immersive audio experience.',
  },
  {
    id: 4,
    name: 'Coffee Maker',
    category: 'Kitchen Appliances',
    price: 49.99,
    description: 'Automatic coffee maker for your morning brew.',
  },
  {
    id: 5,
    name: 'Digital Camera',
    category: 'Electronics',
    price: 499.99,
    description: 'High-quality digital camera for photography enthusiasts.',
  },
  {
    id: 6,
    name: 'Running Shoes',
    category: 'Footwear',
    price: 79.99,
    description: 'Comfortable and stylish running shoes for active lifestyles.',
  },
  {
    id: 7,
    name: 'Backpack',
    category: 'Fashion',
    price: 39.99,
    description: 'Stylish and functional backpack for everyday use.',
  },
  {
    id: 8,
    name: 'Gaming Console',
    category: 'Electronics',
    price: 299.99,
    description: 'Next-gen gaming console for immersive gaming experiences.',
  },
  {
    id: 9,
    name: 'Blender',
    category: 'Kitchen Appliances',
    price: 29.99,
    description: 'Powerful blender for making smoothies and more.',
  },
  {
    id: 10,
    name: 'Ebook Reader',
    category: 'Electronics',
    price: 129.99,
    description: 'Lightweight ebook reader for avid readers.',
  },
];

export const mockGroupedSupabaseAIDBData: SupabaseData[][] = [
  [
    {
      id: '1db71a68-452c-48b6-a6d5-92aec082747d',
      created_at: '2023-10-24T17:16:41.344703+00:00',
      updated_at: '2023-10-24T17:16:40.727+00:00',
      data: {
        id: 3,
        name: 'Headphones',
        price: 99.99,
        category: 'Electronics',
        description:
          'Noise-canceling headphones for immersive audio experience.',
      },
      data_chunk: null,
      ai_table_name: 'test1',
      tokens: 36,
      embedding: [],
      formatted_data: '',
    },
    {
      id: '415b034a-6bfd-4621-9c09-0792a16e621f',
      created_at: '2023-10-24T17:16:41.344703+00:00',
      updated_at: '2023-10-24T17:16:40.727+00:00',
      data: {
        id: 6,
        name: 'Running Shoes',
        price: 79.99,
        category: 'Footwear',
        description:
          'Comfortable and stylish running shoes for active lifestyles.',
      },
      data_chunk: null,
      ai_table_name: 'test1',
      tokens: 36,
      embedding: [],
      formatted_data: '',
    },
    {
      id: 'd8b50f70-a20a-497e-9901-fab90cfd9578',
      created_at: '2023-10-24T17:16:41.344703+00:00',
      updated_at: '2023-10-24T17:16:40.727+00:00',
      data: {
        id: 9,
        name: 'Blender',
        price: 29.99,
        category: 'Kitchen Appliances',
        description: 'Powerful blender for making smoothies and more.',
      },
      data_chunk: null,
      ai_table_name: 'test1',
      tokens: 36,
      embedding: [],
      formatted_data: '',
    },
    {
      id: 'b56a7b38-3d1d-4436-95de-2135918817d7',
      created_at: '2023-10-24T17:16:41.344703+00:00',
      updated_at: '2023-10-24T17:16:40.727+00:00',
      data: {
        id: 4,
        name: 'Coffee Maker',
        price: 49.99,
        category: 'Kitchen Appliances',
        description: 'Automatic coffee maker for your morning brew.',
      },
      data_chunk: null,
      ai_table_name: 'test1',
      tokens: 35,
      embedding: [],
      formatted_data: '',
    },
    {
      id: '090cc6d4-6635-4c42-a24f-872544366534',
      created_at: '2023-10-24T17:16:41.344703+00:00',
      updated_at: '2023-10-24T17:16:40.727+00:00',
      data: {
        id: 8,
        name: 'Gaming Console',
        price: 299.99,
        category: 'Electronics',
        description:
          'Next-gen gaming console for immersive gaming experiences.',
      },
      data_chunk: null,
      ai_table_name: 'test1',
      tokens: 35,
      embedding: [],
      formatted_data: '',
    },
  ],
  [
    {
      id: 'f46f68e9-a834-43c1-96f8-7128fd275eba',
      created_at: '2023-10-24T17:16:41.344703+00:00',
      updated_at: '2023-10-24T17:16:40.727+00:00',
      data: {
        id: 5,
        name: 'Digital Camera',
        price: 499.99,
        category: 'Electronics',
        description: 'High-quality digital camera for photography enthusiasts.',
      },
      data_chunk: null,
      ai_table_name: 'test1',
      tokens: 34,
      embedding: [],
      formatted_data: '',
    },
    {
      id: 'bbc50af0-af76-4677-ab08-8c6fff625c95',
      created_at: '2023-10-24T17:16:41.344703+00:00',
      updated_at: '2023-10-24T17:16:40.727+00:00',
      data: {
        id: 7,
        name: 'Backpack',
        price: 39.99,
        category: 'Fashion',
        description: 'Stylish and functional backpack for everyday use.',
      },
      data_chunk: null,
      ai_table_name: 'test1',
      tokens: 34,
      embedding: [],
      formatted_data: '',
    },
    {
      id: 'a343d9f6-1a55-461e-a777-cc9a36a491fe',
      created_at: '2023-10-24T17:16:41.344703+00:00',
      updated_at: '2023-10-24T17:16:40.727+00:00',
      data: {
        id: 10,
        name: 'Ebook Reader',
        price: 129.99,
        category: 'Electronics',
        description: 'Lightweight ebook reader for avid readers.',
      },
      data_chunk: null,
      ai_table_name: 'test1',
      tokens: 34,
      embedding: [],
      formatted_data: '',
    },
    {
      id: '1ec42053-42fa-45fd-b476-9727e3ed441d',
      created_at: '2023-10-24T17:16:41.344703+00:00',
      updated_at: '2023-10-24T17:16:40.727+00:00',
      data: {
        id: 1,
        name: 'Laptop',
        price: 999.99,
        category: 'Electronics',
        description: 'Powerful laptop with high-performance specifications.',
      },
      data_chunk: null,
      ai_table_name: 'test1',
      tokens: 33,
      embedding: [],
      formatted_data: '',
    },
    {
      id: '8600554b-03dc-44b8-83ed-c3b0969b3bee',
      created_at: '2023-10-24T17:16:41.344703+00:00',
      updated_at: '2023-10-24T17:16:40.727+00:00',
      data: {
        id: 2,
        name: 'Smartphone',
        price: 699.99,
        category: 'Electronics',
        description: 'The latest smartphone with advanced features.',
      },
      data_chunk: null,
      ai_table_name: 'test1',
      tokens: 33,
      embedding: [],
      formatted_data: '',
    },
  ],
];

export const mockGroupedDataObjects: GroupedDataObject[] = [
  {
    ai_table_name: 'test',
    data: [
      {
        tokens: 33,
        ai_table_name: 'test',
        data: {
          ai_table_name: 'test',
          data: {
            id: 1,
            name: 'Laptop',
            category: 'Electronics',
            price: 999.99,
            description:
              'Powerful laptop with high-performance specifications.',
          },
        },
        formatted_data:
          'Id: 1\n\nName: Laptop\n\nCategory: Electronics\n\nPrice: 999.99\n\nDescription: Powerful laptop with high-performance specifications.',
        embedding: [],
      },
      {
        tokens: 33,
        ai_table_name: 'test',
        data: {
          ai_table_name: 'test',
          data: {
            id: 2,
            name: 'Smartphone',
            category: 'Electronics',
            price: 699.99,
            description: 'The latest smartphone with advanced features.',
          },
        },
        formatted_data:
          'Id: 2\n\nName: Smartphone\n\nCategory: Electronics\n\nPrice: 699.99\n\nDescription: The latest smartphone with advanced features.',
        embedding: [],
      },
    ],
  },
  {
    ai_table_name: 'test1',
    data: [
      {
        tokens: 36,
        ai_table_name: 'test1',
        data: {
          ai_table_name: 'test1',
          data: {
            id: 3,
            name: 'Headphones',
            category: 'Electronics',
            price: 99.99,
            description:
              'Noise-canceling headphones for immersive audio experience.',
          },
        },
        formatted_data:
          'Id: 3\n\nName: Headphones\n\nCategory: Electronics\n\nPrice: 99.99\n\nDescription: Noise-canceling headphones for immersive audio experience.',
        embedding: [],
      },
    ],
  },
  {
    ai_table_name: 'test2',
    data: [
      {
        tokens: 35,
        ai_table_name: 'test2',
        data: {
          ai_table_name: 'test2',
          data: {
            id: 4,
            name: 'Coffee Maker',
            category: 'Kitchen Appliances',
            price: 49.99,
            description: 'Automatic coffee maker for your morning brew.',
          },
        },
        formatted_data:
          'Id: 4\n\nName: Coffee Maker\n\nCategory: Kitchen Appliances\n\nPrice: 49.99\n\nDescription: Automatic coffee maker for your morning brew.',
        embedding: [],
      },
      {
        tokens: 34,
        ai_table_name: 'test2',
        data: {
          ai_table_name: 'test2',
          data: {
            id: 5,
            name: 'Digital Camera',
            category: 'Electronics',
            price: 499.99,
            description:
              'High-quality digital camera for photography enthusiasts.',
          },
        },
        formatted_data:
          'Id: 5\n\nName: Digital Camera\n\nCategory: Electronics\n\nPrice: 499.99\n\nDescription: High-quality digital camera for photography enthusiasts.',
        embedding: [],
      },
    ],
  },
  {
    ai_table_name: 'test4',
    data: [
      {
        tokens: 36,
        ai_table_name: 'test4',
        data: {
          ai_table_name: 'test4',
          data: {
            id: 6,
            name: 'Running Shoes',
            category: 'Footwear',
            price: 79.99,
            description:
              'Comfortable and stylish running shoes for active lifestyles.',
          },
        },
        formatted_data:
          'Id: 6\n\nName: Running Shoes\n\nCategory: Footwear\n\nPrice: 79.99\n\nDescription: Comfortable and stylish running shoes for active lifestyles.',
        embedding: [],
      },
    ],
  },
];
